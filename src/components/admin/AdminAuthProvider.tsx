import { useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import {
  AdminAuthContext,
  type AdminAuthContextValue,
} from "@/components/admin/admin-auth-context";
import { supabase } from "@/integrations/supabase/client";
import {
  getAdminUser,
  getCurrentSession,
  signInAdmin,
  signOutAdmin,
  signUpAdmin,
  type AdminUserRecord,
} from "@/lib/admin-auth";

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUserRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const syncSession = async (nextSession?: Session | null) => {
      setIsLoading(true);

      try {
        const resolvedSession = nextSession === undefined ? await getCurrentSession() : nextSession;
        const resolvedAdminUser = resolvedSession?.user
          ? await getAdminUser(resolvedSession.user)
          : null;

        if (!isMounted) {
          return;
        }

        setSession(resolvedSession);
        setAdminUser(resolvedAdminUser);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error("Failed to synchronize admin auth state:", error);
        setSession(null);
        setAdminUser(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void syncSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void syncSession(nextSession);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const result = await signInAdmin(email, password);
    setSession(result.session);
    setAdminUser(result.adminUser);
    return result;
  };

  const signUp = async (fullName: string, email: string, password: string) => {
    const result = await signUpAdmin(fullName, email, password);
    setSession(result.session);
    setAdminUser(result.adminUser);
    return result;
  };

  const signOut = async () => {
    await signOutAdmin();
    setSession(null);
    setAdminUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAdmin: Boolean(adminUser),
        isLoading,
        session,
        signIn,
        signOut,
        signUp,
        user: session?.user ?? null,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
