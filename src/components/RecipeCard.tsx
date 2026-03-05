// src/components/RecipeCard.tsx
// MAVJUD FAYLNI BU KOD BILAN ALMASHTIRING

import { Recipe } from "@/data/recipes";
import { useLang } from "@/contexts/LangContext";
import { usePremium } from "@/contexts/PremiumContext";
import { Clock, Users, Lock, Crown } from "lucide-react";

const PREMIUM_COUNTRIES = [
  "italian",
  "korean",
  "japanese",
  "indian",
  "turkish",
  "mexican",
  "chinese",
  "french",
  "russian",
  "american",
];

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  saved?: boolean;
  onToggleSave?: () => void;
}

const RecipeCard = ({
  recipe,
  onClick,
  saved,
  onToggleSave,
}: RecipeCardProps) => {
  const { lang, t } = useLang();
  const { isPremium, openPremiumModal } = usePremium();

  const isPremiumRecipe =
    PREMIUM_COUNTRIES.includes(recipe.country) && !isPremium;

  const handleClick = () => {
    if (isPremiumRecipe) {
      openPremiumModal();
    } else {
      onClick();
    }
  };

  return (
    <div
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in"
      style={{
        boxShadow: "0 2px 12px hsl(152 40% 25% / 0.08)",
        transform: "translateY(0)",
        transition:
          "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "hsl(152 72% 55%)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "";
      }}
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name[lang]}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            filter: isPremiumRecipe ? "blur(3px) brightness(0.7)" : "none",
            transform: "scale(1)",
          }}
          onMouseEnter={(e) => {
            if (!isPremiumRecipe) {
              (e.currentTarget as HTMLImageElement).style.transform =
                "scale(1.07)";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
          }}
          loading="lazy"
        />

        {/* Premium lock overlay */}
        {isPremiumRecipe && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{
              background:
                "linear-gradient(160deg, rgba(13,59,46,0.75) 0%, rgba(249,168,37,0.4) 100%)",
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(4px)",
              }}
            >
              <Lock size={18} style={{ color: "#f9a825" }} />
            </div>
            <div
              className="px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-black text-white"
              style={{
                background: "linear-gradient(135deg, #f9a825, #ff6b35)",
                boxShadow: "0 4px 14px rgba(249,168,37,0.4)",
              }}
            >
              <Crown size={12} />
              Premium
            </div>
          </div>
        )}

        {/* Save button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!isPremiumRecipe) onToggleSave?.();
          }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
            saved
              ? "bg-rose-500 text-white shadow-lg"
              : "bg-foreground/20 text-white hover:bg-foreground/40"
          }`}
          style={{ opacity: isPremiumRecipe ? 0.5 : 1 }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={saved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Calories badge */}
        {recipe.calories && !isPremiumRecipe && (
          <div
            className="absolute bottom-2 left-2 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full font-bold"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            {recipe.calories} kcal
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-3">
        <h3
          className="font-bold text-sm leading-tight mb-1.5 line-clamp-2"
          style={{
            fontFamily: "var(--font-display)",
            color: isPremiumRecipe ? "hsl(145 12% 55%)" : "hsl(150 35% 8%)",
          }}
        >
          {recipe.name[lang]}
        </h3>
        <div
          className="flex items-center gap-3 text-xs font-semibold"
          style={{
            color: isPremiumRecipe ? "hsl(145 12% 65%)" : "hsl(152 72% 28%)",
          }}
        >
          <span className="flex items-center gap-1">
            <Clock size={12} /> {recipe.time} {t("minutes")}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} /> {recipe.servings}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
