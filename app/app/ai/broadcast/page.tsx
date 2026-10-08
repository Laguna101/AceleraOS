import Link from "next/link";
import { Card } from "@/components/ui/card";
import { requireAuth, resolveActiveOrg } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function BroadcastPage() {
  const user = await requireAuth();
  const org = await resolveActiveOrg(user);
  const canManage = org?.role === "admin" || org?.role === "manager";
  return (
    <div className="acelera-page flex h-full flex-col gap-6">
      <header>
        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Operação de vendas</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Disparo de mensagens</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Planeje contatos autorizados, valide templates e acompanhe follow-ups. O envio permanece em dry-run até um provedor oficial ser configurado.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4"><p className="text-xs text-muted-foreground">Estado do transporte</p><p className="mt-2 text-lg font-semibold">DRY-RUN</p><p className="mt-1 text-xs text-muted-foreground">Nenhuma mensagem real é enviada.</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Cadência padrão</p><p className="mt-2 text-lg font-semibold">D0 · D2 · D6</p><p className="mt-1 text-xs text-muted-foreground">Até 3 tentativas, pausa ao responder.</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Proteções</p><p className="mt-2 text-lg font-semibold">Opt-out + limite</p><p className="mt-1 text-xs text-muted-foreground">Bloqueio antes de cada envio.</p></Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5"><h2 className="font-semibold">Follow-ups</h2><p className="mt-1 text-sm text-muted-foreground">Configure os fluxos e veja a fila existente do CRM.</p><Link className="mt-4 inline-block text-sm font-medium underline" href="/app/ai/followups">Abrir Follow-ups</Link></Card>
        <Card className="p-5"><h2 className="font-semibold">Próxima etapa</h2><p className="mt-1 text-sm text-muted-foreground">Importar contatos, criar campanha e executar um dry-run com o provedor fake.</p>{canManage ? <p className="mt-4 text-xs text-muted-foreground">A integração com o provedor oficial será liberada após validação e aprovação dos templates.</p> : <p className="mt-4 text-xs text-muted-foreground">Somente gestores podem configurar campanhas.</p>}</Card>
      </div>
    </div>
  );
}

