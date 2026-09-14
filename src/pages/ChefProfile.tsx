import React from "react";
import { Chef, Video } from "@/data/videos";
import { useAuth } from "@/contexts/AuthContext";
import VideoCardYT from "@/components/VideoCardYT";
import { CheckCircle2, Users, Video as VideoIcon, ArrowLeft, UserCheck, UserPlus, Share2 } from "lucide-react";

interface ChefProfileProps {
  chef: Chef;
  videos: Video[];
  onBack: () => void;
  onSelectVideo: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export const ChefProfile: React.FC<ChefProfileProps> = ({
  chef,
  videos,
  onBack,
  onSelectVideo,
  savedIds,
  onToggleSave,
}) => {
  const { subscribedChefIds, toggleSubscribe } = useAuth();
  const isSubscribed = subscribedChefIds.includes(chef.id);

  const chefVideos = videos.filter((v) => {
    const vChef = v.chef.toLowerCase();
    const cName = chef.name.toLowerCase();
    return vChef.includes(cName) || cName.includes(vChef) || (chef.id === "c_pazanda" && vChef.includes("pazanda"));
  });
  const displayVideos = chefVideos.length > 0 ? chefVideos : videos.slice(0, 8);
  const totalViews = displayVideos.reduce((acc, v) => acc + v.views, 0);
  const subscribersCount = (chef.videos * 1240) + 3500;

  return (
    <div className="pb-16 animate-fade-in max-w-7xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:bg-zinc-700/80 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors"
      >
        <ArrowLeft size={14} />
        Orqaga qaytish
      </button>

      {/* Banner / Cover */}
      <div className="relative w-full h-44 sm:h-60 rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-zinc-900 to-black border border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/20 via-transparent to-transparent" />
        <div className="absolute bottom-4 right-5 text-right hidden sm:block">
          <span className="text-xs font-medium text-emerald-400/80 bg-black/60 px-3 py-1 rounded-full border border-emerald-500/20">
            Professional Chef Channel
          </span>
        </div>
      </div>

      {/* Profile Header (YouTube Channel Style) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-16 px-4 sm:px-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
          <img
            src={chef.avatar}
            alt={chef.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-zinc-950 shadow-2xl bg-zinc-50 dark:bg-zinc-900"
          />
          <div className="mb-1">
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                {chef.name}
              </h1>
              <CheckCircle2 size={20} className="text-emerald-500 fill-emerald-500/20" />
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium mt-0.5">
              @{chef.name.toLowerCase().replace(/\s+/g, "")} • {chef.specialty.uz}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-zinc-500 dark:text-zinc-500 mt-1">
              <span>{(subscribersCount / 1000).toFixed(1)}K obunachilar</span>
              <span>•</span>
              <span>{displayVideos.length} ta video retsept</span>
              <span>•</span>
              <span>{(totalViews / 1000).toFixed(0)}K ko'rishlar</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => toggleSubscribe(chef.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all ${
              isSubscribed
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:bg-zinc-700/80 border border-zinc-300 dark:border-zinc-700/60"
                : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30"
            }`}
          >
            {isSubscribed ? (
              <>
                <UserCheck size={16} className="text-emerald-400" />
                <span>Obuna bo'lindi</span>
              </>
            ) : (
              <>
                <UserPlus size={16} />
                <span>Obuna bo'lish</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert("Kanal havolasi nusxalandi!");
              }
            }}
            className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:bg-zinc-700/80 text-zinc-700 dark:text-zinc-300 transition-colors"
            title="Kanalni ulashish"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 mb-6 flex gap-6 px-4 text-sm font-medium">
        <button className="pb-3 text-emerald-500 border-b-2 border-emerald-500 font-semibold">
          Videolar ({displayVideos.length})
        </button>
        <button className="pb-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:text-zinc-200">
          Kanal haqida
        </button>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-7 px-2">
        {displayVideos.map((video) => (
          <VideoCardYT
            key={video.id}
            video={video}
            onClick={() => onSelectVideo(video.id)}
            savedIds={savedIds}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>
    </div>
  );
};

export default ChefProfile;
