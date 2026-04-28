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
    const businessName = sanitizeText(body.businessName, 180, true);
    const businessCategory = sanitizeText(body.businessCategory, 120, true);
    const services = sanitizeText(body.services, 4000, true);
    const rawWebsiteUrl = sanitizeText(body.websiteUrl, 2000, true);
    const contactNumber = sanitizeText(body.contactNumber, 32, true);
    const email = sanitizeText(body.email, 255, true)?.toLowerCase();
    const serviceArea = sanitizeText(body.serviceArea, 180);
    const primaryGoal = sanitizeText(body.primaryGoal, 180);
    const notes = sanitizeText(body.notes, 4000);

    if (!name || !businessName || !businessCategory || !services || !rawWebsiteUrl || !contactNumber || !email) {
      return json(
        {
          error:
            "Name, business name, category, services, website URL, contact number, and email are required.",
        },
        400,
      );
    }

    if (!isValidEmail(email)) {
      return json({ error: "Valid email is required." }, 400);
    }

    if (!isValidPhone(contactNumber)) {
      return json({ error: "Valid contact number is required." }, 400);
    }

    const websiteUrl = normalizeWebsiteUrl(rawWebsiteUrl);

    if (!websiteUrl) {
      return json({ error: "Valid website URL is required." }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data, error } = await supabase
      .from("free_audit_requests")
      .insert({
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
      })
      .select("id")
      .single();

    if (error) {
      console.error("Free audit request insert error:", error);
      return json({ error: "Failed to submit free audit request." }, 500);
    }

    return json({ success: true, id: data.id });
  } catch (error) {
    console.error("Unexpected submit-free-audit error:", error);
    return json({ error: "Internal server error." }, 500);
  }
});
