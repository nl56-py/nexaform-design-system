import { supabase } from "@/integrations/supabase/client";
import { toSupabaseError } from "@/lib/supabase-errors";

const ADMIN_MEDIA_BUCKET = "admin-media";

const sanitizeFilename = (filename: string) =>
  filename
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

const getFileExtension = (file: File) => {
  const fromName = file.name.split(".").pop()?.trim().toLowerCase();

  if (fromName) {
    return fromName;
  }

  const fromType = file.type.split("/").pop()?.trim().toLowerCase();
  return fromType || "bin";
};

const createStoragePath = (folder: string, file: File) => {
  const safeFolder = folder.replace(/^\/+|\/+$/g, "");
  const extension = getFileExtension(file);
  const baseName = sanitizeFilename(file.name.replace(/\.[^.]+$/, "")) || "asset";
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

  return `${safeFolder}/${timestamp}-${crypto.randomUUID()}-${baseName}.${extension}`;
};

export const uploadAdminImage = async (file: File, folder: string) => {
  const path = createStoragePath(folder, file);

  const { error } = await supabase.storage.from(ADMIN_MEDIA_BUCKET).upload(path, file, {
    cacheControl: "3600",
    contentType: file.type || undefined,
    upsert: false,
  });

  if (error) {
    throw toSupabaseError(
      error,
      "Failed to upload the image. Check that the admin media storage bucket is configured.",
    );
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(ADMIN_MEDIA_BUCKET).getPublicUrl(path);

  return publicUrl;
};

export const adminMediaBucketName = ADMIN_MEDIA_BUCKET;
