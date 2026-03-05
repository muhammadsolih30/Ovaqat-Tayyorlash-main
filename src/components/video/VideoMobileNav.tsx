import { useState } from "react";
import { useVideoLang } from "@/contexts/VideoLangContext";
import {
  Home,
  TrendingUp,
  Bookmark,
  Grid3X3,
  Zap,
  Salad,
  Cake,
  Leaf,
  Coffee,
  Sun,
  X,
  ChevronRight,
  Globe,
} from "lucide-react";

interface VideoMobileNavProps {
  active: string;
  onNavigate: (page: string) => void;
  onSearchOpen: () => void;
}

// ─── Davlat taomlari ma'lumotlari ─────────────────────────────────────────
const countries = [
  {
    id: "italian",
    flag: "🇮🇹",
    name: "Italiya",
    dish: "Pizza & Pasta",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop",
    gradient: "from-green-700 via-white to-red-600",
    color: "#009246",
  },
  {
    id: "japanese",
    flag: "🇯🇵",
    name: "Yaponiya",
    dish: "Sushi & Ramen",
    img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=300&h=200&fit=crop",
    gradient: "from-white to-red-500",
    color: "#BC002D",
  },
  {
    id: "american",
    flag: "🇺🇸",
    name: "Amerika",
    dish: "Burger & BBQ",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
    gradient: "from-blue-700 via-white to-red-600",
    color: "#3C3B6E",
  },
  {
    id: "french",
    flag: "🇫🇷",
    name: "Fransiya",
    dish: "Crêpe & Soufflé",
    img: "https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?w=300&h=200&fit=crop",
    gradient: "from-blue-700 via-white to-red-600",
    color: "#002395",
  },
  {
    id: "korean",
    flag: "🇰🇷",
    name: "Koreya",
    dish: "Bibimbap & Kimchi",
    img: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=300&h=200&fit=crop",
    gradient: "from-white to-red-600",
    color: "#CD2E3A",
  },
  {
    id: "indian",
    flag: "🇮🇳",
    name: "Hindiston",
    dish: "Curry & Biryani",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop",
    gradient: "from-orange-500 via-white to-green-600",
    color: "#FF9933",
  },
  {
    id: "mexican",
    flag: "🇲🇽",
    name: "Meksika",
    dish: "Tacos & Guacamole",
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=200&fit=crop",
    gradient: "from-green-600 via-white to-red-600",
    color: "#006847",
  },
  {
    id: "chinese",
    flag: "🇨🇳",
    name: "Xitoy",
    dish: "Dim Sum & Noodles",
    img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&h=200&fit=crop",
    gradient: "from-red-600 to-yellow-500",
    color: "#DE2910",
  },
  {
    id: "turkish",
    flag: "🇹🇷",
    name: "Turkiya",
    dish: "Kebab & Baklava",
    img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=200&fit=crop",
    gradient: "from-red-600 to-red-700",
    color: "#E30A17",
  },
  {
    id: "russian",
    flag: "🇷🇺",
    name: "Rossiya",
    dish: "Borsch & Pelmeni",
    img: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=300&h=200&fit=crop",
    gradient: "from-white via-blue-600 to-red-600",
    color: "#003580",
  },
];

