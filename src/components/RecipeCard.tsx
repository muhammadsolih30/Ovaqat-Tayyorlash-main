import { Recipe } from '@/data/recipes';
import { useLang } from '@/contexts/LangContext';
import { Clock, Users } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  saved?: boolean;
  onToggleSave?: () => void;
}

const RecipeCard = ({ recipe, onClick, saved, onToggleSave }: RecipeCardProps) => {
  const { lang, t } = useLang();

  return (
    <div
      className="group bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-all cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name[lang]}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleSave?.(); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
              saved ? 'bg-primary text-primary-foreground' : 'bg-foreground/20 text-primary-foreground hover:bg-foreground/40'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
        {recipe.calories && (
          <div className="absolute bottom-2 left-2 bg-foreground/60 backdrop-blur-sm text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-medium">
            {recipe.calories} kcal
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-display font-bold text-sm text-foreground leading-tight mb-1.5 line-clamp-1">
          {recipe.name[lang]}
        </h3>
        <div className="flex items-center gap-3 text-muted-foreground text-xs">
          <span className="flex items-center gap-1"><Clock size={12} /> {recipe.time} {t('minutes')}</span>
          <span className="flex items-center gap-1"><Users size={12} /> {recipe.servings}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
