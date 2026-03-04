import { useVideoLang } from "@/contexts/VideoLangContext";
import {
  Home,
  TrendingUp,
  Flag,
  Globe,
  Zap,
  Salad,
  ShoppingBag,
  Cake,
  Flame,
  Leaf,
  Coffee,
  Moon,
  ChefHat,
  Shield,
} from "lucide-react";
import { chefs } from "@/data/videos";

interface VideoSidebarProps {
  active: string;
  onNavigate: (page: string) => void;
  open: boolean;
}

const VideoSidebar = ({ active, onNavigate, open }: VideoSidebarProps) => {
  const { t, lang, dark } = useVideoLang();

  const navItems = [
    { id: "home", label: t("home"), icon: Home },
    { id: "trending", label: t("trending"), icon: TrendingUp },
    { id: "sep1", label: "", icon: null },
    { id: "uzbek", label: t("uzbekCuisine"), icon: Flag },
    { id: "world", label: t("worldCuisine"), icon: Globe },
    { id: "quick", label: t("quickMeals"), icon: Zap },
    { id: "healthy", label: t("healthyFood"), icon: Salad },
    { id: "street", label: t("streetFood"), icon: ShoppingBag },
    { id: "sep2", label: "", icon: null },
    { id: "dessert", label: t("desserts"), icon: Cake },
    { id: "bbq", label: t("bbq"), icon: Flame },
    { id: "vegetarian", label: t("vegetarian"), icon: Leaf },
    { id: "breakfast", label: t("breakfast"), icon: Coffee },
    { id: "dinner", label: t("dinner"), icon: Moon },
  ];

  const bg = dark ? "#0f172a" : "#fff";
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(21,128,61,0.1)";
  const activeColor = "#1DB954";
  const textColor = dark ? "#94a3b8" : "#6b7280";

  if (!open)
    return (
      <aside
        className="hidden md:flex flex-col w-16 h-screen sticky top-[70px] pt-4 pb-4 gap-1 items-center"
        style={{ background: bg, borderRight: `1px solid ${borderColor}` }}
      >
        {navItems
          .filter((i) => i.icon)
          .map(({ id, icon: Icon }) =>
            Icon ? (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background:
                    active === id ? "rgba(29,185,84,0.12)" : "transparent",
                  color: active === id ? activeColor : textColor,
                }}
              >
                <Icon size={18} />
              </button>
            ) : null,
          )}
        {/* Admin icon at bottom */}
        <div className="mt-auto mb-2">
          <button
            onClick={() => onNavigate("admin")}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
            title="Admin Panel"
            style={{ background: "rgba(29,185,84,0.08)", color: activeColor }}
          >
            <Shield size={16} />
          </button>
        </div>
      </aside>
    );

  return (
    <aside
      className="hidden md:flex flex-col w-[240px] h-screen sticky top-[70px] overflow-y-auto pb-8"
      style={{ background: bg, borderRight: `1px solid ${borderColor}` }}
    >
      <div className="p-3 pt-4">
        {navItems.map(({ id, label, icon: Icon }) => {
          if (!Icon)
            return (
              <div
                key={id}
                className="my-2 mx-2"
                style={{ height: "1px", background: borderColor }}
              />
            );
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-semibold mb-0.5"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                background:
                  active === id
                    ? "linear-gradient(135deg, rgba(29,185,84,0.15), rgba(21,128,61,0.1))"
                    : "transparent",
                color: active === id ? activeColor : textColor,
                borderLeft:
                  active === id
                    ? `3px solid ${activeColor}`
                    : "3px solid transparent",
              }}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          );
        })}

        {/* Popular chefs */}
        <div
          className="mt-4 pt-4"
          style={{ borderTop: `1px solid ${borderColor}` }}
        >
          <div className="px-3 mb-3 flex items-center gap-2">
            <ChefHat size={14} style={{ color: activeColor }} />
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: textColor }}
            >
              {t("popularChefs")}
            </span>
          </div>
          {chefs.map((chef) => (
            <div
              key={chef.id}
              className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src={chef.avatar}
                alt={chef.name}
                className="w-7 h-7 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p
                  className="text-xs font-semibold truncate"
                  style={{
                    color: dark ? "#f1f5f9" : "#111827",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {chef.name}
                </p>
                <p
                  className="text-[10px] truncate"
                  style={{ color: activeColor }}
                >
                  {chef.specialty[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Admin access section */}
        <div
          className="mt-4 pt-4 mx-1"
          style={{ borderTop: `1px solid ${borderColor}` }}
        >
          <button
            onClick={() => onNavigate("admin")}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-sm font-bold"
            style={{
              background:
                "linear-gradient(135deg, rgba(21,128,61,0.12), rgba(15,92,43,0.08))",
              color: activeColor,
              border: `1px solid rgba(29,185,84,0.2)`,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <Shield size={16} />
            <span>Admin Panel</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default VideoSidebar;
