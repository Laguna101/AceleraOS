# Bloqueios

## 2026-10-05 — instalação automática do pnpm
- Tentativa: `pnpm test:unit tests/unit/broadcast-provider.test.ts --run`.
- Erro: `ERR_PNPM_IGNORED_BUILDS` para `@sentry/cli`, `esbuild` e `unrs-resolver`; o wrapper tentou instalar dependências e parou por scripts de build não aprovados.
- Contorno local: executar o binário já instalado diretamente com `node_modules/.bin/vitest.cmd ... --environment node --pool=threads`.
- Impacto: os testes unitários novos passam pelo contorno; a suíte completa e build ainda precisam de uma instalação de dependências válida.
- Sugestão: executar `pnpm approve-builds` conscientemente no ambiente local e repetir instalação/verificação.
