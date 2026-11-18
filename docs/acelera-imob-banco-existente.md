# Compatibilidade do banco do CRM imobiliário com o AceleraOS

Auditoria inicial do projeto `xgsyoysbdynxjtijzkhg`. Não aplicar o baseline diretamente: ambos os sistemas usam `public` e têm tabelas homônimas com contratos diferentes.

| Tabela | CRM imobiliário | AceleraOS |
| --- | --- | --- |
| `organizations` | `id`, `name`, `created_at` | exige `slug`, `legal_name`, `display_name`, entre outros |
| `contacts` | inclui `phone`, `campaign_id` | usa `phone_number`, consentimento e outros campos |
| `ai_agents` | usa `active`, `openai_model` | usa `is_active`, `model`, `config`, `guardrails` |
| `conversations`, `messages` | contratos próprios do CRM imobiliário | contratos próprios da base Deskcomm |

Na consulta inicial havia uma organização, um perfil e três regras de follow-up; as outras tabelas consultadas estavam vazias. Não significa que o projeto seja descartável. `CREATE TABLE IF NOT EXISTS` no baseline não adapta tabelas existentes: pula sua criação e comandos posteriores podem falhar ou modificar objetos compartilhados.

Antes de qualquer migração remota: inventariar colunas, constraints, triggers, policies, funções, storage e auth dos dois aplicativos; planejar compatibilidade e reversão; testar em banco descartável com cópia apropriada da estrutura; validar login, isolamento entre organizações e fluxos dos dois aplicativos. O baseline de cerca de 1,46 MB referencia `public` extensivamente, portanto mudar apenas o schema padrão do cliente não garante isolamento.
