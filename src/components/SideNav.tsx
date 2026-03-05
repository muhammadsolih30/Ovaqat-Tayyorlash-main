// src/components/SideNav.tsx
// MAVJUD FAYLNI BU KOD BILAN ALMASHTIRING

import { useLang } from "@/contexts/LangContext";
import { usePremium } from "@/contexts/PremiumContext";
import {
  UtensilsCrossed,
  Search as SearchIcon,
  Heart,
  Lightbulb,
  User,
  Crown,
} from "lucide-react";

interface SideNavProps {
  active: string;
  onNavigate: (tab: string) => void;
}

const SideNav = ({ active, onNavigate }: SideNavProps) => {
  const { t } = useLang();
  const { isPremium, openPremiumModal } = usePremium();

  const tabs = [
    { id: "recipes", icon: UtensilsCrossed, label: t("recipes") },
    { id: "ingredients", icon: SearchIcon, label: t("ingredients") },
    { id: "saved", icon: Heart, label: t("saved") },
    { id: "tips", icon: Lightbulb, label: t("tips") },
    { id: "profile", icon: User, label: t("profile") },
  ];

  const handleNavigate = (tab: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onNavigate(tab);
  };

  return (
    <aside
      className="hidden md:flex flex-col w-60 h-screen sticky top-0 p-4 gap-1"
      style={{
        background:
          "linear-gradient(180deg, hsl(152 72% 12%) 0%, hsl(150 65% 8%) 100%)",
        borderRight: "1px solid hsl(152 60% 20%)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8 px-3 pt-2">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "hsl(152 72% 28%)" }}
        >
          <UtensilsCrossed size={20} className="text-white" />
        </div>
        <span
          className="text-lg font-bold text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("appName")}
        </span>
      </div>

      {/* Nav tabs */}
      {tabs.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => handleNavigate(id)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-semibold text-left"
          style={{
            fontFamily: "var(--font-display)",
            background: active === id ? "hsl(152 72% 28%)" : "transparent",
            color: active === id ? "white" : "hsl(145 30% 65%)",
            boxShadow:
              active === id ? "0 4px 14px hsl(152 72% 25% / 0.45)" : "none",
            transform: active === id ? "scale(1.02)" : "scale(1)",
          }}
        >
          <Icon size={18} strokeWidth={active === id ? 2.5 : 1.8} />
          <span>{label}</span>
        </button>
      ))}

      {/* Premium button */}
      <div className="mt-auto">
        {!isPremium ? (
          <button
            onClick={openPremiumModal}
            className="w-full py-3 px-4 rounded-2xl font-black text-sm text-white flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              fontFamily: "var(--font-display)",
              background: "linear-gradient(135deg, #f9a825 0%, #ff6b35 100%)",
              boxShadow: "0 6px 20px rgba(249,168,37,0.35)",
            }}
          >
            <Crown size={16} />
            <div className="text-left">
              <div>Premium olish</div>
              <div className="text-[10px] font-semibold opacity-80">
                Jahon taomlarini ko'r
              </div>
            </div>
          </button>
        ) : (
          <div
            className="w-full py-3 px-4 rounded-2xl text-sm flex items-center gap-2"
            style={{
              background: "hsl(152 72% 20%)",
              border: "1px solid hsl(152 60% 30%)",
              color: "hsl(145 65% 70%)",
            }}
          >
            <Crown size={16} style={{ color: "#f9a825" }} />
            <span
              className="font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Premium Faol ✓
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SideNav;
