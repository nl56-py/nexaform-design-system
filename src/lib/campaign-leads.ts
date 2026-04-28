import type { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { toSupabaseError } from "@/lib/supabase-errors";

export type DigitalFairnessBookingRecord = Tables<"digital_fairness_bookings">;
export type FreeAuditRequestRecord = Tables<"free_audit_requests">;

export type DigitalFairnessBookingInput = {
  businessCategory: string;
  domainSupport?: string;
  email: string;
  name: string;
  organization?: string;
  phone: string;
  preferredTimeline?: string;
  servicesDescription: string;
};

export type FreeAuditRequestInput = {
  businessCategory: string;
  businessName: string;
  contactNumber: string;
  email: string;
  name: string;
  notes?: string;
  primaryGoal?: string;
  serviceArea?: string;
  services: string;
  websiteUrl: string;
};

const sanitizeText = (value: unknown, maxLength: number, required = false) => {
  if (typeof value !== "string") {
    return required ? null : null;
  }

  const trimmed = value.trim().replace(/\s+/g, " ").slice(0, maxLength);

  if (required && !trimmed) {
    return null;
  }

  return trimmed || null;
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isValidPhone = (value: string) => /^[0-9+\-\s()]{7,24}$/.test(value);

const normalizeWebsiteUrl = (value: string) => {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;

  try {
    const url = new URL(withProtocol);

    if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".")) {
      return null;
    }

    return url.toString().slice(0, 2000);
  } catch {
    return null;
  }
};

export const submitDigitalFairnessBooking = async (input: DigitalFairnessBookingInput) => {
  const name = sanitizeText(input.name, 120, true);
  const email = sanitizeText(input.email, 255, true)?.toLowerCase();
  const phone = sanitizeText(input.phone, 32, true);
  const organization = sanitizeText(input.organization, 160);
  const businessCategory = sanitizeText(input.businessCategory, 120, true);
  const domainSupport = sanitizeText(input.domainSupport, 120);
  const preferredTimeline = sanitizeText(input.preferredTimeline, 120);
  const servicesDescription = sanitizeText(input.servicesDescription, 4000, true);

  if (!name || !email || !phone || !businessCategory || !servicesDescription) {
    throw new Error("Name, email, phone, category, and services description are required.");
  }

  if (!isValidEmail(email)) {
    throw new Error("Valid email is required.");
  }

  if (!isValidPhone(phone)) {
    throw new Error("Valid contact number is required.");
  }

  const { error } = await supabase.from("digital_fairness_bookings").insert({
    name,
    email,
    phone,
    organization,
    business_category: businessCategory,
    domain_support: domainSupport,
    preferred_timeline: preferredTimeline,
    services_description: servicesDescription,
    source_path: "/digital-fairness-campaign",
    status: "new",
  });

  if (error) {
    throw toSupabaseError(error, "Failed to submit campaign booking.");
  }
};

export const submitFreeAuditRequest = async (input: FreeAuditRequestInput) => {
  const name = sanitizeText(input.name, 120, true);
  const businessName = sanitizeText(input.businessName, 180, true);
  const businessCategory = sanitizeText(input.businessCategory, 120, true);
  const services = sanitizeText(input.services, 4000, true);
  const rawWebsiteUrl = sanitizeText(input.websiteUrl, 2000, true);
  const contactNumber = sanitizeText(input.contactNumber, 32, true);
  const email = sanitizeText(input.email, 255, true)?.toLowerCase();
  const serviceArea = sanitizeText(input.serviceArea, 180);
  const primaryGoal = sanitizeText(input.primaryGoal, 180);
  const notes = sanitizeText(input.notes, 4000);

  if (!name || !businessName || !businessCategory || !services || !rawWebsiteUrl || !contactNumber || !email) {
    throw new Error("Name, business name, category, services, website URL, contact number, and email are required.");
  }

  if (!isValidEmail(email)) {
    throw new Error("Valid email is required.");
  }

  if (!isValidPhone(contactNumber)) {
    throw new Error("Valid contact number is required.");
  }

  const websiteUrl = normalizeWebsiteUrl(rawWebsiteUrl);

  if (!websiteUrl) {
    throw new Error("Valid website URL is required.");
  }

  const { error } = await supabase.from("free_audit_requests").insert({
    name,
    business_name: businessName,
    business_category: businessCategory,
    services,
    website_url: websiteUrl,
    contact_number: contactNumber,
    email,
    service_area: serviceArea,
    primary_goal: primaryGoal,
    notes,
    source_path: "/free-audit",
    status: "new",
  });

  if (error) {
    throw toSupabaseError(error, "Failed to submit free audit request.");
  }
};
