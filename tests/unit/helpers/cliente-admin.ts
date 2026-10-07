/**
 * CLIENTE DE SERVIÇO — a maquinaria de varredura, num lugar só.
 *
 * Dois testes fazem perguntas diferentes sobre o MESMO fato: "de onde veio este
 * cliente?" (`escrita-em-organizations-usa-cliente-admin`, que cobra o cliente
 * admin em `organizations`) e "esta cadeia filtra o tenant?"
 * (`admin-client-exige-filtro-de-tenant`, que cobra o filtro no caminho que a
 * RLS NÃO vê). Os dois precisam da mesma coisa: resolver o identificador-raiz de
 * uma cadeia `x.from(...).eq(...)` e saber quais nomes, NAQUELE arquivo, vieram
 * de `createAdminClient()`.
 *
 * Resolver o identificador é o ponto, e não um detalhe de estilo: procurar a
 * string "createAdminClient" no arquivo inteiro daria verde para um handler que
 * tem o cliente admin numa função e o de sessão na outra — a forma exata do
 * defeito que os dois medem.
 *
 * ═══ A TERCEIRA PERGUNTA: E QUANDO O CLIENTE CHEGA POR PARÂMETRO? ═══
 *
 * `nomesDoClienteAdmin` só enxerga o cliente CRIADO no arquivo. Um módulo que o
 * recebe (`p.admin`, com `admin: ReturnType<typeof createAdminClient>`) some
 * dessa conta — e a cerca de `organizations` acusava escrita irregular num
 * arquivo correto (PR #1017). `caminhosDoClienteAdmin` responde essa pergunta, e
 * responde pelo **TIPO**: o que autoriza é a anotação resolvida no arquivo, nunca
 * a propriedade se chamar `admin`. Batizar de `admin` um cliente de sessão não
 * compra nada — é a diferença entre prova e senha.
 */
import ts from "typescript";

/**
 * O identificador-raiz de uma cadeia `x.from(...).eq(...)`; `null` quando a raiz
 * não é um nome (ex.: índice de array, chamada de outra coisa).
 *
 * `createAdminClient().from(...)` devolve `"createAdminClient"`: a fábrica
 * inline, sem variável pelo caminho.
 */
export function raizDaCadeia(no: ts.Expression): string | null {
  let atual: ts.Node = no;
  while (true) {
    if (ts.isIdentifier(atual)) return atual.text;
    if (ts.isCallExpression(atual)) {
      atual = atual.expression;
      continue;
    }
    if (ts.isPropertyAccessExpression(atual)) {
      atual = atual.expression;
      continue;
    }
    if (ts.isAwaitExpression(atual) || ts.isParenthesizedExpression(atual)) {
      atual = atual.expression;
      continue;
    }
    return null;
  }
}

/**
 * O CAMINHO escrito de uma cadeia — `"p.admin"` em `p.admin.from(...)`,
 * `"admin"` em `admin.from(...)`.
 *
 * Difere de `raizDaCadeia` em duas coisas, e as duas são o ponto: ela devolve só
 * a RAIZ (`"p"`, perdendo qual propriedade foi usada) e ATRAVESSA chamadas.
 * Aqui, chamada no meio do caminho devolve `null` — `f().admin` não é um caminho
 * nomeável, e um caminho que não é nomeável não pode ser conferido contra a
 * anotação de tipo de um parâmetro. `this.x`, índice de array e desestruturação
 * no meio caem no mesmo `null`.
 *
 * As duas convivem: a raiz basta para o cliente criado no arquivo (o nome é o
 * cliente); o caminho é o que permite perguntar "esta PROPRIEDADE é o cliente
 * admin?".
 */
export function caminhoDaCadeia(no: ts.Expression): string | null {
  const partes: string[] = [];
  let atual: ts.Node = no;
  for (;;) {
    if (ts.isIdentifier(atual)) {
      partes.push(atual.text);
      return partes.reverse().join(".");
    }
    if (ts.isPropertyAccessExpression(atual)) {
      partes.push(atual.name.text);
      atual = atual.expression;
      continue;
    }
    if (ts.isParenthesizedExpression(atual)) {
      atual = atual.expression;
      continue;
    }
    return null;
  }
}

