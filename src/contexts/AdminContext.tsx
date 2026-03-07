import React, { createContext, useContext, useState, ReactNode } from "react";
import { Video, videos as defaultVideos } from "@/data/videos";
import { Recipe, recipes as defaultRecipes } from "@/data/recipes";

const SUPER_ADMIN_USER = "muhammadsolih";
const SUPER_ADMIN_PASS = "muhammadsolih2234";

export interface LoginLog {
  id: string;
  username: string;
  time: string;
  status: "success" | "failed";
  ip: string;
}

export interface AdminUser {
  id: string;
  username: string;
  password: string;
  name: string;
  role: "super" | "chef";
  blocked: boolean;
  createdAt: string;
  videoCount: number;
  avatar: string;
}

export interface SiteUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  registeredAt: string;
  lastLogin: string;
  loginMethod: "google" | "phone";
  blocked: boolean;
}

interface AdminContextType {
  isAdmin: boolean;
  currentAdmin: AdminUser | null;
  adminLogin: (user: string, pass: string) => boolean;
  adminLogout: () => void;
  loginLogs: LoginLog[];
  // Videos
  videoList: Video[];
  addVideo: (v: Video) => void;
  deleteVideo: (id: string) => void;
  updateVideo: (v: Video) => void;
  incrementView: (id: string) => void;
  // Recipes
  recipeList: Recipe[];
  addRecipe: (r: Recipe) => void;
  deleteRecipe: (id: string) => void;
  updateRecipe: (r: Recipe) => void;
  // Admin users
  adminUsers: AdminUser[];
  addAdminUser: (u: AdminUser) => void;
  deleteAdminUser: (id: string) => void;
  toggleBlockAdmin: (id: string) => void;
  // Site users
  siteUsers: SiteUser[];
  toggleBlockUser: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Demo site users
const demoSiteUsers: SiteUser[] = [
  {
    id: "u1",
    name: "Aziz Karimov",
    email: "aziz@gmail.com",
    phone: "+998901234567",
    avatar: "https://i.pravatar.cc/60?img=3",
    registeredAt: "2024-11-01",
    lastLogin: "2025-03-06",
    loginMethod: "google",
    blocked: false,
  },
  {
    id: "u2",
    name: "Malika Yusupova",
    email: "malika@gmail.com",
    phone: "+998911234567",
    avatar: "https://i.pravatar.cc/60?img=5",
    registeredAt: "2024-12-10",
    lastLogin: "2025-03-05",
    loginMethod: "phone",
    blocked: false,
  },
  {
    id: "u3",
    name: "Jasur Toshmatov",
    email: "jasur@gmail.com",
    phone: "+998931234567",
    avatar: "https://i.pravatar.cc/60?img=7",
    registeredAt: "2025-01-15",
    lastLogin: "2025-03-04",
    loginMethod: "google",
    blocked: false,
  },
  {
    id: "u4",
    name: "Dilnoza Rahimova",
    email: "dilnoza@mail.ru",
    phone: "+998941234567",
    avatar: "https://i.pravatar.cc/60?img=9",
    registeredAt: "2025-01-20",
    lastLogin: "2025-02-28",
    loginMethod: "phone",
    blocked: true,
  },
  {
    id: "u5",
    name: "Bobur Xolmatov",
    email: "bobur@gmail.com",
    phone: "+998951234567",
    avatar: "https://i.pravatar.cc/60?img=11",
    registeredAt: "2025-02-01",
    lastLogin: "2025-03-03",
    loginMethod: "google",
    blocked: false,
  },
];

const demoAdminUsers: AdminUser[] = [
  {
    id: "a1",
    username: "oshpaz_sarvar",
    password: "sarvar123",
    name: "Sarvar Rahimov",
    role: "chef",
    blocked: false,
    createdAt: "2025-01-10",
    videoCount: 12,
    avatar: "https://i.pravatar.cc/60?img=12",
  },
  {
    id: "a2",
    username: "oshpaz_nilufar",
    password: "nilufar456",
    name: "Nilufar Hasanova",
    role: "chef",
    blocked: false,
    createdAt: "2025-02-05",
    videoCount: 8,
    avatar: "https://i.pravatar.cc/60?img=14",
  },
];

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [videoList, setVideoList] = useState<Video[]>(defaultVideos);
  const [recipeList, setRecipeList] = useState<Recipe[]>(defaultRecipes);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(demoAdminUsers);
  const [siteUsers, setSiteUsers] = useState<SiteUser[]>(demoSiteUsers);
  const [loginLogs, setLoginLogs] = useState<LoginLog[]>([
    {
      id: "l1",
      username: "muhammadsolih",
      time: "2025-03-06 09:14",
      status: "success",
      ip: "192.168.1.1",
    },
    {
      id: "l2",
      username: "unknown",
      time: "2025-03-05 22:47",
      status: "failed",
      ip: "45.77.23.11",
    },
    {
      id: "l3",
      username: "muhammadsolih",
      time: "2025-03-05 08:30",
      status: "success",
      ip: "192.168.1.1",
    },
  ]);

