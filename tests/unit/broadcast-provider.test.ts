import { describe, expect, it } from "vitest";
import { FakeProvider, WhatsAppCloudProvider, type BroadcastMessage } from "@/lib/broadcast/provider";

describe("broadcast provider", () => {
  const message: BroadcastMessage = { id: "m1", campaignId: "c1", contactId: "p1", to: "+5511999999999", body: "Oi" };
  it("faz dry-run sem chamar o provedor", async () => {
    const provider = new FakeProvider();
    const report = await provider.dryRun([message]);
    expect(report).toEqual({ total: 1, accepted: 1, rejected: 0, messageIds: ["m1"] });
    expect(provider.sent).toHaveLength(0);
  });
  it("deduplica mensagens do mesmo contato na mesma campanha", async () => {
    const provider = new FakeProvider();
    expect((await provider.send(message)).status).toBe("sent");
    expect((await provider.send({ ...message, id: "m2" })).status).toBe("duplicate");
    expect(provider.sent).toHaveLength(1);
  });
  it("recusa número inválido sem enviar", async () => {
    const provider = new FakeProvider();
    expect((await provider.send({ ...message, to: "11999999999" })).status).toBe("rejected");
    expect(provider.sent).toHaveLength(0);
  });
  it("mantém adaptador Cloud sem fazer chamada quando não está habilitado", async () => {
    const provider = new WhatsAppCloudProvider({ accessToken: "", phoneNumberId: "", dryRun: true });
    const result = await provider.send(message);
    expect(result.status).toBe("rejected");
    expect(result.reason).toBe("cloud_provider_not_configured");
  });
});
