# Plano overnight — ecossistema de vendas

## Fase 0 — mapa e linha de base
- Mapear stack, persistência, autenticação, filas, agentes, knowledge, skills e memória.
- Registrar testes/lint/build antes das mudanças.
- Critério: `00-mapa-do-projeto.md` descreve caminhos reais e a baseline está registrada.

## Fase 1 — disparo WhatsApp (prioridade)
- Criar contrato de provedor, FakeProvider e WhatsAppCloudProvider sem chamadas reais.
- Implementar modelos/serviços para campanhas, contatos, templates, fila, limites, opt-in/out, webhooks, dry-run e métricas.
- Adicionar testes unitários e e2e local com fake.
- Critério: pipeline CSV -> campanha -> dry-run -> fila -> webhooks -> opt-out -> retomada funciona sem credenciais.

## Fase 2 — financeiro
- Configurar preços de modelos/WhatsApp.
- Registrar uso de tokens, custo por agente/conversa/lead/campanha, receita, conversão, orçamento e relatórios.
- Critério: cálculos determinísticos com dados simulados e documentação.

## Fase 3 — agentes
- Criar registro/versionamento/configuração de agentes e esqueletos vazios de prompts.
- Implementar camada única de modelo em mock, contrato de skills, funil, RAG, memória, qualificador, propostas de melhoria e revisores.
- Implementar contrato FakeAdsProvider e propostas de Google Ads sem aplicar alterações.
- Critério: contratos e persistência testados sem prompt gerado e sem chamadas externas.

## Fase 4 — segurança, observabilidade e entrega
- Validar entradas, autenticação/autorização, assinaturas, rate limiting, logs e métricas.
- Rodar suíte completa, lint, typecheck e build.
- Atualizar relatório final, decisões e bloqueios.
