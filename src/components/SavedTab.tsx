import { useAdmin } from "@/contexts/AdminContext";
import { useLang } from "@/contexts/LangContext";
import RecipeCard from "./RecipeCard";

interface SavedTabProps {
  savedIds: string[];
  onSelectRecipe: (id: string) => void;
  onToggleSave: (id: string) => void;
}

const SavedTab = ({
  savedIds,
  onSelectRecipe,
  onToggleSave,
}: SavedTabProps) => {
  const { lang, t } = useLang();
  const { recipeList } = useAdmin();
  const savedRecipes = recipeList.filter((r) => savedIds.includes(r.id));

  return (
    <div className="p-4 pb-24 md:pb-8 animate-fade-in">
      <h2 className="font-display font-bold text-xl text-foreground mb-4">
        {t("saved")}
      </h2>

      {savedRecipes.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-3xl mb-2">❤️</p>
          <p className="text-muted-foreground">
            {lang === "uz"
              ? "Hali hech narsa saqlanmagan"
              : "Nothing saved yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {savedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => onSelectRecipe(recipe.id)}
              saved
              onToggleSave={() => onToggleSave(recipe.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedTab;
