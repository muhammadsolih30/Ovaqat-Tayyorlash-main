import React, { createContext, useContext, useState, ReactNode } from "react";

// ===== ADMIN CREDENTIALS =====
const ADMIN_USER = "muhammadsolih";
const ADMIN_PASS = "muhammadsolihjon";

export interface AdminStats {
  totalVideos: number;
  totalRecipes: number;
  totalViews: number;
  totalSaved: number;
}

interface AdminContextType {
  isAdmin: boolean;
  adminLogin: (user: string, pass: string) => boolean;
  adminLogout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const adminLogin = (user: string, pass: string): boolean => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => setIsAdmin(false);

  return (
    <AdminContext.Provider value={{ isAdmin, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};
