import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerMediaTools } from "./tools/media.js";
import { registerBlogTools } from "./tools/blogs.js";
import { registerProjectTools } from "./tools/projects.js";
import { registerCareerTools } from "./tools/careers.js";
import { registerLeadTools } from "./tools/leads.js";
import { hasServiceRoleKey } from "./client.js";

async function main() {
  const server = new McpServer({
    name: "nexaform-cms",
    version: "1.0.0",
  });

  // Register all CMS domain tools
  registerMediaTools(server);
  registerBlogTools(server);
  registerProjectTools(server);
  registerCareerTools(server);
  registerLeadTools(server);

  // Register CMS Overview Resource
  server.resource(
    "cms-overview",
    "cms://overview",
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(
            {
              system: "Nexaform Design System CMS",
              database: "Supabase (PostgreSQL)",
              mediaStorageBucket: "admin-media",
              serviceRoleConfigured: hasServiceRoleKey,
              tables: [
                "blog_posts",
                "case_studies",
                "job_positions",
                "job_applications",
                "contact_submissions",
                "free_audit_requests",
              ],
            },
            null,
            2
          ),
        },
      ],
    })
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Note: Avoid writing anything to stdout because stdout is reserved for JSON-RPC transport!
  console.error("Nexaform CMS MCP Server started successfully on stdio.");
}

main().catch((err) => {
  console.error("Fatal error starting Nexaform CMS MCP server:", err);
  process.exit(1);
});
