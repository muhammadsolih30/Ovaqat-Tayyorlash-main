import { useVideoLang } from "@/contexts/VideoLangContext";
import { useAdmin } from "@/contexts/AdminContext";
import { formatViews } from "@/data/videos";
import VideoCard from "@/components/video/VideoCard";
import VideoRow from "@/components/video/VideoRow";
import { Play, Clock, Eye, ChevronRight } from "lucide-react";

interface VideoHomeProps {
  onSelectVideo: (id: string) => void;
  onNavigate: (page: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

const VideoHome = ({
  onSelectVideo,
  onNavigate,
  savedIds,
  onToggleSave,
}: VideoHomeProps) => {
  const { lang, t, dark } = useVideoLang();
  const { videoList } = useAdmin(); // ← admindan global ro'yxat

  // Dynamic lists from global videoList
  const featuredVideos = videoList.filter((v) => v.featured);
  const trendingVideos = [...videoList]
    .sort((a, b) => b.views - a.views)
    .slice(0, 8);
  const uzbekVideos = videoList.filter((v) => v.cuisine === "uzbek");
  const worldVideos = videoList.filter((v) => v.cuisine !== "uzbek");
  const quickVideos = videoList.filter((v) => v.cookTime <= 30);
  const dessertVideos = videoList.filter((v) => v.category === "dessert");

  const featured = featuredVideos[0] || videoList[0];
  const featuredSide = (
    featuredVideos.length > 1 ? featuredVideos : trendingVideos
  ).slice(1, 4);

  const textMuted = dark ? "#94a3b8" : "#6b7280";

  if (!featured)
    return (
      <div className="text-center py-20">
        <p className="text-5xl mb-4">🎬</p>
        <p
          className="font-bold text-lg"
          style={{ color: dark ? "#f1f5f9" : "#111827" }}
        >
          Hali video qo'shilmagan
        </p>
      </div>
    );

  return (
    <div className="pb-24 md:pb-8 animate-fade-in">
      {/* ── HERO ── */}
      <div className="mb-10">
        <div className="grid md:grid-cols-[1fr_300px] gap-4">
          {/* Main featured */}
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{
              minHeight: "340px",
              boxShadow: "0 8px 40px rgba(21,128,61,0.2)",
            }}
            onClick={() => onSelectVideo(featured.id)}
          >
            <img
              src={featured.thumbnail}
              onError={(e) =>
                (e.currentTarget.src =
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=450&fit=crop")
              }
              alt={featured.title[lang]}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              style={{ minHeight: "340px" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
              }}
            />
            <div
              className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-bold"
              style={{
                background: "rgba(29,185,84,0.9)",
                backdropFilter: "blur(8px)",
              }}
            >
              ⭐ {t("featuredVideo")}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1
                className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {featured.title[lang]}
              </h1>
              <p className="text-white/70 text-sm mb-4 line-clamp-2">
                {featured.description[lang]}
              </p>
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center gap-1.5 text-white/70 text-sm">
                  <Eye size={14} style={{ color: "#1DB954" }} />{" "}
                  {formatViews(featured.views)}
                </span>
                <span className="flex items-center gap-1.5 text-white/70 text-sm">
                  <Clock size={14} style={{ color: "#1DB954" }} />{" "}
                  {featured.cookTime} {t("minutes")}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  {featured.duration}
                </span>
              </div>
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #1DB954, #15803d)",
                  boxShadow: "0 4px 20px rgba(29,185,84,0.4)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <Play size={18} fill="white" /> {t("watchNow")}
              </button>
            </div>
          </div>

          {/* Side trending */}
          <div className="flex flex-col gap-3">
            {featuredSide.map((v) => (
              <div
                key={v.id}
                className="flex gap-3 cursor-pointer group rounded-xl p-2 transition-all hover:opacity-80"
                style={{
                  background: dark
                    ? "rgba(30,41,59,0.7)"
                    : "rgba(240,253,244,0.8)",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(21,128,61,0.1)"}`,
                }}
                onClick={() => onSelectVideo(v.id)}
              >
                <div className="relative w-32 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={v.thumbnail}
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=160&h=100&fit=crop")
                    }
                    alt={v.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div
                    className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-white text-[10px] font-bold"
                    style={{ background: "rgba(0,0,0,0.75)" }}
                  >
                    {v.duration}
                  </div>
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <h4
                    className="text-sm font-bold line-clamp-2 leading-snug mb-1"
                    style={{
                      color: dark ? "#f1f5f9" : "#111827",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {v.title[lang]}
                  </h4>
                  <p className="text-[11px]" style={{ color: textMuted }}>
                    {formatViews(v.views)} {t("views")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── UZBEK ── */}
      {uzbekVideos.length > 0 && (
        <VideoRow
          title={`🇺🇿 ${t("uzbekDishes")}`}
          videos={uzbekVideos.slice(0, 8)}
          onSelectVideo={onSelectVideo}
          onSeeAll={() => onNavigate("uzbek")}
          savedIds={savedIds}
          onToggleSave={onToggleSave}
        />
      )}

      {/* ── TRENDING GRID ── */}
      {trendingVideos.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2
              className="font-black text-xl"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: dark ? "#f1f5f9" : "#111827",
              }}
            >
              🔥 {t("trending")}
            </h2>
            <button
              onClick={() => onNavigate("trending")}
              className="flex items-center gap-1 text-sm font-semibold hover:opacity-70"
              style={{
                color: "#1DB954",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {t("seeAll")} <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {trendingVideos.slice(0, 8).map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                onClick={() => onSelectVideo(v.id)}
                savedIds={savedIds}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── WORLD ── */}
      {worldVideos.length > 0 && (
        <VideoRow
          title={`🌍 ${t("popularWorld")}`}
          videos={worldVideos.slice(0, 8)}
          onSelectVideo={onSelectVideo}
          onSeeAll={() => onNavigate("world")}
          savedIds={savedIds}
          onToggleSave={onToggleSave}
        />
      )}

      {/* ── QUICK ── */}
      {quickVideos.length > 0 && (
        <VideoRow
          title={`⚡ ${t("quickMeals")}`}
          videos={quickVideos.slice(0, 4)}
          onSelectVideo={onSelectVideo}
          onSeeAll={() => onNavigate("quick")}
          savedIds={savedIds}
          onToggleSave={onToggleSave}
        />
      )}

      {/* ── DESSERTS ── */}
      {dessertVideos.length > 0 && (
        <VideoRow
          title={`🍰 ${t("desserts")}`}
          videos={dessertVideos.slice(0, 4)}
          onSelectVideo={onSelectVideo}
          onSeeAll={() => onNavigate("dessert")}
          savedIds={savedIds}
          onToggleSave={onToggleSave}
        />
      )}
    </div>
  );
};

export default VideoHome;
