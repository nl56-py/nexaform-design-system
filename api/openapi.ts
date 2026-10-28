import type { IncomingMessage, ServerResponse } from "node:http";

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-api-key");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Fetch schema dynamically or redirect to /api/mcp?format=openapi
  try {
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host || "www.nexa-form.com";
    const mcpRes = await fetch(`${protocol}://${host}/api/mcp?format=openapi`);
    const data = await mcpRes.json();
    return res.status(200).json(data);
  } catch {
    return res.status(307).setHeader("Location", "/api/mcp?format=openapi").end();
  }
}
