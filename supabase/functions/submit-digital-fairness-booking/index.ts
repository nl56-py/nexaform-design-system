import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const json = (payload: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  try {
    const body = await req.json();
    const name = sanitizeText(body.name, 120, true);
    const email = sanitizeText(body.email, 255, true)?.toLowerCase();
    const phone = sanitizeText(body.phone, 32, true);
    const organization = sanitizeText(body.organization, 160);
    const businessCategory = sanitizeText(body.businessCategory, 120, true);
    const domainSupport = sanitizeText(body.domainSupport, 120);
    const preferredTimeline = sanitizeText(body.preferredTimeline, 120);
    const servicesDescription = sanitizeText(body.servicesDescription, 4000, true);

    if (!name || !email || !phone || !businessCategory || !servicesDescription) {
      return json({ error: "Name, email, phone, category, and services description are required." }, 400);
    }

    if (!isValidEmail(email)) {
      return json({ error: "Valid email is required." }, 400);
    }

    if (!isValidPhone(phone)) {
      return json({ error: "Valid contact number is required." }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data, error } = await supabase
      .from("digital_fairness_bookings")
      .insert({
        name,
        email,
        phone,
        organization,
        business_category: businessCategory,
        domain_support: domainSupport,
        preferred_timeline: preferredTimeline,
        services_description: servicesDescription,
        source_path: "/digital-fairness-campaign",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Digital fairness booking insert error:", error);
      return json({ error: "Failed to submit campaign booking." }, 500);
    }

    return json({ success: true, id: data.id });
  } catch (error) {
    console.error("Unexpected submit-digital-fairness-booking error:", error);
    return json({ error: "Internal server error." }, 500);
  }
});
