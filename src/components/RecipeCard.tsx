import { Recipe } from "@/data/recipes";
import { useLang } from "@/contexts/LangContext";
import { Clock, Users } from "lucide-react";

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

  return (
    <div
      className="group bg-card rounded-2xl overflow-hidden border border-border cursor-pointer animate-fade-in"
      style={{
        boxShadow: "0 2px 12px hsl(152 40% 25% / 0.08)",
        transform: "translateY(0)",
        transition:
          "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.2s",
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
      onClick={onClick}
    >
      {/* Faqat ovqat rasmi — boshqa odamlar profili yo'q */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name[lang]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Saqlash tugmasi */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave?.();
          }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
            saved
              ? "bg-rose-500 text-white shadow-lg"
              : "bg-black/25 text-zinc-900 dark:text-white hover:bg-black/45"
          }`}
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

        {/* Kaloriya badge */}
        {recipe.calories && (
          <div
            className="absolute bottom-2 left-2 text-zinc-900 dark:text-white text-[10px] px-2 py-0.5 rounded-full font-bold backdrop-blur-sm"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            {recipe.calories} kcal
          </div>
        )}
      </div>

      {/* Faqat taom ma'lumotlari */}
      <div className="p-3">
        <h3
          className="font-bold text-sm leading-tight mb-1.5 line-clamp-2"
          style={{
            fontFamily: "var(--font-display)",
            color: "hsl(150 35% 8%)",
          }}
        >
          {recipe.name[lang]}
        </h3>
        <div
          className="flex items-center gap-3 text-xs font-semibold"
          style={{ color: "hsl(152 72% 28%)" }}
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
