import { useLang } from '@/contexts/LangContext';
import { UtensilsCrossed, Search as SearchIcon, Heart, Lightbulb, User } from 'lucide-react';

interface SideNavProps {
  active: string;
  onNavigate: (tab: string) => void;
}

const SideNav = ({ active, onNavigate }: SideNavProps) => {
  const { t } = useLang();

  const tabs = [
    { id: 'recipes', icon: UtensilsCrossed, label: t('recipes') },
    { id: 'ingredients', icon: SearchIcon, label: t('ingredients') },
    { id: 'saved', icon: Heart, label: t('saved') },
    { id: 'tips', icon: Lightbulb, label: t('tips') },
    { id: 'profile', icon: User, label: t('profile') },
  ];

  return (
    <aside className="hidden md:flex flex-col w-56 bg-card border-r border-border h-screen sticky top-0 p-4 gap-1">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
          <UtensilsCrossed size={20} className="text-primary-foreground" />
        </div>
        <span className="text-lg font-bold font-display text-foreground">{t('appName')}</span>
      </div>
      {tabs.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onNavigate(id)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
            active === id
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
        >
          <Icon size={18} />
          <span>{label}</span>
        </button>
      ))}
    </aside>
  );
};

export default SideNav;
