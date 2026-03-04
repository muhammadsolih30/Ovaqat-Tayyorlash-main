import { useState } from "react";
import { LangProvider } from "@/contexts/LangContext";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";
import { recipes } from "@/data/recipes";
import BottomNav from "@/components/BottomNav";
import SideNav from "@/components/SideNav";
import RecipesTab from "@/components/RecipesTab";
import RecipeDetail from "@/components/RecipeDetail";
import IngredientsSearch from "@/components/IngredientsSearch";
import SavedTab from "@/components/SavedTab";
import TipsSection from "@/components/TipsSection";
import ProfileSection from "@/components/ProfileSection";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminPanel from "@/pages/admin/AdminPanel";

const AppContent = () => {
  const [activeTab, setActiveTab] = useState("recipes");
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { isAdmin } = useAdmin();

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const selectedRecipe = selectedRecipeId
    ? recipes.find((r) => r.id === selectedRecipeId)
    : null;

  // Show admin login
  if (showAdminLogin && !isAdmin) {
    return (
      <AdminLogin
        onSuccess={() => setShowAdminLogin(false)}
        onBack={() => setShowAdminLogin(false)}
      />
    );
  }

  // Show admin panel
  if (isAdmin) {
    return <AdminPanel onExit={() => {}} />;
  }

  if (selectedRecipe) {
    return (
      <div className="flex min-h-screen">
        <SideNav
          active={activeTab}
          onNavigate={(tab) => {
            setActiveTab(tab);
            setSelectedRecipeId(null);
          }}
        />
        <main className="flex-1 max-w-4xl mx-auto">
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={() => setSelectedRecipeId(null)}
          />
        </main>
        <BottomNav
          active={activeTab}
          onNavigate={(tab) => {
            setActiveTab(tab);
            setSelectedRecipeId(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <SideNav active={activeTab} onNavigate={setActiveTab} />
      <main className="flex-1 md:p-6 max-w-5xl">
        {activeTab === "recipes" && (
          <RecipesTab
            onSelectRecipe={setSelectedRecipeId}
            savedIds={savedIds}
            onToggleSave={toggleSave}
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
        {activeTab === "profile" && (
          <ProfileSection onOpenAdmin={() => setShowAdminLogin(true)} />
        )}
      </main>
      <BottomNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );
};

const Index = () => (
  <AdminProvider>
    <LangProvider>
      <AppContent />
    </LangProvider>
  </AdminProvider>
);

export default Index;
