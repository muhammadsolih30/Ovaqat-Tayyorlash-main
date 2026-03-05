import { useVideoLang } from "@/contexts/VideoLangContext";
import { useAdmin } from "@/contexts/AdminContext";
import { Video } from "@/data/videos";
import VideoCard from "@/components/video/VideoCard";

interface VideoGridProps {
  category: string;
  onSelectVideo: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

const categoryMeta: Record<
  string,
  { title: string; emoji: string; filter: (v: Video) => boolean }
> = {
  trending: { title: "Trending", emoji: "🔥", filter: () => true },
  uzbek: {
    title: "O'zbek taomlari",
    emoji: "🇺🇿",
    filter: (v) => v.cuisine === "uzbek",
  },
  world: {
    title: "Jahon taomlari",
    emoji: "🌍",
    filter: (v) => v.cuisine !== "uzbek",
  },
  quick: { title: "Tez taomlar", emoji: "⚡", filter: (v) => v.cookTime <= 30 },
  healthy: {
    title: "Sog'lom ovqat",
    emoji: "🥗",
    filter: (v) => v.category === "healthy",
  },
  street: {
    title: "Ko'cha ovqatlari",
    emoji: "🥙",
    filter: (v) => v.category === "street",
  },
  dessert: {
    title: "Shirinliklar",
    emoji: "🍰",
    filter: (v) => v.category === "dessert",
  },
  bbq: {
    title: "Kabob & Gril",
    emoji: "🔥",
    filter: (v) => v.category === "bbq",
  },
  vegetarian: {
    title: "Vegetarian",
    emoji: "🥦",
    filter: (v) => v.category === "vegetarian",
  },
  breakfast: {
    title: "Nonushta",
    emoji: "☀️",
    filter: (v) => v.category === "breakfast",
  },
  dinner: {
    title: "Kechki ovqat",
    emoji: "🌙",
    filter: (v) => v.category === "dinner",
  },
  favorites: { title: "Sevimlilar", emoji: "❤️", filter: () => true },
};

const VideoGrid = ({
  category,
  onSelectVideo,
  savedIds,
  onToggleSave,
}: VideoGridProps) => {
  const { dark } = useVideoLang();
  const { videoList } = useAdmin(); // ← global ro'yxat

  const meta = categoryMeta[category] || categoryMeta["trending"];

  const filtered =
    category === "favorites"
      ? videoList.filter((v) => savedIds.includes(v.id))
      : category === "trending"
        ? [...videoList].sort((a, b) => b.views - a.views) // eng ko'p ko'rilganlar yuqorida
        : videoList.filter(meta.filter);

  return (
    <div className="pb-24 md:pb-8 animate-fade-in">
      <div className="mb-6">
        <h2
          className="font-black text-2xl"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: dark ? "#f1f5f9" : "#111827",
          }}
        >
          {meta.emoji} {meta.title}
        </h2>
        <p className="text-sm mt-1" style={{ color: "#1DB954" }}>
          {filtered.length} ta video
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🌿</p>
          <p
            className="font-bold text-lg"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: dark ? "#f1f5f9" : "#111827",
            }}
          >
            {category === "favorites"
              ? "Hali saqlangan video yo'q"
              : "Video topilmadi"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((v) => (
            <VideoCard
              key={v.id}
              video={v}
              onClick={() => onSelectVideo(v.id)}
              savedIds={savedIds}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
