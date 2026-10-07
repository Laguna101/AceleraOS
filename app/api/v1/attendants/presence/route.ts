/**
 * POST /api/v1/attendants/presence — o EMISSOR do sinal de presença.
 *
 * ─── O que faltava ────────────────────────────────────────────────────────
 *
 * A coluna `attendant_availability.last_heartbeat_at` existia desde a migration
 * 0039 e NÃO TINHA ESCRITOR: varredura do repositório em 2026-09-11 não achou
 * nenhum emissor (nem hook, nem `setInterval`, nem `beforeunload`), e o único
 * carimbo que existia era o clique no botão de plantão. Enquanto o cron
 * `attendant-heartbeat` existia, esse carimbo era o que derrubava o plantão 15
 * min depois; o #720 tirou o cron e a coluna ficou reservada, limpa, esperando
 * este emissor. Esta rota é ele.
 *
 * ─── A regra que ela NÃO pode quebrar ─────────────────────────────────────
 *
 * A presença escreve UMA coluna, e só ela:
 *
 *   last_heartbeat_at  ← presença (expira, derivada em leitura)
 *   is_available       ← decisão ("estou de plantão") — NUNCA tocada aqui
 *   capacity, schedule ← configuração — NUNCA tocadas aqui
 *
 * O corpo do `upsert` é o contrato: `organization_id`, `user_id` e
 * `last_heartbeat_at`. Sem `is_available`, sem `capacity`, sem `schedule`, e sem
 * `updated_at` (que é "quando a disponibilidade MUDOU", e a presença não muda
 * disponibilidade nenhuma). Quem prende isso é
 * `tests/unit/attendant-presence-route.test.ts` — se alguém acrescentar
 * `is_available` a este payload, o teste fica vermelho.
 *
 * Não há audit log: um sinal por minuto por aba viraria a tabela de auditoria
 * mais barulhenta do produto, e não há decisão para auditar — a decisão de
 * plantão continua auditada no PATCH que a muda. O rastro da presença é o
 * próprio `last_heartbeat_at`, visível na tela da equipe.
 *
 * ─── Sem corpo, e por quê ─────────────────────────────────────────────────
 *
 * O sinal é o PRÓPRIO PEDIDO autenticado: quem carimba é sempre quem está
 * logado (`authz.user.id`), nunca um `user_id` recebido. Aceitar um `user_id` no
 * corpo seria a escalada de marcar outra pessoa como presente — e não há mais
 * nada para validar num pedido cujo conteúdo é "eu ainda estou aqui". A RLS de
 * `attendant_availability` (own OR manager+) é o backstop do banco.
 *
 * Idempotente e barato por construção: um `upsert` na chave única
 * `(organization_id, user_id)`, uma linha, uma coluna. A PRIMEIRA batida de quem
 * nunca tocou a chave cria a linha — e isso acorda o worker de roteamento uma
 * vez (o trigger `trg_routing_availability_changed` dispara em `insert`); da
 * segunda em diante é `update` de uma coluna fora da lista do trigger, sem
 * evento nenhum.
 */
import { randomUUID } from "node:crypto";
import type { NextRequest } from "next/server";

import { ok, fail } from "@/lib/api/wrappers";
import { requireRole } from "@/lib/auth/require-role";
import { PRESENCA_EXPIRA_SEGUNDOS } from "@/lib/atendimento/presenca";
import { requireSupportWrite } from "@/lib/impersonate/support";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/** As duas colunas que esta rota tem permissão de olhar. */
const SELECT_COLS = "user_id, last_heartbeat_at";

export async function POST(_req: NextRequest): Promise<Response> {
  // Sessão de suporte (impersonação) não emite presença: a pessoa na frente da
  // tela não é o atendente, e marcá-lo como presente seria o suporte virando
  // sinal de vida de outra pessoa.
  const supportDenied = await requireSupportWrite();
  if (supportDenied) return supportDenied;

  const requestId = randomUUID();
  const authz = await requireRole("agent", { requestId, resource: "attendant_availability" });
  if (!authz.ok) return authz.response;
  const { user: authUser, org: activeOrg } = authz;

  const agora = new Date();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("attendant_availability")
    .upsert(
      {
        organization_id: activeOrg.orgId,
        user_id: authUser.id,
        last_heartbeat_at: agora.toISOString(),
      },
      { onConflict: "organization_id,user_id" },
    )
    .select(SELECT_COLS)
    .single();

  if (error) return fail("internal_error", error.message, 500, { requestId });

  // A resposta diz o que foi carimbado e até quando vale — e nada sobre
  // disponibilidade: o cliente não tem como concluir desta rota que o plantão
  // mudou, porque ela não muda e não conta o estado dele.
  return ok(
    {
      user_id: data.user_id,
      last_heartbeat_at: data.last_heartbeat_at,
      present: true,
      presence_expires_at: new Date(
        agora.getTime() + PRESENCA_EXPIRA_SEGUNDOS * 1000,
      ).toISOString(),
    },
    { requestId },
  );
}
