import { useState } from "react";
import { Video, videos, formatViews } from "@/data/videos";
import { useVideoLang } from "@/contexts/VideoLangContext";
import VideoCard from "@/components/video/VideoCard";
import {
  ArrowLeft,
  ThumbsUp,
  Bookmark,
  Share2,
  Clock,
  Users,
  Flame,
  ChefHat,
  CheckSquare,
  Square,
  Timer,
} from "lucide-react";

interface VideoWatchProps {
  video: Video;
  onBack: () => void;
  onSelectVideo: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

const VideoWatch = ({
  video,
  onBack,
  onSelectVideo,
  savedIds,
  onToggleSave,
}: VideoWatchProps) => {
  const { lang, t, dark } = useVideoLang();
  const [liked, setLiked] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerInterval, setTimerInterval] = useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const saved = savedIds.includes(video.id);

  const related = videos
    .filter(
      (v) =>
        v.id !== video.id &&
        (v.cuisine === video.cuisine || v.category === video.category),
    )
    .slice(0, 8);

  const toggleIngredient = (i: number) => {
    setCheckedIngredients((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );
  };

  const startTimer = (minutes: number) => {
    if (timerInterval) clearInterval(timerInterval);
    setTimerSeconds(minutes * 60);
    setTimerActive(true);
    const iv = setInterval(() => {
      setTimerSeconds((s) => {
        if (s <= 1) {
          clearInterval(iv);
          setTimerActive(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    setTimerInterval(iv);
  };

  const formatTimer = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const bg = dark ? "#0f172a" : "#f9fafb";
  const cardBg = dark ? "#1e293b" : "#ffffff";
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(21,128,61,0.1)";
  const textMuted = dark ? "#94a3b8" : "#6b7280";

  return (
    <div className="pb-24 md:pb-8 animate-fade-in">
      {/* Back button mobile */}
      <div className="md:hidden flex items-center gap-3 p-4 pb-2">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background: dark
              ? "rgba(255,255,255,0.08)"
              : "rgba(21,128,61,0.08)",
            color: dark ? "#f1f5f9" : "#15803d",
          }}
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT: Player + info */}
        <div className="flex-1 min-w-0">
          {/* Video Player */}
          <div
            className="rounded-2xl overflow-hidden mb-4"
            style={{
              background: "#000",
              boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
            }}
          >
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <img
                src={video.thumbnail + "&w=900&h=506"}
                alt={video.title[lang]}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Play overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.3)" }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    background: "rgba(29,185,84,0.9)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 0 40px rgba(29,185,84,0.5)",
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Title & Actions */}
          <div
            className="rounded-2xl p-5 mb-4"
            style={{ background: cardBg, border: `1px solid ${borderColor}` }}
          >
            <h1
              className="text-xl font-black mb-2 leading-tight"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: dark ? "#f1f5f9" : "#111827",
              }}
            >
              {video.title[lang]}
            </h1>
            <div className="flex items-center gap-3 flex-wrap mb-4">
              <img
                src={video.chefAvatar}
                alt={video.chef}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span
                className="font-bold text-sm"
                style={{
                  color: "#1DB954",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {video.chef}
              </span>
              <span className="text-sm" style={{ color: textMuted }}>
                {formatViews(video.views)} {t("views")}
              </span>
            </div>
            {/* Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: liked
                    ? "linear-gradient(135deg, #1DB954, #15803d)"
                    : dark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(21,128,61,0.08)",
                  color: liked ? "white" : dark ? "#94a3b8" : "#15803d",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <ThumbsUp size={15} fill={liked ? "white" : "none"} />{" "}
                {liked ? "Yoqdi!" : "Like"}
              </button>
              <button
                onClick={() => onToggleSave(video.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: saved
                    ? "linear-gradient(135deg, #1DB954, #15803d)"
                    : dark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(21,128,61,0.08)",
                  color: saved ? "white" : dark ? "#94a3b8" : "#15803d",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <Bookmark size={15} fill={saved ? "white" : "none"} />{" "}
                {t("favorites")}
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  background: dark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(21,128,61,0.08)",
                  color: dark ? "#94a3b8" : "#15803d",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <Share2 size={15} /> {t("share")}
              </button>
            </div>
          </div>

          {/* Recipe stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              {
                icon: Clock,
                label: t("cookTime"),
                value: `${video.cookTime} ${t("minutes")}`,
              },
              {
                icon: Users,
                label: t("servings"),
                value: `${video.servings || 4}`,
              },
              {
                icon: Flame,
                label: t("calories"),
                value: `${video.calories || "—"} kcal`,
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl p-3 text-center"
                style={{
                  background: dark
                    ? "rgba(29,185,84,0.1)"
                    : "rgba(209,250,229,0.6)",
                  border: `1px solid ${dark ? "rgba(29,185,84,0.2)" : "rgba(21,128,61,0.15)"}`,
                }}
              >
                <Icon
                  size={18}
                  className="mx-auto mb-1"
                  style={{ color: "#1DB954" }}
                />
                <p className="text-[10px] mb-0.5" style={{ color: textMuted }}>
                  {label}
                </p>
                <p
                  className="text-sm font-bold"
                  style={{
                    color: dark ? "#f1f5f9" : "#111827",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Timer */}
          <div
            className="rounded-2xl p-4 mb-4"
            style={{ background: cardBg, border: `1px solid ${borderColor}` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Timer size={18} style={{ color: "#1DB954" }} />
                <h3
                  className="font-bold"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: dark ? "#f1f5f9" : "#111827",
                  }}
                >
                  Cooking Timer
                </h3>
              </div>
              {timerActive && (
                <div
                  className="text-2xl font-black"
                  style={{
                    color: "#1DB954",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {formatTimer(timerSeconds)}
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              {[5, 10, 15, 20, 30, 45, 60].map((m) => (
                <button
                  key={m}
                  onClick={() => startTimer(m)}
                  className="px-3 py-1.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(29,185,84,0.15), rgba(21,128,61,0.1))",
                    color: "#1DB954",
                    border: "1px solid rgba(29,185,84,0.2)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients checklist */}
          <div
            className="rounded-2xl p-5 mb-4"
            style={{ background: cardBg, border: `1px solid ${borderColor}` }}
          >
            <div className="flex items-center gap-2 mb-4">
              <ChefHat size={18} style={{ color: "#1DB954" }} />
              <h3
                className="font-bold text-base"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: dark ? "#f1f5f9" : "#111827",
                }}
              >
                {t("ingredients")}
              </h3>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-bold"
                style={{ background: "rgba(29,185,84,0.12)", color: "#1DB954" }}
              >
                {checkedIngredients.length}/{video.ingredients.length}
              </span>
            </div>
            <div className="space-y-2">
              {video.ingredients.map((ing, i) => (
                <button
                  key={i}
                  onClick={() => toggleIngredient(i)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                  style={{
                    background: checkedIngredients.includes(i)
                      ? dark
                        ? "rgba(29,185,84,0.12)"
                        : "rgba(209,250,229,0.5)"
                      : "transparent",
                    border: `1px solid ${checkedIngredients.includes(i) ? "rgba(29,185,84,0.25)" : borderColor}`,
                  }}
                >
                  {checkedIngredients.includes(i) ? (
                    <CheckSquare
                      size={16}
                      style={{ color: "#1DB954", flexShrink: 0 }}
                    />
                  ) : (
                    <Square
                      size={16}
                      style={{ color: textMuted, flexShrink: 0 }}
                    />
                  )}
                  <span
                    className="text-sm"
                    style={{
                      color: checkedIngredients.includes(i)
                        ? "#1DB954"
                        : dark
                          ? "#f1f5f9"
                          : "#374151",
                      textDecoration: checkedIngredients.includes(i)
                        ? "line-through"
                        : "none",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {ing[lang]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cooking steps */}
          <div
            className="rounded-2xl p-5"
            style={{ background: cardBg, border: `1px solid ${borderColor}` }}
          >
            <h3
              className="font-bold text-base mb-4"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: dark ? "#f1f5f9" : "#111827",
              }}
            >
              {t("steps")}
            </h3>
            <div className="space-y-3">
              {video.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3 rounded-xl"
                  style={{
                    background: dark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(240,253,244,0.5)",
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black text-white"
                    style={{
                      background: "linear-gradient(135deg, #1DB954, #15803d)",
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    className="text-sm leading-relaxed pt-1"
                    style={{
                      color: dark ? "#cbd5e1" : "#374151",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {step[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Related videos */}
        <aside className="lg:w-80 xl:w-96 flex-shrink-0">
          <h3
            className="font-bold text-base mb-4"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: dark ? "#f1f5f9" : "#111827",
            }}
          >
            {t("recommended")}
          </h3>
          <div className="space-y-3">
            {related.map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                onClick={() => onSelectVideo(v.id)}
                savedIds={savedIds}
                onToggleSave={onToggleSave}
                size="horizontal"
              />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default VideoWatch;
