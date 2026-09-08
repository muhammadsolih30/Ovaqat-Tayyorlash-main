import { useState, useEffect } from "react";
import { Video, formatViews } from "@/data/videos";
import { useVideoLang } from "@/contexts/VideoLangContext";
import { useAdmin } from "@/contexts/AdminContext";
import { useAuth } from "@/contexts/AuthContext";
import VideoCardYT from "@/components/VideoCardYT";
import CommentSection from "@/components/CommentSection";
import {
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Clock,
  Users,
  CheckCircle2,
  Play,
  CheckSquare,
  Square,
  Timer,
  ChefHat,
  ChevronDown,
  ChevronUp,
  Flame,
  UserCheck,
  UserPlus,
} from "lucide-react";

interface VideoWatchProps {
  video: Video;
  onBack: () => void;
  onSelectVideo: (id: string) => void;
  onNavigate?: (page: string, data?: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

const countryMeta: Record<string, { flag: string; nameUz: string }> = {
  uzbek: { flag: "🇺🇿", nameUz: "O'zbekiston" },
  russian: { flag: "🇷🇺", nameUz: "Rossiya" },
  turkish: { flag: "🇹🇷", nameUz: "Turkiya" },
  japanese: { flag: "🇯🇵", nameUz: "Yaponiya" },
  korean: { flag: "🇰🇷", nameUz: "Koreya" },
  chinese: { flag: "🇨🇳", nameUz: "Xitoy" },
  italian: { flag: "🇮🇹", nameUz: "Italiya" },
  french: { flag: "🇫🇷", nameUz: "Fransiya" },
  american: { flag: "🇺🇸", nameUz: "AQSh" },
  indian: { flag: "🇮🇳", nameUz: "Hindiston" },
  mexican: { flag: "🇲🇽", nameUz: "Meksika" },
};

export const VideoWatch = ({
  video,
  onBack,
  onSelectVideo,
  onNavigate,
  savedIds,
  onToggleSave,
}: VideoWatchProps) => {
  const { lang, t } = useVideoLang();
  const { videoList } = useAdmin();
  const { isLoggedIn, openLoginModal, subscribedChefIds, toggleSubscribe } = useAuth();

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"recipe" | "steps" | "timer">("recipe");
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerInterval, setTimerInterval] = useState<ReturnType<typeof setInterval> | null>(null);

  const isSaved = savedIds.includes(video.id);
  const isSubscribed = subscribedChefIds.includes(video.chef);
  const country = countryMeta[video.cuisine] || { flag: "🌍", nameUz: video.cuisine };

  const related = videoList
    .filter((v) => v.id !== video.id)
    .slice(0, 10);

  const handleLike = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const handleSave = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    onToggleSave(video.id);
  };

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
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

  const stopTimer = () => {
    if (timerInterval) clearInterval(timerInterval);
    setTimerActive(false);
    setTimerSeconds(0);
  };

