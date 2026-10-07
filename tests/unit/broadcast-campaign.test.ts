import { describe, expect, it } from "vitest";
import { buildBroadcastPlan, type BroadcastCampaign, type BroadcastContact } from "@/lib/broadcast/campaign";

describe("broadcast campaign planner", () => {
  const campaign: BroadcastCampaign = {
    id: "camp-1",
    status: "running",
    template: "Olá {{nome}}",
    approvedTemplate: true,
    ratePerSecond: 2,
    blockedPhones: new Set(["+5511888888888"]),
  };
  const contacts: BroadcastContact[] = [
    { id: "a", phone: "+5511999999999", variables: { nome: "Ana" }, optedIn: true },
    { id: "b", phone: "+5511888888888", variables: { nome: "Bia" }, optedIn: true },
    { id: "c", phone: "+5511777777777", variables: {}, optedIn: true },
    { id: "d", phone: "+5511666666666", variables: { nome: "Dani" }, optedIn: false },
  ];

  it("planeja somente contatos elegíveis e informa rejeições", () => {
    const result = buildBroadcastPlan(campaign, contacts);
    expect(result.messages).toEqual([
      { id: "camp-1:a", campaignId: "camp-1", contactId: "a", to: "+5511999999999", body: "Olá Ana" },
    ]);
    expect(result.rejected).toEqual([
      { contactId: "b", reason: "blocked" },
      { contactId: "c", reason: "missing_variable:nome" },
      { contactId: "d", reason: "opted_out" },
    ]);
  });

  it("não planeja campanha pausada nem template não aprovado", () => {
    expect(buildBroadcastPlan({ ...campaign, status: "paused" }, contacts).messages).toHaveLength(0);
    expect(buildBroadcastPlan({ ...campaign, approvedTemplate: false }, contacts).rejected[0]).toEqual({ contactId: "*", reason: "template_not_approved" });
  });
});
