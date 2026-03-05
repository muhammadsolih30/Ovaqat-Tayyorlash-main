import { useState, useMemo, useEffect } from "react";
import { useLang } from "@/contexts/LangContext";
import { useAdmin } from "@/contexts/AdminContext";
import { categoryList } from "@/data/recipes";
import RecipeCard from "./RecipeCard";
import { Search, UtensilsCrossed } from "lucide-react";

interface RecipesTabProps {
  onSelectRecipe: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  forcedCategory?: string;
  onForcedCategoryChange?: (cat: string) => void;
}

const RecipesTab = ({
  onSelectRecipe,
  savedIds,
  onToggleSave,
  forcedCategory,
  onForcedCategoryChange,
}: RecipesTabProps) => {
  const { lang, t } = useLang();
  const { recipeList } = useAdmin(); // ← Admin qo'shgan taomlar
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(forcedCategory ?? "all");

  useEffect(() => {
    if (forcedCategory !== undefined && forcedCategory !== category) {
      setCategory(forcedCategory);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [forcedCategory]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category]);

  const handleCategoryChange = (catId: string) => {
    setCategory(catId);
    onForcedCategoryChange?.(catId);
  };

  const filtered = useMemo(() => {
    return recipeList.filter((r) => {
      const matchSearch =
        !search ||
        r.name[lang].toLowerCase().includes(search.toLowerCase()) ||
        r.name.uz.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "all" || r.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category, lang, recipeList]);

  return (
    <div className="pb-28 md:pb-8 animate-fade-in">
      {/* Sticky header */}
      <div
        className="sticky top-0 z-10 px-4 pt-4 pb-2 md:px-0 md:pt-0"
        style={{
          background: "hsl(138 30% 97% / 0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid hsl(140 22% 87%)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center mb-3 md:hidden">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center mr-2"
            style={{ background: "hsl(152 72% 28%)" }}
          >
            <UtensilsCrossed size={16} className="text-white" />
          </div>
          <span
            className="text-lg font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: "hsl(150 35% 8%)",
            }}
          >
            Taom<span style={{ color: "hsl(152 72% 28%)" }}>Uz</span>
          </span>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "hsl(152 72% 28%)" }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search")}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm outline-none"
            style={{
              borderColor: "hsl(140 22% 87%)",
              background: "white",
              color: "hsl(150 35% 8%)",
              fontFamily: "var(--font-body)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "hsl(152 72% 40%)";
              e.currentTarget.style.boxShadow =
                "0 0 0 3px hsl(152 72% 40% / 0.15)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "hsl(140 22% 87%)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Kategoriya chips — animatsiyali */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {categoryList.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCategoryChange(c.id)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                fontFamily: "var(--font-display)",
                background: category === c.id ? "hsl(152 72% 28%)" : "white",
                color: category === c.id ? "white" : "hsl(152 72% 22%)",
                border:
                  category === c.id
                    ? "2px solid hsl(152 72% 28%)"
                    : "2px solid hsl(143 40% 82%)",
                boxShadow:
                  category === c.id
                    ? "0 4px 12px hsl(152 72% 25% / 0.3)"
                    : "none",
                transform: category === c.id ? "scale(1.06)" : "scale(1)",
                transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              <span>{c.emoji}</span>
              {c[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 md:px-0 pt-3">
        <p
          className="text-sm font-bold mb-3"
          style={{
            color: "hsl(150 35% 8%)",
            fontFamily: "var(--font-display)",
          }}
        >
          {filtered.length} {lang === "uz" ? "ta taom" : "recipes"}
        </p>

        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          style={{ animation: "fadeSlideIn 0.3s ease" }}
        >
          {filtered.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => onSelectRecipe(recipe.id)}
              saved={savedIds.includes(recipe.id)}
              onToggleSave={() => onToggleSave(recipe.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <p className="text-4xl mb-3">🍳</p>
            <p
              className="font-bold text-lg mb-1"
              style={{
                fontFamily: "var(--font-display)",
                color: "hsl(150 35% 8%)",
              }}
            >
              {t("noResults")}
            </p>
            <p className="text-sm" style={{ color: "hsl(145 12% 45%)" }}>
              {t("tryDifferent")}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default RecipesTab;