  useEffect(() => {
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [timerInterval]);

  const fmtTimer = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const baseLikes = Math.max(120, Math.floor(video.views / 38));
  const displayLikes = liked ? baseLikes + 1 : baseLikes;

  return (
    <div className="w-full max-w-[1780px] mx-auto pb-16 animate-fade-in">
      {/* 2-Column YouTube Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_420px] gap-6">
        
        {/* LEFT COLUMN (70%): Player + Info + Recipe breakdown + Comments */}
        <div className="min-w-0">
          {/* 1. Video Player */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-zinc-800/80">
            {isPlaying ? (
              <iframe
                src={`${video.videoUrl}?autoplay=1`}
                title={video.title[lang] || video.title.uz}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div
                onClick={() => setIsPlaying(true)}
                className="relative w-full h-full cursor-pointer group"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title[lang] || video.title.uz}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-600/50 group-hover:scale-110 transition-transform">
                    <Play size={28} fill="white" className="ml-1" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Video Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-4 leading-snug">
            {video.title[lang] || video.title.uz}
          </h1>

          {/* 3. Chef Channel + Action Buttons Row (YouTube 1:1) */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 border-b border-zinc-800/80 mt-1">
            {/* Chef info & subscribe button */}
            <div className="flex items-center gap-3">
              <img
                src={video.chefAvatar}
                alt={video.chef}
                className="w-11 h-11 rounded-full object-cover border border-zinc-700 cursor-pointer"
                onClick={() => onNavigate && onNavigate("chefs")}
              />
              <div>
                <div className="flex items-center gap-1 font-semibold text-sm text-zinc-100">
                  <span>{video.chef}</span>
                  <CheckCircle2 size={14} className="text-emerald-500" />
                </div>
                <p className="text-xs text-zinc-400">45.2K obunachi</p>
              </div>

              <button
                type="button"
                onClick={() => toggleSubscribe(video.chef)}
                className={`ml-2 px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isSubscribed
                    ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700"
                    : "bg-white hover:bg-zinc-200 text-zinc-950 shadow-md font-bold"
                }`}
              >
                {isSubscribed ? (
                  <>
                    <UserCheck size={14} className="text-emerald-500" />
                    <span>Obuna bo'lindi</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={14} />
                    <span>Obuna bo'lish</span>
                  </>
                )}
              </button>
            </div>

            {/* Action buttons (Like, Dislike, Share, Save) */}
            <div className="flex items-center gap-2">
              {/* Like / Dislike pill */}
              <div className="flex items-center bg-zinc-800/80 rounded-full border border-zinc-700/60 overflow-hidden">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold hover:bg-zinc-700/80 transition-colors ${
                    liked ? "text-emerald-400" : "text-zinc-200"
                  }`}
                >
                  <ThumbsUp size={15} fill={liked ? "currentColor" : "none"} />
                  <span>{formatViews(displayLikes)}</span>
                </button>
                <div className="w-[1px] h-4 bg-zinc-700" />
                <button
                  onClick={handleDislike}
                  className={`px-3 py-2 text-xs hover:bg-zinc-700/80 transition-colors ${
                    disliked ? "text-red-400" : "text-zinc-300"
                  }`}
                  title="Yoqmadi"
                >
                  <ThumbsDown size={15} fill={disliked ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Share button */}
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Retsept havolasi nusxalandi!");
                  }
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/60 text-xs font-semibold text-zinc-200 transition-colors"
              >
                <Share2 size={14} />
                <span>Ulashish</span>
              </button>

              {/* Save / Bookmark button */}
              <button
                onClick={handleSave}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-semibold transition-all ${
                  isSaved
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30"
                    : "bg-zinc-800/80 hover:bg-zinc-700/80 border-zinc-700/60 text-zinc-200"
                }`}
              >
                <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
                <span>{isSaved ? "Saqlandi" : "Saqlash"}</span>
              </button>
            </div>
          </div>

          {/* 4. Description Box (YouTube collapsible) */}
          <div
            onClick={() => setDescExpanded(!descExpanded)}
            className="mt-4 p-4 rounded-2xl bg-zinc-900/90 hover:bg-zinc-900 border border-zinc-800 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3 text-xs font-bold text-zinc-300 mb-1.5">
              <span>{formatViews(video.views)} marta ko'rildi</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span>{country.flag}</span>
                <span>{country.nameUz} taomi</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-emerald-400" />
                {video.cookTime} daqiqa
              </span>
              <span>•</span>
              <span className="text-emerald-400 capitalize">{video.difficulty}</span>
            </div>

            <p className={`text-xs sm:text-sm text-zinc-300 leading-relaxed ${descExpanded ? "" : "line-clamp-2"}`}>
              {video.description[lang] || video.description.uz}
            </p>

            <button className="text-xs font-semibold text-emerald-400 mt-2 flex items-center gap-1">
              {descExpanded ? (
                <>
                  <span>Kamroq ko'rsatish</span>
                  <ChevronUp size={14} />
                </>
              ) : (
                <>
                  <span>Ko'proq o'qish...</span>
                  <ChevronDown size={14} />
                </>
              )}
            </button>
          </div>

          {/* 5. Recipe Interactive Panel (Ingredients + Steps + Timer) */}
          <div className="mt-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-zinc-800 text-xs sm:text-sm font-semibold">
              <button
                onClick={() => setActiveTab("recipe")}
                className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === "recipe"
                    ? "bg-zinc-800/80 text-emerald-400 border-b-2 border-emerald-500"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <ChefHat size={16} />
                <span>Masalliqlar ({video.ingredients.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("steps")}
                className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === "steps"
                    ? "bg-zinc-800/80 text-emerald-400 border-b-2 border-emerald-500"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <CheckSquare size={16} />
                <span>Qadam-baqadam ({video.steps.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("timer")}
                className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === "timer"
                    ? "bg-zinc-800/80 text-emerald-400 border-b-2 border-emerald-500"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Timer size={16} />
                <span>Oshxona Taymeri</span>
              </button>
            </div>

            <div className="p-4 sm:p-5">
              {/* Tab 1: Ingredients Checklist */}
              {activeTab === "recipe" && (
                <div className="space-y-2">
                  <p className="text-xs text-zinc-400 mb-3">
                    Tayyorlagan masalliqlar ustiga bosing (tekshirish uchun):
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {video.ingredients.map((ing, idx) => {
                      const checked = checkedIngredients.includes(idx);
                      const text = ing[lang] || ing.uz;
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleIngredient(idx)}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all ${
                            checked
                              ? "bg-emerald-950/30 border-emerald-500/40 text-zinc-400 line-through"
                              : "bg-zinc-800/40 border-zinc-700/50 text-zinc-200 hover:border-emerald-500/30"
                          }`}
                        >
                          {checked ? (
                            <CheckSquare size={17} className="text-emerald-500 flex-shrink-0" />
                          ) : (
                            <Square size={17} className="text-zinc-500 flex-shrink-0" />
                          )}
                          <span className="text-xs sm:text-sm">{text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 2: Steps list */}
              {activeTab === "steps" && (
                <div className="space-y-3">
                  {video.steps.map((st, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3.5 p-3.5 rounded-xl bg-zinc-800/30 border border-zinc-700/40"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-600/20 text-emerald-400 text-xs font-bold flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                        {st[lang] || st.uz}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Cooking Timer */}
              {activeTab === "timer" && (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="w-32 h-32 rounded-full border-4 border-emerald-500/40 flex items-center justify-center mb-4 bg-zinc-950">
                    <span className="text-3xl font-mono font-bold text-white tracking-widest">
                      {fmtTimer(timerSeconds)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center mb-5">
                    {[5, 10, 15, 20, 30, 45].map((m) => (
                      <button
                        key={m}
                        onClick={() => startTimer(m)}
                        className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
                      >
                        +{m} daq
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={stopTimer}
                    className="px-6 py-2 rounded-full bg-red-600/80 hover:bg-red-500 text-white text-xs font-bold transition-colors"
                  >
                    Taymerni to'xtatish
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 6. Comment Section */}
          <CommentSection videoId={video.id} />
        </div>

        {/* RIGHT COLUMN (30%): Recommended Videos (YouTube Up Next) */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-white mb-2 px-1">
            Tavsiya etilgan videolar
          </h3>
          <div className="space-y-3">
            {related.map((v) => (
              <VideoCardYT
                key={v.id}
                video={v}
                onClick={() => {
                  onSelectVideo(v.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                savedIds={savedIds}
                onToggleSave={onToggleSave}
                layout="horizontal"
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default VideoWatch;
