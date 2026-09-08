import { useState } from "react";
import { useVideoLang } from "@/contexts/VideoLangContext";
import { useAdmin } from "@/contexts/AdminContext";
import VideoCardYT from "@/components/VideoCardYT";
import CategoryBar from "@/components/CategoryBar";
import ChefCard from "@/components/ChefCard";
import { chefs } from "@/data/videos";
import { Flame, Sparkles, ChefHat } from "lucide-react";

interface VideoHomeProps {
  onSelectVideo: (id: string) => void;
  onNavigate: (page: string, data?: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export const VideoHome = ({
  onSelectVideo,
  onNavigate,
  savedIds,
  onToggleSave,
}: VideoHomeProps) => {
  const { lang, t } = useVideoLang();
  const { videoList } = useAdmin();
  const [activeCategory, setActiveCategory] = useState("all");

  // Filtering videos based on selected country/category chip
  const filteredVideos = videoList.filter((v) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "uzbek") return v.cuisine === "uzbek";
    if (activeCategory === "russian") return v.cuisine === "russian";
    if (activeCategory === "turkish") return v.cuisine === "turkish";
    if (activeCategory === "japanese") return v.cuisine === "japanese";
    if (activeCategory === "korean") return v.cuisine === "korean";
    if (activeCategory === "chinese") return v.cuisine === "chinese";
    if (activeCategory === "italian") return v.cuisine === "italian";
    if (activeCategory === "french") return v.cuisine === "french";
    if (activeCategory === "american") return v.cuisine === "american";
    if (activeCategory === "indian") return v.cuisine === "indian";
    if (activeCategory === "mexican") return v.cuisine === "mexican";
    if (activeCategory === "quick") return v.cookTime <= 30;
    if (activeCategory === "dessert") return v.category === "dessert";
    if (activeCategory === "healthy") return v.category === "healthy";
    if (activeCategory === "breakfast") return v.category === "breakfast";
    return true;
  });

  return (
    <div className="pb-16 w-full max-w-[1920px] mx-auto animate-fade-in">
      {/* 1. Category Bar (Chips) pinned under header */}
      <div className="sticky top-14 z-20 bg-zinc-950/95 backdrop-blur-md pb-1 border-b border-zinc-900/60 mb-5">
        <CategoryBar
          selectedCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          lang={lang}
        />
      </div>

      {/* 2. Top Popular Chefs Slider / Carousel Row */}
      {activeCategory === "all" && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ChefHat size={18} className="text-emerald-500" />
              <span>Mashhur Oshpazlar va Kanallar</span>
            </h2>
            <button
              onClick={() => onNavigate("chefs")}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Hammasi
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {chefs.slice(0, 3).map((chef) => (
              <ChefCard
                key={chef.id}
                chef={chef}
                onSelectChef={(chefId) => onNavigate("chef", chefId)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 3. Main YouTube-style Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
        {filteredVideos.map((video) => (
          <VideoCardYT
            key={video.id}
            video={video}
            onClick={() => onSelectVideo(video.id)}
            savedIds={savedIds}
            onToggleSave={onToggleSave}
            layout="grid"
          />
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800/50 mt-6">
          <p className="text-4xl mb-3">🍳</p>
          <h3 className="text-lg font-bold text-white">Bu bo'limda hali taomlar yo'q</h3>
          <p className="text-xs text-zinc-400 mt-1">Boshqa davlat yoki toifani tanlab ko'ring</p>
          <button
            onClick={() => setActiveCategory("all")}
            className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
          >
            Barcha videolarga qaytish
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoHome;
