---
name: AceleraOS
description: Uma central premium e serena para operar marketing, vendas e relacionamento.
colors:
  sage-mist: "#f3f6f1"
  sage-soft: "#e4ebe0"
  sage-border: "#c8d6c1"
  sage-disabled: "#a4ba9a"
  sage-light: "#82a077"
  sage-operational: "#67885d"
  sage-hover: "#506d48"
  sage-pressed: "#41573b"
  warm-canvas: "#faf9f6"
  warm-surface: "#ffffff"
  warm-elevated: "#f5f3ee"
  warm-border: "#e7e3da"
  warm-border-strong: "#d2cdbf"
  warm-muted: "#5d594f"
  warm-subtle: "#7d786c"
  warm-ink: "#1c1a16"
  success: "#5a8a5f"
  warning: "#b07a2b"
  error: "#a94a3c"
  info: "#4a7a93"
  dark-canvas: "#161510"
  dark-surface: "#1d1c17"
  dark-elevated: "#272620"
  dark-border: "#33312a"
  dark-muted: "#8e8b7f"
  dark-ink: "#f5f4ef"
typography:
  display:
    fontFamily: "Atkinson Hyperlegible, ui-sans-serif, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: "36px"
    letterSpacing: "normal"
  headline:
    fontFamily: "Atkinson Hyperlegible, ui-sans-serif, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: "28px"
  title:
    fontFamily: "Atkinson Hyperlegible, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: "22px"
  body:
    fontFamily: "Atkinson Hyperlegible, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  label:
    fontFamily: "Atkinson Hyperlegible, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
    letterSpacing: "0.005em"
  data:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "18px"
rounded:
  none: "0"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  "0": "0"
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
  "20": "80px"
components:
  button-primary:
    backgroundColor: "{colors.sage-operational}"
    textColor: "{colors.warm-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.xs}"
    padding: "8px 16px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "{colors.sage-hover}"
    textColor: "{colors.warm-surface}"
    rounded: "{rounded.xs}"
  button-secondary:
    backgroundColor: "{colors.warm-elevated}"
    textColor: "{colors.warm-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.xs}"
    padding: "8px 16px"
    height: "36px"
  input:
    backgroundColor: "{colors.warm-canvas}"
    textColor: "{colors.warm-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.xs}"
    padding: "8px 12px"
    height: "36px"
  card:
    backgroundColor: "{colors.warm-surface}"
    textColor: "{colors.warm-ink}"
    rounded: "{rounded.md}"
    padding: "20px"
  badge-accent:
    backgroundColor: "{colors.sage-soft}"
    textColor: "{colors.sage-hover}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "3px 10px"
    height: "22px"
---

# Design System: AceleraOS

## Overview

**Creative North Star: "O Jardim Operacional"**

O AceleraOS deve parecer um ambiente de trabalho vivo, organizado e cultivado com intenção. A Sálvia Operacional e os neutros quentes trazem o caráter orgânico; a tipografia precisa, a hierarquia firme e a densidade controlada deixam claro que esta é uma ferramenta profissional para operar marketing, vendas e relacionamento.

A personalidade é premium, sóbria e consultiva. A interface acomoda jornadas longas sem fadiga, mas usa elevação perceptível em cartões e painéis para criar ritmo, separar contextos e destacar o que pede ação. Componentes técnicos e compactos preservam velocidade e leitura, enquanto listas operacionais mantêm espaço suficiente para reduzir erros.

O sistema rejeita o painel SaaS genérico com gradientes roxos ou azuis e grades repetitivas de cartões. A identidade surge da paleta vegetal dessaturada, dos neutros greige, da tipografia humanista e de uma hierarquia baseada em função.

**Key Characteristics:**

- Paleta orgânica e dessaturada com neutros quentes.
- Aparência premium, sóbria e consultiva.
- Controles técnicos, compactos e previsíveis.
- Elevação clara em cartões, menus, painéis e modais.
- Alta legibilidade para trabalho operacional prolongado.
- Movimento funcional, curto e respeitoso com acessibilidade.

## Colors

A paleta combina a **Sálvia Operacional** com superfícies greige para comunicar crescimento disciplinado, confiança e conforto durante o uso contínuo.

### Primary

- **Sálvia Operacional** (`#67885d`): ação principal, links, foco e destaques de marca no tema claro.
- **Sálvia Clara** (`#82a077`): cor principal no tema escuro e apoio em estados luminosos.
- **Sálvia Profunda** (`#506d48`): hover de ações principais; `#41573b` é reservado ao estado pressionado e texto de alto contraste sobre fundos claros de sálvia.
- **Névoa de Sálvia** (`#e4ebe0`): seleção, hover de navegação, badges e anel externo de foco.

### Neutral

