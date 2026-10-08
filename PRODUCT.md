# AceleraOS

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- A equipe da AceleraOS usa a plataforma para configurar, acompanhar e operar o marketing e as vendas das empresas atendidas.
- Cada empresa cliente e seus usuários usam a mesma plataforma para trabalhar seus próprios contatos, conversas, agenda, desempenho e resultados, sem acesso aos dados de outras empresas.
- A operação inicial atende negócios que vendem conversando pelo WhatsApp; o produto não está limitado a um único nicho.

## Product Purpose

AceleraOS reúne a operação de marketing e vendas desde a captura do potencial cliente até o pós-venda. Pessoas e agentes de IA trabalham no mesmo sistema para captar ou importar contatos, iniciar e continuar conversas, qualificar oportunidades, organizar o CRM, acompanhar o funil, agendar atividades, transferir casos para humanos e medir resultados.

O sucesso do produto significa permitir que a AceleraOS opere várias empresas em uma única plataforma e que cada cliente acompanhe e execute sua própria operação com isolamento de dados e permissões adequadas.

## Positioning

AceleraOS usa o DeskcommCRM open source como base e o amplia para operar o ciclo completo de marketing, vendas e pós-venda. Seu mecanismo central é combinar WhatsApp, CRM multiempresa e agentes de IA que operam o sistema junto com humanos, em vez de funcionar apenas como chatbot ou painel de contatos.

## Operating Context

- Todos acessam um endereço único; o login identifica a organização e as permissões do usuário.
- A AceleraOS administra as organizações, os agentes, as automações e as configurações operacionais.
- Cada empresa pode ter um ou mais números de WhatsApp e, futuramente, suas próprias conexões de mídia paga.
- A primeira operação comercial parte de listas de prospecção montadas manualmente, importadas por CSV exportado do Excel. O agente atende e qualifica as pessoas que respondem e transfere a conversa quando for necessária participação humana.
- A implantação é self-hosted em VPS e usa Supabase para autenticação e banco de dados.

## Capabilities and Constraints

### Base disponível

- CRM multi-tenant com contatos, inbox, agenda, tarefas, funis e histórico de atividades.
- Importação de contatos por CSV, com limite atual de 500 linhas por arquivo.
- Conexões WhatsApp por QR e suporte a múltiplos números por organização.
- Agentes de IA configuráveis com prompt, provedor, credencial, número atendido, ferramentas, orçamento, base de conhecimento, follow-up e handoff humano.
- Papéis de organização, RLS, auditoria, LGPD, métricas e recursos de marca própria herdados do DeskcommCRM.

### Direção confirmada

- Cobrir o ciclo de marketing desde a captura até o pós-venda.
- Manter áreas e dados de cada empresa isolados, com uma visão administrativa transversal para a AceleraOS.
- Integrar mídia paga e resultados financeiros por empresa em etapas posteriores.

### Decisões abertas

- O modelo de autorização das contas Google Ads: acesso da AceleraOS às contas dos clientes ou outra estrutura de gestão.
- A definição contábil dos indicadores financeiros e das regras de atribuição de vendas a campanhas e agentes.
- A identidade visual final. A funcionalidade e a operação comercial têm prioridade antes de uma reformulação visual ampla.

### Restrições técnicas e operacionais

- Toda tabela e consulta que contenha dados de cliente deve preservar o isolamento por organização.
- Permissões precisam ser aplicadas no servidor e no banco; esconder itens da interface não é controle de acesso suficiente.
- Ações automáticas de agentes devem ter limites, auditoria e transferência para uma pessoa.
- O envio por WhatsApp deve respeitar bloqueios, opt-out, proteção de envio e as regras do canal.
- Alterações precisam continuar instaláveis e atualizáveis na VPS sem edição manual de artefatos gerados.

## Brand Commitments

- Nome principal confirmado: **AceleraOS**.
- Domínio operacional atual: `crm.aceleraos.com.br`.
- A marca pode evoluir visualmente depois que a operação estiver funcional.
- A licença MIT e o aviso de direitos autorais do DeskcommCRM devem ser preservados nas cópias ou partes substanciais do software.

## Evidence on Hand

- Existe uma instalação acessível do AceleraOS na VPS, baseada no DeskcommCRM.
- O acesso administrativo, a importação de CSV e o editor de agentes foram verificados na interface em produção.
- A conexão WhatsApp cadastrada estava desconectada na última inspeção e ainda precisa ser reconectada e validada de ponta a ponta.
- Ainda não há evidência confirmada de campanhas de prospecção, vendas atribuídas, Google Ads ou dashboard financeiro funcionando nessa instalação.
- Ainda não há depoimentos, benchmarks ou resultados comerciais confirmados que possam ser usados como prova pública.

## Product Principles

1. **Operação completa em um só lugar.** Captura, conversa, venda e pós-venda devem formar um fluxo contínuo e rastreável.
2. **Agência e cliente trabalham juntos.** A AceleraOS administra a operação sem impedir que cada cliente execute e acompanhe o próprio negócio.
3. **Isolamento é requisito de produto.** Nenhum cliente pode acessar dados, canais ou configurações de outra empresa.
4. **Agentes operam com supervisão.** A autonomia cresce com limites claros, histórico auditável e handoff humano.
5. **Valor comercial antes de expansão.** As primeiras entregas devem colocar uma operação real para funcionar e gerar aprendizado antes de ampliar anúncios, financeiro e identidade visual.
