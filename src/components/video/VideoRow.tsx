import { Video } from "@/data/videos";
import { useVideoLang } from "@/contexts/VideoLangContext";
import VideoCard from "./VideoCard";
import { ChevronRight } from "lucide-react";

interface VideoRowProps {
  title: string;
  videos: Video[];
  onSelectVideo: (id: string) => void;
  onSeeAll?: () => void;
  savedIds?: string[];
  onToggleSave?: (id: string) => void;
}

const VideoRow = ({
  title,
  videos,
  onSelectVideo,
  onSeeAll,
  savedIds,
  onToggleSave,
}: VideoRowProps) => {
  const { t, dark } = useVideoLang();

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2
          className="font-black text-xl"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: dark ? "#f1f5f9" : "#111827",
          }}
        >
          {title}
        </h2>
        {onSeeAll && (
          <button
            onClick={onSeeAll}
            className="flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{
              color: "#1DB954",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {t("seeAll")} <ChevronRight size={16} />
          </button>
        )}
      </div>
      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
        {videos.map((video) => (
          <div key={video.id} className="flex-shrink-0 w-64 md:w-auto">
            <VideoCard
              video={video}
              onClick={() => onSelectVideo(video.id)}
              savedIds={savedIds}
              onToggleSave={onToggleSave}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoRow;
