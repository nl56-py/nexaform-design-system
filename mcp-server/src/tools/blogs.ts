import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { supabase, formatError } from "../client.js";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function registerBlogTools(server: McpServer) {
  server.tool(
    "cms_list_blogs",
    "List blog posts from the CMS with optional filters for status (published/draft), category, search keyword, and pagination.",
    {
      status: z
        .enum(["all", "published", "draft"])
        .default("all")
        .describe("Filter by publication status"),
      category: z.string().optional().describe("Filter by blog category"),
      search: z.string().optional().describe("Search within post title or excerpt"),
      limit: z.number().default(20).describe("Maximum number of posts to return"),
      offset: z.number().default(0).describe("Pagination offset"),
    },
    async ({ status, category, search, limit, offset }) => {
      try {
        let query = supabase
          .from("blog_posts")
          .select("id, title, slug, category, excerpt, cover_image, tags, published, published_at, created_at, updated_at")
          .order("created_at", { ascending: false })
          .range(offset, offset + limit - 1);

        if (status === "published") {
          query = query.eq("published", true);
        } else if (status === "draft") {
          query = query.eq("published", false);
        }

        if (category) {
          query = query.ilike("category", `%${category}%`);
        }

        if (search) {
          query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
        }

        const { data, error, count } = await query;

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to list blog posts: ${formatError(error)}` }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ total: data?.length || 0, posts: data }, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_list_blogs error: ${formatError(err)}` }],
        };
      }
    }
  );

  server.tool(
    "cms_get_blog",
    "Get full details and complete content (Markdown/HTML) of a specific blog post by ID or Slug.",
    {
      id: z.string().optional().describe("UUID of the blog post"),
      slug: z.string().optional().describe("URL slug of the blog post"),
    },
    async ({ id, slug }) => {
      try {
        if (!id && !slug) {
          return {
            isError: true,
            content: [{ type: "text", text: "Error: Either 'id' or 'slug' must be provided." }],
          };
        }

        let query = supabase.from("blog_posts").select("*");
        if (id) {
          query = query.eq("id", id);
        } else if (slug) {
          query = query.eq("slug", slug);
        }

        const { data, error } = await query.maybeSingle();

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to get blog post: ${formatError(error)}` }],
          };
        }

        if (!data) {
          return {
            isError: true,
            content: [{ type: "text", text: `Blog post not found matching ${id ? `ID: ${id}` : `Slug: ${slug}`}` }],
          };
        }

        return {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_get_blog error: ${formatError(err)}` }],
        };
      }
    }
  );

  server.tool(
    "cms_create_blog",
    "Create a new blog post in the CMS. Can be saved as draft or published immediately. Supports rich HTML/Markdown content, SEO excerpt, tags, and cover image.",
    {
      title: z.string().describe("Title of the article"),
      slug: z
        .string()
        .optional()
        .describe("Unique URL slug. If omitted, will be generated automatically from the title"),
      category: z.string().default("Design System").describe("Category name"),
      excerpt: z.string().describe("Short SEO-friendly summary or excerpt"),
      content: z.string().describe("Full body content (HTML or Markdown)"),
      cover_image: z
        .string()
        .optional()
        .describe("Public URL of the cover image (can be obtained via cms_upload_media)"),
      tags: z.array(z.string()).default([]).describe("Array of tags"),
      published: z.boolean().default(false).describe("Whether to immediately publish the article"),
    },
    async ({ title, slug, category, excerpt, content, cover_image, tags, published }) => {
      try {
        const finalSlug = slug ? slugify(slug) : slugify(title);
        const now = new Date().toISOString();

        const insertPayload: Record<string, unknown> = {
          title,
          slug: finalSlug,
          category,
          excerpt,
          content,
          cover_image: cover_image || null,
          tags,
          published,
          published_at: published ? now : null,
          updated_at: now,
        };

        const { data, error } = await supabase
          .from("blog_posts")
          .insert(insertPayload)
          .select()
          .single();

        if (error) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: `Failed to create blog post: ${formatError(error)}. Ensure SUPABASE_SERVICE_ROLE_KEY is set for write permissions.`,
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  message: `Blog post successfully created ${published ? "(Published)" : "(Draft)"}`,
                  post: data,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_create_blog error: ${formatError(err)}` }],
        };
      }
    }
  );

  server.tool(
    "cms_update_blog",
    "Update an existing blog post by ID or Slug. Update content, title, excerpt, tags, cover image, or toggle publication state.",
    {
      id: z.string().optional().describe("UUID of the post to update"),
      slug: z.string().optional().describe("Slug of the post to update"),
      title: z.string().optional().describe("Updated title"),
      newSlug: z.string().optional().describe("Updated slug"),
      category: z.string().optional().describe("Updated category"),
      excerpt: z.string().optional().describe("Updated excerpt"),
      content: z.string().optional().describe("Updated body content"),
      cover_image: z.string().optional().describe("Updated cover image public URL"),
      tags: z.array(z.string()).optional().describe("Updated tags array"),
      published: z.boolean().optional().describe("Toggle publish state (true for published, false for draft)"),
    },
    async ({ id, slug, title, newSlug, category, excerpt, content, cover_image, tags, published }) => {
      try {
        if (!id && !slug) {
          return {
            isError: true,
            content: [{ type: "text", text: "Error: Either 'id' or 'slug' must be specified to update." }],
          };
        }

        const updates: Record<string, unknown> = {
          updated_at: new Date().toISOString(),
        };

        if (title !== undefined) updates.title = title;
        if (newSlug !== undefined) updates.slug = slugify(newSlug);
        if (category !== undefined) updates.category = category;
        if (excerpt !== undefined) updates.excerpt = excerpt;
        if (content !== undefined) updates.content = content;
        if (cover_image !== undefined) updates.cover_image = cover_image;
        if (tags !== undefined) updates.tags = tags;
        if (published !== undefined) {
          updates.published = published;
          if (published) {
            updates.published_at = new Date().toISOString();
          }
        }

        let query = supabase.from("blog_posts").update(updates);
        if (id) {
          query = query.eq("id", id);
        } else if (slug) {
          query = query.eq("slug", slug);
        }

        const { data, error } = await query.select().single();

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to update blog post: ${formatError(error)}` }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ message: "Blog post updated successfully", post: data }, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_update_blog error: ${formatError(err)}` }],
        };
      }
    }
  );

  server.tool(
    "cms_delete_blog",
    "Permanently delete a blog post by ID.",
    {
      id: z.string().describe("UUID of the blog post to delete"),
    },
    async ({ id }) => {
      try {
        const { error } = await supabase.from("blog_posts").delete().eq("id", id);

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to delete blog post: ${formatError(error)}` }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ success: true, message: `Blog post ${id} deleted successfully.` }),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_delete_blog error: ${formatError(err)}` }],
        };
      }
    }
  );
}
