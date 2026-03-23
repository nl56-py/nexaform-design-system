import { supabase } from "@/integrations/supabase/client";
import type { ContactSubmissionRecord } from "@/lib/contact-submissions";

export const listAdminContactSubmissions = async () => {
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message || "Failed to load contact submissions.");
  }

  return (data ?? []) as ContactSubmissionRecord[];
};

export const updateAdminContactSubmissionStatus = async (id: string, status: string) => {
  const { data, error } = await supabase
    .from("contact_submissions")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message || "Failed to update the contact submission.");
  }

  return data as ContactSubmissionRecord;
};
