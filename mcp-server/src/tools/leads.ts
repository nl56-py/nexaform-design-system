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

  server.tool(
    "cms_list_hms_leads",
    "List HMS (Hostel Management System) leads with filtering by status, type (Boys/Girls/Co-ed), area, and search query.",
    {
      status: z.string().optional().describe("Filter by status (e.g. 'new', 'contacted', 'interested', 'demo_scheduled', 'converted')"),
      type: z.string().optional().describe("Filter by hostel type (e.g. 'Boys', 'Girls', 'Co-ed')"),
      area: z.string().optional().describe("Filter by area or city (e.g. 'Baneshwor', 'Kathmandu')"),
      limit: z.number().default(50).describe("Max leads to return"),
      search: z.string().optional().describe("Search hostel name, address, or phone"),
    },
    async ({ status, type, area, limit, search }) => {
      try {
        let query = supabase.from("hms_leads").select("*").order("created_at", { ascending: false }).limit(limit);

        if (status) {
          query = query.eq("status", status);
        }
        if (type) {
          query = query.eq("type", type);
        }
        if (area) {
          query = query.ilike("area_city", `%${area}%`);
        }
        if (search) {
          query = query.or(`name.ilike.%${search}%,address.ilike.%${search}%,phone.ilike.%${search}%`);
        }

        const { data, error } = await query;

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to list HMS leads: ${formatError(error)}` }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ count: data?.length || 0, leads: data }, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_list_hms_leads error: ${formatError(err)}` }],
        };
      }
    }
  );

  server.tool(
    "cms_update_hms_lead_status",
    "Update the pipeline status, priority, and notes for an HMS hostel lead.",
    {
      id: z.string().describe("UUID of the HMS lead"),
      status: z.string().optional().describe("New status ('new', 'contacted', 'interested', 'demo_scheduled', 'negotiating', 'converted', 'not_interested', 'archived')"),
      priority: z.string().optional().describe("Priority ('low', 'medium', 'high', 'urgent')"),
      notes: z.string().optional().describe("Internal outreach or demo notes"),
      follow_up_date: z.string().optional().describe("ISO timestamp for next follow up"),
    },
    async ({ id, status, priority, notes, follow_up_date }) => {
      try {
        const updates: Record<string, unknown> = {
          updated_at: new Date().toISOString(),
        };
        if (status) updates.status = status;
        if (priority) updates.priority = priority;
        if (notes !== undefined) updates.notes = notes;
        if (follow_up_date !== undefined) updates.follow_up_date = follow_up_date;

        const { data, error } = await supabase
          .from("hms_leads")
          .update(updates)
          .eq("id", id)
          .select()
          .single();

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to update HMS lead: ${formatError(error)}` }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ message: "HMS lead updated successfully", lead: data }, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_update_hms_lead_status error: ${formatError(err)}` }],
        };
      }
    }
  );

  server.tool(
    "cms_create_hms_lead",
    "Record a new hostel lead for HMS outreach.",
    {
      name: z.string().describe("Hostel name"),
      type: z.string().default("Boys").describe("Type (Boys, Girls, Co-ed)"),
      area_city: z.string().describe("Area and city (e.g. 'Old Baneshwor, Kathmandu')"),
      address: z.string().optional().describe("Full address"),
      phone: z.string().optional().describe("Contact phone number"),
      whatsapp_viber: z.string().optional().describe("WhatsApp or Viber number"),
      email: z.string().optional().describe("Email address"),
      contact_person: z.string().optional().describe("Owner or manager name"),
      priority: z.string().default("medium").describe("Priority level (low, medium, high, urgent)"),
      notes: z.string().optional().describe("Initial notes"),
    },
    async (leadData) => {
      try {
        const { data, error } = await supabase
          .from("hms_leads")
          .insert({
            ...leadData,
            status: "new",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (error) {
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to create HMS lead: ${formatError(error)}` }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ message: "HMS lead created successfully", lead: data }, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_create_hms_lead error: ${formatError(err)}` }],
        };
      }
    }
  );
}
