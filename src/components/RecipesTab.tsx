import { useState, useMemo } from 'react';
import { useLang } from '@/contexts/LangContext';
import { recipes, countries, categoryList } from '@/data/recipes';
import RecipeCard from './RecipeCard';
import { Search, UtensilsCrossed } from 'lucide-react';

interface RecipesTabProps {
  onSelectRecipe: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

const RecipesTab = ({ onSelectRecipe, savedIds, onToggleSave }: RecipesTabProps) => {
  const { lang, t } = useLang();
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('all');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    return recipes.filter(r => {
      const matchesSearch = !search || r.name[lang].toLowerCase().includes(search.toLowerCase()) || r.name.uz.toLowerCase().includes(search.toLowerCase()) || r.name.en.toLowerCase().includes(search.toLowerCase());
      const matchesCountry = country === 'all' || r.country === country;
      const matchesCategory = category === 'all' || r.category === category;
      return matchesSearch && matchesCountry && matchesCategory;
    });
  }, [search, country, category, lang]);

  return (
    <div className="pb-24 md:pb-8 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md px-4 pt-4 pb-2 md:px-0 md:pt-0">
        <div className="flex items-center justify-between mb-3 md:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <UtensilsCrossed size={16} className="text-primary-foreground" />
            </div>
            <span className="text-lg font-bold font-display text-foreground">{t('appName')}</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('search')}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
          />
        </div>

        {/* Country filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {countries.map((c) => (
            <button
              key={c.id}
              onClick={() => setCountry(c.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                country === c.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-secondary'
              }`}
            >
              {c[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 md:px-0 pb-3">
        {categoryList.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              category === c.id
                ? 'bg-warm text-warm-foreground shadow-sm'
                : 'bg-card border border-border text-muted-foreground hover:border-primary/30'
            }`}
          >
            <span>{c.emoji}</span> {c[lang]}
          </button>
        ))}
      </div>

      {/* Recipe grid */}
      <div className="px-4 md:px-0">
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
          <div className="text-center py-16">
            <p className="text-3xl mb-2">🍳</p>
            <p className="text-muted-foreground font-medium">{t('noResults')}</p>
            <p className="text-sm text-muted-foreground mt-1">{t('tryDifferent')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesTab;
