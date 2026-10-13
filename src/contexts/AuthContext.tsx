import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Helper function to hash a password using SHA-256
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  password?: string;
  historyIds?: string[];
  likedIds?: string[];
  savedIds?: string[];
  commentedIds?: string[];
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password?: string, isGoogle?: boolean) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, password?: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  subscribedChefIds: string[];
  toggleSubscribe: (chefId: string) => boolean;
  addToHistory: (videoId: string) => void;
  toggleLike: (videoId: string) => boolean;
  toggleSave: (videoId: string) => boolean;
  addToCommented: (videoId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem("taomuz_users");
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("taomuz_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const [subscribedChefIds, setSubscribedChefIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("taomuz_subscriptions");
    return saved ? JSON.parse(saved) : ["c1"];
  });

  useEffect(() => {
    localStorage.setItem("taomuz_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("taomuz_current_user", JSON.stringify(user));
      // Update the users array to reflect any changes in the current user
      setUsers(prev => prev.map(u => u.id === user.id ? user : u));
    } else {
      localStorage.removeItem("taomuz_current_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("taomuz_subscriptions", JSON.stringify(subscribedChefIds));
  }, [subscribedChefIds]);

  const register = async (name: string, email: string, password?: string) => {
    if (users.find((u) => u.email === email)) {
      return { success: false, message: "Bu email bilan ro'yxatdan o'tilgan." };
    }

    let passwordHash: string | undefined = undefined;
    if (password !== undefined) {
      passwordHash = await hashPassword(password);
    }

    const newUser: User = {
      id: "u_" + Date.now(),
      name,
      email,
      password: passwordHash,
      avatar: "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=10b981&color=fff",
      historyIds: [],
      likedIds: [],
      savedIds: [],
      commentedIds: [],
    };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    setIsLoginModalOpen(false);
    return { success: true, message: "Muvaffaqiyatli ro'yxatdan o'tdingiz!" };
  };

  const login = async (email: string, password?: string, isGoogle: boolean = false) => {
    const existingUser = users.find((u) => u.email === email);
    
    if (isGoogle) {
      if (existingUser) {
        setUser(existingUser);
      } else {
        // Register google user silently
        const name = email.split("@")[0] || "Google User";
        const newUser: User = {
          id: "u_" + Date.now(),
          name,
          email,
          avatar: "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=4285F4&color=fff",
          historyIds: [],
          likedIds: [],
          savedIds: [],
          commentedIds: [],
        };
        setUsers((prev) => [...prev, newUser]);
        setUser(newUser);
      }
      setIsLoginModalOpen(false);
      return { success: true, message: "Google orqali kirdingiz!" };
    }

    if (!existingUser) {
      // Prevent account enumeration by using generic error message
      return { success: false, message: "Email yoki parol xato." };
    }

    let passwordHash: string | undefined = undefined;
    if (password !== undefined) {
      passwordHash = await hashPassword(password);
    }

    if (existingUser.password !== passwordHash) {
      // Prevent account enumeration by using generic error message
      return { success: false, message: "Email yoki parol xato." };
    }

    setUser(existingUser);
    setIsLoginModalOpen(false);
    return { success: true, message: "Muvaffaqiyatli kirdingiz!" };
  };

  const logout = () => {
    setUser(null);
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const toggleSubscribe = (chefId: string): boolean => {
    if (!user) {
      openLoginModal();
      return false;
    }
    setSubscribedChefIds((prev) =>
      prev.includes(chefId) ? prev.filter((id) => id !== chefId) : [...prev, chefId]
    );
    return true;
  };

  const addToHistory = (videoId: string) => {
    if (user) {
      setUser(prev => {
        if (!prev) return prev;
        const newHistory = [videoId, ...(prev.historyIds || []).filter(id => id !== videoId)].slice(0, 50);
        return { ...prev, historyIds: newHistory };
      });
    }
  };

  const toggleLike = (videoId: string): boolean => {
    if (!user) {
      openLoginModal();
      return false;
    }
    let isLiked = false;
    setUser(prev => {
      if (!prev) return prev;
      const currentLikes = prev.likedIds || [];
      if (currentLikes.includes(videoId)) {
        isLiked = false;
        return { ...prev, likedIds: currentLikes.filter(id => id !== videoId) };
      } else {
        isLiked = true;
        return { ...prev, likedIds: [videoId, ...currentLikes] };
      }
    });
    return isLiked;
  };

  const toggleSave = (videoId: string): boolean => {
    if (!user) {
      openLoginModal();
      return false;
    }
    let isSaved = false;
    setUser(prev => {
      if (!prev) return prev;
      const currentSaves = prev.savedIds || [];
      if (currentSaves.includes(videoId)) {
        isSaved = false;
        return { ...prev, savedIds: currentSaves.filter(id => id !== videoId) };
      } else {
        isSaved = true;
        return { ...prev, savedIds: [videoId, ...currentSaves] };
      }
    });
    return isSaved;
  };

  const addToCommented = (videoId: string) => {
    if (user) {
      setUser((prev) => {
        if (!prev) return prev;
        const currentCommented = prev.commentedIds || [];
        if (!currentCommented.includes(videoId)) {
          return { ...prev, commentedIds: [videoId, ...currentCommented] };
        }
        return prev;
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        register,
        logout,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        subscribedChefIds,
        toggleSubscribe,
        addToHistory,
        toggleLike,
        toggleSave,
        addToCommented
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
