import React from "react";
import { Chef } from "@/data/videos";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle2, Users, Video as VideoIcon, UserCheck, UserPlus } from "lucide-react";

interface ChefCardProps {
  chef: Chef;
  onSelectChef?: (chefId: string) => void;
}

export const ChefCard: React.FC<ChefCardProps> = ({ chef, onSelectChef }) => {
  const { subscribedChefIds, toggleSubscribe } = useAuth();
  const isSubscribed = subscribedChefIds.includes(chef.id);

  const subscribersCount = (chef.videos * 1240) + 3500;

  return (
    <div
      onClick={() => onSelectChef && onSelectChef(chef.id)}
      className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/30 transition-all cursor-pointer group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={chef.avatar}
          alt={chef.name}
          className="w-12 h-12 rounded-full object-cover border border-zinc-700/60 group-hover:border-emerald-500/50 transition-colors flex-shrink-0"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold text-zinc-100 group-hover:text-emerald-400 truncate">
              {chef.name}
            </h4>
            <CheckCircle2 size={13} className="text-zinc-500 flex-shrink-0" />
          </div>
          <p className="text-xs text-zinc-400 truncate">{chef.specialty.uz}</p>
          <div className="flex items-center gap-3 text-[11px] text-zinc-500 mt-0.5">
            <span className="flex items-center gap-1">
              <Users size={11} />
              {(subscribersCount / 1000).toFixed(1)}K obunachi
            </span>
            <span className="flex items-center gap-1">
              <VideoIcon size={11} />
              {chef.videos} taom
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleSubscribe(chef.id);
        }}
        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ml-3 ${
          isSubscribed
            ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700/80 border border-zinc-700/50"
            : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/30"
        }`}
      >
        {isSubscribed ? (
          <>
            <UserCheck size={13} className="text-emerald-400" />
            <span>Obuna bo'lindi</span>
          </>
        ) : (
          <>
            <UserPlus size={13} />
            <span>Obuna bo'lish</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ChefCard;
