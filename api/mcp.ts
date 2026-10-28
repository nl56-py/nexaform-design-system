import type { IncomingMessage, ServerResponse } from "node:http";
import { createClient } from "@supabase/supabase-js";

interface VercelRequest extends IncomingMessage {
  query: Record<string, string | string[]>;
  cookies: Record<string, string>;
  body: any;
}

interface VercelResponse extends ServerResponse {
  send: (body: any) => VercelResponse;
  json: (jsonBody: any) => VercelResponse;
  status: (statusCode: number) => VercelResponse;
}

function sanitizeUrl(url?: string): string {
  if (url && (url.startsWith("https://") || url.startsWith("http://"))) {
    if (url.includes("nomalsddmrxdfnsajqaj")) return "";
    return url.trim();
  }
  return "";
}

function sanitizeKey(key?: string): string {
  if (key && key.trim().length > 10) {
    if (key.includes("nomalsddmrxdfnsajqaj")) return "";
    return key.trim();
  }
  return "";
}

const SUPABASE_URL =
  sanitizeUrl(process.env.SUPABASE_URL) ||
  sanitizeUrl(process.env.VITE_SUPABASE_URL) ||
  "https://ljjlopuelwbwpwxtzhpa.supabase.co";

const SUPABASE_KEY =
  sanitizeKey(process.env.SUPABASE_SERVICE_ROLE_KEY) ||
  sanitizeKey(process.env.SUPABASE_KEY) ||
  sanitizeKey(process.env.VITE_SUPABASE_PUBLISHABLE_KEY) ||
  "sb_publishable_dZF20TJxfnlBbdkfx9lp2Q_XJAq-h2i";

const hasServiceRoleKey = Boolean(
  process.env.SUPABASE_SERVICE_ROLE_KEY && sanitizeKey(process.env.SUPABASE_SERVICE_ROLE_KEY)
);

const MCP_API_KEY = process.env.MCP_API_KEY || "";
const ADMIN_MEDIA_BUCKET = "admin-media";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

