import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import Seo from "@/components/Seo";
import { FadeUp } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { createTitle } from "@/lib/seo";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, isLoading, session, signIn, signOut, user } = useAdminAuth();

  const redirectTo =
    typeof location.state === "object" && location.state && "from" in location.state
      ? String(location.state.from)
      : "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAdmin) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAdmin, isLoading, navigate, redirectTo]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Enter the admin email and password first.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await signIn(email, password);

      if (!result.adminUser) {
        await signOut();
        toast.error("This account is not registered as an admin.");
        return;
      }

      toast.success("Admin access granted.");
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-secondary px-6 py-20">
      <Seo
        title={createTitle("Admin Login")}
        description="Protected Nexaform admin login."
        path="/admin/login"
        noindex
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.12),transparent_28%)]" />

      <div className="container relative z-10 flex min-h-[calc(100vh-10rem)] items-center justify-center">
        <div className="w-full max-w-2xl">
          <FadeUp>
            <div className="inline-flex rounded-[1.35rem] border border-border/60 bg-white/80 px-4 py-3 shadow-[0_16px_28px_rgba(15,23,42,0.08)]">
              <Logo imageClassName="h-10 sm:h-11" />
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/75 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.28em] text-primary shadow-[0_12px_24px_rgba(59,130,246,0.08)]">
              <ShieldCheck size={14} />
              Supabase Admin Login
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Sign in to the Nexaform admin workspace
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="mt-4 max-w-[60ch] text-base leading-8 text-muted-foreground md:text-lg">
              Admin routes require a valid Supabase session and a matching active record in the
              `admin_users` table. Admin accounts are managed directly in Supabase.
            </p>
          </FadeUp>

          <FadeUp delay={0.22}>
            <div className="mt-10 card-surface rounded-[2rem] p-6 sm:p-8">
              {isLoading ? (
                <div className="rounded-2xl border border-border/60 bg-secondary/35 px-5 py-6 text-sm text-muted-foreground">
                  Verifying the current session...
                </div>
              ) : session && !isAdmin ? (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-5 py-5 text-sm text-destructive">
                    {user?.email ?? "This account"} is signed in, but it is not registered as an
                    active admin.
                  </div>
                  <Button type="button" variant="outline" onClick={() => void signOut()}>
                    Use Another Account
                  </Button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleLogin}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <LockKeyhole size={20} />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-semibold text-foreground">
                        Admin access
                      </h2>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        Use the email and password for an account whose email has already been
                        registered in Supabase as an admin.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-email-login">Admin Email</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="admin-email-login"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="admin@nexa-form.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-password-login">Password</Label>
                    <Input
                      id="admin-password-login"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter password"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button type="submit" variant="gradient" size="lg" disabled={submitting}>
                      {submitting ? "Signing In..." : "Sign In"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
