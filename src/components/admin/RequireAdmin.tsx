import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { useAdminAuth } from "@/hooks/use-admin-auth";

const AdminRouteLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-secondary px-6">
    <div className="card-surface w-full max-w-lg rounded-[2rem] p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <ShieldCheck size={22} />
      </div>
      <h1 className="mt-6 font-display text-2xl font-semibold text-foreground">
        Checking admin access
      </h1>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Verifying the Supabase session and registered admin record.
      </p>
    </div>
  </div>
);

const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { isAdmin, isLoading, session } = useAdminAuth();

  if (isLoading) {
    return <AdminRouteLoader />;
  }

  if (!session || !isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: `${location.pathname}${location.search}` }} />;
  }

  return <>{children}</>;
};

export default RequireAdmin;
