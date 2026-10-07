import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

/**
 * Âncora EXTERNA do namespace das imagens (#616).
 *
 * `namespace-das-imagens.test.ts` garante que kit, compose, env e workflow
 * concordam entre si. Isso não basta contra uma troca coerente de todos eles:
 * um PR consegue editar todas essas fontes ao mesmo tempo.
 *
 * No GitHub Actions existe uma referência que não vem do checkout do PR:
 * `GITHUB_REPOSITORY_OWNER`. Em um PR contra o upstream ela vale `melgarafael`;
 * num fork que publica as próprias imagens, vale o dono daquele fork. Assim o
 * mesmo gate distingue os dois casos sem gravar o nome do dono dentro do teste.
 *
 * Fora do GitHub Actions a âncora externa não existe, então o caso vira no-op.
 * Os testes locais de consistência continuam cobrindo o restante do contrato e
 * um clone comum de fork não é obrigado a republicar imagens só para rodar
 * `pnpm test:unit`.
 */

const RAIZ = process.cwd();
const COMUM = fs.readFileSync(path.join(RAIZ, "hostgator-setup-kit/_common.sh"), "utf8");

function imgNs(): string {
  const m = COMUM.match(/^IMG_NS="([^"]+)"$/m);
  if (!m?.[1]) throw new Error("não achei IMG_NS em hostgator-setup-kit/_common.sh");
  return m[1];
}

function donoDoNamespace(namespace: string): string {
  const partes = namespace.split("/");
  if (partes.length !== 2 || !partes[1]) {
    throw new Error(`IMG_NS precisa ter forma <registry>/<dono>; recebido: ${namespace}`);
  }
  return partes[1];
}

function donoConfiavelDoRunner(): string | null {
  if (process.env.GITHUB_ACTIONS !== "true") return null;
  const dono = process.env.GITHUB_REPOSITORY_OWNER?.trim();
  if (!dono) {
    throw new Error(
      "GITHUB_ACTIONS=true sem GITHUB_REPOSITORY_OWNER: o gate perdeu a âncora externa do runner",
    );
  }
  return dono;
}

describe("o namespace das imagens é ancorado fora do diff do PR", () => {
  it("no GitHub Actions, IMG_NS pertence ao dono do repositório que executa o workflow", () => {
    const donoDoRunner = donoConfiavelDoRunner();
    if (donoDoRunner === null) return;

    // Minúsculas nos DOIS lados: o namespace de GHCR é obrigatoriamente minúsculo, e
    // `GITHUB_REPOSITORY_OWNER` devolve o login com a caixa original do dono. Sem isto, um
    // fork de dono `Founders-BR` que publique CORRETAMENTE em `ghcr.io/founders-br` fica
    // vermelho estando certo — e o gate passaria a reprovar fork legítimo, justamente o que
    // o #397 consertou de propósito.
    expect(
      donoDoNamespace(imgNs()).toLowerCase(),
      [
        `IMG_NS=${imgNs()} não pertence ao dono confiável deste workflow (${donoDoRunner}).`,
        "Num PR para o DeskcommCRM upstream, não troque o namespace das imagens do projeto.",
        "Num fork que publica imagens próprias, rode o CI no fork e aponte IMG_NS para o dono desse fork.",
        "E num fork que NÃO publica imagens, rodando o CI dele mesmo: este vermelho não pede troca de IMG_NS — é o gate medindo um cenário que não é o seu.",
      ].join(" "),
    ).toBe(donoDoRunner.toLowerCase());
  });
});
