import type { BroadcastMessage } from "./provider";

export type BroadcastCampaignStatus = "draft" | "scheduled" | "running" | "paused" | "completed" | "cancelled";
export type BroadcastContact = { id: string; phone: string; variables: Record<string, string>; optedIn: boolean };
export type BroadcastCampaign = {
  id: string;
  status: BroadcastCampaignStatus;
  template: string;
  approvedTemplate: boolean;
  ratePerSecond: number;
  blockedPhones: ReadonlySet<string>;
};
export type Rejection = { contactId: string; reason: "blocked" | "opted_out" | "template_not_approved" | `missing_variable:${string}` | "campaign_not_running" };
export type BroadcastPlan = { messages: BroadcastMessage[]; rejected: Rejection[]; ratePerSecond: number };

function variablesIn(template: string): string[] {
  return [...template.matchAll(/\{\{\s*([\w.-]+)\s*\}\}/g)].map((match) => match[1]!).filter((value, index, all) => all.indexOf(value) === index);
}
function render(template: string, variables: Record<string, string>): string {
  return template.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (_, name: string) => variables[name] ?? "");
}

export function buildBroadcastPlan(campaign: BroadcastCampaign, contacts: readonly BroadcastContact[]): BroadcastPlan {
  if (!campaign.approvedTemplate) return { messages: [], rejected: [{ contactId: "*", reason: "template_not_approved" }], ratePerSecond: campaign.ratePerSecond };
  if (campaign.status !== "running") return { messages: [], rejected: contacts.map((contact) => ({ contactId: contact.id, reason: "campaign_not_running" })), ratePerSecond: campaign.ratePerSecond };
  const required = variablesIn(campaign.template);
  const messages: BroadcastMessage[] = [];
  const rejected: Rejection[] = [];
  for (const contact of contacts) {
    if (!contact.optedIn) { rejected.push({ contactId: contact.id, reason: "opted_out" }); continue; }
    if (campaign.blockedPhones.has(contact.phone)) { rejected.push({ contactId: contact.id, reason: "blocked" }); continue; }
    const missing = required.find((name) => !contact.variables[name]?.trim());
    if (missing) { rejected.push({ contactId: contact.id, reason: `missing_variable:${missing}` }); continue; }
    messages.push({ id: `${campaign.id}:${contact.id}`, campaignId: campaign.id, contactId: contact.id, to: contact.phone, body: render(campaign.template, contact.variables) });
  }
  return { messages, rejected, ratePerSecond: Math.max(0.1, campaign.ratePerSecond) };
}
