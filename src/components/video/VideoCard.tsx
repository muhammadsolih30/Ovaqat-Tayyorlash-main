import { Video, formatViews } from "@/data/videos";
import { useVideoLang } from "@/contexts/VideoLangContext";
import { Clock, Eye, Bookmark, Play } from "lucide-react";
import { useState } from "react";

interface VideoCardProps {
  video: Video;
  onClick: () => void;
  savedIds?: string[];
  onToggleSave?: (id: string) => void;
  size?: "normal" | "small" | "horizontal";
}

const difficultyConfig: Record<string, { color: string; bg: string }> = {
  easy: { color: "#34d399", bg: "rgba(52,211,153,0.15)" },
  medium: { color: "#fbbf24", bg: "rgba(251,191,36,0.15)" },
  hard: { color: "#f87171", bg: "rgba(248,113,113,0.15)" },
};

const GOLD = "#F5A623";

const VideoCard = ({
  video,
  onClick,
  savedIds = [],
  onToggleSave,
  size = "normal",
}: VideoCardProps) => {
  const { lang, t } = useVideoLang();
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const saved = savedIds.includes(video.id);

  const diff = difficultyConfig[video.difficulty] || difficultyConfig.easy;

  if (size === "horizontal") {
    return (
      <div
        className="flex gap-3 cursor-pointer group"
        onClick={onClick}
        style={{ fontFamily: "var(--font-body)" }}
      >
        <div className="relative flex-shrink-0 w-36 h-20 rounded-2xl overflow-hidden">
          <img
            src={
              imgError
                ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=130&fit=crop"
                : video.thumbnail
            }
            alt={video.title[lang]}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "rgba(0,0,0,0.3)" }}
          />
          <div
            className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-lg text-white text-[10px] font-bold"
            style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
          >
            {video.duration}
          </div>
        </div>
        <div className="flex-1 min-w-0 py-0.5">
          <h4
            className="text-sm font-bold line-clamp-2 leading-snug mb-1.5"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            {video.title[lang]}
          </h4>
          <p
            className="text-[11px] flex items-center gap-1"
            style={{ color: "var(--text-muted)" }}
          >
            <Eye size={10} style={{ color: GOLD }} />
            {formatViews(video.views)} {t("views")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group cursor-pointer rounded-3xl overflow-hidden transition-all duration-500"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(245,166,35,0.2)" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,166,35,0.08)"
          : "0 4px 16px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        <img
          src={
            imgError
              ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=225&fit=crop"
              : video.thumbnail
          }
          alt={video.title[lang]}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{
            transform: hovered ? "scale(1.12)" : "scale(1)",
          }}
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
          }}
        />

        {/* Play button — hover */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-400"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(0.8)",
          }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(245,166,35,0.9)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 8px 32px rgba(245,166,35,0.4)",
            }}
          >
            <Play size={20} fill="black" className="text-black ml-0.5" />
          </div>
        </div>

        {/* Duration badge */}
        <div
          className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-xl text-white text-[11px] font-bold"
          style={{
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {video.duration}
        </div>

        {/* Save button */}
        {onToggleSave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(video.id);
            }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: saved
                ? "linear-gradient(135deg, #F5A623, #E8960F)"
                : "rgba(0,0,0,0.5)",
              color: saved ? "#0a0a0f" : "white",
              backdropFilter: "blur(8px)",
              border: `1px solid ${saved ? "transparent" : "rgba(255,255,255,0.15)"}`,
              boxShadow: saved
                ? "0 4px 12px rgba(245,166,35,0.3)"
                : "none",
              transform: saved ? "scale(1.1)" : "scale(1)",
            }}
          >
            <Bookmark size={13} fill={saved ? "currentColor" : "none"} />
          </button>
        )}

        {/* Difficulty badge */}
        <div
          className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1"
          style={{
            background: diff.bg,
            color: diff.color,
            backdropFilter: "blur(8px)",
            border: `1px solid ${diff.color}33`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: diff.color }}
          />
          {t(video.difficulty)}
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3
          className="font-bold text-sm leading-snug line-clamp-2 mb-2.5"
          style={{
            color: "var(--text-primary)",
            fontFamily: "var(--font-display)",
          }}
        >
          {video.title[lang]}
        </h3>
        <div
          className="flex items-center gap-4 text-[11px]"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="flex items-center gap-1.5">
            <Eye size={11} style={{ color: GOLD }} />
            {formatViews(video.views)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={11} style={{ color: GOLD }} />
            {video.cookTime} {t("minutes")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
