import { useLang } from '@/contexts/LangContext';
import { UtensilsCrossed, Search as SearchIcon, Heart, Lightbulb, User } from 'lucide-react';

interface BottomNavProps {
  active: string;
  onNavigate: (tab: string) => void;
}

const BottomNav = ({ active, onNavigate }: BottomNavProps) => {
  const { t } = useLang();

  const tabs = [
    { id: 'recipes', icon: UtensilsCrossed, label: t('recipes') },
    { id: 'ingredients', icon: SearchIcon, label: t('ingredients') },
    { id: 'saved', icon: Heart, label: t('saved') },
    { id: 'tips', icon: Lightbulb, label: t('tips') },
    { id: 'profile', icon: User, label: t('profile') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-colors ${
              active === id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon size={20} strokeWidth={active === id ? 2.5 : 1.8} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
