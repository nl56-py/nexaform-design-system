import type { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { toSupabaseError } from "@/lib/supabase-errors";

export type JobPositionRecord = Tables<"job_positions">;
export type JobApplicationRecord = Tables<"job_applications">;

/** Fetch all published positions (public). */
export const listPublishedPositions = async () => {
  const { data, error } = await supabase
    .from("job_positions")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    throw toSupabaseError(error, "Failed to load open positions.");
  }

  return (data ?? []) as JobPositionRecord[];
};

/** Fetch a single published position by slug (public). */
export const getPublishedPosition = async (slug: string) => {
  const { data, error } = await supabase
    .from("job_positions")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    throw toSupabaseError(error, "Failed to load position details.");
  }

  return data as JobPositionRecord;
};

/** Upload a resume file to Supabase Storage. */
export const uploadResume = async (file: File) => {
  const ext = file.name.split(".").pop() ?? "pdf";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("resumes")
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) {
    throw toSupabaseError(error, "Failed to upload resume.");
  }

  const { data: publicUrlData } = supabase.storage
    .from("resumes")
    .getPublicUrl(path);

  return publicUrlData.publicUrl;
};

/** Submit a job application (public). */
export const submitJobApplication = async (
  application: Omit<JobApplicationRecord, "id" | "status" | "admin_notes" | "created_at" | "updated_at">,
) => {
  const { data, error } = await supabase
    .from("job_applications")
    .insert(application)
    .select("*")
    .single();

  if (error) {
    throw toSupabaseError(error, "Failed to submit your application.");
  }

  return data as JobApplicationRecord;
};
