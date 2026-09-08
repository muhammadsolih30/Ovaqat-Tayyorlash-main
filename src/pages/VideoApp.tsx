import { useState } from "react";
import { VideoLangProvider, useVideoLang } from "@/contexts/VideoLangContext";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";
import { AuthProvider } from "@/contexts/AuthContext";
import VideoHeader from "@/components/video/VideoHeader";
import VideoSidebar from "@/components/video/VideoSidebar";
import VideoHome from "./VideoHome";
import VideoWatch from "./VideoWatch";
import VideoSearch from "./VideoSearch";
import VideoGrid from "./VideoGrid";
import ChefProfile from "./ChefProfile";
import LoginModal from "@/components/LoginModal";
import ChefCard from "@/components/ChefCard";
import AdminLogin from "./admin/AdminLogin";
import AdminPanel from "./admin/AdminPanel";
import { chefs } from "@/data/videos";

const VideoAppContent = () => {
  const { isAdmin, videoList, incrementView } = useAdmin();
  const [page, setPage] = useState<string>("home");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [selectedChefId, setSelectedChefId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const toggleSave = (id: string) =>
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setPage("search");
    setSelectedVideoId(null);
    setSelectedChefId(null);
  };

  const handleNavigate = (p: string, data?: string) => {
    if (p === "video" && data) {
      setSelectedVideoId(data);
      setPage("video");
      setSelectedChefId(null);
    } else if (p === "chef" && data) {
      setSelectedChefId(data);
      setPage("chef");
      setSelectedVideoId(null);
    } else if (p === "admin") {
      setShowAdminLogin(true);
    } else {
      setPage(p);
      setSelectedVideoId(null);
      setSelectedChefId(null);
    }
  };

  const handleSelectVideo = (id: string) => {
    incrementView(id);
    setSelectedVideoId(id);
    setPage("video");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedVideo = selectedVideoId
    ? (videoList.find((v) => v.id === selectedVideoId) ?? null)
    : null;

  const currentChef = selectedChefId
    ? (chefs.find((c) => c.id === selectedChefId || c.name.toLowerCase() === selectedChefId.toLowerCase()) ?? chefs[0])
    : null;

  const currentPage = selectedVideo ? "video" : selectedChefId ? "chef" : page;

  // Admin login page (accessible directly via navigation/URL)
  if (showAdminLogin && !isAdmin) {
    return (
      <AdminLogin
        onSuccess={() => setShowAdminLogin(false)}
        onBack={() => setShowAdminLogin(false)}
      />
    );
  }

  // Admin panel
  if (isAdmin) {
    return <AdminPanel onExit={() => {}} />;
  }

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* 1. Header (YouTube 1:1) */}
      <VideoHeader
        onSearch={handleSearch}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* 2. Main layout: Sidebar + Content */}
      <div className="flex w-full min-h-[calc(100vh-56px)]">
        <VideoSidebar
          active={currentPage}
          onNavigate={handleNavigate}
          open={sidebarOpen}
        />

        <main className="flex-1 min-w-0 p-4 sm:p-6 overflow-x-hidden">
          {selectedVideo ? (
            <VideoWatch
              video={selectedVideo}
              onBack={() => {
                setSelectedVideoId(null);
                setPage("home");
              }}
              onSelectVideo={handleSelectVideo}
              onNavigate={handleNavigate}
              savedIds={savedIds}
              onToggleSave={toggleSave}
            />
          ) : page === "chef" && currentChef ? (
            <ChefProfile
              chef={currentChef}
              videos={videoList}
              onBack={() => {
                setSelectedChefId(null);
                setPage("home");
              }}
              onSelectVideo={handleSelectVideo}
              savedIds={savedIds}
              onToggleSave={toggleSave}
            />
          ) : page === "chefs" ? (
            <div className="max-w-6xl mx-auto py-4 animate-fade-in">
              <h1 className="text-2xl font-bold text-white mb-2">Barcha Oshpazlar va Retsept Mualliflari</h1>
              <p className="text-sm text-zinc-400 mb-6">O'zingizga ma'qul oshpazni tanlang va ularning sara videolarini tomosha qiling</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {chefs.map((chef) => (
                  <ChefCard
                    key={chef.id}
                    chef={chef}
                    onSelectChef={(id) => handleNavigate("chef", id)}
                  />
                ))}
              </div>
            </div>
          ) : page === "favorites" ? (
            <div className="max-w-7xl mx-auto py-4 animate-fade-in">
              <h1 className="text-2xl font-bold text-white mb-2">Saqlangan Retseptlaringiz</h1>
              <p className="text-sm text-zinc-400 mb-6">Keyinroq pishirish uchun belgilab qo'ygan taomlaringiz ro'yxati</p>
              {savedIds.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800">
                  <p className="text-4xl mb-3">🔖</p>
                  <p className="text-base text-zinc-300 font-semibold">Hali hech qanday retsept saqlanmagan</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {videoList
                    .filter((v) => savedIds.includes(v.id))
                    .map((video) => (
                      <VideoWatch
                        key={video.id}
                        video={video}
                        onBack={() => setPage("home")}
                        onSelectVideo={handleSelectVideo}
                        savedIds={savedIds}
                        onToggleSave={toggleSave}
                      />
                    ))}
                </div>
              )}
            </div>
          ) : page === "search" ? (
            <VideoSearch
              query={searchQuery}
              onSelectVideo={handleSelectVideo}
              savedIds={savedIds}
              onToggleSave={toggleSave}
            />
          ) : page === "home" ? (
            <VideoHome
              onSelectVideo={handleSelectVideo}
              onNavigate={handleNavigate}
              savedIds={savedIds}
              onToggleSave={toggleSave}
            />
          ) : (
            <VideoGrid
              category={page}
              onSelectVideo={handleSelectVideo}
              savedIds={savedIds}
              onToggleSave={toggleSave}
            />
          )}
        </main>
      </div>

      {/* Global Login Modal */}
      <LoginModal />
    </div>
  );
};

export const VideoApp = () => (
  <AdminProvider>
    <AuthProvider>
      <VideoLangProvider>
        <VideoAppContent />
      </VideoLangProvider>
    </AuthProvider>
  </AdminProvider>
);

export default VideoApp;
