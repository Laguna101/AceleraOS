---
impacto: nada_mudou
secao: corrigido
titulo: Regra de automação transfere o negócio entre funis em vez de abrir um segundo
---
Quando uma regra de automação aponta para outro funil e o contato já tinha um negócio aberto no funil antigo, a regra criava um SEGUNDO negócio e deixava o primeiro aberto: o mesmo cliente aparecia duas vezes, um card em cada funil, e ninguém sabia qual dos dois era o de verdade. Agora a regra TRANSFERE: o negócio é levado para o funil da regra com os mesmos dados (título, valor, responsável, campos personalizados e etiquetas) e o do funil antigo é encerrado como perdido, com o registro de para onde foi. Negócio aberto no mesmo funil continua sendo movido de etapa, e contato sem negócio aberto continua ganhando um negócio novo.

Esse encerramento não conta como perda comercial: "Levado para outro funil" é o motivo próprio da transferência, e as métricas de perdas (a por responsável e a do relatório de atrito) deixam de contá-lo — trocar de funil não é perder o negócio. O motivo de sistema também não aparece na janela "Marcar como perdido": ele continua gravado pela transferência, mas não é oferecido a quem está fechando um negócio à mão — sem isso, um clique tiraria uma perda comercial real do número. A atualização aplica a mudança no banco sozinha: nada precisa ser feito à mão, e negócio encerrado antes dela continua contando como perda.
