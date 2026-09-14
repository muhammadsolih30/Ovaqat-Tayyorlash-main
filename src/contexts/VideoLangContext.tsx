import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Lang } from "@/data/videos";

interface VideoLangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  dark: boolean;
  toggleDark: () => void;
}

const translations: Record<string, Record<Lang, string>> = {
  home: { uz: "Bosh sahifa", en: "Home", ru: "Главная" },
  trending: { uz: "Trend", en: "Trending", ru: "В тренде" },
  uzbekCuisine: {
    uz: "O'zbek taomlari",
    en: "Uzbek Cuisine",
    ru: "Узбекская кухня",
  },
  worldCuisine: {
    uz: "Jahon taomlari",
    en: "World Cuisine",
    ru: "Мировая кухня",
  },
  quickMeals: { uz: "Tez taomlar", en: "Quick Meals", ru: "Быстрые блюда" },
  healthyFood: { uz: "Sog'lom ovqat", en: "Healthy Food", ru: "Здоровая еда" },
  streetFood: { uz: "Ko'cha ovqatlari", en: "Street Food", ru: "Уличная еда" },
  desserts: { uz: "Shirinliklar", en: "Desserts", ru: "Десерты" },
  bbq: { uz: "Kabob & Gril", en: "BBQ & Grill", ru: "Шашлык и гриль" },
  vegetarian: { uz: "Vegetarian", en: "Vegetarian", ru: "Вегетарианское" },
  breakfast: { uz: "Nonushta", en: "Breakfast", ru: "Завтрак" },
  dinner: { uz: "Kechki ovqat", en: "Dinner", ru: "Ужин" },
  search: {
    uz: "Retseptlar, taomlar, oshxonalar...",
    en: "Search recipes, dishes, cuisines...",
    ru: "Поиск рецептов, блюд, кухонь...",
  },
  seeAll: { uz: "Hammasini ko'rish", en: "See All", ru: "Смотреть все" },
  views: { uz: "ko'rishlar", en: "views", ru: "просмотров" },
  minutes: { uz: "daqiqa", en: "min", ru: "мин" },
  ingredients: { uz: "Ingredientlar", en: "Ingredients", ru: "Ингредиенты" },
  steps: { uz: "Tayyorlash", en: "Cooking Steps", ru: "Шаги приготовления" },
  recommended: { uz: "Tavsiya etilgan", en: "Recommended", ru: "Рекомендуем" },
  easy: { uz: "Oson", en: "Easy", ru: "Лёгко" },
  medium: { uz: "O'rta", en: "Medium", ru: "Средне" },
  hard: { uz: "Qiyin", en: "Hard", ru: "Сложно" },
  popularChefs: {
    uz: "Mashhur oshpazlar",
    en: "Popular Chefs",
    ru: "Популярные шеф-повара",
  },
  favorites: { uz: "Sevimlilar", en: "Favorites", ru: "Избранное" },
  share: { uz: "Ulashish", en: "Share", ru: "Поделиться" },
  cookTime: { uz: "Vaqt", en: "Time", ru: "Время" },
  servings: { uz: "Porsiya", en: "Servings", ru: "Порции" },
  calories: { uz: "Kaloriya", en: "Calories", ru: "Калории" },
  filters: { uz: "Filtrlar", en: "Filters", ru: "Фильтры" },
  searchResults: {
    uz: "Qidiruv natijalari",
    en: "Search Results",
    ru: "Результаты поиска",
  },
  noResults: {
    uz: "Natija topilmadi",
    en: "No results found",
    ru: "Ничего не найдено",
  },
  categories: { uz: "Kategoriyalar", en: "Categories", ru: "Категории" },
  featuredVideo: {
    uz: "Tanlangan video",
    en: "Featured Video",
    ru: "Избранное видео",
  },
  watchNow: { uz: "Tomosha qilish", en: "Watch Now", ru: "Смотреть" },
  uzbekDishes: {
    uz: "O'zbek taomlari",
    en: "Uzbek Dishes",
    ru: "Узбекские блюда",
  },
  popularWorld: {
    uz: "Mashhur jahon taomlari",
    en: "Popular World Recipes",
    ru: "Популярные мировые рецепты",
  },
  difficulty: { uz: "Qiyinlik", en: "Difficulty", ru: "Сложность" },
};

const VideoLangContext = createContext<VideoLangContextType | undefined>(
  undefined,
);

export const VideoLangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("uz");
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const t = (key: string): string => translations[key]?.[lang] || key;
  const toggleDark = () => {
    setDark((d) => !d);
  };

  return (
    <VideoLangContext.Provider value={{ lang, setLang, t, dark, toggleDark }}>
      {children}
    </VideoLangContext.Provider>
  );
};

export const useVideoLang = () => {
  const ctx = useContext(VideoLangContext);
  if (!ctx)
    throw new Error("useVideoLang must be used within VideoLangProvider");
  return ctx;
};
