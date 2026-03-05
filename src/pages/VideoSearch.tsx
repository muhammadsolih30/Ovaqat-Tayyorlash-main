import { useMemo, useState } from "react";
import { useVideoLang } from "@/contexts/VideoLangContext";
import { useAdmin } from "@/contexts/AdminContext";
import { formatViews } from "@/data/videos";
import VideoCard from "@/components/video/VideoCard";
import { SlidersHorizontal } from "lucide-react";

interface VideoSearchProps {
  query: string;
  onSelectVideo: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

const VideoSearch = ({
  query,
  onSelectVideo,
  savedIds,
  onToggleSave,
}: VideoSearchProps) => {
  const { lang, t, dark } = useVideoLang();
  const { videoList } = useAdmin(); // ← global ro'yxat
  const [filterTime, setFilterTime] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    return videoList.filter((v) => {
      const matchQuery =
        !query ||
        v.title[lang].toLowerCase().includes(query.toLowerCase()) ||
        v.chef.toLowerCase().includes(query.toLowerCase()) ||
        v.tags.some((tg) => tg.toLowerCase().includes(query.toLowerCase()));
      const matchTime =
        filterTime === "all" ||
        (filterTime === "under10" && v.cookTime < 10) ||
        (filterTime === "under30" && v.cookTime <= 30) ||
        (filterTime === "over30" && v.cookTime > 30);
      const matchDiff =
        filterDifficulty === "all" || v.difficulty === filterDifficulty;
      return matchQuery && matchTime && matchDiff;
    });
  }, [query, filterTime, filterDifficulty, lang, videoList]);

  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(21,128,61,0.1)";
  const cardBg = dark ? "#1e293b" : "white";
  const textMuted = dark ? "#94a3b8" : "#6b7280";
  const G = "#1DB954";

  const filterBtn = (active: boolean) =>
    ({
      padding: "6px 14px",
      borderRadius: "10px",
      fontSize: "12px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      background: active
        ? "linear-gradient(135deg, #1DB954, #15803d)"
        : dark
          ? "rgba(255,255,255,0.06)"
          : "rgba(21,128,61,0.06)",
      color: active ? "white" : dark ? "#94a3b8" : G,
      border: `1px solid ${active ? "transparent" : borderColor}`,
    }) as React.CSSProperties;

  return (
    <div className="pb-24 md:pb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2
            className="font-black text-xl"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: dark ? "#f1f5f9" : "#111827",
            }}
          >
            {t("searchResults")}
          </h2>
          <p className="text-sm" style={{ color: G }}>
            "{query}" — {results.length} ta natija
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
          style={{
            background: showFilters
              ? "linear-gradient(135deg,#1DB954,#15803d)"
              : dark
                ? "rgba(255,255,255,0.06)"
                : "rgba(21,128,61,0.06)",
            color: showFilters ? "white" : dark ? "#94a3b8" : G,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          <SlidersHorizontal size={15} /> {t("filters")}
        </button>
      </div>

      {showFilters && (
        <div
          className="rounded-2xl p-4 mb-6"
          style={{ background: cardBg, border: `1px solid ${borderColor}` }}
        >
          <div className="space-y-3">
            <div>
              <p
                className="text-xs font-bold mb-2 uppercase tracking-wider"
                style={{ color: textMuted }}
              >
                {t("cookTime")}
              </p>
              <div className="flex gap-2 flex-wrap">
                {[
                  ["all", "Barchasi"],
                  ["under10", "< 10 min"],
                  ["under30", "< 30 min"],
                  ["over30", "> 30 min"],
                ].map(([v, l]) => (
                  <button
                    key={v}
                    style={filterBtn(filterTime === v)}
                    onClick={() => setFilterTime(v)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p
                className="text-xs font-bold mb-2 uppercase tracking-wider"
                style={{ color: textMuted }}
              >
                {t("difficulty")}
              </p>
              <div className="flex gap-2 flex-wrap">
                {[
                  ["all", "Barchasi"],
                  ["easy", t("easy")],
                  ["medium", t("medium")],
                  ["hard", t("hard")],
                ].map(([v, l]) => (
                  <button
                    key={v}
                    style={filterBtn(filterDifficulty === v)}
                    onClick={() => setFilterDifficulty(v)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {results.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <p
            className="font-bold text-lg mb-2"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: dark ? "#f1f5f9" : "#111827",
            }}
          >
            {t("noResults")}
          </p>
          <p className="text-sm" style={{ color: textMuted }}>
            Boshqa so'z bilan qidiring
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {results.map((v) => (
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

export default VideoSearch;