- **Tela Quente** (`#faf9f6`): fundo de página no tema claro; evita o brilho de uma página totalmente branca.
- **Superfície Clara** (`#ffffff`): cartões e superfícies que precisam se destacar da tela.
- **Camada Greige** (`#f5f3ee`): cabeçalhos, fundos alternados, controles secundários e áreas elevadas.
- **Borda Quente** (`#e7e3da`): separadores e contornos padrão; `#d2cdbf` reforça tabelas e divisões críticas.
- **Tinta Quente** (`#1c1a16`): texto principal; `#5d594f` atende labels e conteúdo secundário, e `#7d786c` atende timestamps e informação utilitária.
- **Noite Quente** (`#161510`): fundo escuro; cartões usam `#1d1c17`, superfícies elevadas `#272620`, bordas `#33312a` e texto `#f5f4ef`.

### State Colors

- **Sucesso Sereno** (`#5a8a5f`): conclusão, ativo, conectado e pago.
- **Atenção Âmbar** (`#b07a2b`): espera, risco de SLA e atenção sem urgência artificial.
- **Erro Terracota** (`#a94a3c`): falhas e ações destrutivas.
- **Informação Mineral** (`#4a7a93`): revisão, orientação e informação neutra.

### Named Rules

**The Cultivated Accent Rule.** A sálvia marca ações, seleção e estado. Nunca cobre grandes áreas nem vira fundo integral da navegação.

**The Warm Ground Rule.** Páginas usam tela quente e texto quase preto. Branco puro fica reservado às superfícies que precisam de contraste.

## Typography

**Display Font:** Atkinson Hyperlegible (com `ui-sans-serif`, `system-ui`, `sans-serif`)

**Body Font:** Atkinson Hyperlegible (com `ui-sans-serif`, `system-ui`, `sans-serif`)

**Label/Mono Font:** IBM Plex Mono (com `ui-monospace`, `SFMono-Regular`, `Menlo`, `monospace`)

**Character:** Atkinson traz legibilidade humanista e distingue caracteres semelhantes em nomes, telefones e identificadores. IBM Plex Mono dá precisão técnica aos dados sem transformar a interface em uma ferramenta para desenvolvedores.

### Hierarchy

- **Display XL** (700, 48/56px, -1%): boas-vindas ou comunicação excepcional; não usar em telas operacionais rotineiras.
- **Display** (700, 28/36px): título principal de uma view, como Inbox ou Funil.
- **Headline** (700, 20/28px): título de modal ou cartão de grande hierarquia.
- **Title** (700, 16/22px): título de cartão, coluna ou grupo de formulário.
- **Body Large** (400, 16/24px): descrições, comentários e prosa; limite recomendado de 70 caracteres por linha.
- **Body** (400, 14/20px): texto padrão da interface, labels, botões e itens de lista.
- **Body Small** (400, 13/18px): previews, helpers e conteúdo secundário.
- **Label** (400, 12/16px, 0.5%): timestamps, badges e microcopy; nunca menor que 12px.
- **Data** (400, 13/18px): IDs, valores, datas e colunas tabulares em IBM Plex Mono.

### Named Rules

**The Read-It-Once Rule.** Hierarquia vem de tamanho, peso e espaço. Nunca use peso abaixo de 400, tamanhos inventados ou texto secundário em prosa longa.

**The Exact Data Rule.** Valores monetários, horários, IDs e números alinhados usam numerais tabulares; colunas de dados usam IBM Plex Mono.

## Layout

O produto prioriza desktop e tablet. A navegação lateral mede 240px aberta e 64px recolhida; a barra superior tem 56px e permanece visível para preservar contexto. O canvas usa agrupamento por função e evita transformar toda informação em cartões independentes.

O ritmo parte de 4px e usa somente 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 e 80px. A densidade Aerada aplica linhas de 56px, padding horizontal de 20px, vertical de 16px e intervalo de 24px nas listas operacionais. Controles continuam compactos: botões e inputs têm 36px, badges 22px e navegação lateral usa linhas de 36–40px.

Em telas abaixo de 768px, preserve a linha de 56px, reduza intervalos para 12px e padding horizontal para 16px. O celular prioriza consulta. A operação completa pertence ao desktop e tablet. A partir de 1024px, painéis contextuais podem compartilhar o canvas com a área principal.

## Elevation & Depth

O AceleraOS usa uma filosofia **elevada e disciplinada**. Cartões, painéis e superfícies interativas podem ganhar profundidade perceptível, mas a sombra sempre acompanha uma razão funcional: separar camadas, mostrar interatividade ou preservar foco. Bordas quentes e mudança tonal continuam definindo a estrutura; sombras usam tinta quente translúcida, nunca preto puro.

### Shadow Vocabulary

- **Hover** (`0 1px 2px 0 rgba(20,18,14,0.04)`): cartões interativos e controles que se levantam 1px.
- **Floating** (`0 4px 12px -2px rgba(20,18,14,0.06), 0 2px 4px -1px rgba(20,18,14,0.04)`): menus, popovers e toasts.
- **Overlay** (`0 12px 32px -6px rgba(20,18,14,0.10), 0 4px 12px -2px rgba(20,18,14,0.06)`): modais, sheets e painéis sobrepostos.
- **Dark Highlight** (`inset 0 1px 0 0 rgba(255,255,255,0.04)`): separação sutil em superfícies escuras.

