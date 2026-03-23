import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-secret, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const json = (payload: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const sanitizeStatus = (value: unknown) => {
  if (typeof value !== "string") {
    return null;
  }

  const allowed = ["new", "reviewing", "replied", "archived"];
  return allowed.includes(value.trim()) ? value.trim() : null;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const providedSecret = req.headers.get("x-admin-secret");
  const expectedSecret = Deno.env.get("ADMIN_PANEL_SECRET");

  if (!expectedSecret) {
    return json({ error: "ADMIN_PANEL_SECRET is not configured." }, 500);
  }

  if (!providedSecret || providedSecret !== expectedSecret) {
    return json({ error: "Unauthorized admin request." }, 401);
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { action, id, status } = await req.json();

    if (action === "list") {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("List contact submissions error:", error);
        return json({ error: "Failed to load contact submissions." }, 500);
      }

      return json({ contacts: data ?? [] });
    }

    if (action === "update_status") {
      if (typeof id !== "string" || !id.trim()) {
        return json({ error: "Contact submission id is required." }, 400);
      }

      const nextStatus = sanitizeStatus(status);

      if (!nextStatus) {
        return json({ error: "A valid status is required." }, 400);
      }

      const { data, error } = await supabase
        .from("contact_submissions")
        .update({ status: nextStatus })
        .eq("id", id)
        .select("*")
        .single();

      if (error) {
        console.error("Update contact submission status error:", error);
        return json({ error: "Failed to update contact submission status." }, 500);
      }

      return json({ contact: data });
    }

    return json({ error: "Unsupported admin action." }, 400);
  } catch (error) {
    console.error("Unexpected admin-contact-submissions error:", error);
    return json({ error: "Internal server error." }, 500);
  }
});