/**
 * Os nomes que, NAQUELE arquivo, foram declarados a partir de
 * `createAdminClient()` — `const admin = await createAdminClient()`.
 */
export function nomesDoClienteAdmin(fonte: ts.SourceFile): Set<string> {
  const nomes = new Set<string>();
  const visitar = (no: ts.Node): void => {
    if (ts.isVariableDeclaration(no) && no.initializer && ts.isIdentifier(no.name)) {
      let init: ts.Node = no.initializer;
      if (ts.isAwaitExpression(init)) init = init.expression;
      if (
        ts.isCallExpression(init) &&
        ts.isIdentifier(init.expression) &&
        init.expression.text === "createAdminClient"
      ) {
        nomes.add(no.name.text);
      }
    }
    ts.forEachChild(no, visitar);
  };
  visitar(fonte);
  return nomes;
}

/** O módulo que exporta a fábrica, e o nome exportado. */
const MODULO_DA_FABRICA = "supabase/admin";
const NOME_EXPORTADO_DA_FABRICA = "createAdminClient";

/**
 * O nome LOCAL ligado à fábrica do cliente admin naquele arquivo — normalmente
 * `createAdminClient`, mas `import { createAdminClient as servico }` também
 * conta. `null` quando o arquivo não importa a fábrica de `lib/supabase/admin`.
 *
 * É daqui que sai a ancoragem da prova de tipo: sem o vínculo com ESTE módulo,
 * `ReturnType<typeof createAdminClient>` seria só um texto que qualquer arquivo
 * poderia escrever declarando uma função homônima.
 */
function nomeLocalDaFabrica(fonte: ts.SourceFile): string | null {
  let local: string | null = null;
  for (const decl of fonte.statements) {
    if (!ts.isImportDeclaration(decl) || !ts.isStringLiteral(decl.moduleSpecifier)) continue;
    if (!decl.moduleSpecifier.text.endsWith(MODULO_DA_FABRICA)) continue;
    const ligacoes = decl.importClause?.namedBindings;
    if (ligacoes === undefined || !ts.isNamedImports(ligacoes)) continue;
    for (const elemento of ligacoes.elements) {
      const exportado = elemento.propertyName?.text ?? elemento.name.text;
      if (exportado === NOME_EXPORTADO_DA_FABRICA) local = elemento.name.text;
    }
  }
  return local;
}

/** O que o arquivo declara de tipo, para resolver `admin: Admin` sem compilador. */
interface EscopoDeTipos {
  readonly fabrica: string;
  readonly aliases: ReadonlyMap<string, ts.TypeNode>;
  readonly interfaces: ReadonlyMap<string, ts.NodeArray<ts.TypeElement>>;
}

function escopoDeTipos(fonte: ts.SourceFile, fabrica: string): EscopoDeTipos {
  const aliases = new Map<string, ts.TypeNode>();
  const interfaces = new Map<string, ts.NodeArray<ts.TypeElement>>();
  const visitar = (no: ts.Node): void => {
    if (ts.isTypeAliasDeclaration(no)) aliases.set(no.name.text, no.type);
    if (ts.isInterfaceDeclaration(no)) interfaces.set(no.name.text, no.members);
    ts.forEachChild(no, visitar);
  };
  visitar(fonte);
  return { fabrica, aliases, interfaces };
}

/**
 * True quando a anotação É o tipo do cliente admin:
 * `ReturnType<typeof <fábrica>>`, direto ou por um `type` local que resolva
 * nisso (`type Admin = ReturnType<typeof createAdminClient>`, o padrão de
 * `lib/channels/pos-entrada.ts` e `lib/waha/ingest.ts`).
 *
 * `vistos` impede laço em alias mutuamente recursivo, que o `tsc` recusaria mas
 * esta varredura leria sem parar.
 */