### Named Rules

**The Earned Elevation Rule.** Toda sombra deve explicar uma camada, uma interação ou uma mudança de foco. Elevação sem função vira ruído.

## Shapes

Os cantos combinam precisão técnica com suavidade orgânica. Controles usam 4px; cartões de lista e balões usam 8px; painéis maiores usam 12px; modais e sheets usam 16px. Avatares, indicadores e badges usam formato circular ou pill. Tabelas densas podem usar raio zero.

Bordas padrão têm 1px. O foco visível usa contorno de 2px em Sálvia Operacional com offset de 2px. O raio cresce com a hierarquia: um botão deve parecer mais preciso que o cartão que o contém.

## Components

### Buttons

Controles técnicos, compactos e inequívocos.

- **Shape:** 4px de raio, 36px de altura e padding horizontal de 16px.
- **Primary:** Sálvia Operacional com texto branco; apenas uma ação principal por contexto, sempre que possível.
- **Hover / Focus:** hover em `#506d48`, estado pressionado em `#41573b` com deslocamento vertical de 1px; foco de 2px com offset de 2px.
- **Secondary:** camada greige com texto principal e borda quente.
- **Ghost / Link:** fundo transparente; ghost serve a toolbars e ícones, link usa sálvia para navegação textual.
- **Destructive:** Erro Terracota com texto branco e rótulo explícito da consequência.

### Chips and Badges

- **Style:** formato pill, 22px de altura, texto de 12px e até dois badges adjacentes.
- **State:** fundo semântico com baixa opacidade, texto e ícone na cor do estado. Nunca dependa somente da cor.
- **Tabs:** usam sublinhado de 2px; não use aba ativa em formato pill.

### Cards / Containers

- **Corner Style:** 8px em itens e kanban; 12px em painéis maiores.
- **Background:** superfície branca ou superfície escura equivalente.
- **Shadow Strategy:** cartões de dados podem manter sombra discreta; interativos elevam 1px, reforçam a borda em sálvia e usam sombra Hover.
- **Border:** 1px em Borda Quente.
- **Internal Padding:** 20px em cartões Aerada; 12px em cartões menores de kanban.

### Inputs / Fields

- **Style:** 36px de altura, raio de 4px, fundo da tela e borda de 1px.
- **Focus:** borda em sálvia e halo de 3px em Névoa de Sálvia.
- **Error / Disabled:** erro usa Terracota; desabilitado usa opacidade 55% e cursor não permitido.
- **Grouping:** 20px entre campos e 32px entre grupos.

### Navigation

A sidebar usa greige, nunca um bloco inteiro de sálvia. Cada item mede 36–40px; hover e seleção usam Névoa de Sálvia, e o estado ativo usa texto em Sálvia Operacional. A topbar de 56px preserva contexto com fundo sólido ou levemente translúcido. Ícones usam Phosphor em peso duotone.

### Operational Rows

Linhas de Inbox, contatos e tarefas têm no mínimo 56px, leitura da esquerda para a direita e metadados alinhados à direita. O conteúdo principal usa Atkinson; horários, IDs e valores podem usar numerais tabulares ou IBM Plex Mono. Seleção usa Névoa de Sálvia sem comprometer o contraste.

### Message Bubbles

Mensagens recebidas usam a camada greige; mensagens enviadas usam Sálvia Operacional. Ambas têm raio de 12px e um canto inferior de 4px indicando direção. A largura máxima é 70% da conversa.

## Do's and Don'ts

### Do:

- **Do** use Sálvia Operacional para ações, seleção, foco e estado — sempre com parcimônia.
- **Do** combine borda, ícone e label com a cor ao comunicar um estado.
- **Do** preserve a hierarquia Aerada nas listas e controles compactos nos formulários.
- **Do** use Phosphor duotone e Atkinson Hyperlegible como elementos reconhecíveis da interface.
- **Do** use elevação para separar cartões, painéis, menus e modais com uma função clara.
- **Do** escreva em PT-BR claro, direto, calmo e sem comemoração artificial.

### Don't:

- **Don't** use gradientes roxos ou azuis, Inter, Geist, Lucide ou grades de cartões estatísticos repetitivos.
- **Don't** transforme a sidebar ou uma grande área da tela em um bloco de sálvia.
- **Don't** use glassmorphism, preto puro, cinzas frios ou sombras pretas pesadas.
- **Don't** use emojis, brilho de IA, exclamações rotineiras ou animações decorativas.
- **Don't** aninhe cartões, abra um modal dentro de outro ou use mais de uma ação principal concorrente.
- **Don't** centralize dados operacionais; preserve o fluxo de leitura à esquerda e metadados à direita.
