import { useState } from "react";
import { LangProvider } from "@/contexts/LangContext";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";
import { PremiumProvider } from "@/contexts/PremiumContext";
import BottomNav from "@/components/BottomNav";
import SideNav from "@/components/SideNav";
import RecipesTab from "@/components/RecipesTab";
import RecipeDetail from "@/components/RecipeDetail";
import IngredientsSearch from "@/components/IngredientsSearch";
import SavedTab from "@/components/SavedTab";
import TipsSection from "@/components/TipsSection";
import PremiumModal from "@/components/PremiumModal";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminPanel from "@/pages/admin/AdminPanel";

const AppContent = () => {
  const [activeTab, setActiveTab] = useState("recipes");
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const { isAdmin, recipeList } = useAdmin();

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const selectedRecipe = selectedRecipeId
    ? recipeList.find((r) => r.id === selectedRecipeId)
    : null;

  const handleNavigate = (tab: string) => {
    if (tab === "admin") {
      setShowAdminLogin(true);
      return;
    }
    setActiveTab(tab);
    setSelectedRecipeId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showAdminLogin && !isAdmin) {
    return (
      <AdminLogin
        onSuccess={() => setShowAdminLogin(false)}
        onBack={() => setShowAdminLogin(false)}
      />
    );
  }

  if (isAdmin) return <AdminPanel onExit={() => {}} />;

  if (selectedRecipe) {
    return (
      <div className="flex min-h-screen">
        <SideNav active={activeTab} onNavigate={handleNavigate} />
        <main
          className="flex-1 max-w-4xl mx-auto"
          style={{ paddingBottom: 100 }}
        >
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={() => {
              setSelectedRecipeId(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </main>
        <BottomNav
          active={activeTab}
          onNavigate={handleNavigate}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <PremiumModal />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <SideNav active={activeTab} onNavigate={setActiveTab} />
      <main
        className="flex-1 md:p-6 max-w-5xl"
        style={{
          background: "hsl(138 30% 97%)",
          minHeight: "100vh",
          paddingBottom: 100, // ← NAV OSTIDA CONTENT KO'RINADI
        }}
      >
        {activeTab === "recipes" && (
          <RecipesTab
            onSelectRecipe={setSelectedRecipeId}
            savedIds={savedIds}
            onToggleSave={toggleSave}
            forcedCategory={activeCategory}
            onForcedCategoryChange={setActiveCategory}
          />
        )}
        {activeTab === "ingredients" && (
          <IngredientsSearch
            onSelectRecipe={setSelectedRecipeId}
            savedIds={savedIds}
            onToggleSave={toggleSave}
          />
        )}
        {activeTab === "saved" && (
          <SavedTab
            savedIds={savedIds}
            onSelectRecipe={setSelectedRecipeId}
            onToggleSave={toggleSave}
          />
        )}
        {activeTab === "tips" && <TipsSection />}
      </main>
      <BottomNav
        active={activeTab}
        onNavigate={handleNavigate}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <PremiumModal />
    </div>
  );
};

const Index = () => (
  <AdminProvider>
    <LangProvider>
      <PremiumProvider>
        <AppContent />
      </PremiumProvider>
    </LangProvider>
  </AdminProvider>
);

export default Index;
