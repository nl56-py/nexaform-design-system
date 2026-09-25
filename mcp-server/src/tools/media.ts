import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFile } from "node:fs/promises";
import { basename, extname } from "node:path";
import crypto from "node:crypto";
import { supabase, ADMIN_MEDIA_BUCKET, formatError } from "../client.js";

function sanitizeFilename(filename: string): string {
  return filename
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getMimeType(extension: string): string {
  const map: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".gif": "image/gif",
    ".pdf": "application/pdf",
    ".mp4": "video/mp4",
  };
  return map[extension.toLowerCase()] || "application/octet-stream";
}

export function registerMediaTools(server: McpServer) {
  server.tool(
    "cms_upload_media",
    "Upload an image or asset to the Supabase admin-media storage bucket from a local file path, remote URL, or base64 data. Returns the permanent public CDN URL to attach to blog posts, case studies, or page assets.",
    {
      filePath: z
        .string()
        .optional()
        .describe(
          "Absolute or relative path to a local image/file on disk (e.g., 'C:/Users/.../cover.png' or 'src/assets/hero.webp')"
        ),
      url: z
        .string()
        .optional()
        .describe("A public HTTP/HTTPS URL of an image to download and upload into the CMS media bucket"),
      base64Data: z
        .string()
        .optional()
        .describe("Base64-encoded raw file content"),
      filename: z
        .string()
        .optional()
        .describe("Optional target filename (e.g., 'design-system-hero.png')"),
      folder: z
        .string()
        .default("blogs")
        .describe("Target folder in the bucket (e.g., 'blogs', 'projects', 'careers', 'general')"),
      contentType: z
        .string()
        .optional()
        .describe("Explicit MIME type (e.g., 'image/png', 'image/webp')"),
    },
    async ({ filePath, url, base64Data, filename, folder, contentType }) => {
      try {
        let buffer: Buffer;
        let originalName = filename || "media";
        let mime = contentType;

        if (filePath) {
          buffer = await readFile(filePath);
          if (!filename) originalName = basename(filePath);
          if (!mime) mime = getMimeType(extname(filePath));
        } else if (url) {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`Failed to fetch media from URL (${res.status} ${res.statusText})`);
          }
          const arrayBuffer = await res.arrayBuffer();
          buffer = Buffer.from(arrayBuffer);
          if (!mime) mime = res.headers.get("content-type") || undefined;
          if (!filename) {
            const urlPath = new URL(url).pathname;
            originalName = basename(urlPath) || "downloaded-image";
          }
        } else if (base64Data) {
          const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, "");
          buffer = Buffer.from(cleanBase64, "base64");
          if (!mime && base64Data.startsWith("data:")) {
            const match = base64Data.match(/^data:([^;]+);/);
            if (match) mime = match[1];
          }
        } else {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: "Error: You must provide at least one of 'filePath', 'url', or 'base64Data'.",
              },
            ],
          };
        }

        const ext = extname(originalName) || (mime ? `.${mime.split("/")[1]}` : ".bin");
        const base = sanitizeFilename(originalName.replace(/\.[^.]+$/, "")) || "asset";
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const uniqueId = crypto.randomUUID();
        const safeFolder = folder.replace(/^\/+|\/+$/g, "");
        const storagePath = `${safeFolder}/${timestamp}-${uniqueId}-${base}${ext.startsWith(".") ? ext : `.${ext}`}`;

        const { error: uploadError } = await supabase.storage
          .from(ADMIN_MEDIA_BUCKET)
          .upload(storagePath, buffer, {
            contentType: mime || getMimeType(ext),
            upsert: false,
          });

        if (uploadError) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: `Failed to upload to Supabase storage: ${formatError(uploadError)}. Please ensure SUPABASE_SERVICE_ROLE_KEY is configured.`,
              },
            ],
          };
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from(ADMIN_MEDIA_BUCKET).getPublicUrl(storagePath);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: true,
                  publicUrl,
                  storagePath,
                  bucket: ADMIN_MEDIA_BUCKET,
                  sizeBytes: buffer.length,
                  contentType: mime || getMimeType(ext),
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `cms_upload_media error: ${formatError(err)}`,
            },
          ],
        };
      }
    }
  );

  server.tool(
    "cms_list_media",
    "List files stored in a folder within the admin-media Supabase storage bucket.",
    {
      folder: z.string().default("blogs").describe("Folder name (e.g. 'blogs', 'projects')"),
      limit: z.number().default(50).describe("Maximum items to list"),
      offset: z.number().default(0).describe("Offset for pagination"),
    },
    async ({ folder, limit, offset }) => {
      try {
        const { data, error } = await supabase.storage
          .from(ADMIN_MEDIA_BUCKET)
          .list(folder, { limit, offset, sortBy: { column: "created_at", order: "desc" } });

        if (error) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: `Failed to list files from admin-media/${folder}: ${formatError(error)}`,
              },
            ],
          };
        }

        const itemsWithUrls = (data || []).map((file) => {
          const path = `${folder}/${file.name}`;
          const {
            data: { publicUrl },
          } = supabase.storage.from(ADMIN_MEDIA_BUCKET).getPublicUrl(path);
          return {
            ...file,
            publicUrl,
          };
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(itemsWithUrls, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: "text", text: `cms_list_media error: ${formatError(err)}` }],
        };
      }
    }
  );
}
