---
impacto: nada_mudou
secao: corrigido
titulo: Uma consulta de membro que não volta não acusa mais o responsável de estar fora da organização
---

Quando uma regra de automação ia atribuir um responsável a um negócio e a
consulta que confere se aquela pessoa é membro da organização não voltava — rede
fora, banco fora —, a regra terminava dizendo `user_not_in_org`, como se o
responsável escolhido tivesse saído da organização. O aviso mandava o operador
mexer justamente no que estava certo: quem ele havia escolhido para atender.

Agora a ação separa "não é membro" de "não deu para saber". O responsável que
realmente não é membro continua sendo recusado do mesmo jeito, com
`user_not_in_org`. Quando a consulta falha, a execução passa a ser marcada com o
código `membro_indeterminado`, e a mensagem do erro fica registrada no detalhe da
execução.

O que muda para quem opera, hoje: o histórico da regra deixa de acusar a
configuração. Antes ele dizia que o responsável escolhido estava fora da
organização, o que mandava mexer justamente no que estava certo. A frase amigável
para esse caso na aba Atividade ainda não existe — o histórico mostra o código —
e está sendo tratada à parte.
