import React, { createContext, useContext, useState, ReactNode } from "react";
import { Video, videos as defaultVideos } from "@/data/videos";

const ADMIN_USER = "muhammadsolih";
const ADMIN_PASS = "muhammadsolihjon";

interface AdminContextType {
  isAdmin: boolean;
  adminLogin: (user: string, pass: string) => boolean;
  adminLogout: () => void;
  // Global video list — foydalanuvchi ham, admin ham shu ro'yxatni ko'radi
  videoList: Video[];
  addVideo: (v: Video) => void;
  deleteVideo: (id: string) => void;
  updateVideo: (v: Video) => void;
  incrementView: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [videoList, setVideoList] = useState<Video[]>(defaultVideos);

  const adminLogin = (user: string, pass: string): boolean => {
    if (user.trim() === ADMIN_USER && pass === ADMIN_PASS) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => setIsAdmin(false);

  const addVideo = (v: Video) => setVideoList((prev) => [v, ...prev]);

  const deleteVideo = (id: string) =>
    setVideoList((prev) => prev.filter((v) => v.id !== id));

  const updateVideo = (updated: Video) =>
    setVideoList((prev) =>
      prev.map((v) => (v.id === updated.id ? updated : v)),
    );

  // Har safar video ochilganda ko'rishlar +1 bo'ladi
  const incrementView = (id: string) =>
    setVideoList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, views: v.views + 1 } : v)),
    );

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
