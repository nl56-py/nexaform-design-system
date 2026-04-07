import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(currentDir, "..");
const publicDir = path.join(rootDir, "public");
const sitemapPath = path.join(publicDir, "sitemap.xml");
const siteUrl = "https://www.nexa-form.com";

const staticPages = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/services/web-application-development", changefreq: "monthly", priority: "0.85" },
  { path: "/services/custom-software-development", changefreq: "monthly", priority: "0.85" },
  { path: "/services/ai-literacy", changefreq: "monthly", priority: "0.8" },
  { path: "/services/ai-automation", changefreq: "monthly", priority: "0.8" },
  { path: "/services/api-backend-systems", changefreq: "monthly", priority: "0.8" },
  { path: "/services/cloud-deployment", changefreq: "monthly", priority: "0.8" },
  { path: "/services/maintenance-support", changefreq: "monthly", priority: "0.8" },
  { path: "/projects", changefreq: "weekly", priority: "0.9" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
];

const parseEnvFile = async () => {
  try {
    const fileContents = await readFile(path.join(rootDir, ".env"), "utf8");

    return Object.fromEntries(
      fileContents
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#") && line.includes("="))
        .map((line) => {
          const separatorIndex = line.indexOf("=");
          const key = line.slice(0, separatorIndex).trim();
          const rawValue = line.slice(separatorIndex + 1).trim();
          const value = rawValue.replace(/^['"]|['"]$/g, "");

          return [key, value];
        }),
    );
  } catch {
    return {};
  }
};

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const toIsoDate = (value) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
};

const absoluteUrl = (value) => new URL(value, siteUrl).toString();

const loadDynamicEntries = async (env) => {
  const supabaseUrl = env.VITE_SUPABASE_URL;
  const supabasePublishableKey = env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    console.warn("[seo] Supabase environment variables were not found. Generating a static sitemap only.");
    return [];
  }

  const supabase = createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const [blogsResponse, projectsResponse] = await Promise.all([
    supabase
      .from("blog_posts")
      .select("slug, published_at, updated_at")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false }),
    supabase
      .from("case_studies")
      .select("slug, updated_at, display_order")
      .eq("published", true)
      .order("display_order", { ascending: true }),
  ]);

  const dynamicEntries = [];

  if (blogsResponse.error) {
    console.warn(`[seo] Failed to fetch blog posts for sitemap generation: ${blogsResponse.error.message}`);
  } else {
    dynamicEntries.push(
      ...blogsResponse.data.map((post) => ({
        path: `/blog/${post.slug}`,
        changefreq: "monthly",
        priority: "0.7",
        lastmod: toIsoDate(post.updated_at ?? post.published_at),
      })),
    );
  }

  if (projectsResponse.error) {
    console.warn(`[seo] Failed to fetch case studies for sitemap generation: ${projectsResponse.error.message}`);
  } else {
    dynamicEntries.push(
      ...projectsResponse.data.map((project) => ({
        path: `/projects/${project.slug}`,
        changefreq: "monthly",
        priority: "0.8",
        lastmod: toIsoDate(project.updated_at),
      })),
    );
  }

  return dynamicEntries;
};

const buildSitemapXml = (entries) => {
  const urlEntries = entries
    .map((entry) => {
      const lastmodTag = entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : "";

      return `  <url>\n    <loc>${escapeXml(absoluteUrl(entry.path))}</loc>${lastmodTag}\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
};

const env = {
  ...(await parseEnvFile()),
  ...process.env,
};

const dynamicEntries = await loadDynamicEntries(env);
const sitemapEntries = [
  ...staticPages.map((page) => ({
    ...page,
    lastmod: null,
  })),
  ...dynamicEntries,
];

await writeFile(sitemapPath, buildSitemapXml(sitemapEntries), "utf8");

console.log(
  `[seo] Generated sitemap with ${staticPages.length} static URLs and ${dynamicEntries.length} dynamic URLs.`,
);
