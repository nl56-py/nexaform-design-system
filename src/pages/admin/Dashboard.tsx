import { Link } from "react-router-dom";
import { BookText, FolderKanban, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    description: "Add, edit, publish, and reorder the case studies shown across the site.",
    icon: FolderKanban,
    title: "Projects",
    to: "/admin/projects",
  },
  {
    description: "Manage published and draft blog posts with full control over metadata and copy.",
    icon: BookText,
    title: "Blogs",
    to: "/admin/blogs",
  },
  {
    description: "Review contact submissions and keep their pipeline status updated from one place.",
    icon: Mail,
    title: "Contacts",
    to: "/admin/contacts",
  },
];

const AdminDashboardPage = () => (
  <div className="space-y-6">
    <div className="card-surface rounded-card p-6 sm:p-7">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ShieldCheck size={20} />
        </div>
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Admin access is now backed by Supabase
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
            A signed-in user only gets in when their email is registered in `public.admin_users`,
            and the database RLS policies only allow those admins to manage projects, blog posts,
            and contact submissions.
          </p>
        </div>
      </div>
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      {sections.map((section) => (
        <div key={section.to} className="card-surface rounded-card p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <section.icon size={20} />
          </div>
          <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
            {section.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{section.description}</p>
          <Button asChild variant="outline" className="mt-6">
            <Link to={section.to}>Open {section.title}</Link>
          </Button>
        </div>
      ))}
    </div>
  </div>
);

export default AdminDashboardPage;
