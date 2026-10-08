# Prévia AceleraOS

Protótipo local independente, com dados fictícios. Não altera o CRM, não acessa Supabase e não envia mensagens.

Execute `node previews/aceleraos/server.cjs` na raiz e abra http://127.0.0.1:4173.

Direção aprovada: Jardim Operacional; premium, sóbria e consultiva; Sálvia Operacional; controles compactos; elevação perceptível. Modo Operate. Primeira tela: desempenho, evolução de receita, conversão, atividades e agenda. Interações: navegação, busca de contatos, período ilustrativo, conversa simulada, visão agência/cliente. Financeiro representa uma capacidade futura.

Escopo arquitetural: artefato de design isolado, fora das rotas do produto. Entrada: dados sintéticos em app.js. Saída: renderização local e avaliação visual. Estado transitório em memória do navegador; recarregar restaura os exemplos. Não há execução de agentes, persistência, envio externo ou controle de acesso real. DESIGN.md e .impeccable/design.json permanecem como direção já aprovada.
