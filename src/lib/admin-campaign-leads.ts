import { supabase } from "@/integrations/supabase/client";
import type {
  DigitalFairnessBookingRecord,
  FreeAuditRequestRecord,
} from "@/lib/campaign-leads";
import { toSupabaseError } from "@/lib/supabase-errors";

export const listAdminDigitalFairnessBookings = async () => {
  const { data, error } = await supabase
    .from("digital_fairness_bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw toSupabaseError(error, "Failed to load Digital Fairness bookings.");
  }

  return (data ?? []) as DigitalFairnessBookingRecord[];
};

export const updateAdminDigitalFairnessBookingStatus = async (id: string, status: string) => {
  const { data, error } = await supabase
    .from("digital_fairness_bookings")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw toSupabaseError(error, "Failed to update the campaign booking.");
  }

  return data as DigitalFairnessBookingRecord;
};

export const listAdminFreeAuditRequests = async () => {
  const { data, error } = await supabase
    .from("free_audit_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw toSupabaseError(error, "Failed to load free audit requests.");
  }

  return (data ?? []) as FreeAuditRequestRecord[];
};

export const updateAdminFreeAuditRequestStatus = async (id: string, status: string) => {
  const { data, error } = await supabase
    .from("free_audit_requests")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw toSupabaseError(error, "Failed to update the free audit request.");
  }

  return data as FreeAuditRequestRecord;
};
