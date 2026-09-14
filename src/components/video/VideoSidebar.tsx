import { useVideoLang } from "@/contexts/VideoLangContext";
import { useAuth } from "@/contexts/AuthContext";
import { chefs } from "@/data/videos";
import {
  Home,
  Flame,
  Bookmark,
  Clock,
  ThumbsUp,
  FolderHeart,
  Globe2,
  ChevronRight,
  Compass,
} from "lucide-react";

interface VideoSidebarProps {
  active: string;
  onNavigate: (page: string, data?: string) => void;
  open: boolean;
}

export const VideoSidebar = ({ active, onNavigate, open }: VideoSidebarProps) => {
  const { t } = useVideoLang();
  const { isLoggedIn, openLoginModal, subscribedChefIds } = useAuth();

  const handleAuthNav = (id: string) => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    onNavigate(id);
  };

  const subscribedChefs = chefs.filter((c) => subscribedChefIds.includes(c.id));

  // Collapsed Sidebar (Mini YouTube style - 72px)
  if (!open) {
    return (
      <aside className="hidden md:flex flex-col w-[72px] h-[calc(100vh-56px)] sticky top-14 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800/80 py-3 items-center gap-1 select-none z-30">
        <button
          onClick={() => onNavigate("home")}
          className={`w-16 py-3 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
            active === "home"
              ? "text-emerald-500 bg-zinc-50 dark:bg-zinc-900"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:bg-zinc-900/60"
          }`}
        >
          <Home size={20} />
          <span>Bosh</span>
        </button>

        <button
          onClick={() => onNavigate("trending")}
          className={`w-16 py-3 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
            active === "trending"
              ? "text-emerald-500 bg-zinc-50 dark:bg-zinc-900"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:bg-zinc-900/60"
          }`}
        >
          <Flame size={20} />
          <span>Trend</span>
        </button>

        <button
          onClick={() => handleAuthNav("profile")}
          className={`w-16 py-3 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
            active === "profile"
              ? "text-emerald-500 bg-zinc-50 dark:bg-zinc-900"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:bg-zinc-900/60"
          }`}
        >
          <Bookmark size={20} />
          <span>Siz</span>
        </button>

        <button
          onClick={() => onNavigate("chefs")}
          className={`w-16 py-3 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
            active === "chefs"
              ? "text-emerald-500 bg-zinc-50 dark:bg-zinc-900"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:bg-zinc-900/60"
          }`}
        >
          <Compass size={20} />
          <span>Oshpazlar</span>
        </button>
      </aside>
    );
  }

  // Expanded Sidebar (Full YouTube style - 240px)
  return (
    <aside
      className="hidden md:flex flex-col w-60 h-[calc(100vh-56px)] sticky top-14 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800/80 px-3 py-3 overflow-y-auto custom-scrollbar select-none z-30"
      style={{ scrollbarWidth: "thin" }}
    >
      {/* Primary Section */}
      <div className="space-y-0.5 pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
        <button
          onClick={() => onNavigate("home")}
          className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
            active === "home"
              ? "bg-zinc-50 dark:bg-zinc-900 text-emerald-400 font-semibold"
              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:bg-zinc-900/80 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Home size={19} className={active === "home" ? "text-emerald-500" : "text-zinc-600 dark:text-zinc-400"} />
          <span>Bosh sahifa</span>
        </button>

        <button
          onClick={() => onNavigate("trending")}
          className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
            active === "trending"
              ? "bg-zinc-50 dark:bg-zinc-900 text-emerald-400 font-semibold"
              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:bg-zinc-900/80 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Flame size={19} className={active === "trending" ? "text-emerald-500" : "text-zinc-600 dark:text-zinc-400"} />
          <span>Trenddagi taomlar</span>
        </button>

        <button
          onClick={() => onNavigate("chefs")}
          className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
            active === "chefs"
              ? "bg-zinc-50 dark:bg-zinc-900 text-emerald-400 font-semibold"
              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:bg-zinc-900/80 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Compass size={19} className={active === "chefs" ? "text-emerald-500" : "text-zinc-600 dark:text-zinc-400"} />
          <span>Oshpazlar</span>
        </button>
      </div>

      {/* Library / User section */}
      <div className="py-3 border-b border-zinc-200 dark:border-zinc-800/80 space-y-0.5">
        <button
          onClick={() => handleAuthNav("profile")}
          className="px-3 pb-1 text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider hover:text-emerald-500 transition-colors flex items-center gap-1"
        >
          Siz <ChevronRight size={14} />
        </button>

        <button
          onClick={() => handleAuthNav("profile")}
          className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
            active === "profile"
              ? "bg-zinc-50 dark:bg-zinc-900 text-emerald-400 font-semibold"
              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:bg-zinc-900/80 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Bookmark size={19} className={active === "profile" ? "text-emerald-500" : "text-zinc-600 dark:text-zinc-400"} />
          <span>Saqlangan retseptlar</span>
        </button>

        <button
          onClick={() => handleAuthNav("profile")}
          className="w-full flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:bg-zinc-900/80 hover:text-zinc-900 dark:hover:text-white transition-all"
        >
          <Clock size={19} className="text-zinc-600 dark:text-zinc-400" />
          <span>Ko'rishlar tarixi</span>
        </button>

        <button
          onClick={() => handleAuthNav("profile")}
          className="w-full flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:bg-zinc-900/80 hover:text-zinc-900 dark:hover:text-white transition-all"
        >
          <ThumbsUp size={19} className="text-zinc-600 dark:text-zinc-400" />
          <span>Yoqqan videolar</span>
        </button>
      </div>

      {/* Subscriptions / Chefs section */}
      <div className="py-3 border-b border-zinc-200 dark:border-zinc-800/80">
        <div className="px-3 pb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider flex items-center justify-between">
          <span>Obunalar</span>
          <span className="text-[10px] text-emerald-500">{subscribedChefs.length}</span>
        </div>

        {subscribedChefs.length > 0 ? (
          <div className="space-y-0.5">
            {subscribedChefs.map((chef) => (
              <button
                key={chef.id}
                onClick={() => onNavigate("chef", chef.id)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:bg-zinc-900/80 hover:text-zinc-900 dark:hover:text-white transition-all group"
              >
                <img
                  src={chef.avatar}
                  alt={chef.name}
                  className="w-6 h-6 rounded-full object-cover border border-zinc-300 dark:border-zinc-700"
                />
                <span className="truncate text-xs font-medium group-hover:text-emerald-400">
                  {chef.name}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="px-3 text-xs text-zinc-500 dark:text-zinc-500 py-1">Hali hech kimga obuna bo'lmagansiz</p>
        )}
      </div>

      {/* Cuisines by countries quick list */}
      <div className="py-3">
        <div className="px-3 pb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider">
          Milliy Taomlar
        </div>
        <div className="space-y-0.5">
          {[
            { id: "uzbek", name: "O'zbek oshi va taomlari", flag: "🇺🇿" },
            { id: "turkish", name: "Turk taomlari", flag: "🇹🇷" },
            { id: "italian", name: "Italiya pitsa & pasta", flag: "🇮🇹" },
            { id: "russian", name: "Rus milliy oshxonasi", flag: "🇷🇺" },
            { id: "japanese", name: "Yapon sushi & ramen", flag: "🇯🇵" },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => onNavigate("country", c.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:bg-zinc-900/80 transition-colors"
            >
              <span className="text-base leading-none">{c.flag}</span>
              <span className="truncate">{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default VideoSidebar;
