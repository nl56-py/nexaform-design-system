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

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const sanitizeText = (value: unknown, maxLength: number, required = false) => {
  if (typeof value !== "string") {
    return required ? null : "";
  }

  const trimmed = value.trim().slice(0, maxLength);

  if (required && !trimmed) {
    return null;
  }

  return trimmed;
};

const sanitizeTags = (value: unknown) =>
  Array.isArray(value)
    ? value
        .map((tag) => (typeof tag === "string" ? tag.trim().slice(0, 40) : ""))
        .filter(Boolean)
    : [];

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

    const { action, project, id } = await req.json();

    if (action === "list") {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("List projects error:", error);
        return json({ error: "Failed to load projects." }, 500);
      }

      return json({ projects: data ?? [] });
    }

    if (action === "delete") {
      if (typeof id !== "string" || !id.trim()) {
        return json({ error: "Project id is required for delete." }, 400);
      }

      const { error } = await supabase.from("case_studies").delete().eq("id", id);

      if (error) {
        console.error("Delete project error:", error);
        return json({ error: "Failed to delete project." }, 500);
      }

      return json({ success: true });
    }

    if (action === "upsert") {
      const title = sanitizeText(project?.title, 160, true);
      const description = sanitizeText(project?.description, 1200, true);
      const outcome = sanitizeText(project?.outcome, 800, true);
      const derivedSlug = slugify(
        sanitizeText(project?.slug, 180, false) || sanitizeText(project?.title, 160, true) || "",
      );

      if (!title || !description || !outcome || !derivedSlug) {
        return json({ error: "Title, slug, description, and outcome are required." }, 400);
      }

      const payload = {
        title,
        slug: derivedSlug,
        description,
        outcome,
        tags: sanitizeTags(project?.tags),
        industry: sanitizeText(project?.industry, 120, false) || null,
        cover_image: sanitizeText(project?.cover_image, 2000, false) || null,
        content: sanitizeText(project?.content, 12000, false) || null,
        published: Boolean(project?.published),
        display_order:
          typeof project?.display_order === "number" && Number.isFinite(project.display_order)
            ? project.display_order
            : 0,
      };

      if (typeof project?.id === "string" && project.id.trim()) {
        const { data, error } = await supabase
          .from("case_studies")
          .update(payload)
          .eq("id", project.id)
          .select("*")
          .single();

        if (error) {
          console.error("Update project error:", error);
          return json({ error: error.message || "Failed to update project." }, 500);
        }

        return json({ project: data });
      }

      const { data, error } = await supabase
        .from("case_studies")
        .insert(payload)
        .select("*")
        .single();

      if (error) {
        console.error("Create project error:", error);
        return json({ error: error.message || "Failed to create project." }, 500);
      }

      return json({ project: data });
    }

    return json({ error: "Unsupported admin action." }, 400);
  } catch (error) {
    console.error("Unexpected admin-projects error:", error);
    return json({ error: "Internal server error." }, 500);
  }
});
