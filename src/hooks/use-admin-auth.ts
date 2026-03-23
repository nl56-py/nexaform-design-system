import { useContext } from "react";
import { AdminAuthContext } from "@/components/admin/admin-auth-context";

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider.");
  }

  return context;
};
