/**
 * Pure trigger predicates for the 4 handoff gates (EPIC-06 wave 3).
 *
 *   G1 — checkG1(body)               — usuário pede humano (regex PT-BR).
 *   G3 — checkG3({ confidence, ... }) — bot inseguro (low confidence + uncertainty).
 *   G4 — checkG4Legal(body)          — termos jurídicos no inbound.
 *   G4 — checkG4Stage(leadId, org)   — lead está em stage `requires_human=true`.
 *
 * (G2 = low sentiment é consumido por `ai-handoff-from-sentiment.handler.ts`,
 *  já dispara via evento `ai.sentiment_alert` emitido pelo sentiment worker.)
 */

import { createAdminClient } from "@/lib/supabase/admin";
import { logger } from "@/lib/logger";
import {
  G1_REGEX,
  G4_LEGAL_REGEX,
  containsUncertaintyMarkers,
} from "@/lib/ai/handoff/regex";

export function checkG1(body: string): boolean {
  if (!body) return false;
  return G1_REGEX.test(body);
}

export function checkG4Legal(body: string): boolean {
  if (!body) return false;
  return G4_LEGAL_REGEX.test(body);
}

export interface CheckG3Input {
  confidence: number;
  outputText: string;
  threshold: number;
}

export function checkG3(input: CheckG3Input): boolean {
  const lowConfidence = Number.isFinite(input.confidence) && input.confidence < input.threshold;
  return lowConfidence || containsUncertaintyMarkers(input.outputText ?? "");
}

/**
 * G4 — verifica se o lead está numa stage configurada como `requires_human=true`.
 * Service-role bypassa RLS → filtro `organization_id` programático obrigatório.
 *
 * Retorna `false` se `leadId` for null ou em qualquer falha (handoff via stage
 * é best-effort — não derruba o pipeline).
 */
export async function checkG4Stage(
  leadId: string | null,
  organizationId: string,
): Promise<boolean> {
  if (!leadId) return false;
  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("crm_leads")
      .select("id, stage_id, organization_id, crm_stages:stage_id(requires_human, organization_id)")
      .eq("id", leadId)
      .eq("organization_id", organizationId)
      .maybeSingle();

    if (error || !data) return false;
    type LeadRow = {
      id: string;
      stage_id: string | null;
      organization_id: string;
      crm_stages:
        | { requires_human: boolean | null; organization_id: string }
        | { requires_human: boolean | null; organization_id: string }[]
        | null;
    };
    const row = data as unknown as LeadRow;
    const stage = Array.isArray(row.crm_stages) ? row.crm_stages[0] : row.crm_stages;
    if (!stage) return false;
    if (stage.organization_id !== organizationId) return false;
    return stage.requires_human === true;
  } catch (err) {
    logger.warn("[handoff-orchestrator] checkG4Stage failed", {
      lead_id: leadId,
      organization_id: organizationId,
      error: err instanceof Error ? err.message : String(err),
    });
    return false;
  }
}
