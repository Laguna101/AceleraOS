# Disparo WhatsApp — arquitetura local

O módulo `lib/broadcast` contém o núcleo determinístico da Fase 1:

- `campaign.ts`: valida campanha em andamento, template aprovado, opt-in, bloqueio global e variáveis; cria mensagens idempotentes por campanha/contato.
- `queue.ts`: cria os slots de taxa e executa o plano em modo dry-run ou através de um `BroadcastProvider`.
- `provider.ts`: `FakeProvider` para testes e `WhatsAppCloudProvider` como adaptador futuro. O adaptador Cloud permanece sem transporte real até configuração e aprovação explícitas.

O núcleo não grava no banco e não chama a internet. A próxima etapa é conectar esses contratos às tabelas, rotas e worker existentes do CRM, preservando `organization_id`, autenticação e auditoria.

## Teste local

```powershell
& .\node_modules\.bin\vitest.cmd run tests/unit/broadcast-provider.test.ts tests/unit/broadcast-campaign.test.ts tests/unit/broadcast-queue.test.ts --environment node --pool=threads
```

O teste cobre template, opt-out, bloqueio, variável ausente, pausa, dry-run, taxa planejada e idempotência.
