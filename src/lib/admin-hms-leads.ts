import { supabase } from "@/integrations/supabase/client";
import { hmsLeadsSeed, type HmsLeadRecord } from "@/data/hms-leads-seed";
import { toSupabaseError } from "@/lib/supabase-errors";

const LOCAL_STORAGE_KEY = "nexaform_admin_hms_leads_cache_v1";

export type { HmsLeadRecord };

export type HmsLeadStatus =
  | "new"
  | "contacted"
  | "interested"
  | "demo_scheduled"
  | "negotiating"
  | "converted"
  | "not_interested"
  | "archived";

export type HmsLeadPriority = "low" | "medium" | "high" | "urgent";

export interface HmsLeadsResponse {
  leads: HmsLeadRecord[];
  isFallback: boolean;
  totalCount: number;
}

const getLocalCachedLeads = (): HmsLeadRecord[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Failed to read HMS leads from localStorage", err);
  }
  return hmsLeadsSeed;
};

const saveLocalCachedLeads = (leads: HmsLeadRecord[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads));
  } catch (err) {
    console.warn("Failed to save HMS leads to localStorage", err);
  }
};

export const listAdminHmsLeads = async (): Promise<HmsLeadsResponse> => {
  try {
    const { data, error } = await supabase
      .from("hms_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      // Table might not exist yet if user hasn't executed the SQL migration
      console.info("Supabase hms_leads table not available or error occurred, using bundled seed data:", error.message);
      const cached = getLocalCachedLeads();
      return {
        leads: cached,
        isFallback: true,
        totalCount: cached.length,
      };
    }

    const leads = (data ?? []) as unknown as HmsLeadRecord[];
    // If Supabase returned rows, keep localStorage updated as well
    if (leads.length > 0) {
      saveLocalCachedLeads(leads);
      return {
        leads,
        isFallback: false,
        totalCount: leads.length,
      };
    }

    // If Supabase returned empty (e.g. table created but not yet seeded), return seeded leads
    const cached = getLocalCachedLeads();
    return {
      leads: cached,
      isFallback: true,
      totalCount: cached.length,
    };
  } catch (err) {
    console.warn("Error calling Supabase hms_leads:", err);
    const cached = getLocalCachedLeads();
    return {
      leads: cached,
      isFallback: true,
      totalCount: cached.length,
    };
  }
};

export const updateAdminHmsLead = async (
  id: string,
  updates: Partial<HmsLeadRecord>
): Promise<HmsLeadRecord> => {
  const updatedPayload = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  // 1. Try Supabase
  let remoteSuccess = false;
  let remoteResult: HmsLeadRecord | null = null;
  try {
    const { data, error } = await supabase
      .from("hms_leads")
      .update(updatedPayload as any)
      .eq("id", id)
      .select("*")
      .single();

    if (!error && data) {
      remoteSuccess = true;
      remoteResult = data as unknown as HmsLeadRecord;
    }
  } catch (e) {
    // ignore, fall back to local update
  }

  // 2. Always sync local cache
  const cached = getLocalCachedLeads();
  const index = cached.findIndex((l) => l.id === id);
  let updatedRecord: HmsLeadRecord;

  if (index !== -1) {
    updatedRecord = {
      ...cached[index],
      ...updatedPayload,
    } as HmsLeadRecord;
    cached[index] = updatedRecord;
    saveLocalCachedLeads(cached);
  } else if (remoteResult) {
    updatedRecord = remoteResult;
    cached.unshift(updatedRecord);
    saveLocalCachedLeads(cached);
  } else {
    throw new Error(`Lead with ID ${id} not found.`);
  }

  return remoteResult || updatedRecord;
};

export const createAdminHmsLead = async (
  payload: Omit<HmsLeadRecord, "id" | "created_at" | "updated_at">
): Promise<HmsLeadRecord> => {
  const newLead: HmsLeadRecord = {
    ...payload,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from("hms_leads")
      .insert(newLead as any)
      .select("*")
      .single();

    if (!error && data) {
      const created = data as unknown as HmsLeadRecord;
      const cached = getLocalCachedLeads();
      cached.unshift(created);
      saveLocalCachedLeads(cached);
      return created;
    }
  } catch (e) {
    // fallback to local
  }

  const cached = getLocalCachedLeads();
  cached.unshift(newLead);
  saveLocalCachedLeads(cached);
  return newLead;
};

export const deleteAdminHmsLead = async (id: string): Promise<void> => {
  try {
    await supabase.from("hms_leads").delete().eq("id", id);
  } catch (e) {
    // ignore
  }

  const cached = getLocalCachedLeads();
  const filtered = cached.filter((l) => l.id !== id);
  saveLocalCachedLeads(filtered);
};
