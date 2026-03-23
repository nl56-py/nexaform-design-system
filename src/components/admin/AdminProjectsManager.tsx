import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { FolderKanban, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AdminImageField from "@/components/admin/AdminImageField";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { deleteAdminProject, listAdminProjects, saveAdminProject } from "@/lib/admin-projects";
import {
  buildProjectPayload,
  emptyProjectForm,
  projectToFormValues,
  slugify,
  type ProjectFormValues,
} from "@/lib/projects";

const queryKey = ["admin-projects"];

const formatRelativeDate = (value: string | null) => {
  if (!value) {
    return "No updates yet";
  }

  return formatDistanceToNow(new Date(value), { addSuffix: true });
};

const AdminProjectsManager = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<ProjectFormValues>(emptyProjectForm());
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey,
    queryFn: listAdminProjects,
  });

  useEffect(() => {
    if (!form.id && projects.length > 0) {
      setForm(projectToFormValues(projects[0]));
    }
  }, [projects, form.id]);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === form.id) ?? null,
    [projects, form.id],
  );
  const publishedCount = projects.filter((project) => project.published).length;
  const draftCount = projects.length - publishedCount;

  const startNewProject = () => setForm(emptyProjectForm());

  const editProject = (projectId: string) => {
    const project = projects.find((item) => item.id === projectId);
    if (project) {
      setForm(projectToFormValues(project));
    }
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = buildProjectPayload(form);

    if (!payload.title || !payload.description || !payload.outcome || !payload.slug) {
      toast.error("Title, slug, description, and outcome are required.");
      return;
    }

    setSubmitting(true);

    try {
      const saved = await saveAdminProject(payload);
      await queryClient.invalidateQueries({ queryKey });

      if (saved) {
        setForm(projectToFormValues(saved));
      }

      toast.success(form.id ? "Project updated." : "Project created.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save project.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!form.id) {
      return;
    }

    if (!window.confirm("Delete this project permanently?")) {
      return;
    }

    setDeleting(true);

    try {
      await deleteAdminProject(form.id);
      await queryClient.invalidateQueries({ queryKey });
      setForm(emptyProjectForm());
      toast.success("Project deleted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete project.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)]">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card-surface rounded-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FolderKanban size={18} />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total projects</div>
                <div className="font-display text-2xl font-semibold text-foreground">
                  {projects.length}
                </div>
              </div>
            </div>
          </div>
          <div className="card-surface rounded-card p-5">
            <div className="text-sm text-muted-foreground">Publishing status</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10">
                {publishedCount} published
              </Badge>
              <Badge variant="outline">{draftCount} drafts</Badge>
            </div>
          </div>
        </div>

        <div className="card-surface rounded-card p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">Projects</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Case studies, supporting imagery, and richer delivery notes all live here.
              </p>
            </div>
            <Button type="button" variant="outline" onClick={startNewProject}>
              <Plus size={16} />
              New
            </Button>
          </div>

          <div className="mt-5 space-y-3">
            {isLoading && (
              <div className="rounded-2xl border border-border/50 bg-secondary/45 px-4 py-5 text-sm text-muted-foreground">
                Loading projects...
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-5 text-sm text-destructive">
                {error instanceof Error ? error.message : "Failed to load projects."}
              </div>
            )}

            {!isLoading && !error && projects.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border/60 bg-secondary/45 px-4 py-5 text-sm text-muted-foreground">
                No projects yet. Create the first one from the editor.
              </div>
            )}

            {projects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => editProject(project.id)}
                className={`w-full rounded-2xl border p-4 text-left transition-all ${
                  project.id === selectedProject?.id
                    ? "border-primary/35 bg-primary/8 shadow-[0_12px_28px_rgba(59,130,246,0.08)]"
                    : "border-border/60 bg-secondary/35 hover:border-primary/20 hover:bg-secondary/55"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-display text-lg font-semibold text-foreground">
                      {project.title}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      /{project.slug}
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] ${
                      project.published
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-border/60 text-muted-foreground"
                    }`}
                  >
                    {project.published ? "Published" : "Draft"}
                  </span>
                </div>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-3 text-xs text-muted-foreground">
                  Updated {formatRelativeDate(project.updated_at)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card-surface rounded-card p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              {form.id ? "Edit project" : "Create project"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Only published projects appear in the public sections of the site.
            </p>
          </div>

          {form.id && (
            <Button
              type="button"
              variant="outline"
              className="border-destructive/30 text-destructive hover:bg-destructive/5"
              onClick={handleDelete}
              disabled={deleting}
            >
              <Trash2 size={16} />
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          )}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSave}>
          <div className="rounded-[1.5rem] border border-border/60 bg-secondary/30 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-display text-lg font-semibold text-foreground">
                  {form.id ? "Editing case study" : "Creating a new case study"}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Capture the story, outcome, screenshots, and implementation detail in one flow.
                </p>
              </div>
              <Badge variant="outline">{form.id ? "Update mode" : "Create mode"}</Badge>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="project-title">Title</Label>
              <Input
                id="project-title"
                value={form.title}
                onChange={(event) => {
                  const title = event.target.value;
                  setForm((current) => ({
                    ...current,
                    title,
                    slug: current.slug ? current.slug : slugify(title),
                  }));
                }}
                placeholder="Operations dashboard for logistics team"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-slug">Slug</Label>
              <Input
                id="project-slug"
                value={form.slug}
                onChange={(event) =>
                  setForm((current) => ({ ...current, slug: slugify(event.target.value) }))
                }
                placeholder="operations-dashboard-logistics-team"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-industry">Industry</Label>
              <Input
                id="project-industry"
                value={form.industry}
                onChange={(event) =>
                  setForm((current) => ({ ...current, industry: event.target.value }))
                }
                placeholder="Logistics"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-order">Display Order</Label>
              <Input
                id="project-order"
                type="number"
                value={String(form.displayOrder)}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    displayOrder: Number(event.target.value || 0),
                  }))
                }
              />
            </div>
          </div>

          <AdminImageField
            id="project-cover"
            label="Cover Image"
            folder="projects/covers"
            value={form.coverImage}
            previewAlt={form.title || "Project cover preview"}
            description="Paste a public image URL or upload directly to the admin-media bucket."
            onChange={(value) => setForm((current) => ({ ...current, coverImage: value }))}
          />

          <div className="space-y-2">
            <Label htmlFor="project-tags">Tags</Label>
            <Input
              id="project-tags"
              value={form.tags}
              onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))}
              placeholder="Dashboard, Operations, Analytics"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description">Short Description</Label>
            <Textarea
              id="project-description"
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
              className="min-h-[120px]"
              placeholder="Describe the problem, the build, and the business context."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-outcome">Outcome</Label>
            <Textarea
              id="project-outcome"
              value={form.outcome}
              onChange={(event) =>
                setForm((current) => ({ ...current, outcome: event.target.value }))
              }
              className="min-h-[110px]"
              placeholder="Summarize the measurable or strategic result."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-content">Full Content</Label>
            <RichTextEditor
              value={form.content}
              folder="projects/content"
              placeholder="Tell the implementation story with formatted sections, lists, images, and supporting detail."
              minHeightClassName="min-h-[360px]"
              onChange={(value) => setForm((current) => ({ ...current, content: value }))}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-secondary/35 px-4 py-4">
            <div>
              <div className="font-display text-base font-semibold text-foreground">Published</div>
              <div className="text-sm text-muted-foreground">
                Published projects appear on the public site.
              </div>
            </div>
            <Switch
              checked={form.published}
              onCheckedChange={(checked) => setForm((current) => ({ ...current, published: checked }))}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" variant="gradient" disabled={submitting}>
              <Save size={16} />
              {submitting ? "Saving..." : form.id ? "Update Project" : "Create Project"}
            </Button>
            <Button type="button" variant="outline" onClick={startNewProject}>
              Reset Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProjectsManager;
