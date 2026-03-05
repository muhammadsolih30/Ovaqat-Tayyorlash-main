import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { recipes } from "@/data/recipes";
import RecipeCard from "./RecipeCard";
import { Plus, X, Search } from "lucide-react";

interface IngredientsSearchProps {
  onSelectRecipe: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

const IngredientsSearch = ({
  onSelectRecipe,
  savedIds,
  onToggleSave,
}: IngredientsSearchProps) => {
  const { lang, t } = useLang();
  const [input, setInput] = useState("");
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);

  const addIngredient = () => {
    const trimmed = input.trim().toLowerCase();
    if (trimmed && !ingredientsList.includes(trimmed)) {
      setIngredientsList([...ingredientsList, trimmed]);
      setInput("");
    }
  };

  const removeIngredient = (ing: string) => {
    setIngredientsList(ingredientsList.filter((i) => i !== ing));
  };

  const matchingRecipes =
    ingredientsList.length > 0
      ? recipes.filter((recipe) =>
          ingredientsList.some((ing) =>
            recipe.ingredients.some(
              (ri) =>
                ri[lang].toLowerCase().includes(ing) ||
                ri.uz.toLowerCase().includes(ing) ||
                ri.en.toLowerCase().includes(ing),
            ),
          ),
        )
      : [];

  return (
    <div className="p-4 pb-24 md:pb-8 animate-fade-in">
      <h2 className="font-display font-bold text-xl text-foreground mb-1">
        {t("ingredientSearch")}
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        {lang === "uz"
          ? "Uyingizda bor mahsulotlarni kiriting va qanday taom qilish mumkinligini bilib oling"
          : "Enter ingredients you have at home and discover what you can cook"}
      </p>

      <div className="flex gap-2 mb-3">
        <div className="flex-1 relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addIngredient()}
            placeholder={t("enterIngredients")}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <button
          onClick={addIngredient}
          className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1 hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> {t("addIngredient")}
        </button>
      </div>

      {ingredientsList.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {ingredientsList.map((ing) => (
            <span
              key={ing}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
            >
              {ing}
              <button
                onClick={() => removeIngredient(ing)}
                className="hover:text-destructive"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      {ingredientsList.length > 0 && (
        <p className="text-sm text-muted-foreground mb-4">
          {matchingRecipes.length} {t("matchingRecipes")}
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {matchingRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={() => onSelectRecipe(recipe.id)}
            saved={savedIds.includes(recipe.id)}
            onToggleSave={() => onToggleSave(recipe.id)}
          />
        ))}
      </div>

      {ingredientsList.length > 0 && matchingRecipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t("noResults")}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {t("tryDifferent")}
          </p>
        </div>
      )}
    </div>
  );
};

export default IngredientsSearch;
