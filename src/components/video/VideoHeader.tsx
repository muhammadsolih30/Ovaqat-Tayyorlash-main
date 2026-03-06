import { useState } from "react";
import { useVideoLang } from "@/contexts/VideoLangContext";
import { useAdmin } from "@/contexts/AdminContext";
import {
  Search,
  Moon,
  Sun,
  Bookmark,
  Menu,
  X,
  Leaf,
  Globe,
  ArrowLeft,
} from "lucide-react";

interface VideoHeaderProps {
  onSearch: (q: string) => void;
  onNavigate: (page: string, data?: string) => void;
  currentPage: string;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

const VideoHeader = ({
  onSearch,
  onNavigate,
  currentPage,
  sidebarOpen,
  setSidebarOpen,
}: VideoHeaderProps) => {
  const { lang, setLang, t, dark, toggleDark } = useVideoLang();
  const { videoList } = useAdmin();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof videoList>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleInput = (val: string) => {
    setQuery(val);
    if (val.length > 1) {
      setSuggestions(
        videoList
          .filter(
            (v) =>
              v.title[lang].toLowerCase().includes(val.toLowerCase()) ||
              v.chef.toLowerCase().includes(val.toLowerCase()),
          )
          .slice(0, 5),
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setSuggestions([]);
      setSearchFocused(false);
      setMobileSearchOpen(false);
      setQuery("");
    }
  };

  const langs: { code: "uz" | "en" | "ru"; label: string }[] = [
    { code: "uz", label: "UZ" },
    { code: "en", label: "EN" },
    { code: "ru", label: "RU" },
  ];

  const headerBg = dark ? "rgba(15,23,42,0.97)" : "rgba(255,255,255,0.97)";
  const borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(21,128,61,0.10)";
  const iconColor = dark ? "#94a3b8" : "#15803d";
  const iconBg = dark ? "rgba(255,255,255,0.05)" : "rgba(21,128,61,0.06)";
  const G = "#1DB954";

  /* ── Mobile full-screen search overlay ── */
  if (mobileSearchOpen) {
    return (
      <header
        className="fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center px-4 gap-3 md:hidden"
        style={{
          background: headerBg,
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${borderColor}`,
          boxShadow: `0 2px 20px ${dark ? "rgba(0,0,0,0.4)" : "rgba(21,128,61,0.08)"}`,
        }}
      >
        {/* Back arrow */}
        <button
          onClick={() => {
            setMobileSearchOpen(false);
            setQuery("");
            setSuggestions([]);
          }}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ color: iconColor, background: iconBg }}
        >
          <ArrowLeft size={18} />
        </button>

        {/* Search input — full width */}
        <div className="flex-1 relative">
          <form onSubmit={handleSearch} className="relative">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: G }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => handleInput(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
              placeholder={t("search")}
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-sm outline-none"
              style={{
                background: dark
                  ? "rgba(30,41,59,0.9)"
                  : "rgba(240,253,244,0.9)",
                border: `1.5px solid ${searchFocused ? G : borderColor}`,
                color: dark ? "#f1f5f9" : "#111827",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: searchFocused
                  ? "0 0 0 3px rgba(29,185,84,0.15)"
                  : "none",
              }}
            />
          </form>

          {/* Suggestions */}
          {searchFocused && suggestions.length > 0 && (
            <div
              className="absolute top-full mt-2 left-0 right-0 rounded-2xl overflow-hidden z-50"
              style={{
                background: dark ? "#1e293b" : "white",
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                border: `1px solid ${borderColor}`,
              }}
            >
              {suggestions.map((v) => (
                <button
                  key={v.id}
                  onMouseDown={() => {
                    onNavigate("video", v.id);
                    setMobileSearchOpen(false);
                    setQuery("");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:opacity-80"
                  style={{
                    borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                  }}
                >
                  <img
                    src={v.thumbnail}
                    alt=""
                    className="w-10 h-7 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{
                        color: dark ? "#f1f5f9" : "#111827",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      {v.title[lang]}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>
    );
  }

  return (
    <header
      className="fixed md:sticky top-0 left-0 right-0 z-50 h-[70px] flex items-center px-4 md:px-6 gap-3 md:gap-6"
      style={{
        background: headerBg,
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${borderColor}`,
        boxShadow: `0 2px 20px ${dark ? "rgba(0,0,0,0.4)" : "rgba(21,128,61,0.08)"}`,
      }}
    >
      {/* ── LEFT: hamburger (desktop) + logo ── */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Hamburger — faqat desktop */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-9 h-9 rounded-xl items-center justify-center transition-colors hidden md:flex"
          style={{ color: iconColor, background: iconBg }}
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #15803d 0%, #166534 100%)",
            }}
          >
            <Leaf size={16} className="text-white" />
          </div>
          <span
            className="text-lg font-black tracking-tight"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: dark ? "#f8fafc" : "#15803d",
            }}
          >
            Taom<span style={{ color: G }}>Uz</span>
          </span>
        </button>
      </div>

      {/* ── CENTER: Search — faqat desktop ── */}
      <div className="flex-1 max-w-xl relative hidden md:block">
        <form onSubmit={handleSearch} className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: dark ? "#64748b" : "#15803d" }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => handleInput(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
            placeholder={t("search")}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-sm outline-none transition-all"
            style={{
              background: dark ? "rgba(30,41,59,0.9)" : "rgba(240,253,244,0.9)",
              border: `1.5px solid ${searchFocused ? G : dark ? "rgba(255,255,255,0.1)" : "rgba(21,128,61,0.2)"}`,
              color: dark ? "#f1f5f9" : "#111827",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: searchFocused
                ? "0 0 0 3px rgba(29,185,84,0.15)"
                : "none",
            }}
          />
        </form>

        {/* Desktop suggestions */}
        {searchFocused && suggestions.length > 0 && (
          <div
            className="absolute top-full mt-2 left-0 right-0 rounded-2xl overflow-hidden z-50"
            style={{
              background: dark ? "#1e293b" : "white",
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
              border: `1px solid ${borderColor}`,
            }}
          >
            {suggestions.map((v) => (
              <button
                key={v.id}
                onMouseDown={() => {
                  onNavigate("video", v.id);
                  setQuery("");
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:opacity-80 transition-opacity"
                style={{
                  borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                }}
              >
                <img
                  src={v.thumbnail}
                  alt=""
                  className="w-10 h-7 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <p
                    className="text-sm font-semibold truncate"
                    style={{
                      color: dark ? "#f1f5f9" : "#111827",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {v.title[lang]}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── RIGHT ── */}
      <div className="flex items-center gap-1.5 flex-shrink-0 ml-auto">
        {/* 🔍 Search icon — faqat MOBILE, search panel ochadi */}
        <button
          onClick={() => setMobileSearchOpen(true)}
          className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ color: iconColor, background: iconBg }}
        >
          <Search size={17} />
        </button>

        {/* Language switcher — desktop */}
        <div
          className="hidden sm:flex items-center rounded-xl overflow-hidden"
          style={{
            background: dark
              ? "rgba(255,255,255,0.06)"
              : "rgba(21,128,61,0.06)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(21,128,61,0.15)"}`,
          }}
        >
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className="px-2.5 py-1.5 text-xs font-bold transition-all"
              style={{
                background:
                  lang === l.code
                    ? "linear-gradient(135deg, #15803d, #166534)"
                    : "transparent",
                color: lang === l.code ? "white" : iconColor,
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Globe — mobile til almashtirish */}
        <button
          className="sm:hidden w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ color: iconColor, background: iconBg }}
          onClick={() =>
            setLang(lang === "uz" ? "en" : lang === "en" ? "ru" : "uz")
          }
        >
          <Globe size={16} />
        </button>

        {/* Dark mode */}
        <button
          onClick={toggleDark}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{ color: dark ? "#f59e0b" : iconColor, background: iconBg }}
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Bookmark */}
        <button
          onClick={() => onNavigate("favorites")}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{
            color: currentPage === "favorites" ? "white" : iconColor,
            background:
              currentPage === "favorites"
                ? "linear-gradient(135deg, #15803d, #166534)"
                : iconBg,
          }}
        >
          <Bookmark size={16} />
        </button>
      </div>
    </header>
  );
};

export default VideoHeader;
