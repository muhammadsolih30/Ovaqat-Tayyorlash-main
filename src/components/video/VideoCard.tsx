import { Video, formatViews } from "@/data/videos";
import { useVideoLang } from "@/contexts/VideoLangContext";
import { Clock, Eye, Bookmark } from "lucide-react";
import { useState } from "react";

interface VideoCardProps {
  video: Video;
  onClick: () => void;
  savedIds?: string[];
  onToggleSave?: (id: string) => void;
  size?: "normal" | "small" | "horizontal";
}

const difficultyColor: Record<string, string> = {
  easy: "#1DB954",
  medium: "#f59e0b",
  hard: "#ef4444",
};

const VideoCard = ({
  video,
  onClick,
  savedIds = [],
  onToggleSave,
  size = "normal",
}: VideoCardProps) => {
  const { lang, t, dark } = useVideoLang();
  const [imgError, setImgError] = useState(false);
  const saved = savedIds.includes(video.id);

  const cardBg = dark ? "#1e293b" : "#ffffff";
  const borderColor = dark ? "rgba(255,255,255,0.06)" : "rgba(21,128,61,0.1)";
  const textMuted = dark ? "#94a3b8" : "#6b7280";

  if (size === "horizontal") {
    return (
      <div
        className="flex gap-3 cursor-pointer group"
        onClick={onClick}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="relative flex-shrink-0 w-32 h-20 rounded-xl overflow-hidden">
          <img
            src={
              imgError
                ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=130&fit=crop"
                : video.thumbnail
            }
            alt={video.title[lang]}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div
            className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md text-white text-[10px] font-bold"
            style={{ background: "rgba(0,0,0,0.75)" }}
          >
            {video.duration}
          </div>
        </div>
        <div className="flex-1 min-w-0 py-0.5">
          <h4
            className="text-sm font-semibold line-clamp-2 leading-snug mb-1"
            style={{
              color: dark ? "#f1f5f9" : "#111827",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {video.title[lang]}
          </h4>
          <p className="text-xs mb-1" style={{ color: "#1DB954" }}>
            {video.chef}
          </p>
          <p className="text-[11px]" style={{ color: textMuted }}>
            {formatViews(video.views)} {t("views")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      onClick={onClick}
      style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        boxShadow: `0 2px 12px ${dark ? "rgba(0,0,0,0.3)" : "rgba(21,128,61,0.07)"}`,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = `0 10px 35px ${dark ? "rgba(0,0,0,0.4)" : "rgba(21,128,61,0.18)"}`)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = `0 2px 12px ${dark ? "rgba(0,0,0,0.3)" : "rgba(21,128,61,0.07)"}`)
      }
    >
      {/* Thumbnail */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: size === "small" ? "16/9" : "16/9" }}
      >
        <img
          src={
            imgError
              ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=225&fit=crop"
              : video.thumbnail
          }
          alt={video.title[lang]}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.35)" }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(29,185,84,0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Duration */}
        <div
          className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg text-white text-[11px] font-bold"
          style={{
            background: "rgba(0,0,0,0.78)",
            backdropFilter: "blur(4px)",
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
            className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{
              background: saved ? "#1DB954" : "rgba(0,0,0,0.5)",
              color: "white",
              backdropFilter: "blur(4px)",
            }}
          >
            <Bookmark size={13} fill={saved ? "white" : "none"} />
          </button>
        )}
        {/* Difficulty badge */}
        <div
          className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-white text-[10px] font-bold"
          style={{ background: difficultyColor[video.difficulty] + "dd" }}
        >
          {t(video.difficulty)}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3
          className="font-bold text-sm leading-snug line-clamp-2 mb-2"
          style={{
            color: dark ? "#f1f5f9" : "#111827",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {video.title[lang]}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <img
            src={video.chefAvatar}
            alt={video.chef}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-xs font-semibold" style={{ color: "#1DB954" }}>
            {video.chef}
          </span>
        </div>
        <div
          className="flex items-center gap-3 text-[11px]"
          style={{ color: textMuted }}
        >
          <span className="flex items-center gap-1">
            <Eye size={11} style={{ color: "#1DB954" }} />
            {formatViews(video.views)}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} style={{ color: "#1DB954" }} />
            {video.cookTime} {t("minutes")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