function withTimeout<T>(promise: PromiseLike<T>, timeoutMs = 12000, context = "Operation"): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(
        new Error(
          `${context} timed out after ${timeoutMs / 1000}s. Please ensure SUPABASE_SERVICE_ROLE_KEY is set in Vercel to bypass RLS.`
        )
      );
    }, timeoutMs);

    Promise.resolve(promise)
      .then((val) => {
        clearTimeout(timer);
        resolve(val);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Tool Definitions Schema for MCP discovery
const TOOLS_DEFINITIONS = [
  {
    name: "cms_upload_media",
    description: "Upload an image to Supabase admin-media storage bucket from URL or base64. Returns public CDN URL.",
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "Public image URL to download & store" },
        base64Data: { type: "string", description: "Base64 encoded image string" },
        filename: { type: "string", description: "Target filename" },
        folder: { type: "string", description: "Target folder (default 'blogs')", default: "blogs" },
        contentType: { type: "string", description: "MIME type (e.g. 'image/png')" },
      },
    },
  },
  {
    name: "cms_list_blogs",
    description: "List blog posts with filters for status (all/published/draft), category, search, and pagination.",
    inputSchema: {
      type: "object",
      properties: {
        status: { type: "string", enum: ["all", "published", "draft"], default: "all" },
        category: { type: "string" },
        search: { type: "string" },
        limit: { type: "number", default: 20 },
        offset: { type: "number", default: 0 },
      },
    },
  },
  {
    name: "cms_get_blog",
    description: "Get full details and content of a blog post by ID or Slug.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "UUID of the post" },
        slug: { type: "string", description: "Slug of the post" },
      },
    },
  },
  {
    name: "cms_create_blog",
    description: "Create and optionally publish a new blog post.",
    inputSchema: {
      type: "object",
      required: ["title", "excerpt", "content"],
      properties: {
        title: { type: "string" },
        slug: { type: "string" },
        category: { type: "string", default: "Design System" },
        excerpt: { type: "string" },
        content: { type: "string" },
        cover_image: { type: "string" },
        tags: { type: "array", items: { type: "string" } },
        published: { type: "boolean", default: false },
      },
    },
  },
  {
    name: "cms_update_blog",
    description: "Update existing blog post content, cover image, or publication status.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string" },
        slug: { type: "string" },
        title: { type: "string" },
        category: { type: "string" },
        excerpt: { type: "string" },
        content: { type: "string" },
        cover_image: { type: "string" },
        tags: { type: "array", items: { type: "string" } },
        published: { type: "boolean" },
      },
    },
  },
  {
    name: "cms_delete_blog",
    description: "Delete a blog post by ID.",
    inputSchema: {
      type: "object",
      required: ["id"],
      properties: { id: { type: "string" } },
    },
  },
  {
    name: "cms_list_projects",
    description: "List portfolio case studies / projects.",
    inputSchema: {
      type: "object",
      properties: {
        publishedOnly: { type: "boolean", default: false },
        industry: { type: "string" },
        limit: { type: "number", default: 20 },
      },
    },
  },
  {
    name: "cms_create_project",
    description: "Create a new portfolio showcase project / case study.",
    inputSchema: {
      type: "object",
      required: ["title", "description", "outcome"],
      properties: {
        title: { type: "string" },
        slug: { type: "string" },
        description: { type: "string" },
        outcome: { type: "string" },
        industry: { type: "string" },
        content: { type: "string" },
        cover_image: { type: "string" },
        tags: { type: "array", items: { type: "string" } },
        display_order: { type: "number", default: 0 },
        published: { type: "boolean", default: true },
      },
    },
  },
  {
    name: "cms_list_jobs",
    description: "List open job career listings.",
    inputSchema: {
      type: "object",
      properties: {
        publishedOnly: { type: "boolean", default: false },
        department: { type: "string" },
      },
    },
  },
  {
    name: "cms_list_applications",
    description: "List job applicant submissions.",
    inputSchema: {
      type: "object",
      properties: {
        positionId: { type: "string" },
        status: { type: "string" },
      },
    },
  },
  {
    name: "cms_list_contact_submissions",
    description: "List client contact inquiries and leads.",
    inputSchema: {
      type: "object",
      properties: {
        status: { type: "string" },
        limit: { type: "number", default: 50 },
      },
    },
  },
  {
    name: "cms_list_audit_requests",
    description: "List free UX/design audit requests.",
    inputSchema: {
      type: "object",
      properties: {
        status: { type: "string" },
        limit: { type: "number", default: 50 },
      },
    },
  },
  {
    name: "cms_list_hms_leads",
    description: "List Hostel Management System (HMS) / CRM leads with filters for status, type, area, and search query.",
    inputSchema: {
      type: "object",
      properties: {
        status: { type: "string", description: "Filter by status ('new', 'contacted', 'interested', 'demo_scheduled', 'converted')" },
        type: { type: "string", description: "Filter by hostel type ('Boys', 'Girls', 'Co-ed')" },
        area: { type: "string", description: "Filter by city or area (e.g. 'Baneshwor', 'Kathmandu')" },
        limit: { type: "number", default: 50 },
        search: { type: "string", description: "Search by hostel name, phone, or address" },
      },
    },
  },
  {
    name: "cms_update_hms_lead_status",
    description: "Update pipeline status, priority, and follow-up notes for an HMS CRM lead.",
    inputSchema: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string", description: "UUID of the HMS lead" },
        status: { type: "string", description: "New status ('new', 'contacted', 'interested', 'demo_scheduled', 'converted', 'archived')" },
        priority: { type: "string", description: "Priority ('low', 'medium', 'high', 'urgent')" },
        notes: { type: "string", description: "Internal notes or follow-up summary" },
        follow_up_date: { type: "string", description: "ISO timestamp for next follow up" },
      },
    },
  },
  {
    name: "cms_create_hms_lead",
    description: "Create and register a new HMS hostel lead for CRM sales outreach.",
    inputSchema: {
      type: "object",
      required: ["name", "area_city"],
      properties: {
        name: { type: "string", description: "Hostel name" },
        type: { type: "string", enum: ["Boys", "Girls", "Co-ed"], default: "Boys" },
        area_city: { type: "string", description: "Area or city (e.g. 'Old Baneshwor, Kathmandu')" },
        address: { type: "string" },
        phone: { type: "string" },
        whatsapp_viber: { type: "string" },
        email: { type: "string" },
        contact_person: { type: "string" },
        priority: { type: "string", enum: ["low", "medium", "high", "urgent"], default: "medium" },
        notes: { type: "string" },
      },
    },
  },
];

