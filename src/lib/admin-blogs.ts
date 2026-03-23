import { supabase } from "@/integrations/supabase/client";
import type { BlogRecord } from "@/lib/blogs";

export const listAdminBlogs = async () => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message || "Failed to load blog posts.");
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
      throw new Error(error.message || "Failed to update the blog post.");
    }

    return data as BlogRecord;
  }

  const { data, error } = await supabase.from("blog_posts").insert(blog).select("*").single();

  if (error) {
    throw new Error(error.message || "Failed to create the blog post.");
  }

  return data as BlogRecord;
};

export const deleteAdminBlog = async (id: string) => {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message || "Failed to delete the blog post.");
  }
};
