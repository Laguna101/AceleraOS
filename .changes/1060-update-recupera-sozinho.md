---
impacto: nada_mudou
secao: corrigido
titulo: A atualização numa VPS de outra arquitetura se vira sozinha
---

Numa VPS cuja arquitetura não tem imagem publicada, o registro responde `no matching manifest for linux/arm64/v8`, o `pull` não traz imagem nenhuma e o `up -d` morre junto. O desfecho era o pior possível: o CRM continuava na versão antiga e ninguém era avisado — pelo botão **Atualizar** nem isso, porque o agente roda sozinho no cron e a falha não cabia na tela. Agora, quando o `pull` falha por arquitetura, o kit constrói aqui nesta VPS a MESMA versão alvo (`docker-compose.build.yml`, subindo pelo override com `pull_policy: never` para o Compose não voltar ao registro) e termina dizendo, em português, que as imagens foram construídas aqui nesta VPS e o motivo. Quando a imagem existe para a sua arquitetura, nada muda: nenhum build local, nenhuma ação sua, nenhuma variável, nenhum comando. Crédito: @webtecnica.
