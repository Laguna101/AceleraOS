---
impacto: nada_mudou
secao: corrigido
titulo: A suíte E2E não deixa conexões de WhatsApp de teste no banco
---
Ao terminar, o Playwright agora remove as sessões de WhatsApp criadas pelos seeds E2E. Também há um script explícito para limpar resíduos antigos; em banco remoto ele exige `--allow-remote` para evitar exclusão acidental. Crédito: @joaopaulomirandamatias.
