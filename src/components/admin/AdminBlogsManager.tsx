import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { CalendarDays, Newspaper, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AdminImageField from "@/components/admin/AdminImageField";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { deleteAdminBlog, listAdminBlogs, saveAdminBlog } from "@/lib/admin-blogs";
import {
  blogToFormValues,
  buildBlogPayload,
  emptyBlogForm,
  type BlogFormValues,
} from "@/lib/blogs";
import { slugify } from "@/lib/projects";

const queryKey = ["admin-blogs"];

const formatRelativeDate = (value: string | null) => {
  if (!value) {
    return "No date yet";
  }

  return formatDistanceToNow(new Date(value), { addSuffix: true });
};

const AdminBlogsManager = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<BlogFormValues>(emptyBlogForm());
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { data: blogs = [], isLoading, error } = useQuery({
    queryKey,
    queryFn: listAdminBlogs,
  });

  useEffect(() => {
    if (isCreatingNew) {
      return;
    }

    const hasSelectedBlog = form.id ? blogs.some((blog) => blog.id === form.id) : false;

    if (!hasSelectedBlog && blogs.length > 0) {
      setForm(blogToFormValues(blogs[0]));
    }
  }, [blogs, form.id, isCreatingNew]);

  const selectedBlog = useMemo(
    () => blogs.find((blog) => blog.id === form.id) ?? null,
    [blogs, form.id],
  );
  const publishedCount = blogs.filter((blog) => blog.published).length;
  const draftCount = blogs.length - publishedCount;

  const startNewBlog = () => {
    setIsCreatingNew(true);
    setForm(emptyBlogForm());
  };

  const editBlog = (blogId: string) => {
    const blog = blogs.find((item) => item.id === blogId);
    if (blog) {
      setIsCreatingNew(false);
      setForm(blogToFormValues(blog));
    }
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = buildBlogPayload(form);

    if (!payload.title || !payload.slug || !payload.excerpt || !payload.category) {
      toast.error("Title, slug, excerpt, and category are required.");
      return;
    }

    setSubmitting(true);

    try {
      const saved = await saveAdminBlog(payload);
      await queryClient.invalidateQueries({ queryKey });

      if (saved) {
        setIsCreatingNew(false);
        setForm(blogToFormValues(saved));
      }

      toast.success(form.id ? "Blog post updated." : "Blog post created.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save blog post.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!form.id) {
      return;
    }

    if (!window.confirm("Delete this blog post permanently?")) {
      return;
    }

    setDeleting(true);

    try {
      await deleteAdminBlog(form.id);
      await queryClient.invalidateQueries({ queryKey });
      setIsCreatingNew(false);
      setForm(emptyBlogForm());
      toast.success("Blog post deleted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete blog post.");
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
                <Newspaper size={18} />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total posts</div>
                <div className="font-display text-2xl font-semibold text-foreground">{blogs.length}</div>
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
              <h2 className="font-display text-xl font-semibold text-foreground">Blog posts</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Rich text articles, covers, and publishing controls all live here now.
              </p>
            </div>
            <Button type="button" variant="outline" onClick={startNewBlog}>
              <Plus size={16} />
              New
            </Button>
          </div>

          <div className="mt-5 space-y-3">
            {isLoading && (
              <div className="rounded-2xl border border-border/50 bg-secondary/45 px-4 py-5 text-sm text-muted-foreground">
                Loading blog posts...
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-5 text-sm text-destructive">
                {error instanceof Error ? error.message : "Failed to load blog posts."}
              </div>
            )}

            {!isLoading && !error && blogs.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border/60 bg-secondary/45 px-4 py-5 text-sm text-muted-foreground">
                No blog posts yet. Create the first one from the editor.
              </div>
            )}

            {blogs.map((blog) => (
              <button
                key={blog.id}
                type="button"
                onClick={() => editBlog(blog.id)}
                className={`w-full rounded-2xl border p-4 text-left transition-all ${
                  blog.id === selectedBlog?.id
                    ? "border-primary/35 bg-primary/8 shadow-[0_12px_28px_rgba(59,130,246,0.08)]"
                    : "border-border/60 bg-secondary/35 hover:border-primary/20 hover:bg-secondary/55"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-display text-lg font-semibold text-foreground">{blog.title}</div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      {blog.category}
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] ${
                      blog.published
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-border/60 text-muted-foreground"
                    }`}
                  >
                    {blog.published ? "Published" : "Draft"}
                  </span>
                </div>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {blog.excerpt}
                </p>

                <div className="mt-3 text-xs text-muted-foreground">
                  {blog.published
                    ? `Published ${formatRelativeDate(blog.published_at)}`
                    : `Updated ${formatRelativeDate(blog.updated_at)}`}
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
              {form.id ? "Edit blog post" : "Create blog post"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Published posts appear on the blog page and the homepage insights section.
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
                  {form.id ? "Editing existing post" : "Drafting a new post"}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Use the rich editor for long-form writing and upload images without leaving the page.
                </p>
              </div>
              <Badge variant="outline">{form.id ? "Update mode" : "Create mode"}</Badge>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="blog-title">Title</Label>
              <Input
                id="blog-title"
                value={form.title}
                onChange={(event) => {
                  const title = event.target.value;
                  setForm((current) => ({
                    ...current,
                    title,
                    slug: current.slug ? current.slug : slugify(title),
                  }));
                }}
                placeholder="How AI automation reduces internal busywork"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="blog-slug">Slug</Label>
              <Input
                id="blog-slug"
                value={form.slug}
                onChange={(event) =>
                  setForm((current) => ({ ...current, slug: slugify(event.target.value) }))
                }
                placeholder="how-ai-automation-reduces-internal-busywork"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="blog-category">Category</Label>
              <Input
                id="blog-category"
                value={form.category}
                onChange={(event) =>
                  setForm((current) => ({ ...current, category: event.target.value }))
                }
                placeholder="AI & Automation"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="blog-published-at">Published At</Label>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="blog-published-at"
                  value={form.publishedAt}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, publishedAt: event.target.value }))
                  }
                  className="pl-10"
                  placeholder="2026-03-23T12:00:00.000Z"
                />
              </div>
            </div>
          </div>

          <AdminImageField
            id="blog-cover"
            label="Cover Image"
            folder="blogs/covers"
            value={form.coverImage}
            previewAlt={form.title || "Blog cover preview"}
            description="Paste a public image URL or upload directly to the admin-media bucket."
            onChange={(value) => setForm((current) => ({ ...current, coverImage: value }))}
          />

          <div className="space-y-2">
            <Label htmlFor="blog-tags">Tags</Label>
            <Input
              id="blog-tags"
              value={form.tags}
              onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))}
              placeholder="AI, Automation, Workflows"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-excerpt">Excerpt</Label>
            <Textarea
              id="blog-excerpt"
              value={form.excerpt}
              onChange={(event) =>
                setForm((current) => ({ ...current, excerpt: event.target.value }))
              }
              className="min-h-[120px]"
              placeholder="Short blog summary for cards and previews."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-content">Content</Label>
            <RichTextEditor
              value={form.content}
              folder="blogs/content"
              placeholder="Build the article with headings, lists, links, quotes, and uploaded images."
              minHeightClassName="min-h-[360px]"
              onChange={(value) => setForm((current) => ({ ...current, content: value }))}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-secondary/35 px-4 py-4">
            <div>
              <div className="font-display text-base font-semibold text-foreground">Published</div>
              <div className="text-sm text-muted-foreground">
                Published posts are visible on the public site.
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
              {submitting ? "Saving..." : form.id ? "Update Blog Post" : "Create Blog Post"}
            </Button>
            <Button type="button" variant="outline" onClick={startNewBlog}>
              Reset Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminBlogsManager;
