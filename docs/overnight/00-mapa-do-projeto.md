# 00 — Mapa do projeto

## Stack e execução
- Next.js 16, React 19, TypeScript 6, Supabase, Redis/Upstash, Vercel AI SDK/Gateway, WAHA.
- Testes: Vitest, Playwright e scripts shell.
- Persistência: SQL versionado em `supabase/baseline.sql` e `supabase/migrations/`; sem Prisma/Drizzle.
- Comandos: `pnpm test:unit`, `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test:e2e`, `pnpm test:db`, `pnpm test:shell`.

## Atendimento e agentes
- Webhook WAHA: `app/api/v1/webhooks/waha/[token]/route.ts`.
- Ingestão: `lib/waha/ingest.ts`; grava contatos, conversas e mensagens e emite eventos.
- Runtime principal: `workers/agent-worker/main.ts`, `lib/agent-engine/edge/crm/drain.ts`, `lib/agent-engine/agent/inbound-turn.ts`.
- Há um worker legado paralelo em `workers/ai-response-worker.ts`; qualquer mudança deve evitar dupla resposta.
- Envio passa por `runBeforeSend` e adapter WAHA.

## Segurança e tenancy
- Auth: Supabase Auth/SSR, `proxy.ts`, `lib/auth/require-role.ts`.
- Rotas usam wrappers `ok()`/`fail()`.
- Toda consulta com service role precisa filtrar `organization_id` explicitamente.

## Módulos reaproveitáveis
- CRM/funil: `app/app/kanban`, `app/app/leads`, `app/api/v1/leads`, `crm_leads`.
- Inbox/WhatsApp: `app/app/inbox`, `app/api/v1/messages`, `lib/waha`, `lib/channels`.
- Agentes: `app/app/ai/agents`, `app/api/v1/ai/agents`, `lib/agent-engine`.
- Knowledge/RAG: `app/app/ai/knowledge/sources`, `workers/rag-indexer.ts`, `lib/agent-engine/agent/search-knowledge.ts`.
- Skills e memória: estruturas existentes em `lib/agent-engine` e guias em `.agents/skills`/`.claude/skills`.
- Custos de IA: `ai_budgets`, `llm_calls`, `app/api/v1/ai/budget`.
- Ads existente: Meta Ads; não há módulo completo confirmado para Google Ads.

## Estado prévio de disparo e financeiro
- Já existem filas/eventos de agente, mensagens e contatos que podem sustentar a Fase 1.
- Não foi encontrado um módulo completo de campanhas de disparo com provedor abstrato, templates, opt-out, idempotência e dry-run.
- O financeiro existente cobre custos/orçamentos de IA e valor de lead; não cobre ainda o dashboard completo solicitado de vendas, custo de anúncios e ROI por campanha.
- Não foi confirmada integração recorrente com Google Sheets.

## Linha de base
- Será preenchida com os resultados reais dos comandos antes de alterações funcionais.
