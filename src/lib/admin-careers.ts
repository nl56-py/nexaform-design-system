import { supabase } from "@/integrations/supabase/client";
import type { JobPositionRecord, JobApplicationRecord } from "@/lib/careers";
import { toSupabaseError } from "@/lib/supabase-errors";

// ─── Positions ──────────────────────────────────────────

export const listAdminPositions = async () => {
  const { data, error } = await supabase
    .from("job_positions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw toSupabaseError(error, "Failed to load job positions.");
  }

  return (data ?? []) as JobPositionRecord[];
};

export const createAdminPosition = async (
  position: Omit<JobPositionRecord, "id" | "created_at" | "updated_at">,
) => {
  const { data, error } = await supabase
    .from("job_positions")
    .insert(position)
    .select("*")
    .single();

  if (error) {
    throw toSupabaseError(error, "Failed to create position.");
  }

  return data as JobPositionRecord;
};

export const updateAdminPosition = async (
  id: string,
  updates: Partial<Omit<JobPositionRecord, "id" | "created_at">>,
) => {
  const { data, error } = await supabase
    .from("job_positions")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw toSupabaseError(error, "Failed to update position.");
  }

  return data as JobPositionRecord;
};

export const deleteAdminPosition = async (id: string) => {
  const { error } = await supabase
    .from("job_positions")
    .delete()
    .eq("id", id);

  if (error) {
    throw toSupabaseError(error, "Failed to delete position.");
  }
};

// ─── Applications ───────────────────────────────────────

export const listAdminApplications = async () => {
  const { data, error } = await supabase
    .from("job_applications")
    .select("*, job_positions(title, department)")
    .order("created_at", { ascending: false });

  if (error) {
    throw toSupabaseError(error, "Failed to load job applications.");
  }

  return (data ?? []) as (JobApplicationRecord & {
    job_positions: { title: string; department: string } | null;
  })[];
};

export const listAdminApplicationsForPosition = async (positionId: string) => {
  const { data, error } = await supabase
    .from("job_applications")
    .select("*")
    .eq("position_id", positionId)
    .order("created_at", { ascending: false });

  if (error) {
    throw toSupabaseError(error, "Failed to load applications for this position.");
  }

  return (data ?? []) as JobApplicationRecord[];
};

export const updateAdminApplicationStatus = async (id: string, status: string) => {
  const { data, error } = await supabase
    .from("job_applications")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw toSupabaseError(error, "Failed to update application status.");
  }

  return data as JobApplicationRecord;
};

export const updateAdminApplicationNotes = async (id: string, admin_notes: string) => {
  const { data, error } = await supabase
    .from("job_applications")
    .update({ admin_notes, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw toSupabaseError(error, "Failed to update application notes.");
  }

  return data as JobApplicationRecord;
};
