import React, { createContext, useContext, useState, ReactNode } from "react";

type Lang = "uz" | "en";

type Translations = {
  [key: string]: { uz: string; en: string };
};

const translations: Translations = {
  appName: { uz: "Taomlar", en: "Recipes" },
  search: { uz: "Taom nomini qidiring...", en: "Search for a recipe..." },
  allCountries: { uz: "Barchasi", en: "All" },
  uzbek: { uz: "O'zbek", en: "Uzbek" },
  russian: { uz: "Rus", en: "Russian" },
  turkish: { uz: "Turk", en: "Turkish" },
  korean: { uz: "Koreys", en: "Korean" },
  italian: { uz: "Italyan", en: "Italian" },
  japanese: { uz: "Yapon", en: "Japanese" },
  indian: { uz: "Hind", en: "Indian" },
  mexican: { uz: "Meksika", en: "Mexican" },
  french: { uz: "Fransuz", en: "French" },
  chinese: { uz: "Xitoy", en: "Chinese" },
  american: { uz: "Amerika", en: "American" },
  recipes: { uz: "Taomlar", en: "Recipes" },
  ingredients: { uz: "Maslahatlar", en: "By Ingredients" },
  saved: { uz: "Saqlangan", en: "Saved" },
  tips: { uz: "Foydali", en: "Tips" },
  profile: { uz: "Profil", en: "Profile" },
  minutes: { uz: "daqiqa", en: "min" },
  servings: { uz: "porsiya", en: "servings" },
  howToCook: { uz: "Tayyorlash tartibi", en: "How to Cook" },
  ingredientsList: { uz: "Kerakli mahsulotlar", en: "Ingredients" },
  enterIngredients: {
    uz: "Mahsulotlarni kiriting...",
    en: "Enter ingredients...",
  },
  findRecipes: { uz: "Taom topish", en: "Find Recipes" },
  ingredientSearch: {
    uz: "Mahsulotlar bo'yicha qidirish",
    en: "Search by Ingredients",
  },
  addIngredient: { uz: "Qo'shish", en: "Add" },
  healthTips: { uz: "Foydali maslahatlar", en: "Health Tips" },
  popularRecipes: { uz: "Mashhur taomlar", en: "Popular Recipes" },
  categories: { uz: "Kategoriyalar", en: "Categories" },
  breakfast: { uz: "Nonushta", en: "Breakfast" },
  lunch: { uz: "Tushlik", en: "Lunch" },
  dinner: { uz: "Kechki ovqat", en: "Dinner" },
  dessert: { uz: "Shirinlik", en: "Desserts" },
  salads: { uz: "Salatlar", en: "Salads" },
  soups: { uz: "Sho'rvalar", en: "Soups" },
  step: { uz: "Qadam", en: "Step" },
  back: { uz: "Orqaga", en: "Back" },
  language: { uz: "Til", en: "Language" },
  noResults: { uz: "Hech narsa topilmadi", en: "No results found" },
  tryDifferent: {
    uz: "Boshqa so'z bilan qidiring",
    en: "Try a different search",
  },
  matchingRecipes: { uz: "ta mos taom topildi", en: "matching recipes found" },
};

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("uz");

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used within LangProvider");
  return context;
};
