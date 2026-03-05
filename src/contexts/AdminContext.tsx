import React, { createContext, useContext, useState, ReactNode } from "react";
import { Video, videos as defaultVideos } from "@/data/videos";
import { Recipe, recipes as defaultRecipes } from "@/data/recipes";

const ADMIN_USER = "muhammadsolih";
const ADMIN_PASS = "muhammadsolihjon";

interface AdminContextType {
  isAdmin: boolean;
  adminLogin: (user: string, pass: string) => boolean;
  adminLogout: () => void;
  // Videos
  videoList: Video[];
  addVideo: (v: Video) => void;
  deleteVideo: (id: string) => void;
  updateVideo: (v: Video) => void;
  incrementView: (id: string) => void;
  // Recipes — faqat admin boshqaradi
  recipeList: Recipe[];
  addRecipe: (r: Recipe) => void;
  deleteRecipe: (id: string) => void;
  updateRecipe: (r: Recipe) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [videoList, setVideoList] = useState<Video[]>(defaultVideos);
  const [recipeList, setRecipeList] = useState<Recipe[]>(defaultRecipes);

  const adminLogin = (user: string, pass: string): boolean => {
    if (user.trim() === ADMIN_USER && pass === ADMIN_PASS) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => setIsAdmin(false);

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

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        adminLogin,
        adminLogout,
        videoList,
        addVideo,
        deleteVideo,
        updateVideo,
        incrementView,
        recipeList,
        addRecipe,
        deleteRecipe,
        updateRecipe,
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
