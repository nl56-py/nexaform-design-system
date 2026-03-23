import { createContext } from "react";
import type { Session, User } from "@supabase/supabase-js";
import type { AdminUserRecord } from "@/lib/admin-auth";

export interface AdminAuthContextValue {
  adminUser: AdminUserRecord | null;
  isAdmin: boolean;
  isLoading: boolean;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<{
    adminUser: AdminUserRecord | null;
    session: Session | null;
    user: User | null;
  }>;
  signOut: () => Promise<void>;
  user: User | null;
}

export const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);
