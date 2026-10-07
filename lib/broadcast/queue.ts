import type { BroadcastMessage, BroadcastProvider } from "./provider";

export type DispatchInput = { messages: readonly BroadcastMessage[]; ratePerSecond: number; dryRun: boolean; provider: BroadcastProvider };
export type DispatchResult = { attempted: number; planned: number; sent: number; duplicates: number; rejected: number; slotsMs: number[] };

export async function dispatchBroadcastPlan(input: DispatchInput): Promise<DispatchResult> {
  const rate = Math.max(0.1, input.ratePerSecond);
  const interval = 1000 / rate;
  const result: DispatchResult = { attempted: input.messages.length, planned: input.messages.length, sent: 0, duplicates: 0, rejected: 0, slotsMs: [] };
  for (let index = 0; index < input.messages.length; index += 1) {
    const message = input.messages[index]!;
    result.slotsMs.push(Math.round(index * interval));
    if (input.dryRun) continue;
    const outcome = await input.provider.send(message);
    if (outcome.status === "sent") result.sent += 1;
    else if (outcome.status === "duplicate") result.duplicates += 1;
    else result.rejected += 1;
  }
  return result;
}
