import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { toSupabaseError } from "@/lib/supabase-errors";

export type ProjectRecord = Tables<"case_studies">;

export interface ProjectFormValues {
  id: string | null;
  title: string;
  slug: string;
  description: string;
  outcome: string;
  tags: string;
  industry: string;
  coverImage: string;
  content: string;
  published: boolean;
  displayOrder: number;
}

export const emptyProjectForm = (): ProjectFormValues => ({
  id: null,
  title: "",
  slug: "",
  description: "",
  outcome: "",
  tags: "",
  industry: "",
  coverImage: "",
  content: "",
  published: true,
  displayOrder: 0,
});

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const tagsToString = (tags: string[] | null | undefined) => (tags ?? []).join(", ");

export const parseTagString = (value: string) =>
  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

export const projectToFormValues = (project: ProjectRecord): ProjectFormValues => ({
  id: project.id,
  title: project.title,
  slug: project.slug,
  description: project.description,
  outcome: project.outcome,
  tags: tagsToString(project.tags),
  industry: project.industry ?? "",
  coverImage: project.cover_image ?? "",
  content: project.content ?? "",
  published: project.published,
  displayOrder: project.display_order,
});

export const buildProjectPayload = (form: ProjectFormValues) => ({
  id: form.id ?? undefined,
  title: form.title.trim(),
  slug: slugify(form.slug || form.title),
  description: form.description.trim(),
  outcome: form.outcome.trim(),
  tags: parseTagString(form.tags),
  industry: form.industry.trim() || null,
  cover_image: form.coverImage.trim() || null,
  content: form.content.trim() || null,
  published: form.published,
  display_order: Number.isFinite(form.displayOrder) ? form.displayOrder : 0,
});

export const fetchPublishedProjects = async (limit?: number) => {
  let query = supabase
    .from("case_studies")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (typeof limit === "number") {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw toSupabaseError(error, "Failed to load published projects.");
  }

  return data;
};
