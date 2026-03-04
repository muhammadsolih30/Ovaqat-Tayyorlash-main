import { useVideoLang } from "@/contexts/VideoLangContext";
import { Home, Grid, Search, TrendingUp, Bookmark } from "lucide-react";

interface VideoMobileNavProps {
  active: string;
  onNavigate: (page: string) => void;
  onSearchOpen: () => void;
}

const VideoMobileNav = ({
  active,
  onNavigate,
  onSearchOpen,
}: VideoMobileNavProps) => {
  const { t, dark } = useVideoLang();

  const tabs = [
    { id: "home", label: t("home"), icon: Home },
    { id: "categories", label: t("categories"), icon: Grid },
    { id: "search", label: "Search", icon: Search, action: onSearchOpen },
    { id: "trending", label: t("trending"), icon: TrendingUp },
    { id: "favorites", label: t("favorites"), icon: Bookmark },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: dark ? "rgba(15,23,42,0.98)" : "rgba(21,128,61,0.97)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 -4px 30px rgba(0,0,0,0.25)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map(({ id, label, icon: Icon, action }) => (
          <button
            key={id}
            onClick={() => (action ? action() : onNavigate(id))}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-all"
            style={{
              color: active === id ? "white" : "rgba(255,255,255,0.45)",
            }}
          >
            {active === id ? (
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center mb-0.5"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <Icon size={18} strokeWidth={2.5} />
              </div>
            ) : (
              <Icon size={20} strokeWidth={1.7} />
            )}
            <span
              className="text-[9px] font-bold tracking-wide"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default VideoMobileNav;
