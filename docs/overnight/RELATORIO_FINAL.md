# Relatório final — atualização contínua

## Fase 0 — mapa e linha de base
- ✅ Branch criada: `overnight/ecossistema-vendas`.
- ✅ Plano, decisões, bloqueios e mapa do projeto criados.
- ✅ Estruturas existentes identificadas: WAHA, agent-engine, filas, contatos, templates, opt-out, RAG, skills, memória e custos de IA.
- ⚠️ Linha de base completa ainda não concluída: a instalação automática do pnpm foi bloqueada por scripts de build não aprovados.
- ⚠️ Há dois caminhos de atendimento (agent-engine e worker legado); a produção precisa ser validada separadamente antes de qualquer ativação.

## Fase 1 — disparo
- ✅ Núcleo local criado em `lib/broadcast/` com campanhas, validação de template/opt-in/bloqueio, fila com slots de taxa, `FakeProvider`, `WhatsAppCloudProvider` seguro e dry-run.
- ✅ Testes unitários do núcleo: 8 passaram usando Vitest direto com ambiente Node e pool de threads.
- ❌ Campanhas persistidas, fila durável, templates Meta, webhooks, UI/API e integração real ainda não implementados.

## Fase 2 — financeiro
- ❌ Ainda não implementada.

## Fase 3 — agentes
- ✅ Sete esqueletos de prompt vazios criados em `agents/*/prompt.md`.
- ✅ Configurações técnicas mock/dry-run criadas em `agents/*/config.yaml`.
- ❌ Registro/versionamento persistido, skills, qualificador, revisores e Ads ainda não implementados.

## Fase 4 — segurança e entrega
- ⚠️ As regras de segurança foram registradas; suíte completa, lint, typecheck e build ainda pendentes.

## Tarefas manuais
- Preencher os prompts manualmente.
- Aprovar scripts de build das dependências no ambiente local para liberar a suíte completa.
- Configurar credenciais e aprovação de templates somente quando houver decisão explícita de integração real.

## Riscos conhecidos
- Não foi feita nenhuma chamada externa nem envio real.
- O provedor fake não representa limites ou políticas do provedor Meta até a implementação completa da Fase 1.
- Nenhuma alteração foi feita na VPS ou em produção.



## Atualização 2026-10-05 — follow-up e VPS
- ✅ Estratégia de follow-up frio documentada em `docs/disparo/FOLLOWUP-COLD-MESSAGES.md` com cadência D0/D2/D6, pausa por resposta, opt-out, limites e rampa.
- ✅ Configuração técnica do agente de disparos atualizada sem conteúdo de prompt.
- ✅ Branch empacotada e enviada para `/opt/deskcommcrm-overnight` na VPS.
- ⚠️ A instalação ativa não foi substituída nem reiniciada: o núcleo novo ainda não está ligado às rotas/tabelas/worker de produção.
- ⚠️ O sistema de follow-up existente do DeskcommCRM foi identificado e está no código (`lib/followup` e worker de follow-up), mas a nova cadência ainda precisa ser conectada a uma tela/API e validada em ambiente de teste.
