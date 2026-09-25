import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from mcp-server root and parent project root
dotenv.config({ path: resolve(__dirname, "../.env") });
dotenv.config({ path: resolve(__dirname, "../../.env") });

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://ljjlopuelwbwpwxtzhpa.supabase.co";

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "";

if (!supabaseUrl) {
  console.error("Warning: SUPABASE_URL is not set.");
}

if (!supabaseKey) {
  console.error(
    "Warning: Neither SUPABASE_SERVICE_ROLE_KEY nor VITE_SUPABASE_PUBLISHABLE_KEY is set. " +
      "Database operations may fail."
  );
}

export const hasServiceRoleKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export const ADMIN_MEDIA_BUCKET = "admin-media";

export function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "object" && error !== null) {
    return JSON.stringify(error);
  }
  return String(error);
}
