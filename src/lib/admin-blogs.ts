import { supabase } from "@/integrations/supabase/client";
import type { BlogRecord } from "@/lib/blogs";
import { toSupabaseError } from "@/lib/supabase-errors";

export const listAdminBlogs = async () => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw toSupabaseError(error, "Failed to load blog posts.");
  }

  return (data ?? []) as BlogRecord[];
};

export const saveAdminBlog = async (blog: Record<string, unknown>) => {
  if (typeof blog.id === "string" && blog.id.trim()) {
    const { data, error } = await supabase
      .from("blog_posts")
      .update(blog)
      .eq("id", blog.id)
      .select("*")
      .single();

    if (error) {
      throw toSupabaseError(error, "Failed to update the blog post.");
    }

    return data as BlogRecord;
  }

  const { data, error } = await supabase.from("blog_posts").insert(blog).select("*").single();

  if (error) {
    throw toSupabaseError(error, "Failed to create the blog post.");
  }

  return data as BlogRecord;
};

export const deleteAdminBlog = async (id: string) => {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    throw toSupabaseError(error, "Failed to delete the blog post.");
  }
};
