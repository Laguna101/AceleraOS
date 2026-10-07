export type BroadcastMessage = {
  id: string;
  campaignId: string;
  contactId: string;
  to: string;
  body: string;
};

export type ProviderResult =
  | { status: "sent"; providerMessageId: string }
  | { status: "duplicate"; providerMessageId: string }
  | { status: "rejected"; reason: string };

export interface BroadcastProvider {
  send(message: BroadcastMessage): Promise<ProviderResult>;
  dryRun(messages: readonly BroadcastMessage[]): Promise<DryRunReport>;
}

export type DryRunReport = { total: number; accepted: number; rejected: number; messageIds: string[] };

function isE164(value: string): boolean {
  return /^\+[1-9]\d{7,14}$/.test(value);
}

/** Provedor local para testes e dry-run. Nunca faz chamada de rede. */
export class FakeProvider implements BroadcastProvider {
  readonly sent: BroadcastMessage[] = [];
  private readonly keys = new Set<string>();

  async send(message: BroadcastMessage): Promise<ProviderResult> {
    if (!isE164(message.to) || message.body.trim() === "") {
      return { status: "rejected", reason: "invalid_message" };
    }
    const key = `${message.campaignId}:${message.contactId}`;
    if (this.keys.has(key)) return { status: "duplicate", providerMessageId: `fake-${message.id}` };
    this.keys.add(key);
    this.sent.push(message);
    return { status: "sent", providerMessageId: `fake-${message.id}` };
  }

  async dryRun(messages: readonly BroadcastMessage[]): Promise<DryRunReport> {
    return runBroadcastDryRun(messages);
  }
}

export type WhatsAppCloudConfig = {
  accessToken: string;
  phoneNumberId: string;
  apiVersion?: string;
  dryRun?: boolean;
};

/**
 * Adaptador preparado para a Meta Cloud API. A implementação deliberadamente
 * não chama a rede: sem uma camada de aprovação/credenciais, retorna erro
 * explícito e mantém o pipeline seguro para desenvolvimento.
 */
export class WhatsAppCloudProvider implements BroadcastProvider {
  constructor(private readonly config: WhatsAppCloudConfig) {}

  async send(_message: BroadcastMessage): Promise<ProviderResult> {
    if (this.config.dryRun || !this.config.accessToken || !this.config.phoneNumberId) {
      return { status: "rejected", reason: "cloud_provider_not_configured" };
    }
    return { status: "rejected", reason: "real_transport_disabled" };
  }

  async dryRun(messages: readonly BroadcastMessage[]): Promise<DryRunReport> {
    return runBroadcastDryRun(messages);
  }
}

export async function runBroadcastDryRun(
  messages: readonly BroadcastMessage[],
): Promise<DryRunReport> {
  const valid = messages.filter((message) => isE164(message.to) && message.body.trim() !== "");
  return {
    total: messages.length,
    accepted: valid.length,
    rejected: messages.length - valid.length,
    messageIds: valid.map((message) => message.id),
  };
}


