# Redesign do AceleraOS

## Objetivo e referência
Aplicar às telas reais do CRM o template aprovado, recuperável no commit e012ce2 em previews/aceleraos. O resultado deve se parecer com a prévia na composição, cores e hierarquia, usando dados e ações reais.

As intervenções anteriores alteraram CSS global, mas não reconstruíram as telas. Healthchecks de containers e testes de disparos não validam aparência. Esta entrega exige comparação visual em navegador.

## Direção visual
- Sidebar greige #f1f0ea; seleção suave #dce6d5 com texto verde escuro, sem preenchimento verde sólido nos links selecionados.
- Canvas #faf9f6; superfícies brancas; bordas #e7e3da; ações #506d48.
- Atkinson Hyperlegible para interface, IBM Plex Mono para dados tabulares.
- Referência desktop: sidebar de 236 px, cabeçalho de 72 px, conteúdo com margens próximas de 38 px, título de 32 px; adaptar às larguras reais sem cortar conteúdo.
- Indicadores em faixa com divisórias; painéis de conteúdo agrupados por tarefa e com elevação moderada.
- Tema escuro com equivalentes legíveis; menus e diálogos em portais devem receber os mesmos tokens da página.

## Escopo funcional e visual
1. Navegação: marca e empresa ativa, grupos de destinos, rota ativa, busca, notificações, usuário e menu móvel.
2. Desempenho: hierarquia da prévia com indicadores disponíveis no backend. Receita, atribuição e conversão sem dados reais ficam indisponíveis, nunca substituídas por valores fictícios.
3. Inbox: lista de conversas, cabeçalho, mensagens, compositor e painel contextual; preservar envio, anexos, filtros e seleção.
4. CRM: contatos, detalhes, filtros, tabelas, tarefas e kanban com o mesmo vocabulário visual.
5. IA: catálogo e edição de agentes, disparos, fluxos de follow-up e navegação secundária.
6. Agenda, Google Ads, análises, integrações e configurações: aplicar cabeçalhos, superfícies, formulários e estados compartilhados e revisar particularidades de cada tela.
7. Financeiro: não criar um backend financeiro como efeito colateral de redesign. Capacidades ainda inexistentes devem ser identificadas claramente.

## Limites
Manter autenticação, permissões e isolamento entre empresas. Não enviar mensagens nem alterar campanhas para testar aparência. Não substituir dados por demonstrações da prévia. Preservar configuração e logotipos existentes, corrigindo o alcance dos tokens sem criar divergências entre página e portais.

## Execução proposta
Recuperar a referência e trabalhar a partir da main atual do repositório Laguna101/AceleraOS com commits incrementais. Não recriar branches órfãs nem fazer force push. Implementar primeiro componentes compartilhados, depois migrar cada superfície listada. Mapear rotas atendidas em checklist de entrega.

## Critérios de aceitação
- Capturas da referência e das telas reais em desktop e mobile, com comparação de composição, cores, densidade e tipografia.
- Estados de carregamento, vazio, erro e conteúdo utilizáveis; tabelas e kanban rolam dentro do painel.
- Navegação, seleção de conversa, filtros e formulários preservados; testes pertinentes à UI, typecheck e build aprovados, com limitações documentadas.
- Imagem construída fora da VPS, identificada por commit/digest, com rollback para a imagem anterior.
- Verificação visual autenticada após o deploy, além da saúde dos serviços. Se não houver sessão disponível, declarar esse bloqueio em vez de afirmar validação visual.

## Revisão
Escopo é remodelação do produto existente. Não há dependência de números comerciais inventados nem de novas integrações. A referência original tem prioridade sobre descrições genéricas de design. Documento preparado para revisão antes do plano de implementação conforme Superpowers.
