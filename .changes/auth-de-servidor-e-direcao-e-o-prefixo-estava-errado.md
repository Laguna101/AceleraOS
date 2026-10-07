---
impacto: nada_mudou
secao: alterado
titulo: A doutrina de chamada de servidor passa a dizer o que o código exige
---

A documentação interna prometia autenticar chamada de servidor com um token
começando em `tok_`, e o sistema exige `dsk_`. Quem seguia o texto recebia
"credencial inválida" sem entender por quê — o prefixo `tok_` não existia em
nenhuma linha de código.

Além disso o texto descrevia a autenticação por chave de servidor como se
valesse em toda a API, quando ela é habilitada rota por rota. Agora o texto diz
a direção (é assim que o produto quer atender sistema externo, e as rotas vão
sendo convertidas conforme cada integração precisa) e entrega o comando que
responde quais rotas já aceitam hoje, em vez de um número que envelhece.

Nada muda para quem opera uma instalação: não há env nova, nem migration, nem
comportamento diferente no que já estava no ar.
