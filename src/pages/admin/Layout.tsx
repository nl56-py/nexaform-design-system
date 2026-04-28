import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { BookText, FolderKanban, LayoutDashboard, LogOut, Mail, SearchCheck, ShieldCheck } from "lucide-react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { createTitle } from "@/lib/seo";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", to: "/admin" },
  { icon: SearchCheck, label: "SEO & Campaign", to: "/admin/seo-campaign" },
  { icon: FolderKanban, label: "Projects", to: "/admin/projects" },
  { icon: BookText, label: "Blogs", to: "/admin/blogs" },
  { icon: Mail, label: "Contacts", to: "/admin/contacts" },
];

const AdminLayoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminUser, signOut, user } = useAdminAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-secondary px-6 py-12">
      <Seo
        title={createTitle("Admin Workspace")}
        description="Protected Nexaform admin workspace."
        path={location.pathname}
        noindex
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.14),transparent_30%)]" />

      <div className="container relative z-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/75 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.28em] text-primary shadow-[0_12px_24px_rgba(59,130,246,0.08)]">
              <ShieldCheck size={14} />
              Protected Admin Workspace
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Manage projects, blogs, SEO campaigns, and inbound leads
            </h1>
            <p className="mt-4 max-w-[64ch] text-base leading-8 text-muted-foreground md:text-lg">
              Signed in as {adminUser?.display_name || user?.email || "admin user"}. These routes
              are protected by Supabase Auth and database-backed admin authorization.
            </p>
          </div>

          <Button type="button" variant="outline" onClick={() => void handleLogout()}>
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 rounded-2xl border border-border/60 bg-white/75 p-2 shadow-[0_12px_24px_rgba(22,34,71,0.06)]">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-[0_12px_24px_rgba(59,130,246,0.18)]"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`
              }
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayoutPage;
