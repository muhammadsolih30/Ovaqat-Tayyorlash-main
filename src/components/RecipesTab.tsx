// src/components/RecipesTab.tsx
// MAVJUD FAYLNI BU KOD BILAN ALMASHTIRING

import { useState, useMemo, useEffect } from "react";
import { useLang } from "@/contexts/LangContext";
import { usePremium } from "@/contexts/PremiumContext";
import { recipes, countries, categoryList } from "@/data/recipes";
import RecipeCard from "./RecipeCard";
import { Search, UtensilsCrossed, Crown } from "lucide-react";

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
  const { openPremiumModal } = usePremium();
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("all");
  const [category, setCategory] = useState(forcedCategory ?? "all");

  // forcedCategory (BottomNav dan kelgan) o'zgarganda sync qilish
  useEffect(() => {
    if (forcedCategory !== undefined && forcedCategory !== category) {
      setCategory(forcedCategory);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [forcedCategory]);

  // Kategoriya o'zgarganda scroll tepaga
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category, country]);

  const handleCategoryChange = (catId: string) => {
    setCategory(catId);
    onForcedCategoryChange?.(catId);
  };

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const matchesSearch =
        !search ||
        r.name[lang].toLowerCase().includes(search.toLowerCase()) ||
        r.name.uz.toLowerCase().includes(search.toLowerCase()) ||
        r.name.en.toLowerCase().includes(search.toLowerCase());
      const matchesCountry = country === "all" || r.country === country;
      const matchesCategory = category === "all" || r.category === category;
      return matchesSearch && matchesCountry && matchesCategory;
    });
  }, [search, country, category, lang]);

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
        {/* Mobile logo + premium btn */}
        <div className="flex items-center justify-between mb-3 md:hidden">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
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
              TaomUz
            </span>
          </div>
          <button
            onClick={openPremiumModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs text-white transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #f9a825, #ff6b35)",
              boxShadow: "0 4px 14px rgba(249,168,37,0.4)",
              fontFamily: "var(--font-display)",
            }}
          >
            <Crown size={13} />
            Premium
          </button>
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
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm outline-none transition-all"
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

        {/* Country chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {countries.map((c) => (
            <button
              key={c.id}
              onClick={() => setCountry(c.id)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                fontFamily: "var(--font-display)",
                background:
                  country === c.id ? "hsl(152 72% 28%)" : "hsl(145 55% 93%)",
                color: country === c.id ? "white" : "hsl(152 72% 22%)",
                border:
                  country === c.id
                    ? "2px solid hsl(152 72% 28%)"
                    : "2px solid hsl(143 40% 84%)",
                boxShadow:
                  country === c.id
                    ? "0 4px 12px hsl(152 72% 25% / 0.35)"
                    : "none",
                transform: country === c.id ? "scale(1.04)" : "scale(1)",
              }}
            >
              {c[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 md:px-0 py-3">
        {categoryList.map((c) => (
          <button
            key={c.id}
            onClick={() => handleCategoryChange(c.id)}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
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
              transform: category === c.id ? "scale(1.05)" : "scale(1)",
            }}
          >
            <span>{c.emoji}</span>
            {c[lang]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-4 md:px-0">
        <div className="flex items-center justify-between mb-3">
          <p
            className="text-sm font-bold"
            style={{
              color: "hsl(150 35% 8%)",
              fontFamily: "var(--font-display)",
            }}
          >
            {filtered.length} {lang === "uz" ? "ta taom" : "recipes"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
    </div>
  );
};

export default RecipesTab;
