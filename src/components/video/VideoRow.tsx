import { Video } from "@/data/videos";
import { useVideoLang } from "@/contexts/VideoLangContext";
import VideoCard from "./VideoCard";
import { ChevronRight } from "lucide-react";

interface VideoRowProps {
  title: string;
  videos: Video[];
  onSelectVideo: (id: string) => void;
  onSeeAll?: () => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

const GOLD = "#F5A623";

const VideoRow = ({
  title,
  videos,
  onSelectVideo,
  onSeeAll,
  savedIds,
  onToggleSave,
}: VideoRowProps) => {
  const { t } = useVideoLang();

  if (!videos.length) return null;

  return (
    <section className="mb-12 animate-fade-in">
      <div className="flex items-center justify-between mb-5 px-1">
        <h2
          className="font-black text-xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h2>
        {onSeeAll && (
          <button
            onClick={onSeeAll}
            className="flex items-center gap-1 text-sm font-semibold transition-all group"
            style={{
              color: GOLD,
              fontFamily: "var(--font-display)",
            }}
          >
            {t("seeAll")}
            <ChevronRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {videos.map((v, i) => (
          <div key={v.id} className={`animate-card-in stagger-${i + 1}`}>
            <VideoCard
              video={v}
              onClick={() => onSelectVideo(v.id)}
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
