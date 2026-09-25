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

export function registerProjectTools(server: McpServer) {
  server.tool(
    "cms_list_projects",
    "List portfolio case studies and showcase projects from the CMS.",
    {
      publishedOnly: z.boolean().default(false).describe("Filter only published case studies"),
      industry: z.string().optional().describe("Filter by industry (e.g., 'FinTech', 'HealthTech')"),
      limit: z.number().default(20).describe("Max items to return"),
    },
    async ({ publishedOnly, industry, limit }) => {
      try {
        let query = supabase
          .from("case_studies")
          .select("*")
          .order("display_order", { ascending: true })
          .limit(limit);

        if (publishedOnly) {
          query = query.eq("published", true);
        }
        if (industry) {
          query = query.ilike("industry", `%${industry}%`);
        }

        const { data, error } = await query;

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to list projects: ${formatError(error)}` }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ count: data?.length || 0, projects: data }, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_list_projects error: ${formatError(err)}` }],
        };
      }
    }
  );

  server.tool(
    "cms_get_project",
    "Get full details and content of a case study by ID or Slug.",
    {
      id: z.string().optional().describe("UUID of the case study"),
      slug: z.string().optional().describe("Slug of the case study"),
    },
    async ({ id, slug }) => {
      try {
        if (!id && !slug) {
          return {
            isError: true,
            content: [{ type: "text", text: "Error: Either 'id' or 'slug' must be provided." }],
          };
        }

        let query = supabase.from("case_studies").select("*");
        if (id) query = query.eq("id", id);
        else if (slug) query = query.eq("slug", slug);

        const { data, error } = await query.maybeSingle();

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to get project: ${formatError(error)}` }],
          };
        }

        if (!data) {
          return {
            isError: true,
            content: [{ type: "text", text: "Case study not found." }],
          };
        }

        return {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_get_project error: ${formatError(err)}` }],
        };
      }
    }
  );

  server.tool(
    "cms_create_project",
    "Create a new portfolio case study / project in the CMS.",
    {
      title: z.string().describe("Project title"),
      slug: z.string().optional().describe("Unique URL slug"),
      description: z.string().describe("Overview / summary of the project"),
      outcome: z.string().describe("Primary outcome or key metric (e.g. '+140% Conversion', '4.2x Faster load')"),
      industry: z.string().optional().describe("Industry (e.g. 'Fintech', 'E-commerce', 'SaaS')"),
      content: z.string().optional().describe("Detailed markdown or HTML case study body"),
      cover_image: z.string().optional().describe("Public URL of screenshot/mockup cover"),
      tags: z.array(z.string()).default([]).describe("Technology and design tags"),
      display_order: z.number().default(0).describe("Order priority for listing on the homepage"),
      published: z.boolean().default(true).describe("Whether the project is visible on the live site"),
    },
    async ({ title, slug, description, outcome, industry, content, cover_image, tags, display_order, published }) => {
      try {
        const finalSlug = slug ? slugify(slug) : slugify(title);

        const { data, error } = await supabase
          .from("case_studies")
          .insert({
            title,
            slug: finalSlug,
            description,
            outcome,
            industry: industry || null,
            content: content || null,
            cover_image: cover_image || null,
            tags,
            display_order,
            published,
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to create case study: ${formatError(error)}` }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ message: "Case study created successfully", project: data }, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_create_project error: ${formatError(err)}` }],
        };
      }
    }
  );

  server.tool(
    "cms_update_project",
    "Update an existing portfolio case study by ID or Slug.",
    {
      id: z.string().optional().describe("UUID of the case study"),
      slug: z.string().optional().describe("Slug of the case study"),
      title: z.string().optional().describe("Updated title"),
      description: z.string().optional().describe("Updated description"),
      outcome: z.string().optional().describe("Updated outcome metric"),
      industry: z.string().optional().describe("Updated industry"),
      content: z.string().optional().describe("Updated body content"),
      cover_image: z.string().optional().describe("Updated cover image URL"),
      tags: z.array(z.string()).optional().describe("Updated tags"),
      display_order: z.number().optional().describe("Updated display order"),
      published: z.boolean().optional().describe("Toggle published state"),
    },
    async ({ id, slug, ...fields }) => {
      try {
        if (!id && !slug) {
          return {
            isError: true,
            content: [{ type: "text", text: "Error: Either 'id' or 'slug' must be provided." }],
          };
        }

        const updates: Record<string, unknown> = {
          ...fields,
          updated_at: new Date().toISOString(),
        };

        let query = supabase.from("case_studies").update(updates);
        if (id) query = query.eq("id", id);
        else if (slug) query = query.eq("slug", slug);

        const { data, error } = await query.select().single();

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to update case study: ${formatError(error)}` }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ message: "Case study updated successfully", project: data }, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_update_project error: ${formatError(err)}` }],
        };
      }
    }
  );
}