function ehTipoDoClienteAdmin(
  tipo: ts.TypeNode,
  escopo: EscopoDeTipos,
  vistos: ReadonlySet<string> = new Set(),
): boolean {
  if (!ts.isTypeReferenceNode(tipo) || !ts.isIdentifier(tipo.typeName)) return false;
  const nome = tipo.typeName.text;
  if (nome === "ReturnType") {
    const argumentos = tipo.typeArguments;
    if (argumentos === undefined || argumentos.length !== 1) return false;
    const unico = argumentos[0];
    return (
      unico !== undefined &&
      ts.isTypeQueryNode(unico) &&
      ts.isIdentifier(unico.exprName) &&
      unico.exprName.text === escopo.fabrica
    );
  }
  if (vistos.has(nome)) return false;
  const alias = escopo.aliases.get(nome);
  if (alias === undefined) return false;
  return ehTipoDoClienteAdmin(alias, escopo, new Set([...vistos, nome]));
}

/**
 * As PROPRIEDADES tipadas como cliente admin de um tipo de objeto — o membro
 * `admin` de `interface PedidoDePadrao { admin: ReturnType<typeof createAdminClient> }`.
 *
 * Aceita o tipo literal inline, a `interface` local e o `type` local que resolve
 * num dos dois. Herança (`extends`) NÃO é seguida: seguir tipo de outro arquivo
 * é a varredura seguinte, e o silêncio aqui erra para o lado da cerca (a escrita
 * fica acusada, não liberada).
 */
function propriedadesDoClienteAdmin(
  tipo: ts.TypeNode,
  escopo: EscopoDeTipos,
  vistos: ReadonlySet<string> = new Set(),
): Set<string> {
  const doMembro = (membros: ts.NodeArray<ts.TypeElement>): Set<string> => {
    const nomes = new Set<string>();
    for (const membro of membros) {
      if (
        ts.isPropertySignature(membro) &&
        membro.type !== undefined &&
        ts.isIdentifier(membro.name) &&
        ehTipoDoClienteAdmin(membro.type, escopo)
      ) {
        nomes.add(membro.name.text);
      }
    }
    return nomes;
  };

  if (ts.isTypeLiteralNode(tipo)) return doMembro(tipo.members);
  if (ts.isTypeReferenceNode(tipo) && ts.isIdentifier(tipo.typeName)) {
    const nome = tipo.typeName.text;
    if (vistos.has(nome)) return new Set();
    const membros = escopo.interfaces.get(nome);
    if (membros !== undefined) return doMembro(membros);
    const alias = escopo.aliases.get(nome);
    if (alias !== undefined) {
      return propriedadesDoClienteAdmin(alias, escopo, new Set([...vistos, nome]));
    }
  }
  return new Set();
}

/**
 * Os CAMINHOS que, NAQUELE arquivo, chegam ao cliente admin por PARÂMETRO —
 * `"p.admin"` para `definirPadraoDeIaDaOrganizacao(p: PedidoDePadrao)`,
 * `"admin"` para `f(admin: ReturnType<typeof createAdminClient>)` e para
 * `f({ admin }: { admin: ReturnType<typeof createAdminClient> })`.
 *
 * ═══ A PROVA É DE TIPO, NUNCA DE NOME ═══
 *
 * Só entra aqui o parâmetro cuja ANOTAÇÃO resolve em
 * `ReturnType<typeof <fábrica importada de lib/supabase/admin>>`. Aceitar
 * qualquer `x.admin` seria dar à cerca uma senha em vez de uma prova: bastaria
 * batizar de `admin` um parâmetro tipado com o cliente de SESSÃO (ou não tipar
 * nada) para escrever em `organizations` por baixo dela — e o modo de falha que
 * a cerca existe para pegar devolve SUCESSO com zero linhas, então ninguém
 * descobriria pelo sintoma.
 *
 * ═══ POR QUE SÓ PARÂMETRO ═══
 *
 * Variável anotada (`const admin: Admin = ...`) fica de fora de propósito. O
 * cliente criado no arquivo já é medido por `nomesDoClienteAdmin`, que lê a
 * ORIGEM (`createAdminClient()`); aceitar a anotação de uma variável trocaria
 * essa origem por uma promessa que um cast desfaz em silêncio. Parâmetro não tem
 * essa saída: quem o preenche está em outro arquivo, e lá a anotação é o
 * contrato que o `tsc` cobra.
 */
