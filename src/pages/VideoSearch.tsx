import { useMemo, useState } from "react";
import { useVideoLang } from "@/contexts/VideoLangContext";
import { useAdmin } from "@/contexts/AdminContext";
import VideoCardYT from "@/components/VideoCardYT";
import { SlidersHorizontal, Search } from "lucide-react";

interface VideoSearchProps {
  query: string;
  onSelectVideo: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

const GOLD = "#F5A623";

const VideoSearch = ({
  query,
  onSelectVideo,
  savedIds,
  onToggleSave,
}: VideoSearchProps) => {
  const { lang, t } = useVideoLang();
  const { videoList } = useAdmin();
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

  const filterBtn = (active: boolean): React.CSSProperties => ({
    padding: "8px 16px",
    borderRadius: "14px",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.25s",
    fontFamily: "var(--font-display)",
    background: active
      ? "linear-gradient(135deg, #F5A623, #E8960F)"
      : "rgba(255,255,255,0.04)",
    color: active ? "#0a0a0f" : "var(--text-muted)",
    border: `1px solid ${active ? "transparent" : "rgba(255,255,255,0.06)"}`,
    boxShadow: active ? "0 4px 12px rgba(245,166,35,0.2)" : "none",
  });

  return (
    <div className="pb-24 md:pb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="font-black text-xl mb-1"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            {t("searchResults")}
          </h2>
          <p className="text-sm flex items-center gap-2" style={{ color: GOLD }}>
            <Search size={13} />
            "{query}" — {results.length} ta natija
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all"
          style={{
            background: showFilters
              ? "linear-gradient(135deg, #F5A623, #E8960F)"
              : "rgba(255,255,255,0.04)",
            color: showFilters ? "#0a0a0f" : "var(--text-muted)",
            fontFamily: "var(--font-display)",
            border: `1px solid ${showFilters ? "transparent" : "rgba(255,255,255,0.06)"}`,
          }}
        >
          <SlidersHorizontal size={15} /> {t("filters")}
        </button>
      </div>

      {showFilters && (
        <div
          className="rounded-3xl p-5 mb-6 animate-scale-in"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="space-y-4">
            <div>
              <p
                className="text-xs font-bold mb-3 uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
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
            <div
              style={{
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
              }}
            />
            <div>
              <p
                className="text-xs font-bold mb-3 uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
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
        <div className="text-center py-20 animate-fade-in">
          <p className="text-6xl mb-4">🔍</p>
          <p
            className="font-bold text-xl mb-2"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            {t("noResults")}
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Boshqa so'z bilan qidiring
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((v, i) => (
            <div key={v.id} className={`animate-card-in stagger-${Math.min(i + 1, 8)}`}>
              <VideoCardYT
                video={v}
                onClick={() => onSelectVideo(v.id)}
                savedIds={savedIds}
                onToggleSave={onToggleSave}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoSearch;
