# Estratégia de follow-up para mensagens frias

## Regra de entrada

A campanha só pode incluir contatos com origem registrada, finalidade informada e `optedIn=true`. Uma lista fria sem consentimento comprovável fica em revisão/dry-run. A ANPD orienta que disparos em massa de mensagens instantâneas exigem consentimento e que a revogação deve ser gratuita e facilitada.

## Cadência padrão configurável

Esta é uma configuração inicial conservadora, não um prompt:

| Etapa | Momento | Objetivo | Regra |
|---|---:|---|---|
| 1 | D0 | Primeiro contato contextual | Uma mensagem curta, identificando remetente e motivo |
| 2 | D2 | Lembrete útil | Só enviar se não houve resposta, bloqueio ou opt-out |
| 3 | D6 | Última tentativa | Declarar que é o último contato e oferecer saída simples |

Depois da terceira tentativa sem resposta, encerrar a cadência por 30 dias. Qualquer resposta pausa a sequência e encaminha a conversa ao fluxo do vendedor. Qualquer intenção de sair cancela todos os follow-ups.

## Guardrails

- No máximo uma mensagem por contato em uma janela de 24 horas, salvo resposta recebida.
- Fora da janela de atendimento de 24 horas, usar apenas template aprovado.
- Nunca contornar bloqueios, opt-out, falhas permanentes ou limite do provedor.
- Pausar a campanha se a taxa de falha, bloqueio ou descadastro superar o limite configurado.
- Começar com lote pequeno e aumentar gradualmente apenas se os sinais de qualidade permanecerem bons.
- Não usar linguagem enganosa, urgência artificial ou personalização inventada.
- Registrar origem da lista, consentimento, tentativa, resposta, falha, bloqueio e descadastro.

A política da WhatsApp Business Platform exige template aprovado para iniciar conversas e permite mensagem livre dentro da janela de atendimento de 24 horas. A Meta também informa que limites aumentam gradualmente conforme a qualidade da conta e que feedback negativo pode gerar restrições.

Fontes consultadas:

- https://whatsappbusiness.com/policy/
- https://whatsappbusiness.com/wp-content/uploads/2026/04/Onboarding-to-the-WhatsApp-Business-Platform.pdf
- https://whatsappbusiness.com/wp-content/uploads/2026/04/Best-Practices-for-Marketing-Messages-on-WhatsApp-.pdf
- https://www.gov.br/anpd/pt-br/assuntos/noticias/guia_lgpd_final.pdf
