import { describe, expect, it } from "vitest";
import { dispatchBroadcastPlan } from "@/lib/broadcast/queue";
import { FakeProvider } from "@/lib/broadcast/provider";

describe("broadcast queue", () => {
  it("processa em modo dry-run sem enviar e respeita o limite", async () => {
    const provider = new FakeProvider();
    const result = await dispatchBroadcastPlan({
      messages: [1, 2, 3].map((n) => ({ id: `m${n}`, campaignId: "c", contactId: `p${n}`, to: `+55119999999${n}`, body: "Oi" })),
      ratePerSecond: 2,
      dryRun: true,
      provider,
    });
    expect(result).toMatchObject({ attempted: 3, sent: 0, planned: 3, rejected: 0 });
    expect(result.slotsMs).toEqual([0, 500, 1000]);
    expect(provider.sent).toHaveLength(0);
  });

  it("é idempotente quando o provedor informa duplicata", async () => {
    const provider = new FakeProvider();
    const message = { id: "m1", campaignId: "c", contactId: "p1", to: "+5511999999999", body: "Oi" };
    await provider.send(message);
    const result = await dispatchBroadcastPlan({ messages: [message], ratePerSecond: 1, dryRun: false, provider });
    expect(result.duplicates).toBe(1);
    expect(result.sent).toBe(0);
  });
});