  const addLog = (username: string, status: "success" | "failed") => {
    const log: LoginLog = {
      id: `l${Date.now()}`,
      username,
      time: new Date().toLocaleString("uz"),
      status,
      ip: "192.168.1." + Math.floor(Math.random() * 255),
    };
    setLoginLogs((p) => [log, ...p].slice(0, 50));
  };

  const adminLogin = (user: string, pass: string): boolean => {
    if (user.trim() === SUPER_ADMIN_USER && pass === SUPER_ADMIN_PASS) {
      setIsAdmin(true);
      setCurrentAdmin({
        id: "super",
        username: SUPER_ADMIN_USER,
        password: "",
        name: "Muhammad Solih",
        role: "super",
        blocked: false,
        createdAt: "2024-01-01",
        videoCount: 0,
        avatar: "https://i.pravatar.cc/60?img=1",
      });
      addLog(user, "success");
      return true;
    }
    addLog(user, "failed");
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    setCurrentAdmin(null);
  };

  const addVideo = (v: Video) => setVideoList((p) => [v, ...p]);
  const deleteVideo = (id: string) =>
    setVideoList((p) => p.filter((v) => v.id !== id));
  const updateVideo = (u: Video) =>
    setVideoList((p) => p.map((v) => (v.id === u.id ? u : v)));
  const incrementView = (id: string) =>
    setVideoList((p) =>
      p.map((v) => (v.id === id ? { ...v, views: v.views + 1 } : v)),
    );

  const addRecipe = (r: Recipe) => setRecipeList((p) => [r, ...p]);
  const deleteRecipe = (id: string) =>
    setRecipeList((p) => p.filter((r) => r.id !== id));
  const updateRecipe = (u: Recipe) =>
    setRecipeList((p) => p.map((r) => (r.id === u.id ? u : r)));

  const addAdminUser = (u: AdminUser) => setAdminUsers((p) => [u, ...p]);
  const deleteAdminUser = (id: string) =>
    setAdminUsers((p) => p.filter((a) => a.id !== id));
  const toggleBlockAdmin = (id: string) =>
    setAdminUsers((p) =>
      p.map((a) => (a.id === id ? { ...a, blocked: !a.blocked } : a)),
    );
  const toggleBlockUser = (id: string) =>
    setSiteUsers((p) =>
      p.map((u) => (u.id === id ? { ...u, blocked: !u.blocked } : u)),
    );

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        currentAdmin,
        adminLogin,
        adminLogout,
        loginLogs,
        videoList,
        addVideo,
        deleteVideo,
        updateVideo,
        incrementView,
        recipeList,
        addRecipe,
        deleteRecipe,
        updateRecipe,
        adminUsers,
        addAdminUser,
        deleteAdminUser,
        toggleBlockAdmin,
        siteUsers,
        toggleBlockUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};
