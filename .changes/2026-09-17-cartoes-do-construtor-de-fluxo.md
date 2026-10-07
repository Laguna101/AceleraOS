---
impacto: capacidade_nova
secao: corrigido
titulo: No construtor de fluxos, a regra de etapa passa a funcionar — e o cartão do passo diz a verdade
---

No passo "Verificar condição", a etapa do funil era digitada à mão. O sistema
compara a etapa pelo código interno dela, então a regra "o lead está na etapa
PAGO" nunca era verdadeira, e ninguém avisava: o fluxo publicava e o contato
seguia pelo caminho errado. Agora a etapa é escolhida numa lista (com o nome do
funil junto), o número de passos é um campo numérico, e publicar recusa a regra
sem valor, a que aponta para etapa que não existe mais e a que ficou arquivada —
dizendo qual regra corrigir. Um fluxo antigo com a etapa digitada à mão continua
rodando como está; ao publicar de novo, o sistema pede para escolher a etapa.

Regras de "passos" também voltam a decidir como foram escritas: a tela antiga
gravava o número como texto e o sistema nunca dava a regra por verdadeira, então
"pelo menos 3 passos" mandava todo mundo pelo caminho do "não". Vale a pena
conferir os fluxos ativos que comparam passos — eles podem passar a seguir por
outro caminho, que é o que foi pedido quando a regra foi escrita.

No cartão de cada passo, o texto deixa de ser cortado no meio, o passo de
classificar nasce com opções em português ("Interessado", "Sem interesse") no
lugar de "hot"/"cold", "grace 15min" virou "espera 15 min", e a saída de escape
de um passo que já tem saídas deixa de se chamar "Sempre" — ela só é usada
quando nenhuma das outras serve, e agora se chama "Outros casos". As linhas
entre os passos ganharam contraste: no tema claro elas quase sumiam.
