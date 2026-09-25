import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { supabase, formatError } from "../client.js";

export function registerLeadTools(server: McpServer) {
  server.tool(
    "cms_list_contact_submissions",
    "List incoming client contact messages and project inquiries. Filter by status (new, reviewing, contacted, closed) or search text.",
    {
      status: z.string().optional().describe("Filter by status (e.g. 'new', 'contacted', 'closed')"),
      limit: z.number().default(50).describe("Max inquiries to return"),
    },
    async ({ status, limit }) => {
      try {
        let query = supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(limit);

        if (status) {
          query = query.eq("status", status);
        }

        const { data, error } = await query;

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to list contact submissions: ${formatError(error)}` }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ count: data?.length || 0, submissions: data }, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_list_contact_submissions error: ${formatError(err)}` }],
        };
      }
    }
  );

  server.tool(
    "cms_update_contact_status",
    "Update the status of a contact submission lead (e.g. 'new', 'contacted', 'archived').",
    {
      id: z.string().describe("UUID of the contact submission"),
      status: z.string().describe("Updated status"),
    },
    async ({ id, status }) => {
      try {
        const { data, error } = await supabase
          .from("contact_submissions")
          .update({ status })
          .eq("id", id)
          .select()
          .single();

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to update contact status: ${formatError(error)}` }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ message: "Contact status updated", submission: data }, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_update_contact_status error: ${formatError(err)}` }],
        };
      }
    }
  );

  server.tool(
    "cms_list_audit_requests",
    "List incoming free design/UX audit requests from potential clients.",
    {
      status: z.string().optional().describe("Filter by audit request status"),
      limit: z.number().default(50).describe("Max audit requests to return"),
    },
    async ({ status, limit }) => {
      try {
        let query = supabase.from("free_audit_requests").select("*").order("created_at", { ascending: false }).limit(limit);

        if (status) {
          query = query.eq("status", status);
        }

        const { data, error } = await query;

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to list audit requests: ${formatError(error)}` }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ count: data?.length || 0, requests: data }, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_list_audit_requests error: ${formatError(err)}` }],
        };
      }
    }
  );

  server.tool(
    "cms_update_audit_status",
    "Update status and internal notes on a free audit request.",
    {
      id: z.string().describe("UUID of the audit request"),
      status: z.string().describe("Updated status"),
      notes: z.string().optional().describe("Internal audit analysis or notes"),
    },
    async ({ id, status, notes }) => {
      try {
        const updates: Record<string, unknown> = {
          status,
          updated_at: new Date().toISOString(),
        };
        if (notes !== undefined) {
          updates.notes = notes;
        }

        const { data, error } = await supabase
          .from("free_audit_requests")
          .update(updates)
          .eq("id", id)
          .select()
          .single();

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to update audit request: ${formatError(error)}` }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ message: "Audit request updated", request: data }, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_update_audit_status error: ${formatError(err)}` }],
        };
      }
    }
  );
}
