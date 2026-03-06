import { useState } from "react";
import { VideoLangProvider, useVideoLang } from "@/contexts/VideoLangContext";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";
import VideoHeader from "@/components/video/VideoHeader";
import VideoSidebar from "@/components/video/VideoSidebar";
import VideoMobileNav from "@/components/video/VideoMobileNav";
import VideoHome from "./VideoHome";
import VideoWatch from "./VideoWatch";
import VideoSearch from "./VideoSearch";
import VideoGrid from "./VideoGrid";
import AdminLogin from "./admin/AdminLogin";
import AdminPanel from "./admin/AdminPanel";

const VideoAppContent = () => {
  const { dark } = useVideoLang();
  const { isAdmin, videoList, incrementView } = useAdmin();
  const [page, setPage] = useState<string>("home");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
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
  };

  const handleNavigate = (p: string, data?: string) => {
    if (p === "video" && data) {
      setSelectedVideoId(data);
      setPage("video");
    } else if (p === "admin") {
      setShowAdminLogin(true);
    } else {
      setPage(p);
      setSelectedVideoId(null);
    }
  };

  const handleSelectVideo = (id: string) => {
    incrementView(id); // ko'rishlar +1
    setSelectedVideoId(id);
    setPage("video");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // videoList dan izlaymiz — admin o'zgartirsa user ham ko'radi
  const selectedVideo = selectedVideoId
    ? (videoList.find((v) => v.id === selectedVideoId) ?? null)
    : null;

  const bg = dark ? "#0f172a" : "#f9fafb";
  const currentPage = selectedVideo ? "video" : page;

  // Admin login ekrani
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
    <div
      style={{
        background: bg,
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <VideoHeader
        onSearch={handleSearch}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex">
        <VideoSidebar
          active={selectedVideo ? "" : page}
          onNavigate={(p) => {
            if (p === "admin") setShowAdminLogin(true);
            else {
              setPage(p);
              setSelectedVideoId(null);
            }
          }}
          open={sidebarOpen}
        />

        <main className="flex-1 min-w-0 p-4 md:p-6 max-w-screen-2xl [padding-top:calc(70px+1rem)] md:!pt-6">
          {selectedVideo ? (
            <VideoWatch
              video={selectedVideo}
              onBack={() => {
                setSelectedVideoId(null);
                setPage("home");
              }}
              onSelectVideo={handleSelectVideo}
              savedIds={savedIds}
              onToggleSave={toggleSave}
            />
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

      <VideoMobileNav
        active={currentPage}
        onNavigate={(p) => {
          setPage(p);
          setSelectedVideoId(null);
        }}
        onSearchOpen={() => {
          const q = prompt("Qidirish...") || "";
          if (q) handleSearch(q);
        }}
      />
    </div>
  );
};

const VideoApp = () => (
  <AdminProvider>
    <VideoLangProvider>
      <VideoAppContent />
    </VideoLangProvider>
  </AdminProvider>
);

export default VideoApp;
