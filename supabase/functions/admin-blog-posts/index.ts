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
    .replace(/['â€™]/g, "")
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

    const { action, blog, id } = await req.json();

    if (action === "list") {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("List blogs error:", error);
        return json({ error: "Failed to load blog posts." }, 500);
      }

      return json({ blogs: data ?? [] });
    }

    if (action === "delete") {
      if (typeof id !== "string" || !id.trim()) {
        return json({ error: "Blog id is required for delete." }, 400);
      }

      const { error } = await supabase.from("blog_posts").delete().eq("id", id);

      if (error) {
        console.error("Delete blog error:", error);
        return json({ error: "Failed to delete blog post." }, 500);
      }

      return json({ success: true });
    }

    if (action === "upsert") {
      const title = sanitizeText(blog?.title, 160, true);
      const excerpt = sanitizeText(blog?.excerpt, 600, true);
      const category = sanitizeText(blog?.category, 120, true);
      const derivedSlug = slugify(
        sanitizeText(blog?.slug, 180, false) || sanitizeText(blog?.title, 160, true) || "",
      );

      if (!title || !excerpt || !category || !derivedSlug) {
        return json({ error: "Title, slug, excerpt, and category are required." }, 400);
      }

      const published = Boolean(blog?.published);
      const payload = {
        title,
        slug: derivedSlug,
        excerpt,
        category,
        content: sanitizeText(blog?.content, 20000, false) || null,
        tags: sanitizeTags(blog?.tags),
        cover_image: sanitizeText(blog?.cover_image, 2000, false) || null,
        published,
        published_at:
          published
            ? sanitizeText(blog?.published_at, 80, false) || new Date().toISOString()
            : null,
      };

      if (typeof blog?.id === "string" && blog.id.trim()) {
        const { data, error } = await supabase
          .from("blog_posts")
          .update(payload)
          .eq("id", blog.id)
          .select("*")
          .single();

        if (error) {
          console.error("Update blog error:", error);
          return json({ error: error.message || "Failed to update blog post." }, 500);
        }

        return json({ blog: data });
      }

      const { data, error } = await supabase
        .from("blog_posts")
        .insert(payload)
        .select("*")
        .single();

      if (error) {
        console.error("Create blog error:", error);
        return json({ error: error.message || "Failed to create blog post." }, 500);
      }

      return json({ blog: data });
    }

    return json({ error: "Unsupported admin action." }, 400);
  } catch (error) {
    console.error("Unexpected admin-blog-posts error:", error);
    return json({ error: "Internal server error." }, 500);
  }
});
