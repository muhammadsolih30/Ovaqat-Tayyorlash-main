import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CategoryItem {
  id: string;
  name: { uz: string; en: string; ru: string };
  flag?: string;
  icon?: string;
}

export const CATEGORIES_WITH_COUNTRIES: CategoryItem[] = [
  { id: "all", name: { uz: "Barchasi", en: "All", ru: "Все" } },
  { id: "uzbek", name: { uz: "O'zbek", en: "Uzbek", ru: "Узбекская" }, flag: "🇺🇿" },
  { id: "russian", name: { uz: "Rus", en: "Russian", ru: "Русская" }, flag: "🇷🇺" },
  { id: "turkish", name: { uz: "Turk", en: "Turkish", ru: "Турецкая" }, flag: "🇹🇷" },
  { id: "japanese", name: { uz: "Yapon", en: "Japanese", ru: "Японская" }, flag: "🇯🇵" },
  { id: "korean", name: { uz: "Koreys", en: "Korean", ru: "Корейская" }, flag: "🇰🇷" },
  { id: "chinese", name: { uz: "Xitoy", en: "Chinese", ru: "Китайская" }, flag: "🇨🇳" },
  { id: "italian", name: { uz: "Italiya", en: "Italian", ru: "Итальянская" }, flag: "🇮🇹" },
  { id: "french", name: { uz: "Fransuz", en: "French", ru: "Французская" }, flag: "🇫🇷" },
  { id: "american", name: { uz: "Amerika", en: "American", ru: "Американская" }, flag: "🇺🇸" },
  { id: "indian", name: { uz: "Hind", en: "Indian", ru: "Индийская" }, flag: "🇮🇳" },
  { id: "mexican", name: { uz: "Meksika", en: "Mexican", ru: "Мексиканская" }, flag: "🇲🇽" },
  { id: "quick", name: { uz: "Tez taomlar", en: "Quick Meals", ru: "Быстрые блюда" }, icon: "⚡" },
  { id: "dessert", name: { uz: "Shirinliklar", en: "Desserts", ru: "Десерты" }, icon: "🍰" },
  { id: "healthy", name: { uz: "Sog'lom taom", en: "Healthy", ru: "Здоровая еда" }, icon: "🥗" },
  { id: "breakfast", name: { uz: "Nonushta", en: "Breakfast", ru: "Завтрак" }, icon: "☀️" },
];

interface CategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  lang?: "uz" | "en" | "ru";
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
  lang = "uz",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = dir === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex items-center w-full my-3.5 group/bar select-none">
      {/* Scroll Left Button */}
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-0 z-10 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900/90 border border-zinc-700/60 shadow-md text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all opacity-0 group-hover/bar:opacity-100"
        aria-label="Oldingi"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Chips Container */}
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1 w-full"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {CATEGORIES_WITH_COUNTRIES.map((item) => {
          const isSelected = selectedCategory === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectCategory(item.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-emerald-600 text-white font-semibold shadow-sm shadow-emerald-700/50"
                  : "bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700/70 hover:text-white border border-transparent hover:border-zinc-700"
              }`}
            >
              {item.flag && <span className="text-sm leading-none">{item.flag}</span>}
              {item.icon && <span className="text-sm leading-none">{item.icon}</span>}
              <span>{item.name[lang] || item.name.uz}</span>
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-0 z-10 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900/90 border border-zinc-700/60 shadow-md text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all opacity-0 group-hover/bar:opacity-100"
        aria-label="Keyingi"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default CategoryBar;