const VideoMobileNav = ({
  active,
  onNavigate,
  onSearchOpen,
}: VideoMobileNavProps) => {
  const { t, dark } = useVideoLang();
  const [showCategories, setShowCategories] = useState(false);
  const [showCountries, setShowCountries] = useState(false);

  const tabs = [
    { id: "home", label: t("home"), icon: Home },
    { id: "trending", label: t("trending"), icon: TrendingUp },
    {
      id: "categories",
      label: t("categories"),
      icon: Grid3X3,
      action: () => {
        setShowCountries(false);
        setShowCategories(true);
      },
    },
    { id: "favorites", label: t("favorites"), icon: Bookmark },
    { id: "world", label: "Dunyo", icon: Globe },
  ];

  const cats = [
    {
      id: "quick",
      label: t("quickMeals"),
      emoji: "⚡",
      icon: Zap,
      color: "#f59e0b",
    },
    {
      id: "healthy",
      label: t("healthyFood"),
      emoji: "🥗",
      icon: Salad,
      color: "#10b981",
    },
    {
      id: "dessert",
      label: t("desserts"),
      emoji: "🍰",
      icon: Cake,
      color: "#ec4899",
    },
    {
      id: "vegetarian",
      label: t("vegetarian"),
      emoji: "🥦",
      icon: Leaf,
      color: "#22c55e",
    },
    {
      id: "breakfast",
      label: t("breakfast"),
      emoji: "☀️",
      icon: Sun,
      color: "#f97316",
    },
    { id: "bbq", label: t("bbq"), emoji: "🔥", icon: Coffee, color: "#ef4444" },
  ];

  const G = "#1DB954";
  const navBg = dark ? "rgba(15,23,42,0.98)" : "rgba(21,128,61,0.97)";
  const sheetBg = dark ? "#0f172a" : "#ffffff";
  const textMain = dark ? "#f1f5f9" : "#111827";
  const textMut = dark ? "#64748b" : "#9ca3af";
  const cardBg = dark ? "rgba(255,255,255,0.04)" : "rgba(240,253,244,0.8)";
  const cardBd = dark ? "rgba(255,255,255,0.06)" : "rgba(21,128,61,0.12)";

  return (
    <>
      {/* ══════════════════════════════════════════
          KATEGORIYALAR BOTTOM SHEET
      ══════════════════════════════════════════ */}
      {showCategories && (
        <>
          <div
            className="fixed inset-0 z-[60]"
            style={{
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(6px)",
            }}
            onClick={() => setShowCategories(false)}
          />

          <div
            className="fixed bottom-0 left-0 right-0 z-[70] rounded-t-[28px]"
            style={{
              background: sheetBg,
              boxShadow: "0 -12px 60px rgba(0,0,0,0.3)",
              animation: "slideUp .28s cubic-bezier(.32,1.2,.4,1)",
              paddingBottom: "calc(80px + env(safe-area-inset-bottom, 0px))",
            }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div
                className="w-12 h-1.5 rounded-full"
                style={{
                  background: dark
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(0,0,0,0.1)",
                }}
              />
            </div>

            {/* Sarlavha */}
            <div className="flex items-center justify-between px-5 pb-4">
              <div>
                <h3
                  className="font-black text-lg leading-tight"
                  style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    color: textMain,
                  }}
                >
                  {t("categories")}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: textMut }}>
                  Taom turini tanlang
                </p>
              </div>
              <button
                onClick={() => setShowCategories(false)}
                className="w-9 h-9 rounded-2xl flex items-center justify-center"
                style={{
                  background: dark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(21,128,61,0.08)",
                  color: dark ? "#94a3b8" : "#15803d",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* O'zbek taomlari — keng banner */}
            <div className="px-4 mb-3">
              <button
                onClick={() => {
                  onNavigate("uzbek");
                  setShowCategories(false);
                }}
                className="w-full relative rounded-2xl overflow-hidden flex items-center gap-4 p-4 text-left active:scale-[0.98] transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, #15803d 0%, #166534 40%, #1DB954 100%)",
                  boxShadow: "0 6px 25px rgba(21,128,61,0.45)",
                  minHeight: "80px",
                }}
              >
                {/* bg pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 50%, white 0%, transparent 60%)",
                  }}
                />
                <div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  🇺🇿
                </div>
                <div className="relative">
                  <p
                    className="font-black text-base text-white"
                    style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
                  >
                    {t("uzbekCuisine")}
                  </p>
                  <p className="text-white/70 text-xs mt-0.5">
                    Palov, Lagman, Somsa...
                  </p>
                </div>
                <div className="relative ml-auto">
                  <ChevronRight size={20} className="text-white/70" />
                </div>
              </button>
            </div>

            {/* 6 ta kategoriya — 2x3 grid */}
            <div className="grid grid-cols-3 gap-2.5 px-4 mb-3">
              {cats.map(({ id, label, emoji, color }) => (
                <button
                  key={id}
                  onClick={() => {
                    onNavigate(id);
                    setShowCategories(false);
                  }}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl text-center active:scale-95 transition-all"
                  style={{
                    background: active === id ? color + "18" : cardBg,
                    border: `1.5px solid ${active === id ? color + "50" : cardBd}`,
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl"
                    style={{
                      background: color + "15",
                      border: `1px solid ${color}25`,
                    }}
                  >
                    {emoji}
                  </div>
                  <span
                    className="text-[11px] font-bold leading-tight"
                    style={{
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
                      color: active === id ? color : textMain,
                    }}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* Davlat taomlari tugmasi */}
            <div className="px-4">
              <button
                onClick={() => {
                  setShowCategories(false);
                  setTimeout(() => setShowCountries(true), 50);
                }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl text-left active:scale-[0.98] transition-all"
                style={{
                  background: dark
                    ? "linear-gradient(135deg,rgba(59,130,246,0.15),rgba(139,92,246,0.12))"
                    : "linear-gradient(135deg,rgba(59,130,246,0.08),rgba(139,92,246,0.06))",
                  border: "1.5px solid rgba(99,102,241,0.25)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg,rgba(59,130,246,0.2),rgba(139,92,246,0.2))",
                  }}
                >
                  🌍
                </div>
                <div className="flex-1">
                  <p
                    className="font-black text-sm"
                    style={{
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
                      color: textMain,
                    }}
                  >
                    Davlat Taomlari
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: textMut }}>
                    10+ mamlakat oshxonasi
                  </p>
                </div>
                <ChevronRight size={18} style={{ color: "#6366f1" }} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════
          DAVLAT TAOMLARI BOTTOM SHEET (70%)
      ══════════════════════════════════════════ */}
      {showCountries && (
        <>
          <div
            className="fixed inset-0 z-[60]"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
            }}
            onClick={() => setShowCountries(false)}
          />

          <div
            className="fixed bottom-0 left-0 right-0 z-[70] rounded-t-[28px] overflow-hidden"
            style={{
              height: "70vh",
              background: sheetBg,
              boxShadow: "0 -12px 60px rgba(0,0,0,0.35)",
              animation: "slideUp .28s cubic-bezier(.32,1.2,.4,1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div
                className="w-12 h-1.5 rounded-full"
                style={{
                  background: dark
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(0,0,0,0.1)",
                }}
              />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 flex-shrink-0">
              <div className="flex items-center gap-3">
                {/* Back to categories */}
                <button
                  onClick={() => {
                    setShowCountries(false);
                    setTimeout(() => setShowCategories(true), 50);
                  }}
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    background: dark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(21,128,61,0.08)",
                    color: dark ? "#94a3b8" : "#15803d",
                  }}
                >
                  ←
                </button>
                <div>
                  <h3
                    className="font-black text-base leading-tight"
                    style={{
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
                      color: textMain,
                    }}
                  >
                    🌍 Davlat Taomlari
                  </h3>
                  <p className="text-xs" style={{ color: textMut }}>
                    {countries.length} ta mamlakat
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCountries(false)}
                className="w-9 h-9 rounded-2xl flex items-center justify-center"
                style={{
                  background: dark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.06)",
                  color: dark ? "#94a3b8" : "#6b7280",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable list */}
            <div
              className="flex-1 overflow-y-auto px-4 pb-6 space-y-3"
              style={{
                paddingBottom: "calc(24px + env(safe-area-inset-bottom, 0px))",
              }}
            >
              {countries.map(({ id, flag, name, dish, img, color }) => (
                <button
                  key={id}
                  onClick={() => {
                    onNavigate(id);
                    setShowCountries(false);
                  }}
                  className="w-full relative rounded-2xl overflow-hidden flex items-center gap-0 text-left active:scale-[0.98] transition-all"
                  style={{
                    background: dark ? "rgba(30,41,59,0.8)" : "white",
                    border: `1.5px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    minHeight: "80px",
                  }}
                >
                  {/* Ovqat rasmi — o'ng tomon */}
                  <div className="relative w-28 h-20 flex-shrink-0 overflow-hidden">
                    <img
                      src={img}
                      alt={name}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    {/* gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(0,0,0,0) 50%, rgba(0,0,0,0.1) 100%)",
                      }}
                    />
                  </div>

                  {/* Ma'lumotlar */}
                  <div className="flex-1 px-4 py-3">
                    <div className="flex items-center gap-2 mb-1">
                      {/* Bayroq */}
                      <span className="text-2xl leading-none">{flag}</span>
                      <span
                        className="font-black text-base leading-tight"
                        style={{
                          fontFamily: "'Plus Jakarta Sans',sans-serif",
                          color: textMain,
                        }}
                      >
                        {name}
                      </span>
                    </div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: textMut }}
                    >
                      {dish}
                    </p>
                    {/* Rang chizig'i */}
                    <div
                      className="h-1 w-10 rounded-full mt-2"
                      style={{ background: color }}
                    />
                  </div>

                  {/* Ok */}
                  <div className="pr-4 flex-shrink-0">
                    <div
                      className="w-7 h-7 rounded-xl flex items-center justify-center"
                      style={{ background: color + "18" }}
                    >
                      <ChevronRight size={15} style={{ color }} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════
          PASTKI NAVIGATSIYA — 5 TA TAB
      ══════════════════════════════════════════ */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{
          background: navBg,
          backdropFilter: "blur(20px)",
          boxShadow: "0 -4px 30px rgba(0,0,0,0.25)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div className="flex items-center justify-around h-16 px-1">
          {tabs.map(({ id, label, icon: Icon, action }) => {
            const isActive =
              active === id ||
              (id === "categories" && (showCategories || showCountries));
            return (
              <button
                key={id}
                onClick={() => (action ? action() : onNavigate(id))}
                className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all relative"
                style={{ color: isActive ? "white" : "rgba(255,255,255,0.4)" }}
              >
                {/* O'rtadagi kategoriyalar tugmasi — alohida dizayn */}
                {id === "categories" ? (
                  <div className="flex flex-col items-center gap-0.5">
                    <div
                      className="w-12 h-8 rounded-2xl flex items-center justify-center transition-all"
                      style={{
                        background: isActive
                          ? "rgba(255,255,255,0.25)"
                          : "rgba(255,255,255,0.12)",
                        border: "1.5px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      <Icon size={17} strokeWidth={isActive ? 2.5 : 1.8} />
                    </div>
                    <span
                      className="text-[9px] font-bold tracking-wide"
                      style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
                    >
                      {label}
                    </span>
                  </div>
                ) : (
                  <>
                    {isActive ? (
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center mb-0.5"
                        style={{ background: "rgba(255,255,255,0.2)" }}
                      >
                        <Icon size={18} strokeWidth={2.5} />
                      </div>
                    ) : (
                      <Icon size={20} strokeWidth={1.7} className="mb-0.5" />
                    )}
                    <span
                      className="text-[9px] font-bold tracking-wide"
                      style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
                    >
                      {label}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default VideoMobileNav;
