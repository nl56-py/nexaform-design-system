import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type AdminUserRecord = Tables<"admin_users">;

interface AdminAuthResult {
  adminUser: AdminUserRecord | null;
  session: Session | null;
  user: User | null;
}

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const claimAdminAccess = async () => {
  const { error } = await supabase.rpc("claim_admin_access");

  if (error) {
    throw new Error(error.message || "Failed to verify admin access.");
  }
};

export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message || "Failed to restore the current session.");
  }

  return data.session;
};

export const getAdminUser = async (user: User | null) => {
  if (!user?.email) {
    return null;
  }

  await claimAdminAccess();

  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("email", normalizeEmail(user.email))
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message || "Failed to load the admin account.");
  }

  return data;
};

export const signInAdmin = async (email: string, password: string): Promise<AdminAuthResult> => {
  const normalizedEmail = normalizeEmail(email);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  });

  if (error) {
    throw new Error(error.message || "Failed to sign in.");
  }

  const adminUser = await getAdminUser(data.user);

  return {
    adminUser,
    session: data.session,
    user: data.user,
  };
};

export const signUpAdmin = async (
  fullName: string,
  email: string,
  password: string,
): Promise<AdminAuthResult> => {
  const normalizedEmail = normalizeEmail(email);
  const { data, error } = await supabase.auth.signUp({
    email: normalizedEmail,
    password,
    options: {
      data: fullName.trim()
        ? {
            full_name: fullName.trim(),
          }
        : undefined,
    },
  });

  if (error) {
    throw new Error(error.message || "Failed to create the admin account.");
  }

  const adminUser = data.user ? await getAdminUser(data.user) : null;

  return {
    adminUser,
    session: data.session,
    user: data.user,
  };
};

export const signOutAdmin = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message || "Failed to sign out.");
  }
};
