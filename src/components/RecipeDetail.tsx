import { Recipe } from "@/data/recipes";
import { useLang } from "@/contexts/LangContext";
import { ArrowLeft, Clock, Users, ChefHat } from "lucide-react";

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

const RecipeDetail = ({ recipe, onBack }: RecipeDetailProps) => {
  const { lang, t } = useLang();

  return (
    <div className="animate-fade-in pb-24 md:pb-8">
      <div className="relative">
        <img
          src={recipe.image + "&w=800&h=400"}
          alt={recipe.name[lang]}
          className="w-full h-56 md:h-72 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-card transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-display font-bold text-zinc-900 dark:text-white mb-2">
            {recipe.name[lang]}
          </h1>
          <div className="flex items-center gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <Clock size={14} /> {recipe.time} {t("minutes")}
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} /> {recipe.servings} {t("servings")}
            </span>
            {recipe.calories && <span>{recipe.calories} kcal</span>}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <p className="text-muted-foreground mb-6">{recipe.description[lang]}</p>

        <div className="mb-6">
          <h2 className="font-display font-bold text-lg text-foreground mb-3 flex items-center gap-2">
            <ChefHat size={20} className="text-primary" />
            {t("ingredientsList")}
          </h2>
          <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-foreground"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {ing[lang]}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display font-bold text-lg text-foreground mb-3">
            {t("howToCook")}
          </h2>
          <div className="space-y-4">
            {recipe.steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-foreground leading-relaxed pt-1">
                  {step[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