async function executeTool(name: string, args: Record<string, any>) {
  switch (name) {
    case "cms_upload_media": {
      if (!hasServiceRoleKey) {
        throw new Error(
          "Upload blocked by Row-Level Security: SUPABASE_SERVICE_ROLE_KEY is not set in Vercel environment variables. The 'admin-media' storage bucket requires service_role admin credentials to write. Please add SUPABASE_SERVICE_ROLE_KEY in your Vercel Project Settings -> Environment Variables."
        );
      }
      const { url, base64Data, filename, folder = "blogs", contentType } = args;
      let buffer: Buffer;
      let mime = contentType || "image/png";
      let baseName = filename || "upload";

      if (url) {
        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) throw new Error(`Failed to download image from URL (${res.status} ${res.statusText})`);
        buffer = Buffer.from(await res.arrayBuffer());
        if (!contentType) mime = res.headers.get("content-type") || "image/png";
      } else if (base64Data) {
        const clean = base64Data.replace(/^data:[^;]+;base64,/, "");
        buffer = Buffer.from(clean, "base64");
      } else {
        throw new Error("Must provide 'url' or 'base64Data'.");
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const ext = mime.split("/")[1] || "png";
      const storagePath = `${folder}/${timestamp}-${crypto.randomUUID()}-${slugify(baseName)}.${ext}`;

      const { error } = await withTimeout(
        supabase.storage.from(ADMIN_MEDIA_BUCKET).upload(storagePath, buffer, {
          contentType: mime,
          upsert: false,
        }),
        10000,
        "Media storage upload"
      );
      if (error) throw error;

      const { data } = supabase.storage.from(ADMIN_MEDIA_BUCKET).getPublicUrl(storagePath);
      return { success: true, publicUrl: data.publicUrl, storagePath };
    }

    case "cms_list_blogs": {
      let q = supabase
        .from("blog_posts")
        .select("id, title, slug, category, excerpt, cover_image, tags, published, published_at, created_at")
        .order("created_at", { ascending: false })
        .range(args.offset || 0, (args.offset || 0) + (args.limit || 20) - 1);

      if (args.status === "published") q = q.eq("published", true);
      if (args.status === "draft") q = q.eq("published", false);
      if (args.category) q = q.ilike("category", `%${args.category}%`);
      if (args.search) q = q.or(`title.ilike.%${args.search}%,excerpt.ilike.%${args.search}%`);

      const { data, error } = await withTimeout(q, 10000, "List blogs");
      if (error) throw error;
      return { count: data?.length || 0, posts: data };
    }

    case "cms_get_blog": {
      let q = supabase.from("blog_posts").select("*");
      if (args.id) q = q.eq("id", args.id);
      else if (args.slug) q = q.eq("slug", args.slug);
      else throw new Error("id or slug is required");

      const { data, error } = await withTimeout(q.maybeSingle(), 10000, "Get blog");
      if (error) throw error;
      return data || { error: "Post not found" };
    }

    case "cms_create_blog": {
      if (!hasServiceRoleKey) {
        throw new Error(
          "Write operation blocked by Row-Level Security: SUPABASE_SERVICE_ROLE_KEY is not set in Vercel environment variables. The 'blog_posts' table requires service_role admin credentials to insert articles. Please add SUPABASE_SERVICE_ROLE_KEY in your Vercel Project Settings -> Environment Variables."
        );
      }
      const finalSlug = args.slug ? slugify(args.slug) : slugify(args.title);
      const now = new Date().toISOString();
      const { data, error } = await withTimeout(
        supabase
          .from("blog_posts")
          .insert({
            title: args.title,
            slug: finalSlug,
            category: args.category || "Design System",
            excerpt: args.excerpt,
            content: args.content,
            cover_image: args.cover_image || null,
            tags: args.tags || [],
            published: args.published || false,
            published_at: args.published ? now : null,
            updated_at: now,
          })
          .select()
          .single(),
        10000,
        "Blog post insert"
      );
      if (error) throw error;
      return { message: "Blog post created", post: data };
    }

    case "cms_update_blog": {
      const updates: Record<string, any> = { updated_at: new Date().toISOString() };
      if (args.title) updates.title = args.title;
      if (args.slug) updates.slug = slugify(args.slug);
      if (args.category) updates.category = args.category;
      if (args.excerpt) updates.excerpt = args.excerpt;
      if (args.content) updates.content = args.content;
      if (args.cover_image !== undefined) updates.cover_image = args.cover_image;
      if (args.tags) updates.tags = args.tags;
      if (args.published !== undefined) {
        updates.published = args.published;
        if (args.published) updates.published_at = new Date().toISOString();
      }

      let q = supabase.from("blog_posts").update(updates);
      if (args.id) q = q.eq("id", args.id);
      else if (args.slug) q = q.eq("slug", args.slug);
      else throw new Error("id or slug required");

      const { data, error } = await q.select().single();
      if (error) throw error;
      return { message: "Blog post updated", post: data };
    }

    case "cms_delete_blog": {
      const { error } = await supabase.from("blog_posts").delete().eq("id", args.id);
      if (error) throw error;
      return { success: true, message: `Blog post ${args.id} deleted` };
    }

    case "cms_list_projects": {
      let q = supabase.from("case_studies").select("*").order("display_order", { ascending: true });
      if (args.publishedOnly) q = q.eq("published", true);
      if (args.industry) q = q.ilike("industry", `%${args.industry}%`);
      const { data, error } = await q.limit(args.limit || 20);
      if (error) throw error;
      return { count: data?.length || 0, projects: data };
    }

    case "cms_create_project": {
      const { data, error } = await supabase
        .from("case_studies")
        .insert({
          title: args.title,
          slug: args.slug ? slugify(args.slug) : slugify(args.title),
          description: args.description,
          outcome: args.outcome,
          industry: args.industry || null,
          content: args.content || null,
          cover_image: args.cover_image || null,
          tags: args.tags || [],
          display_order: args.display_order || 0,
          published: args.published ?? true,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();
      if (error) throw error;
      return { message: "Project created", project: data };
    }

    case "cms_list_jobs": {
      let q = supabase.from("job_positions").select("*").order("created_at", { ascending: false });
      if (args.publishedOnly) q = q.eq("published", true);
      if (args.department) q = q.ilike("department", `%${args.department}%`);
      const { data, error } = await q;
      if (error) throw error;
      return { count: data?.length || 0, positions: data };
    }

    case "cms_list_applications": {
      let q = supabase.from("job_applications").select("*, job_positions(title, department)");
      if (args.positionId) q = q.eq("position_id", args.positionId);
      if (args.status) q = q.eq("status", args.status);
      const { data, error } = await q.order("created_at", { ascending: false });
      if (error) throw error;
      return { count: data?.length || 0, applications: data };
    }

    case "cms_list_contact_submissions": {
      let q = supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
      if (args.status) q = q.eq("status", args.status);
      const { data, error } = await q.limit(args.limit || 50);
      if (error) throw error;
      return { count: data?.length || 0, submissions: data };
    }

    case "cms_list_audit_requests": {
      let q = supabase.from("free_audit_requests").select("*").order("created_at", { ascending: false });
      if (args.status) q = q.eq("status", args.status);
      const { data, error } = await q.limit(args.limit || 50);
      if (error) throw error;
      return { count: data?.length || 0, requests: data };
    }

    case "cms_list_hms_leads": {
      let q = supabase.from("hms_leads").select("*").order("created_at", { ascending: false });
      if (args.status) q = q.eq("status", args.status);
      if (args.type) q = q.eq("type", args.type);
      if (args.area) q = q.ilike("area_city", `%${args.area}%`);
      if (args.search) {
        q = q.or(`name.ilike.%${args.search}%,address.ilike.%${args.search}%,phone.ilike.%${args.search}%`);
      }
      const { data, error } = await q.limit(args.limit || 50);
      if (error) throw error;
      return { count: data?.length || 0, leads: data };
    }

    case "cms_update_hms_lead_status": {
      const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (args.status) updates.status = args.status;
      if (args.priority) updates.priority = args.priority;
      if (args.notes !== undefined) updates.notes = args.notes;
      if (args.follow_up_date !== undefined) updates.follow_up_date = args.follow_up_date;

      const { data, error } = await withTimeout(
        supabase.from("hms_leads").update(updates).eq("id", args.id).select().single(),
        10000,
        "Update HMS Lead"
      );
      if (error) throw error;
      return { message: "HMS lead updated successfully", lead: data };
    }

    case "cms_create_hms_lead": {
      const { data, error } = await withTimeout(
        supabase.from("hms_leads").insert({
          name: args.name,
          type: args.type || "Boys",
          area_city: args.area_city,
          address: args.address || "",
          phone: args.phone || "",
          whatsapp_viber: args.whatsapp_viber || "",
          email: args.email || "",
          contact_person: args.contact_person || "",
          priority: args.priority || "medium",
          notes: args.notes || "",
          status: "new",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }).select().single(),
        10000,
        "Create HMS Lead"
      );
      if (error) throw error;
      return { message: "HMS lead created successfully", lead: data };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-api-key");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // OpenAPI Specification endpoint for ChatGPT Custom GPT Actions, Gemini & Connectors
  if (req.method === "GET" && (req.query.format === "openapi" || req.query.spec === "openapi")) {
    const paths: Record<string, any> = {};

    for (const tool of TOOLS_DEFINITIONS) {
      paths[`/mcp?tool=${tool.name}`] = {
        post: {
          operationId: tool.name,
          summary: tool.description,
          description: tool.description,
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: false,
            content: {
              "application/json": {
                schema: tool.inputSchema,
              },
            },
          },
          responses: {
            "200": {
              description: "Tool execution result",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      result: { type: "object" },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized: MCP API key required",
            },
          },
        },
      };
    }

    return res.status(200).json({
      openapi: "3.1.0",
      info: {
        title: "Nexaform ERP & CRM MCP Gateway",
        version: "1.0.0",
        description: "Connect ChatGPT, Gemini, or Claude to live Nexaform ERP, CRM, and Supabase data with conversational prompts.",
      },
      servers: [
        {
          url: "https://www.nexa-form.com/api",
          description: "Live Nexaform MCP Production Gateway",
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "Enter your Nexaform MCP API Key to authenticate.",
          },
        },
      },
      security: [{ BearerAuth: [] }],
      paths,
    });
  }

  // Auth check
  if (MCP_API_KEY) {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    const queryToken = (req.query.apiKey as string) || "";
    if (token !== MCP_API_KEY && queryToken !== MCP_API_KEY) {
      res.setHeader(
        "WWW-Authenticate",
        'Bearer realm="Nexaform ERP MCP", error="invalid_token", error_description="Please provide your Nexaform MCP API key"'
      );
      return res.status(401).json({
        jsonrpc: "2.0",
        id: (req.body && req.body.id) || null,
        error: {
          code: -32000,
          message: "Authentication required: Please enter your Nexaform Security Key to access ERP/CRM tools.",
        },
        prompt: "To connect, please provide your Nexaform MCP API Key via Authorization Bearer header or ?apiKey= query parameter.",
        requiresKey: true,
      });
    }
  }

  // GET: Health check, Browser Developer Portal & Schema Discovery
  if (req.method === "GET") {
    const accept = req.headers.accept || "";
    if (accept.includes("text/html") && !req.query.json) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(`<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nexaform Universal MCP Gateway | Enterprise AI Connector</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          },
          colors: {
            brand: {
              50: '#f0fdfa',
              500: '#14b8a6',
              600: '#0d9488',
              900: '#134e4a',
            }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-slate-950 text-slate-100 font-sans min-h-screen selection:bg-teal-500 selection:text-black">
  <div class="max-w-5xl mx-auto px-4 py-12">
    <!-- Header -->
    <header class="border-b border-slate-800 pb-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <div class="flex items-center gap-3 mb-2">
          <div class="h-8 w-8 rounded-lg bg-teal-500 flex items-center justify-center font-bold text-black text-lg">N</div>
          <span class="text-xs uppercase tracking-widest font-mono text-teal-400 font-semibold">Nexaform Platform</span>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Live Gateway
          </span>
        </div>
        <h1 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Universal MCP & AI Connector</h1>
        <p class="text-slate-400 mt-1">Connect Claude, ChatGPT Web, Gemini, and Cursor directly to live ERP, CRM, and Supabase data.</p>
      </div>

      <div class="flex items-center gap-3">
        <a href="/api/openapi" target="_blank" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-teal-400 border border-teal-500/30 rounded-lg text-sm font-mono flex items-center gap-2 transition">
          <span>⚡ OpenAPI 3.1 Spec</span>
        </a>
        <a href="https://www.nexa-form.com" class="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg text-sm transition">
          Nexaform Home
        </a>
      </div>
    </header>

    <!-- Quick Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
        <div class="text-xs text-slate-400 font-mono">STATUS</div>
        <div class="text-xl font-bold text-emerald-400 mt-1">ONLINE</div>
      </div>
      <div class="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
        <div class="text-xs text-slate-400 font-mono">TOOLS ACTIVE</div>
        <div class="text-xl font-bold text-white mt-1">${TOOLS_DEFINITIONS.length} Enterprise Tools</div>
      </div>
      <div class="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
        <div class="text-xs text-slate-400 font-mono">PROTOCOL</div>
        <div class="text-xl font-bold text-teal-400 mt-1">MCP 2.0 & OpenAPI</div>
      </div>
      <div class="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
        <div class="text-xs text-slate-400 font-mono">SECURITY</div>
        <div class="text-xl font-bold ${MCP_API_KEY ? 'text-amber-400' : 'text-cyan-400'} mt-1">${MCP_API_KEY ? 'API KEY REQUIRED' : 'OPEN DEMO MODE'}</div>
      </div>
    </div>

    <!-- Connector Guides -->
    <div class="grid md:grid-cols-3 gap-6 mb-12">
      <!-- ChatGPT Web -->
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <span class="text-2xl">🤖</span>
            <h2 class="text-lg font-bold text-white">ChatGPT Web</h2>
          </div>
          <p class="text-xs text-slate-400 mb-4">Add to any Custom GPT Action in 10 seconds. Supports native Bearer key prompting.</p>
          <div class="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-teal-300 break-all select-all mb-4">
            https://www.nexa-form.com/api/openapi
          </div>
        </div>
        <div class="text-xs text-slate-400 font-sans">
          ✓ In GPT Actions → Click <strong>Import from URL</strong><br>
          ✓ Auth Type: <strong>Bearer Token</strong>
        </div>
      </div>

      <!-- Claude Desktop & Web -->
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <span class="text-2xl">🧠</span>
            <h2 class="text-lg font-bold text-white">Claude Desktop / Web</h2>
          </div>
          <p class="text-xs text-slate-400 mb-4">Connect Claude directly to the Supabase database and ERP records.</p>
          <div class="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-teal-300 break-all select-all mb-4">
            https://www.nexa-form.com/api/mcp
          </div>
        </div>
        <div class="text-xs text-slate-400 font-sans">
          ✓ Configured via <code>claude_desktop_config.json</code><br>
          ✓ Prompts for security key in chat
        </div>
      </div>

      <!-- Cursor & Antigravity IDE -->
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <span class="text-2xl">⚡</span>
            <h2 class="text-lg font-bold text-white">Cursor & Gemini</h2>
          </div>
          <p class="text-xs text-slate-400 mb-4">Real-time code & CRM querying in Cursor, Gemini, and Continue.</p>
          <div class="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-teal-300 break-all select-all mb-4">
            Bearer YOUR_MCP_API_KEY
          </div>
        </div>
        <div class="text-xs text-slate-400 font-sans">
          ✓ Settings → Features → MCP<br>
          ✓ Full schema validation with Zod
        </div>
      </div>
    </div>

    <!-- Interactive Live Tester -->
    <div class="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 mb-12 shadow-2xl shadow-teal-500/5">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span>🧪</span> Live In-Browser MCP Tool Tester
        </h2>
        <span class="text-xs font-mono text-teal-400">Direct Gateway Execution</span>
      </div>
      <p class="text-xs text-slate-400 mb-6">Test any ERP or CRM tool right now. If authorization is enabled, supply your key in the header input.</p>

      <div class="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-xs font-mono text-slate-400 mb-1">SELECT TOOL</label>
          <select id="toolSelect" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500 font-mono">
            ${TOOLS_DEFINITIONS.map(t => `<option value="${t.name}">${t.name} — ${t.description.slice(0, 45)}...</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="block text-xs font-mono text-slate-400 mb-1">SECURITY KEY (OPTIONAL IN DEMO)</label>
          <input id="apiKeyInput" type="password" placeholder="Enter MCP_API_KEY or Bearer token" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500 font-mono">
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-xs font-mono text-slate-400 mb-1">TOOL ARGUMENTS (JSON)</label>
        <textarea id="argsInput" rows="3" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-teal-300 font-mono focus:outline-none focus:border-teal-500">{"limit": 3}</textarea>
      </div>

      <button id="runBtn" onclick="runToolTest()" class="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg text-sm transition flex items-center gap-2">
        <span>▶ Execute Tool Call</span>
      </button>

      <div id="resultBox" class="mt-4 hidden">
        <label class="block text-xs font-mono text-slate-400 mb-1">GATEWAY RESPONSE</label>
        <pre id="resultOutput" class="bg-slate-950 border border-slate-800 p-4 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto max-h-72"></pre>
      </div>
    </div>

    <!-- Active Tools Table -->
    <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <h2 class="text-xl font-bold text-white mb-4">Registered Tools Catalog (${TOOLS_DEFINITIONS.length})</h2>
      <div class="divide-y divide-slate-800">
        ${TOOLS_DEFINITIONS.map(t => `
          <div class="py-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <span class="font-mono text-sm font-semibold text-teal-400">${t.name}</span>
              <p class="text-xs text-slate-400 mt-0.5">${t.description}</p>
            </div>
            <span class="text-xs font-mono px-2 py-1 bg-slate-950 rounded border border-slate-800 text-slate-400 self-start md:self-auto">JSON-RPC / REST</span>
          </div>
        `).join('')}
      </div>
    </div>

    <footer class="mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-400 font-mono">
      Nexaform Design System & Enterprise AI Gateway • Powered by Model Context Protocol (MCP)
    </footer>
  </div>

  <script>
    async function runToolTest() {
      const btn = document.getElementById('runBtn');
      const tool = document.getElementById('toolSelect').value;
      const key = document.getElementById('apiKeyInput').value.trim();
      const rawArgs = document.getElementById('argsInput').value.trim();
      const resultBox = document.getElementById('resultBox');
      const resultOutput = document.getElementById('resultOutput');

      let parsedArgs = {};
      try {
        if (rawArgs) parsedArgs = JSON.parse(rawArgs);
      } catch (err) {
        alert('Invalid JSON in arguments: ' + err.message);
        return;
      }

      btn.disabled = true;
      btn.innerText = 'Calling Gateway...';
      resultBox.classList.remove('hidden');
      resultOutput.innerText = 'Sending request to https://www.nexa-form.com/api/mcp ...';

      const headers = { 'Content-Type': 'application/json' };
      if (key) headers['Authorization'] = key.startsWith('Bearer ') ? key : 'Bearer ' + key;

      try {
        const res = await fetch('/api/mcp', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: Date.now(),
            method: 'tools/call',
            params: { name: tool, arguments: parsedArgs }
          })
        });

        const data = await res.json();
        resultOutput.innerText = JSON.stringify(data, null, 2);
      } catch (err) {
        resultOutput.innerText = 'Error: ' + err.message;
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>▶ Execute Tool Call</span>';
      }
    }
  </script>
</body>
</html>`);
    }

    return res.status(200).json({
      status: "online",
      server: "nexaform-cms-vercel",
      protocol: "mcp-jsonrpc-2.0",
      authRequired: Boolean(MCP_API_KEY),
      toolsCount: TOOLS_DEFINITIONS.length,
      tools: TOOLS_DEFINITIONS,
      connectors: {
        openApiSpec: "https://www.nexa-form.com/api/openapi",
        mcpEndpoint: "https://www.nexa-form.com/api/mcp",
        claudeDesktopConfig: "node mcp-server/dist/index.js",
      },
    });
  }

  // POST: Standard JSON-RPC 2.0 Handler
  if (req.method === "POST") {
    const body = req.body || {};
    const { jsonrpc, id, method, params } = body;

    try {
      // 1. MCP Ping
      if (method === "ping") {
        return res.status(200).json({ jsonrpc: "2.0", id, result: {} });
      }

      // 2. Initialized Notification (no response needed)
      if (method === "notifications/initialized") {
        return res.status(200).json({ jsonrpc: "2.0", result: {} });
      }

      // 3. MCP Initialization
      if (method === "initialize") {
        return res.status(200).json({
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2024-11-05",
            capabilities: {
              tools: {},
              resources: {},
            },
            serverInfo: { name: "nexaform-cms", version: "1.0.0" },
          },
        });
      }

      // 4. Tools List
      if (method === "tools/list") {
        return res.status(200).json({
          jsonrpc: "2.0",
          id,
          result: { tools: TOOLS_DEFINITIONS },
        });
      }

      // 5. Tool Call
      if (method === "tools/call") {
        const { name, arguments: toolArgs } = params || {};
        const result = await executeTool(name, toolArgs || {});
        return res.status(200).json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          },
        });
      }

      // 6. Resources List
      if (method === "resources/list") {
        return res.status(200).json({
          jsonrpc: "2.0",
          id,
          result: {
            resources: [
              {
                uri: "cms://overview",
                name: "Nexaform CMS Overview",
                mimeType: "application/json",
                description: "Overview of tables and media bucket configuration",
              },
            ],
          },
        });
      }

      // 7. Resources Read
      if (method === "resources/read") {
        return res.status(200).json({
          jsonrpc: "2.0",
          id,
          result: {
            contents: [
              {
                uri: "cms://overview",
                mimeType: "application/json",
                text: JSON.stringify(
                  {
                    cms: "Nexaform Design System",
                    database: "Supabase PostgreSQL",
                    mediaStorage: "admin-media",
                    toolsAvailable: TOOLS_DEFINITIONS.length,
                  },
                  null,
                  2
                ),
              },
            ],
          },
        });
      }

      // Fallback for simple direct action POST { action: "create_blog", ... } or /mcp?tool=...
      const directTool = body.action || body.tool || (req.query.tool as string);
      if (directTool) {
        const result = await executeTool(directTool, body.params || body.arguments || body);
        return res.status(200).json({ success: true, result });
      }

      return res.status(400).json({
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Method not found: ${method}` },
      });
    } catch (err: any) {
        const errorDetail = err?.cause ? `${err.message} (${err.cause.code || err.cause.message || err.cause})` : (err?.message || String(err));
        return res.status(500).json({
          jsonrpc: "2.0",
          id,
          error: { code: -32603, message: errorDetail },
        });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
