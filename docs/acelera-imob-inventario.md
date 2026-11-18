# Acelera Imob — inventário antes da reformulação

Referência: interface escura com superfícies grafite, luz violeta discreta, contraste claro e hierarquia editorial. A implementação deve adaptar essa linguagem à operação comercial de administradoras de condomínios, sem reproduzir o painel da referência literalmente.

## Apresentação atual a substituir

- `app/app/_components/AppShell.tsx`: estrutura da aplicação autenticada.
- `components/shell/Sidebar.tsx`, `MobileSidebar.tsx` e `TopBar.tsx`: navegação, cabeçalho e controles de contexto. `lib/navigation/catalogo.ts` declara destinos e permissões; a apresentação pode mudar preservando suas regras.
- `app/globals.css`, `app/aceleraos.css` e `app/layout.tsx`: tokens, estilos globais e fontes atuais.
- `components/ui/`: aparência compartilhada de botões, campos, cartões, tabelas e diálogos; preservar contratos e acessibilidade.
- `components/inbox/`, `components/kanban/` e telas em `app/app/metrics`, `app/app/contacts`, `app/app/ai`, `app/app/agenda`: composições operacionais a redesenhar.

## Lógica a preservar

Autenticação e permissões (`proxy.ts`, `lib/auth`, `hooks/auth`), isolamento por organização e acesso a dados (`lib/supabase`, migrations e regras RLS), ações (`app/actions`), endpoints (`app/api`), mensageria, IA e filas (`lib`, `workers`), além dos comportamentos e estados reais de cada tela. A navegação deve continuar respeitando permissões do catálogo.

## Lacunas e limites

O repositório contém rotas de contatos, Kanban, Inbox, agenda, métricas, agentes e uma tela de disparos. A presença de uma rota não demonstra que a funcionalidade funciona de ponta a ponta. Prospecção específica de condomínios, relatórios comerciais e campanhas precisam ser verificadas contra os dados e capacidades existentes; números demonstrativos devem ser identificados como demonstração.

O projeto Supabase anteriormente associado ao AceleraOS foi excluído a pedido do usuário. O Supabase recém-criado pertence ao CRM imobiliário separado e não deve ser usado pelo Deskcomm sem decisão explícita e análise de compatibilidade. Testes reais de autenticação e integração do AceleraOS dependem de um ambiente apropriado.

Nenhuma tabela, integração, regra de negócio ou dado será removido como parte da troca visual. A aparência antiga será substituída progressivamente; a licença e os avisos de direitos autorais existentes serão mantidos.
