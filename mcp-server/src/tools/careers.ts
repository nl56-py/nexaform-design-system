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

export function registerCareerTools(server: McpServer) {
  server.tool(
    "cms_list_jobs",
    "List open job positions from the CMS with optional filters for department and publication status.",
    {
      publishedOnly: z.boolean().default(false).describe("Filter only published positions"),
      department: z.string().optional().describe("Filter by department (e.g., 'Engineering', 'Design')"),
      limit: z.number().default(20).describe("Max positions to return"),
    },
    async ({ publishedOnly, department, limit }) => {
      try {
        let query = supabase.from("job_positions").select("*").order("created_at", { ascending: false }).limit(limit);

        if (publishedOnly) {
          query = query.eq("published", true);
        }
        if (department) {
          query = query.ilike("department", `%${department}%`);
        }

        const { data, error } = await query;

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to list job positions: ${formatError(error)}` }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ count: data?.length || 0, positions: data }, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_list_jobs error: ${formatError(err)}` }],
        };
      }
    }
  );

  server.tool(
    "cms_create_job",
    "Create and optionally publish a new career opening.",
    {
      title: z.string().describe("Job title (e.g. 'Senior Design Technologist')"),
      slug: z.string().optional().describe("URL slug"),
      department: z.string().default("Engineering").describe("Department name"),
      location: z.string().default("Remote").describe("Location (e.g. 'Remote', 'San Francisco')"),
      employment_type: z.string().default("Full-time").describe("Type (e.g. 'Full-time', 'Contract')"),
      experience_level: z.string().default("Senior").describe("Experience level (e.g. 'Mid-Level', 'Senior')"),
      salary_range: z.string().optional().describe("Salary range (e.g. '$120,000 - $150,000')"),
      description: z.string().describe("Overview of the role"),
      requirements: z.string().optional().describe("Key qualifications and requirements"),
      benefits: z.string().optional().describe("Benefits and perks"),
      published: z.boolean().default(true).describe("Whether the position is actively listed"),
      deadline: z.string().optional().describe("Application deadline ISO date"),
    },
    async (params) => {
      try {
        const slug = params.slug ? slugify(params.slug) : slugify(params.title);
        const now = new Date().toISOString();

        const { data, error } = await supabase
          .from("job_positions")
          .insert({
            ...params,
            slug,
            published_at: params.published ? now : null,
            updated_at: now,
          })
          .select()
          .single();

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to create job position: ${formatError(error)}` }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ message: "Job position created successfully", job: data }, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_create_job error: ${formatError(err)}` }],
        };
      }
    }
  );

  server.tool(
    "cms_list_applications",
    "List submitted job applications. Filter by job position or status (new, reviewing, interview, rejected, hired).",
    {
      positionId: z.string().optional().describe("Filter by job position UUID"),
      status: z.string().optional().describe("Filter by application status (e.g., 'new', 'reviewing', 'interview')"),
      limit: z.number().default(50).describe("Max items to return"),
    },
    async ({ positionId, status, limit }) => {
      try {
        let query = supabase
          .from("job_applications")
          .select("*, job_positions(title, department)")
          .order("created_at", { ascending: false })
          .limit(limit);

        if (positionId) {
          query = query.eq("position_id", positionId);
        }
        if (status) {
          query = query.eq("status", status);
        }

        const { data, error } = await query;

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to list applications: ${formatError(error)}` }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ total: data?.length || 0, applications: data }, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_list_applications error: ${formatError(err)}` }],
        };
      }
    }
  );

  server.tool(
    "cms_update_application_status",
    "Update an applicant's candidate status (e.g., 'reviewing', 'interview', 'rejected', 'offered') and add evaluation admin notes.",
    {
      id: z.string().describe("UUID of the job application"),
      status: z.enum(["new", "reviewing", "interview", "rejected", "offered"]).describe("New status"),
      adminNotes: z.string().optional().describe("Internal evaluation notes or summary"),
    },
    async ({ id, status, adminNotes }) => {
      try {
        const updates: Record<string, unknown> = {
          status,
          updated_at: new Date().toISOString(),
        };
        if (adminNotes !== undefined) {
          updates.admin_notes = adminNotes;
        }

        const { data, error } = await supabase
          .from("job_applications")
          .update(updates)
          .eq("id", id)
          .select()
          .single();

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to update application: ${formatError(error)}` }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ message: "Application updated successfully", application: data }, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_update_application_status error: ${formatError(err)}` }],
        };
      }
    }
  );
}
