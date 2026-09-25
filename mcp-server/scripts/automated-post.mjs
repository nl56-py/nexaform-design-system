// Automated CMS Post Publisher
// Can be triggered by GitHub Actions, Cron, or Webhook
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || "https://ljjlopuelwbwpwxtzhpa.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_KEY) {
  console.error("SUPABASE_SERVICE_ROLE_KEY is required for automated publishing.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function run() {
  console.log("Running automated content publication check...");

  // Example: Publish all drafts that have reached their scheduled publish date
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug")
    .eq("published", false)
    .not("published_at", "is", null)
    .lte("published_at", now);

  if (error) {
    console.error("Error fetching scheduled posts:", error);
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.log("No scheduled posts to publish right now.");
    return;
  }

  console.log(`Found ${data.length} post(s) ready to publish.`);
  for (const post of data) {
    await supabase.from("blog_posts").update({ published: true }).eq("id", post.id);
    console.log(`Published: ${post.title} (${post.slug})`);
  }
}

run().catch(console.error);
