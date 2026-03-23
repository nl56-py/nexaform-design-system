import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { parseTagString, slugify, tagsToString } from "@/lib/projects";
import { toSupabaseError } from "@/lib/supabase-errors";

export type BlogRecord = Tables<"blog_posts">;

export interface BlogFormValues {
  id: string | null;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  coverImage: string;
  published: boolean;
  publishedAt: string;
}

export const emptyBlogForm = (): BlogFormValues => ({
  id: null,
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  tags: "",
  coverImage: "",
  published: true,
  publishedAt: "",
});

export const blogToFormValues = (blog: BlogRecord): BlogFormValues => ({
  id: blog.id,
  title: blog.title,
  slug: blog.slug,
  excerpt: blog.excerpt,
  content: blog.content ?? "",
  category: blog.category,
  tags: tagsToString(blog.tags),
  coverImage: blog.cover_image ?? "",
  published: blog.published,
  publishedAt: blog.published_at ?? "",
});

export const buildBlogPayload = (form: BlogFormValues) => ({
  id: form.id ?? undefined,
  title: form.title.trim(),
  slug: slugify(form.slug || form.title),
  excerpt: form.excerpt.trim(),
  content: form.content.trim() || null,
  category: form.category.trim(),
  tags: parseTagString(form.tags),
  cover_image: form.coverImage.trim() || null,
  published: form.published,
  published_at: form.published ? form.publishedAt || new Date().toISOString() : null,
});

export const fetchPublishedBlogPosts = async (limit?: number) => {
  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (typeof limit === "number") {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw toSupabaseError(error, "Failed to load published blog posts.");
  }

  return data;
};
