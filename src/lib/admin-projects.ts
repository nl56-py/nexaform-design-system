import { supabase } from "@/integrations/supabase/client";
import type { ProjectRecord } from "@/lib/projects";

export const listAdminProjects = async () => {
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message || "Failed to load projects.");
  }

  return (data ?? []) as ProjectRecord[];
};

export const saveAdminProject = async (project: Record<string, unknown>) => {
  if (typeof project.id === "string" && project.id.trim()) {
    const { data, error } = await supabase
      .from("case_studies")
      .update(project)
      .eq("id", project.id)
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message || "Failed to update the project.");
    }

    return data as ProjectRecord;
  }

  const { data, error } = await supabase.from("case_studies").insert(project).select("*").single();

  if (error) {
    throw new Error(error.message || "Failed to create the project.");
  }

  return data as ProjectRecord;
};

export const deleteAdminProject = async (id: string) => {
  const { error } = await supabase.from("case_studies").delete().eq("id", id);

  if (error) {
    throw new Error(error.message || "Failed to delete the project.");
  }
};