export function caminhosDoClienteAdmin(fonte: ts.SourceFile): Set<string> {
  const fabrica = nomeLocalDaFabrica(fonte);
  if (fabrica === null) return new Set();
  const escopo = escopoDeTipos(fonte, fabrica);
  const caminhos = new Set<string>();

  const visitar = (no: ts.Node): void => {
    if (ts.isParameter(no) && no.type !== undefined) {
      if (ts.isIdentifier(no.name)) {
        if (ehTipoDoClienteAdmin(no.type, escopo)) {
          caminhos.add(no.name.text);
        } else {
          for (const propriedade of propriedadesDoClienteAdmin(no.type, escopo)) {
            caminhos.add(`${no.name.text}.${propriedade}`);
          }
        }
      } else if (ts.isObjectBindingPattern(no.name)) {
        const admins = propriedadesDoClienteAdmin(no.type, escopo);
        for (const elemento of no.name.elements) {
          const origem = elemento.propertyName ?? elemento.name;
          if (
            ts.isIdentifier(origem) &&
            admins.has(origem.text) &&
            ts.isIdentifier(elemento.name)
          ) {
            caminhos.add(elemento.name.text);
          }
        }
      }
    }
    ts.forEachChild(no, visitar);
  };
  visitar(fonte);
  return caminhos;
}

/**
 * True quando a raiz da cadeia é cliente de SERVIÇO: nome declarado de
 * `createAdminClient()` naquele arquivo, ou a própria fábrica inline.
 *
 * O que fica de fora DESTA função, de propósito: cliente admin recebido por
 * PARÂMETRO (o caminho de `lib/mcp/server.ts`, que entrega o cliente de serviço
 * ao handler). Quem responde por ele é `caminhosDoClienteAdmin`, pela anotação
 * de tipo — e quem consome as duas respostas hoje é só a cerca de
 * `organizations`. Somar as duas aqui mudaria o conjunto de cadeias que
 * `admin-client-exige-filtro-de-tenant` mede, e esse é outro veredito: lá o
 * recorte do parâmetro está declarado no docstring do próprio teste.
 */
export function ehClienteDeServico(raiz: ts.Expression, admins: ReadonlySet<string>): boolean {
  const nome = raizDaCadeia(raiz);
  if (nome === null) return false;
  return nome === "createAdminClient" || admins.has(nome);
}

/** Um passo da cadeia: o método chamado e a chamada que o aplica. */
export interface PassoDaCadeia {
  readonly metodo: string;
  readonly chamada: ts.CallExpression;
}

/**
 * Os passos `.metodo(...)` que CONTINUAM a cadeia a partir de `chamada`, de
 * dentro para fora: em `x.from("t").select("a").eq("b", c)`, a partir do
 * `from` devolve `select` e depois `eq`.
 *
 * Exige que a fonte tenha sido criada com `setParentNodes = true`.
 */
export function passosDaCadeia(chamada: ts.CallExpression): PassoDaCadeia[] {
  const passos: PassoDaCadeia[] = [];
  let atual: ts.Node = chamada;
  for (;;) {
    const acesso = atual.parent;
    if (acesso === undefined || !ts.isPropertyAccessExpression(acesso) || acesso.expression !== atual) {
      break;
    }
    const proxima = acesso.parent;
    if (proxima === undefined || !ts.isCallExpression(proxima) || proxima.expression !== acesso) {
      break;
    }
    passos.push({ metodo: acesso.name.text, chamada: proxima });
    atual = proxima;
  }
  return passos;
}
