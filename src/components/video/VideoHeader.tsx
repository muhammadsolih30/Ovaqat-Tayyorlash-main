import { useState } from "react";
import { useVideoLang } from "@/contexts/VideoLangContext";
import { useAdmin } from "@/contexts/AdminContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Search,
  Moon,
  Sun,
  Menu,
  X,
  ChefHat,
  Bell,
  LogIn,
  User,
  LogOut,
  Bookmark,
  CheckCircle2,
} from "lucide-react";

interface VideoHeaderProps {
  onSearch: (q: string) => void;
  onNavigate: (page: string, data?: string) => void;
  currentPage: string;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

export const VideoHeader = ({
  onSearch,
  onNavigate,
  currentPage,
  sidebarOpen,
  setSidebarOpen,
}: VideoHeaderProps) => {
  const { lang, setLang, t, dark, toggleDark } = useVideoLang();
  const { videoList } = useAdmin();
  const { user, isLoggedIn, logout, openLoginModal } = useAuth();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof videoList>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleInput = (val: string) => {
    setQuery(val);
    if (val.length > 1) {
      setSuggestions(
        videoList
          .filter(
            (v) =>
              v.title[lang]?.toLowerCase().includes(val.toLowerCase()) ||
              v.chef.toLowerCase().includes(val.toLowerCase())
          )
          .slice(0, 6)
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setSuggestions([]);
      setSearchFocused(false);
    }
  };

  const langs: { code: "uz" | "en" | "ru"; label: string }[] = [
    { code: "uz", label: "UZ" },
    { code: "en", label: "RU" },
    { code: "ru", label: "EN" },
  ];

  return (
    <header className="sticky top-0 z-50 h-14 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 px-4 flex items-center justify-between gap-4 select-none">
      {/* LEFT: Menu button & Logo */}
      <div className="flex items-center gap-3.5 flex-shrink-0">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-full hover:bg-zinc-800/80 text-zinc-300 hover:text-white transition-colors"
          title="Menyu"
        >
          <Menu size={20} />
        </button>

        <div
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
            <ChefHat size={18} className="text-white" />
          </div>
          <span className="text-lg font-black tracking-tight text-white flex items-center">
            Taom<span className="text-emerald-500">.uz</span>
          </span>
        </div>
      </div>

      {/* CENTER: YouTube-like Search bar */}
      <div className="flex-1 max-w-2xl mx-auto relative hidden md:block">
        <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => handleInput(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="Retseptlar, taomlar va oshpazlarni qidirish..."
              className="w-full h-10 pl-4 pr-10 rounded-l-full bg-zinc-900 border border-zinc-700/80 focus:border-emerald-500 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all shadow-inner"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSuggestions([]);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                <X size={15} />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="h-10 px-6 rounded-r-full bg-zinc-800 hover:bg-zinc-700/80 border border-l-0 border-zinc-700/80 text-zinc-300 hover:text-white transition-colors flex items-center justify-center"
            title="Qidirish"
          >
            <Search size={18} />
          </button>
        </form>

        {/* Suggestions dropdown */}
        {searchFocused && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900/95 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden z-50">
            {suggestions.map((v) => (
              <div
                key={v.id}
                onMouseDown={() => {
                  onNavigate("video", v.id);
                  setQuery("");
                }}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800/80 cursor-pointer transition-colors border-b border-zinc-800/40 last:border-0"
              >
                <img
                  src={v.thumbnail}
                  alt=""
                  className="w-10 h-7 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-zinc-200 truncate">
                    {v.title[lang] || v.title.uz}
                  </p>
                  <p className="text-[11px] text-zinc-400 truncate">{v.chef}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: Language, Theme, Notifications & User Auth */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Language selector */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full p-0.5 text-xs font-semibold text-zinc-400">
          {(["uz", "ru", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2 py-0.5 rounded-full uppercase transition-all ${
                lang === l
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "hover:text-zinc-200"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Dark/Light mode toggle */}
        <button
          onClick={toggleDark}
          className="p-2 rounded-full hover:bg-zinc-800/80 text-zinc-300 hover:text-white transition-colors"
          title={dark ? "Yorug' rejim" : "Qorong'u rejim"}
        >
          {dark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
        </button>

        {/* Auth profile or Login button */}
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-zinc-800/80 transition-colors"
            >
              <img
                src={
                  user?.avatar ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                }
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover border border-emerald-500"
              />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl p-2 z-50 animate-fade-in">
                <div className="px-3 py-2 border-b border-zinc-800 mb-1">
                  <p className="text-xs font-semibold text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-[11px] text-zinc-400 truncate">
                    {user?.email}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onNavigate("favorites");
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors text-left"
                >
                  <Bookmark size={15} className="text-emerald-400" />
                  <span>Saqlangan retseptlar</span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-zinc-800 rounded-xl transition-colors text-left mt-1"
                >
                  <LogOut size={15} />
                  <span>Chiqish</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={openLoginModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-95"
          >
            <LogIn size={15} />
            <span>Kirish</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default VideoHeader;
