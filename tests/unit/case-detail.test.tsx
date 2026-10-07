import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import type * as UseCasesModule from "@/hooks/ai/useCases";

const useCaseMock = vi.fn();
vi.mock("@/hooks/ai/useCases", async () => {
  const actual = await vi.importActual<typeof UseCasesModule>("@/hooks/ai/useCases");
  return { ...actual, useCase: (...args: unknown[]) => useCaseMock(...args) };
});

import { CaseDetail } from "@/app/app/ai/cases/_components/CaseDetail";

function wrap(ui: React.ReactNode) {
  return <QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>;
}

const BASE_CASE = {
  id: "case-1",
  title: "Cliente pede desconto acima do permitido",
  summary: "Quer 30% de desconto num pedido de R$500",
  blocker: "Desconto fora da política (máximo 10%)",
  status: "awaiting_human" as const,
  source: "agent" as const,
  opened_at: "2026-07-20T10:00:00.000Z",
  closed_at: null,
  conversation_id: "conv-1",
  contact_name: "Maria Silva",
  contact_phone: "+5511999990000",
  events: [
    {
      id: "ev-1",
      kind: "opened" as const,
      actor_kind: "agent" as const,
      actor_user_id: null,
      human_action: null,
      body: null,
      created_at: "2026-07-20T10:00:00.000Z",
    },
    {
      id: "ev-2",
      kind: "lead_asked" as const,
      actor_kind: "human" as const,
      actor_user_id: "u-1",
      human_action: "need_lead_info" as const,
      body: "Qual seu CPF?",
      created_at: "2026-07-20T10:05:00.000Z",
    },
  ],
};

describe("CaseDetail", () => {
  it("estado vazio quando nenhum caso selecionado", () => {
    useCaseMock.mockReturnValue({ isLoading: false, data: undefined });
    render(wrap(<CaseDetail caseId={null} />));
    expect(screen.getByText("Selecione um caso à esquerda")).toBeInTheDocument();
  });

  it("mostra summary/blocker rotulados e traduz pelo menos 2 kinds da timeline pra pt-br", () => {
    useCaseMock.mockReturnValue({ isLoading: false, data: BASE_CASE });
    render(wrap(<CaseDetail caseId="case-1" />));

    expect(screen.getByText("O que o cliente precisa")).toBeInTheDocument();
    expect(screen.getByText(BASE_CASE.summary)).toBeInTheDocument();
    expect(screen.getByText("Por que a IA travou")).toBeInTheDocument();
    expect(screen.getByText(BASE_CASE.blocker)).toBeInTheDocument();

    // 'opened' traduzido — nunca o enum cru.
    expect(screen.getByText("A IA abriu o caso")).toBeInTheDocument();
    // 'lead_asked' traduzido.
    expect(screen.getByText("A IA perguntou ao cliente")).toBeInTheDocument();
    expect(screen.queryByText("opened")).not.toBeInTheDocument();
    expect(screen.queryByText("lead_asked")).not.toBeInTheDocument();
  });

  it("sinaliza discretamente quando o caso veio do guardrail automático", () => {
    useCaseMock.mockReturnValue({
      isLoading: false,
      data: { ...BASE_CASE, source: "guardrail_autofallback" as const },
    });
    render(wrap(<CaseDetail caseId="case-1" />));
    expect(screen.getByText("Aberto automaticamente")).toBeInTheDocument();
  });
});
