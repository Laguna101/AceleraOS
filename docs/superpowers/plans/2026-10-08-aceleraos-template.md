# AceleraOS template implementation plan

**Goal:** Implantar a composição aprovada nas telas reais.
**Architecture:** Componentes compartilhados preservam contratos funcionais. Layouts operacionais recebem estrutura específica. Publicação incremental sobre origin/main.
**Tech Stack:** Next.js, React, Tailwind, Vitest.
**Spec:** ../specs/2026-10-08-aceleraos-redesign.md
**Execution:** Inline, solicitada pelo usuário em “agora implanta o design”.

## Constraints
Sem dados demonstrativos em produção, mudanças de permissões ou disparos. Sem force push ou build na VPS.

## Tasks
- [x] Recuperar previews/aceleraos, DESIGN.md e PRODUCT.md do histórico.
- [ ] Remodelar Sidebar, TopBar e AppShell com contexto de empresa, navegação suave e proporções da prévia.
- [ ] Unificar superfícies, formulários e tabelas; aplicar tokens também aos portais e ao tema escuro.
- [ ] Remodelar MetricsClient, InboxLayout, contatos, kanban e AgentCard; aplicar padrão de cabeçalhos às demais rotas existentes.
- [ ] Validar testes pertinentes, build e comparação visual autenticada desktop/mobile.
- [ ] Publicar commit incremental, aguardar imagem e implantar por digest com rollback.

## Review focus
Overflow mobile; sidebar recolhida; portais; tema escuro; preservação de filtros e permissões. Verificar cada um na interface e testes existentes relevantes.

## Ledger
Referência recuperada do commit e012ce2. Navegador de produção autenticado disponível. Tema atual system resolve para escuro, diferente do template aprovado claro. As implementações anteriores incluíram gradiente estranho ao template; removê-lo. O plano será executado diretamente conforme pedido, sem novo ciclo de autorização.
