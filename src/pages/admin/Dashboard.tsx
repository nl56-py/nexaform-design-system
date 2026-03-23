import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, BookText, FolderKanban, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listAdminBlogs } from "@/lib/admin-blogs";
import { listAdminContactSubmissions } from "@/lib/admin-contacts";
import { listAdminProjects } from "@/lib/admin-projects";

const sections = [
  {
    description: "Add rich project stories, reorder case studies, and upload cover imagery.",
    icon: FolderKanban,
    title: "Projects",
    to: "/admin/projects",
  },
  {
    description: "Write and publish blog posts with a richer editor, metadata, and media uploads.",
    icon: BookText,
    title: "Blogs",
    to: "/admin/blogs",
  },
  {
    description: "Review inbound leads, keep the pipeline current, and follow up faster.",
    icon: Mail,
    title: "Contacts",
    to: "/admin/contacts",
  },
];

const formatRelativeTime = (value: string | null) => {
  if (!value) {
    return "No date";
  }

  return formatDistanceToNow(new Date(value), { addSuffix: true });
};

const AdminDashboardPage = () => {
  const { data: blogs = [], isLoading: loadingBlogs } = useQuery({
    queryKey: ["dashboard", "blogs"],
    queryFn: listAdminBlogs,
  });
  const { data: projects = [], isLoading: loadingProjects } = useQuery({
    queryKey: ["dashboard", "projects"],
    queryFn: listAdminProjects,
  });
  const { data: contacts = [], isLoading: loadingContacts } = useQuery({
    queryKey: ["dashboard", "contacts"],
    queryFn: listAdminContactSubmissions,
  });

  const isLoading = loadingBlogs || loadingProjects || loadingContacts;
  const publishedBlogs = blogs.filter((blog) => blog.published).length;
  const publishedProjects = projects.filter((project) => project.published).length;
  const newContacts = contacts.filter((contact) => contact.status === "new").length;
  const reviewingContacts = contacts.filter((contact) => contact.status === "reviewing").length;

  const recentActivity = useMemo(
    () =>
      [
        ...blogs.map((blog) => ({
          id: blog.id,
          kind: blog.published ? "Published blog" : "Draft blog",
          timestamp: blog.published_at ?? blog.updated_at,
          title: blog.title,
        })),
        ...projects.map((project) => ({
          id: project.id,
          kind: project.published ? "Published project" : "Draft project",
          timestamp: project.updated_at,
          title: project.title,
        })),
        ...contacts.map((contact) => ({
          id: contact.id,
          kind: "Contact submission",
          timestamp: contact.created_at,
          title: `${contact.name} - ${contact.status}`,
        })),
      ]
        .sort((left, right) => new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime())
        .slice(0, 6),
    [blogs, contacts, projects],
  );

  return (
    <div className="space-y-6">
      <div className="card-surface rounded-card p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck size={20} />
            </div>
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Admin workspace overview
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
                Manage projects, blog posts, media uploads, and inbound leads from one place. The
                content editors now support rich text and storage-backed image uploads.
              </p>
            </div>
          </div>

          <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            Live Supabase content
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="card-surface rounded-card p-5">
          <div className="text-sm text-muted-foreground">Projects published</div>
          <div className="mt-2 font-display text-3xl font-semibold text-foreground">
            {publishedProjects}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">{projects.length} total projects</div>
        </div>
        <div className="card-surface rounded-card p-5">
          <div className="text-sm text-muted-foreground">Blog posts published</div>
          <div className="mt-2 font-display text-3xl font-semibold text-foreground">
            {publishedBlogs}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">{blogs.length} total posts</div>
        </div>
        <div className="card-surface rounded-card p-5">
          <div className="text-sm text-muted-foreground">New contacts</div>
          <div className="mt-2 font-display text-3xl font-semibold text-foreground">{newContacts}</div>
          <div className="mt-2 text-sm text-muted-foreground">{reviewingContacts} under review</div>
        </div>
        <div className="card-surface rounded-card p-5">
          <div className="text-sm text-muted-foreground">Recent activity</div>
          <div className="mt-2 font-display text-3xl font-semibold text-foreground">
            {recentActivity.length}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Fresh updates across content and lead intake
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="card-surface rounded-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground">Recent activity</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                The latest content and contact updates from your admin workspace.
              </p>
            </div>
            {isLoading && <Badge variant="outline">Loading...</Badge>}
          </div>

          <div className="mt-5 space-y-3">
            {!isLoading && recentActivity.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border/60 bg-secondary/35 px-4 py-5 text-sm text-muted-foreground">
                No activity yet. Create a project or blog post to get started.
              </div>
            )}

            {recentActivity.map((item) => (
              <div
                key={`${item.kind}-${item.id}`}
                className="rounded-2xl border border-border/60 bg-secondary/30 px-4 py-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      {item.kind}
                    </div>
                    <div className="mt-1 font-medium text-foreground">{item.title}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{formatRelativeTime(item.timestamp)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-surface rounded-card p-6">
            <h3 className="font-display text-xl font-semibold text-foreground">Quick actions</h3>
            <div className="mt-4 space-y-3">
              {sections.map((section) => (
                <div
                  key={section.to}
                  className="rounded-2xl border border-border/60 bg-secondary/30 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <section.icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-lg font-semibold text-foreground">
                        {section.title}
                      </div>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {section.description}
                      </p>
                      <Button asChild variant="ghost" className="mt-3 px-0 text-primary hover:bg-transparent">
                        <Link to={section.to}>
                          Open {section.title}
                          <ArrowRight size={16} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface rounded-card p-6">
            <h3 className="font-display text-xl font-semibold text-foreground">Pipeline snapshot</h3>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-border/60 bg-secondary/30 px-4 py-4">
                <div className="text-sm text-muted-foreground">New inquiries</div>
                <div className="mt-1 font-display text-2xl font-semibold text-foreground">{newContacts}</div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-secondary/30 px-4 py-4">
                <div className="text-sm text-muted-foreground">Reviewing</div>
                <div className="mt-1 font-display text-2xl font-semibold text-foreground">
                  {reviewingContacts}
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-secondary/30 px-4 py-4">
                <div className="text-sm text-muted-foreground">Editing workflow</div>
                <div className="mt-1 text-sm leading-6 text-muted-foreground">
                  Projects and blogs now support richer writing and direct image uploads to Supabase storage.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
