import { useState, useRef } from "react";
import { useVideoLang } from "@/contexts/VideoLangContext";
import {
  Home,
  TrendingUp,
  Bookmark,
  Grid3X3,
  Search,
  X,
} from "lucide-react";

interface VideoMobileNavProps {
  active: string;
  onNavigate: (page: string) => void;
  onSearchOpen: () => void;
}

const GOLD = "#F5A623";

const VideoMobileNav = ({
  active,
  onNavigate,
  onSearchOpen,
}: VideoMobileNavProps) => {
  const { t } = useVideoLang();
  const [showCategories, setShowCategories] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartY = useRef<number | null>(null);
  const dragDelta = useRef(0);
  const dragging = useRef(false);

  const tabs = [
    { id: "home", icon: Home, label: t("home") },
    { id: "trending", icon: TrendingUp, label: t("trending") },
    { id: "categories", icon: Grid3X3, label: t("categories") || "Bo'limlar", isCategory: true },
    { id: "search", icon: Search, label: t("search").split(" ")[0] || "Qidiruv", isSearch: true },
    { id: "favorites", icon: Bookmark, label: t("saved") || "Saqlangan" },
  ];

  const categoryItems = [
    { id: "uzbek", emoji: "🇺🇿", label: t("uzbekCuisine") },
    { id: "world", emoji: "🌍", label: t("worldCuisine") },
    { id: "quick", emoji: "⚡", label: t("quickMeals") },
    { id: "healthy", emoji: "🥗", label: t("healthyFood") },
    { id: "dessert", emoji: "🍰", label: t("desserts") },
    { id: "bbq", emoji: "🔥", label: t("bbq") },
    { id: "vegetarian", emoji: "🥦", label: t("vegetarian") },
    { id: "breakfast", emoji: "☀️", label: t("breakfast") },
    { id: "dinner", emoji: "🌙", label: t("dinner") },
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    if (tab.isCategory) {
      setShowCategories((prev) => !prev);
      setDragOffset(0);
      return;
    }
    if (tab.isSearch) {
      onSearchOpen();
      return;
    }
    setShowCategories(false);
    setDragOffset(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
    onNavigate(tab.id);
  };

  const handleCategorySelect = (catId: string) => {
    onNavigate(catId);
    setShowCategories(false);
  };

  const closePanel = () => {
    setShowCategories(false);
    setDragOffset(0);
  };

  // Drag handlers
  const startDrag = (y: number) => {
    dragStartY.current = y;
    dragDelta.current = 0;
    dragging.current = true;
  };
  const moveDrag = (y: number) => {
    if (!dragging.current || dragStartY.current === null) return;
    const delta = y - dragStartY.current;
    dragDelta.current = delta;
    if (delta > 0) setDragOffset(Math.min(delta, 400));
  };
  const endDrag = () => {
    if (dragDelta.current > 80) closePanel();
    else setDragOffset(0);
    dragging.current = false;
    dragStartY.current = null;
    dragDelta.current = 0;
  };

  const onTouchStart = (e: React.TouchEvent) => startDrag(e.touches[0].clientY);
  const onTouchMove = (e: React.TouchEvent) => moveDrag(e.touches[0].clientY);
  const onTouchEnd = () => endDrag();
  const onMouseDown = (e: React.MouseEvent) => {
    startDrag(e.clientY);
    const mv = (ev: MouseEvent) => moveDrag(ev.clientY);
    const up = () => {
      endDrag();
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
  };

  const activeId = showCategories ? "categories" : active;
  const panelVisible = showCategories && dragOffset < 350;
  const NAV_HEIGHT = 80;

  return (
    <>
      {/* Backdrop */}
      {showCategories && (
        <div
          onClick={closePanel}
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 48,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
          }}
        />
      )}

      {/* Categories Panel */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: NAV_HEIGHT,
          zIndex: 49,
          maxHeight: "70vh",
          transform: showCategories
            ? `translateY(${dragOffset}px)`
            : "translateY(110%)",
          transition: dragging.current
            ? "none"
            : showCategories
              ? "transform 0.44s cubic-bezier(0.34,1.3,0.64,1)"
              : "transform 0.28s cubic-bezier(0.55,0,0.45,1)",
          pointerEvents: showCategories ? "auto" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "70vh",
            background: "rgba(15, 15, 22, 0.95)",
            backdropFilter: "blur(30px)",
            borderRadius: "28px 28px 0 0",
            border: "1px solid rgba(255,255,255,0.08)",
            borderBottom: "none",
            boxShadow: "0 -8px 40px rgba(0,0,0,0.4)",
            overflow: "hidden",
          }}
        >
          {/* Header with drag handle */}
          <div
            style={{ flexShrink: 0, cursor: "grab", userSelect: "none" }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "12px 0 0",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 4,
                  borderRadius: 99,
                  background: "rgba(255,255,255,0.15)",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 20px 12px",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {t("categories") || "Kategoriyalar"}
                </p>
                <p
                  style={{
                    margin: "3px 0 0",
                    fontSize: 12,
                    color: "var(--text-muted)",
                  }}
                >
                  Taom turini tanlang
                </p>
              </div>
              <button
                onClick={closePanel}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                }}
              >
                <X size={14} />
              </button>
            </div>
            <div
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                margin: "0 20px",
              }}
            />
          </div>

          {/* Category list */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 14px 20px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            {categoryItems.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 14px",
                  borderRadius: 16,
                  background:
                    active === cat.id
                      ? "rgba(245,166,35,0.1)"
                      : "rgba(255,255,255,0.03)",
                  border: `1px solid ${active === cat.id ? "rgba(245,166,35,0.2)" : "rgba(255,255,255,0.05)"}`,
                  cursor: "pointer",
                  textAlign: "left",
                  opacity: panelVisible ? 1 : 0,
                  transform: panelVisible ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 0.25s ease ${i * 0.03}s, transform 0.3s ease ${i * 0.03}s`,
                }}
              >
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                  }}
                >
                  {cat.emoji}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: active === cat.id ? GOLD : "var(--text-secondary)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM NAV ═══ */}
      <nav
        className="md:hidden"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "8px 12px",
          paddingBottom: "calc(env(safe-area-inset-bottom,0px) + 8px)",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "10%",
            right: "10%",
            height: 40,
            background:
              "radial-gradient(ellipse at center, rgba(245,166,35,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(16px)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            borderRadius: 24,
            padding: "6px 4px",
            background: "rgba(12, 12, 18, 0.9)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 -4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Top shine line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "15%",
              right: "15%",
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(245,166,35,0.3) 30%, rgba(245,166,35,0.5) 50%, rgba(245,166,35,0.3) 70%, transparent)",
              borderRadius: 99,
              pointerEvents: "none",
            }}
          />

          {tabs.map(({ id, icon: Icon, label, isCategory, isSearch }) => {
            const isActive = id === activeId;
            return (
              <button
                key={id}
                onClick={() => handleTabClick({ id, icon: Icon, label, isCategory, isSearch } as any)}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  flex: 1,
                  padding: "6px 0 4px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: isActive ? 99 : 14,
                    background: isActive
                      ? "linear-gradient(135deg, rgba(245,166,35,0.2), rgba(245,166,35,0.1))"
                      : "transparent",
                    border: isActive
                      ? "1.5px solid rgba(245,166,35,0.3)"
                      : "1.5px solid transparent",
                    transition: "all 0.35s cubic-bezier(0.34,1.4,0.64,1)",
                    transform: isActive
                      ? "translateY(-2px) scale(1.05)"
                      : "translateY(0) scale(1)",
                    boxShadow: isActive
                      ? "0 4px 16px rgba(245,166,35,0.15)"
                      : "none",
                  }}
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.2 : 1.5}
                    style={{
                      color: isActive ? GOLD : "rgba(255,255,255,0.35)",
                      filter: isActive
                        ? "drop-shadow(0 0 6px rgba(245,166,35,0.5))"
                        : "none",
                      transition: "all 0.3s",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: isActive ? 800 : 500,
                    color: isActive ? GOLD : "rgba(255,255,255,0.3)",
                    lineHeight: 1,
                    fontFamily: "var(--font-display)",
                    filter: isActive
                      ? "drop-shadow(0 0 4px rgba(245,166,35,0.4))"
                      : "none",
                    transition: "all 0.3s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default VideoMobileNav;
