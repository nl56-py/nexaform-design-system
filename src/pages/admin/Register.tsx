import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, ShieldPlus, UserRound } from "lucide-react";
import { toast } from "sonner";
import { FadeUp } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/hooks/use-admin-auth";

const AdminRegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, isLoading, session, signOut, signUp, user } = useAdminAuth();

  const redirectTo =
    typeof location.state === "object" && location.state && "from" in location.state
      ? String(location.state.from)
      : "/admin";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAdmin) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAdmin, isLoading, navigate, redirectTo]);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim() || !password || !confirmPassword) {
      toast.error("Enter the admin email and password details first.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await signUp(fullName, email, password);

      if (result.adminUser) {
        toast.success("Admin account created.");
        navigate(redirectTo, { replace: true });
        return;
      }

      if (result.session) {
        await signOut();
        toast.error("Account created, but this email is not registered as an admin.");
        navigate("/admin/login", { replace: true });
        return;
      }

      toast.success(
        "Account created. If this email is registered in admin_users, confirm it and sign in.",
      );
      navigate("/admin/login", { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create the admin account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-secondary px-6 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_26%)]" />

      <div className="container relative z-10 flex min-h-[calc(100vh-10rem)] items-center justify-center">
        <div className="w-full max-w-2xl">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-white/80 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-600 shadow-[0_12px_24px_rgba(16,185,129,0.08)]">
              <ShieldPlus size={14} />
              Admin Registration
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Create the Supabase admin account
            </h1>
          </FadeUp>

          <FadeUp delay={0.14}>
            <p className="mt-4 max-w-[60ch] text-base leading-8 text-muted-foreground md:text-lg">
              Only emails that already exist in the `admin_users` database table will gain access
              to the protected admin routes after signup.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="mt-10 card-surface rounded-[2rem] p-6 sm:p-8">
              {session && !isAdmin ? (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-5 py-5 text-sm text-destructive">
                    {user?.email ?? "This account"} is already signed in, but it is not registered
                    as an active admin. Sign out before creating another admin account.
                  </div>
                  <div className="space-y-2">
                    <Button type="button" variant="outline" onClick={() => void signOut()}>
                      Use Another Account
                    </Button>
                  </div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleRegister}>
                  <div className="space-y-2">
                    <Label htmlFor="admin-register-name">Full Name</Label>
                    <div className="relative">
                      <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="admin-register-name"
                        autoComplete="name"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        placeholder="Nexaform Admin"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-register-email">Admin Email</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="admin-register-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="admin@nexaform.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="admin-register-password">Password</Label>
                      <Input
                        id="admin-register-password"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Create password"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-register-confirm-password">Confirm Password</Label>
                      <Input
                        id="admin-register-confirm-password"
                        type="password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        placeholder="Repeat password"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Button type="submit" variant="gradient" size="lg" disabled={submitting}>
                      {submitting ? "Creating..." : "Create Account"}
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/admin/login">Back to Login</Link>
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

export default AdminRegisterPage;
