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
    return url.trim();
  }
  return "";
}

function sanitizeKey(key?: string): string {
  if (key && key.trim().length > 10) {
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

const MCP_API_KEY = process.env.MCP_API_KEY || "";
const ADMIN_MEDIA_BUCKET = "admin-media";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

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
];

async function executeTool(name: string, args: Record<string, any>) {
  switch (name) {
    case "cms_upload_media": {
      const { url, base64Data, filename, folder = "blogs", contentType } = args;
      let buffer: Buffer;
      let mime = contentType || "image/png";
      let baseName = filename || "upload";

      if (url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch URL: ${res.statusText}`);
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

      const { error } = await supabase.storage.from(ADMIN_MEDIA_BUCKET).upload(storagePath, buffer, {
        contentType: mime,
        upsert: false,
      });
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

      const { data, error } = await q;
      if (error) throw error;
      return { count: data?.length || 0, posts: data };
    }

    case "cms_get_blog": {
      let q = supabase.from("blog_posts").select("*");
      if (args.id) q = q.eq("id", args.id);
      else if (args.slug) q = q.eq("slug", args.slug);
      else throw new Error("id or slug is required");

      const { data, error } = await q.maybeSingle();
      if (error) throw error;
      return data || { error: "Post not found" };
    }

    case "cms_create_blog": {
      const finalSlug = args.slug ? slugify(args.slug) : slugify(args.title);
      const now = new Date().toISOString();
      const { data, error } = await supabase
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
        .single();
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

  // Auth check
  if (MCP_API_KEY) {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    const queryToken = (req.query.apiKey as string) || "";
    if (token !== MCP_API_KEY && queryToken !== MCP_API_KEY) {
      return res.status(401).json({ error: "Unauthorized: Invalid or missing MCP API key" });
    }
  }

  // GET: Health check & Schema Discovery
  if (req.method === "GET") {
    return res.status(200).json({
      status: "online",
      server: "nexaform-cms-vercel",
      protocol: "mcp-jsonrpc-2.0",
      toolsCount: TOOLS_DEFINITIONS.length,
      tools: TOOLS_DEFINITIONS,
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

      // Fallback for simple direct action POST { action: "create_blog", ... }
      if (body.action || body.tool) {
        const toolName = body.action || body.tool;
        const result = await executeTool(toolName, body.params || body.arguments || body);
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
