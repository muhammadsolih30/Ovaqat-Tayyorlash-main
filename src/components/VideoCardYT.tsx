import React, { useState } from "react";
import { Video, formatViews } from "@/data/videos";
import { useVideoLang } from "@/contexts/VideoLangContext";
import { useAuth } from "@/contexts/AuthContext";
import { Bookmark, Clock, CheckCircle2, MessageSquare, ThumbsUp } from "lucide-react";

interface VideoCardYTProps {
  video: Video;
  onClick: () => void;
  savedIds?: string[];
  onToggleSave?: (id: string) => void;
  layout?: "grid" | "horizontal";
}

const countryMeta: Record<string, { flag: string; nameUz: string }> = {
  uzbek: { flag: "🇺🇿", nameUz: "O'zbek" },
  russian: { flag: "🇷🇺", nameUz: "Rus" },
  turkish: { flag: "🇹🇷", nameUz: "Turk" },
  japanese: { flag: "🇯🇵", nameUz: "Yapon" },
  korean: { flag: "🇰🇷", nameUz: "Koreys" },
  chinese: { flag: "🇨🇳", nameUz: "Xitoy" },
  italian: { flag: "🇮🇹", nameUz: "Italiya" },
  french: { flag: "🇫🇷", nameUz: "Fransuz" },
  american: { flag: "🇺🇸", nameUz: "Amerika" },
  indian: { flag: "🇮🇳", nameUz: "Hind" },
  mexican: { flag: "🇲🇽", nameUz: "Meksika" },
};

const difficultyBadge: Record<string, { labelUz: string; color: string; bg: string }> = {
  easy: { labelUz: "Oson", color: "#22c55e", bg: "rgba(34, 197, 94, 0.2)" },
  medium: { labelUz: "O'rtacha", color: "#eab308", bg: "rgba(234, 179, 8, 0.2)" },
  hard: { labelUz: "Qiyin", color: "#ef4444", bg: "rgba(239, 68, 68, 0.2)" },
};

export const VideoCardYT: React.FC<VideoCardYTProps> = ({
  video,
  onClick,
  savedIds = [],
  onToggleSave,
  layout = "grid",
}) => {
  const { lang, t } = useVideoLang();
  const { openLoginModal, isLoggedIn } = useAuth();
  const [imgErr, setImgErr] = useState(false);
  const isSaved = savedIds.includes(video.id);

  const country = countryMeta[video.cuisine] || { flag: "🍽️", nameUz: video.cuisine };
  const diff = difficultyBadge[video.difficulty] || difficultyBadge.easy;

  // Approximate comments count and likes for UI
  const commentsCount = Math.max(12, Math.floor(video.views / 950));
  const likesCount = Math.max(45, Math.floor(video.views / 45));

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    if (onToggleSave) onToggleSave(video.id);
  };

  if (layout === "horizontal") {
    return (
      <div
        onClick={onClick}
        className="flex gap-3 cursor-pointer group rounded-xl p-1.5 hover:bg-zinc-800/40 transition-colors"
      >
        <div className="relative flex-shrink-0 w-40 sm:w-44 aspect-video rounded-xl overflow-hidden bg-zinc-800">
          <img
            src={
              imgErr
                ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=225&fit=crop"
                : video.thumbnail
            }
            alt={video.title[lang] || video.title.uz}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-start">
          <h4 className="text-sm font-medium text-zinc-100 group-hover:text-emerald-400 line-clamp-2 leading-snug">
            {video.title[lang] || video.title.uz}
          </h4>
          <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
            {video.chef}
            <CheckCircle2 size={12} className="text-zinc-500 inline" />
          </p>
          <div className="text-[11px] text-zinc-400 mt-0.5 flex items-center gap-2">
            <span>{country.flag} {country.nameUz}</span>
            <span>•</span>
            <span>{formatViews(video.views)} {t("views")}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="flex flex-col cursor-pointer group w-full transition-transform duration-200"
    >
      {/* Thumbnail 16:9 */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/60 shadow-sm group-hover:border-emerald-500/30 transition-all duration-300">
        <img
          src={
            imgErr
              ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=640&h=360&fit=crop"
              : video.thumbnail
          }
          alt={video.title[lang] || video.title.uz}
          onError={() => setImgErr(true)}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          loading="lazy"
        />

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-xs text-white text-xs font-semibold tracking-wider">
          {video.duration}
        </div>

        {/* Difficulty badge */}
        <div
          className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1"
          style={{
            background: diff.bg,
            color: diff.color,
            border: `1px solid ${diff.color}40`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: diff.color }} />
          {diff.labelUz}
        </div>

        {/* Cook time badge */}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/70 backdrop-blur-md text-zinc-300 flex items-center gap-1 border border-white/10">
          <Clock size={11} className="text-emerald-400" />
          {video.cookTime} daq
        </div>

        {/* Save button hover */}
        <button
          onClick={handleSaveClick}
          className={`absolute bottom-2 left-2 p-1.5 rounded-xl backdrop-blur-md transition-all ${
            isSaved
              ? "bg-emerald-600 text-white"
              : "bg-black/60 text-zinc-300 hover:text-white hover:bg-black/80 opacity-0 group-hover:opacity-100"
          }`}
          title={isSaved ? "Saqlanganlardan o'chirish" : "Keyinroq ko'rish"}
          aria-label={isSaved ? "Saqlanganlardan o'chirish" : "Keyinroq ko'rish"}
        >
          <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Meta info YouTube-style */}
      <div className="flex gap-3 mt-3 px-0.5">
        {/* Chef Avatar */}
        <div className="flex-shrink-0">
          <img
            src={video.chefAvatar || "https://i.pravatar.cc/150?img=11"}
            alt={video.chef}
            className="w-9 h-9 rounded-full object-cover border border-zinc-700/80 group-hover:border-emerald-500/50 transition-colors"
          />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-[14px] md:text-[15px] font-semibold text-zinc-100 line-clamp-2 leading-snug group-hover:text-emerald-400 transition-colors">
            {video.title[lang] || video.title.uz}
          </h3>

          {/* Chef name */}
          <div className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 mt-1 transition-colors">
            <span className="truncate">{video.chef}</span>
            <CheckCircle2 size={13} className="text-zinc-500 flex-shrink-0" />
          </div>

          {/* Stats: Country flag + Views + Likes + Comments */}
          <div className="text-xs text-zinc-400 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="inline-flex items-center gap-1 text-zinc-300 font-medium">
              <span>{country.flag}</span>
              <span>{country.nameUz} taomi</span>
            </span>
            <span>•</span>
            <span>{formatViews(video.views)} ko'rish</span>
          </div>

          {/* Social stats */}
          <div className="flex items-center gap-3 text-[11px] text-zinc-400 mt-1">
            <span className="flex items-center gap-1">
              <ThumbsUp size={11} className="text-emerald-500" />
              {formatViews(likesCount)}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare size={11} className="text-zinc-400" />
              {commentsCount} izoh
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardYT;
