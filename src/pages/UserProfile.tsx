import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { videos } from "@/data/videos";
import VideoCardYT from "@/components/VideoCardYT";
import { Clock, ThumbsUp, Bookmark, LogOut, Settings, ChevronRight, User, MessageSquare } from "lucide-react";

export const UserProfile: React.FC = () => {
  const { user, logout, openLoginModal } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="w-24 h-24 rounded-full bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center mb-6">
          <User size={48} className="text-zinc-500 dark:text-zinc-500" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Profilga kirmagansiz</h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-md mb-8">
          Tarix, yoqqan videolar va saqlangan retseptlarni ko'rish uchun profilingizga kiring
        </p>
        <button
          onClick={openLoginModal}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-medium transition-colors"
        >
          Tizimga kirish
        </button>
      </div>
    );
  }

  const historyVideos = user.historyIds?.map(id => videos.find(v => v.id === id)).filter(Boolean) || [];
  const likedVideos = user.likedIds?.map(id => videos.find(v => v.id === id)).filter(Boolean) || [];
  const savedVideos = user.savedIds?.map(id => videos.find(v => v.id === id)).filter(Boolean) || [];
  const commentedVideos = user.commentedIds?.map(id => videos.find(v => v.id === id)).filter(Boolean) || [];

  const renderVideoRow = (title: string, icon: React.ReactNode, videoList: any[], emptyMsg: string) => {
    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl text-emerald-500">
              {icon}
            </div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
          </div>
          {videoList.length > 0 && (
            <button className="text-sm font-medium text-emerald-500 hover:text-emerald-400 flex items-center">
              Barchasi <ChevronRight size={16} />
            </button>
          )}
        </div>

        {videoList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {videoList.slice(0, 5).map((v, i) => (
              <VideoCardYT
                key={`${v.id}-${i}`}
                video={v}
                onClick={() => window.location.href = `/video/${v.id}`}
                savedIds={user.savedIds || []}
                onToggleSave={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50 rounded-2xl p-8 text-center">
            <p className="text-zinc-600 dark:text-zinc-400">{emptyMsg}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header Profile Info */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-zinc-200 dark:border-zinc-800"
        />
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-2">{user.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-zinc-600 dark:text-zinc-400 text-sm">
            <span className="bg-zinc-100 dark:bg-zinc-800/60 px-3 py-1 rounded-lg">@{user.email.split('@')[0]}</span>
            <span className="flex items-center gap-1.5">
              <Clock size={16} /> Tarix: {historyVideos.length}
            </span>
            <span className="flex items-center gap-1.5">
              <ThumbsUp size={16} /> Yoqdi: {likedVideos.length}
            </span>
            <span className="flex items-center gap-1.5">
              <Bookmark size={16} /> Saqlangan: {savedVideos.length}
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquare size={16} /> Izohlar: {commentedVideos.length}
            </span>
          </div>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 text-white rounded-full font-medium transition-colors"
          >
            <Settings size={18} /> Sozlamalar
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-full font-medium transition-colors"
          >
            <LogOut size={18} /> Chiqish
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {renderVideoRow(
          "Tarix", 
          <Clock size={20} />, 
          historyVideos, 
          "Hali hech qanday video ko'rmadingiz"
        )}

        {renderVideoRow(
          "Yoqqan videolar", 
          <ThumbsUp size={20} />, 
          likedVideos, 
          "Sizga hali hech qanday video yoqmadi"
        )}

        {renderVideoRow(
          "Saqlangan retseptlar", 
          <Bookmark size={20} />, 
          savedVideos, 
          "Saqlangan videolar yo'q"
        )}

        {renderVideoRow(
          "Izoh qoldirilgan videolar", 
          <MessageSquare size={20} />, 
          commentedVideos, 
          "Hali izoh qoldirmagansiz"
        )}
      </div>
    </div>
  );
};

export default UserProfile;
