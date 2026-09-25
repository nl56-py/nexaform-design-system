import http from "node:http";
import { URL } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { registerMediaTools } from "./tools/media.js";
import { registerBlogTools } from "./tools/blogs.js";
import { registerProjectTools } from "./tools/projects.js";
import { registerCareerTools } from "./tools/careers.js";
import { registerLeadTools } from "./tools/leads.js";
import { hasServiceRoleKey } from "./client.js";

const PORT = parseInt(process.env.PORT || "3001", 10);
const MCP_API_KEY = process.env.MCP_API_KEY || "";

function createCmsServer(): McpServer {
  const server = new McpServer({
    name: "nexaform-cms-remote",
    version: "1.0.0",
  });

  registerMediaTools(server);
  registerBlogTools(server);
  registerProjectTools(server);
  registerCareerTools(server);
  registerLeadTools(server);

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
              system: "Nexaform Design System CMS (Remote SSE)",
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

  return server;
}

// Store active SSE transports by sessionId
const activeTransports = new Map<string, SSEServerTransport>();

function checkAuth(req: http.IncomingMessage, res: http.ServerResponse): boolean {
  if (!MCP_API_KEY) return true; // Auth disabled if no key configured

  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();

  // Also allow query parameter ?apiKey=... for simple SSE connections
  const parsedUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const queryKey = parsedUrl.searchParams.get("apiKey") || "";

  if (token === MCP_API_KEY || queryKey === MCP_API_KEY) {
    return true;
  }

  res.writeHead(401, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Unauthorized: Invalid or missing MCP API key" }));
  return false;
}

const httpServer = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-api-key");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const pathname = parsedUrl.pathname;

  // Health check endpoint
  if (pathname === "/health" || pathname === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify(
        {
          status: "healthy",
          server: "nexaform-cms-remote-mcp",
          sseEndpoint: "/sse",
          messageEndpoint: "/message",
          supabaseConfigured: true,
          hasServiceRoleKey,
        },
        null,
        2
      )
    );
    return;
  }

  // SSE Transport endpoint: Clients connect here to establish bidirectional session
  if (pathname === "/sse" && req.method === "GET") {
    if (!checkAuth(req, res)) return;

    try {
      const server = createCmsServer();
      const transport = new SSEServerTransport("/message", res);
      const sessionId = transport.sessionId;

      activeTransports.set(sessionId, transport);
      console.log(`[Remote MCP] SSE client connected. Session: ${sessionId}`);

      req.on("close", () => {
        console.log(`[Remote MCP] SSE client disconnected. Session: ${sessionId}`);
        activeTransports.delete(sessionId);
      });

      await server.connect(transport);
    } catch (err) {
      console.error("[Remote MCP] SSE error:", err);
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error in SSE connection" }));
      }
    }
    return;
  }

  // Message endpoint: Clients send JSON-RPC requests here
  if (pathname === "/message" && req.method === "POST") {
    if (!checkAuth(req, res)) return;

    const sessionId = parsedUrl.searchParams.get("sessionId");
    if (!sessionId || !activeTransports.has(sessionId)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Session not found or expired. Reconnect via /sse." }));
      return;
    }

    const transport = activeTransports.get(sessionId)!;
    try {
      await transport.handlePostMessage(req, res);
    } catch (err) {
      console.error(`[Remote MCP] Error handling message for session ${sessionId}:`, err);
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to handle message" }));
      }
    }
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found. Endpoints available: /health, /sse, /message" }));
});

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Nexaform Remote CMS MCP Server listening on http://0.0.0.0:${PORT}`);
  console.log(`   - SSE Endpoint:     http://0.0.0.0:${PORT}/sse`);
  console.log(`   - Message Endpoint: http://0.0.0.0:${PORT}/message`);
  console.log(`   - Health Check:     http://0.0.0.0:${PORT}/health`);
  if (MCP_API_KEY) {
    console.log(`🔒 Authentication enabled with MCP_API_KEY`);
  } else {
    console.log(`⚠️  Warning: MCP_API_KEY not set. Server is currently public.`);
  }
});
