import { useVideoLang } from "@/contexts/VideoLangContext";
import { useAdmin } from "@/contexts/AdminContext";
import VideoCard from "@/components/video/VideoCard";

interface VideoGridProps {
  category: string;
  onSelectVideo: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

const categoryTitles: Record<
  string,
  { uz: string; en: string; ru: string; icon: string }
> = {
  uzbek: {
    uz: "O'zbek taomlari",
    en: "Uzbek Cuisine",
    ru: "Узбекская кухня",
    icon: "🇺🇿",
  },
  world: {
    uz: "Jahon taomlari",
    en: "World Cuisine",
    ru: "Мировая кухня",
    icon: "🌍",
  },
  trending: {
    uz: "Trend videolar",
    en: "Trending",
    ru: "В тренде",
    icon: "🔥",
  },
  quick: {
    uz: "Tez taomlar",
    en: "Quick Meals",
    ru: "Быстрые блюда",
    icon: "⚡",
  },
  healthy: {
    uz: "Sog'lom ovqat",
    en: "Healthy Food",
    ru: "Здоровая еда",
    icon: "🥗",
  },
  dessert: { uz: "Shirinliklar", en: "Desserts", ru: "Десерты", icon: "🍰" },
  bbq: {
    uz: "Kabob & Gril",
    en: "BBQ & Grill",
    ru: "Шашлык и гриль",
    icon: "🔥",
  },
  vegetarian: {
    uz: "Vegetarian",
    en: "Vegetarian",
    ru: "Вегетарианское",
    icon: "🥦",
  },
  breakfast: { uz: "Nonushta", en: "Breakfast", ru: "Завтрак", icon: "☀️" },
  dinner: { uz: "Kechki ovqat", en: "Dinner", ru: "Ужин", icon: "🌙" },
  street: {
    uz: "Ko'cha ovqatlari",
    en: "Street Food",
    ru: "Уличная еда",
    icon: "🌮",
  },
  favorites: { uz: "Sevimlilar", en: "Favorites", ru: "Избранное", icon: "❤️" },
  italian: {
    uz: "Italya taomlari",
    en: "Italian Cuisine",
    ru: "Итальянская кухня",
    icon: "🇮🇹",
  },
  japanese: {
    uz: "Yaponiya taomlari",
    en: "Japanese Cuisine",
    ru: "Японская кухня",
    icon: "🇯🇵",
  },
  american: {
    uz: "Amerika taomlari",
    en: "American Cuisine",
    ru: "Американская кухня",
    icon: "🇺🇸",
  },
  french: {
    uz: "Fransiya taomlari",
    en: "French Cuisine",
    ru: "Французская кухня",
    icon: "🇫🇷",
  },
  korean: {
    uz: "Koreya taomlari",
    en: "Korean Cuisine",
    ru: "Корейская кухня",
    icon: "🇰🇷",
  },
  indian: {
    uz: "Hindiston taomlari",
    en: "Indian Cuisine",
    ru: "Индийская кухня",
    icon: "🇮🇳",
  },
  mexican: {
    uz: "Meksika taomlari",
    en: "Mexican Cuisine",
    ru: "Мексиканская кухня",
    icon: "🇲🇽",
  },
  chinese: {
    uz: "Xitoy taomlari",
    en: "Chinese Cuisine",
    ru: "Китайская кухня",
    icon: "🇨🇳",
  },
  turkish: {
    uz: "Turkiya taomlari",
    en: "Turkish Cuisine",
    ru: "Турецкая кухня",
    icon: "🇹🇷",
  },
  russian: {
    uz: "Rossiya taomlari",
    en: "Russian Cuisine",
    ru: "Русская кухня",
    icon: "🇷🇺",
  },
};

const VideoGrid = ({
  category,
  onSelectVideo,
  savedIds,
  onToggleSave,
}: VideoGridProps) => {
  const { lang, t, dark } = useVideoLang();
  const { videoList } = useAdmin();

  // Filter videos by category
  const filtered = (() => {
    if (category === "trending") {
      return [...videoList].sort((a, b) => b.views - a.views);
    }
    if (category === "favorites") {
      return videoList.filter((v) => savedIds.includes(v.id));
    }
    // country cuisines
    const countryCuisines = [
      "italian",
      "japanese",
      "american",
      "french",
      "korean",
      "indian",
      "mexican",
      "chinese",
      "turkish",
      "russian",
      "uzbek",
    ];
    if (countryCuisines.includes(category)) {
      return videoList.filter((v) => v.cuisine === category);
    }
    // other categories (quick, healthy, dessert, bbq, vegetarian, breakfast, dinner, street, world)
    if (category === "world") {
      return videoList.filter((v) => v.cuisine !== "uzbek");
    }
    return videoList.filter(
      (v) => v.category === category || v.tags.includes(category),
    );
  })();

  const info = categoryTitles[category];
  const icon = info?.icon ?? "🍽️";
  const title = info?.[lang] ?? category;

  const textMain = dark ? "#f1f5f9" : "#111827";
  const textMuted = dark ? "#94a3b8" : "#6b7280";

  return (
    <div className="pb-24 md:pb-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 px-1">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{
            background: dark ? "rgba(29,185,84,0.15)" : "rgba(209,250,229,0.8)",
            border: "1.5px solid rgba(29,185,84,0.2)",
          }}
        >
          {icon}
        </div>
        <div>
          <h1
            className="font-black text-2xl leading-tight"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: textMain,
            }}
          >
            {title}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: textMuted }}>
            {filtered.length} ta video
          </p>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">🎬</p>
          <p
            className="font-bold text-lg mb-2"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: textMain,
            }}
          >
            {t("noResults")}
          </p>
          <p className="text-sm" style={{ color: textMuted }}>
            Bu kategoriyada hali video yo'q
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={() => onSelectVideo(video.id)}
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
