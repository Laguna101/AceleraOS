---
impacto: capacidade_nova
secao: corrigido
titulo: O teto de gasto de IA volta a contar quando o agente atende no Claude Sonnet 5
---
A tela Uso e orçamento mostrava gasto zero em instalações que atendem no Claude Sonnet 5 — o modelo padrão do catálogo —, e o limite mensal nunca disparava, por mais que a conta do provedor subisse. A tabela de preços interna tinha parado na geração 4 dos modelos, e o que ela não conhece é registrado como custo desconhecido, que o teto soma como zero. Agora a geração 5 tem preço, e o gasto aparece e conta. Pelo mesmo motivo, o Claude Opus 4.5 em diante era cobrado ao preço do Opus 4 aposentado, três vezes mais caro, o que fazia o teto disparar antes da hora. Crédito: @maclevison.
