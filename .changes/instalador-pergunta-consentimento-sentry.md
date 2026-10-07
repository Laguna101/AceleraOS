---
impacto: nada_mudou
secao: corrigido
titulo: Instalador volta a pedir consentimento antes de ligar a telemetria
---

O template self-host não pré-define mais `SENTRY_DSN` vazio antes da primeira execução. Assim, o instalador volta a perguntar pelo envio de relatórios de erro; em modo `--yes`, mantém a telemetria desligada, e uma escolha anterior continua preservada nas reexecuções. Crédito: @joaopaulomirandamatias.
