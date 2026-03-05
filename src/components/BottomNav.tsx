import { useState, useRef } from "react";
import { useLang } from "@/contexts/LangContext";
import { categoryList } from "@/data/recipes";
import {
  Home,
  TrendingUp,
  LayoutGrid,
  Bookmark,
  Globe,
  ChevronDown,
} from "lucide-react";

interface BottomNavProps {
  active: string;
  onNavigate: (tab: string) => void;
  activeCategory?: string;
  onCategoryChange?: (cat: string) => void;
}

const BottomNav = ({
  active,
  onNavigate,
  activeCategory = "all",
  onCategoryChange,
}: BottomNavProps) => {
  const { lang } = useLang();
  const [showCategories, setShowCategories] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartY = useRef<number | null>(null);
  const dragDelta = useRef(0);
  const dragging = useRef(false);

  const tabs = [
    {
      id: "recipes",
      icon: Home,
      label: lang === "uz" ? "Bosh sahifa" : "Home",
      isCategory: false,
    },
    {
      id: "ingredients",
      icon: TrendingUp,
      label: "Trend",
      isCategory: false,
    },
    {
      id: "categories",
      icon: LayoutGrid,
      label: lang === "uz" ? "Kategoriyalar" : "Categories",
      isCategory: true,
    },
    {
      id: "saved",
      icon: Bookmark,
      label: lang === "uz" ? "Sevimlilar" : "Saved",
      isCategory: false,
    },
    {
      id: "tips",
      icon: Globe,
      label: lang === "uz" ? "Dunyo" : "World",
      isCategory: false,
    },
  ];

  const handleTabClick = (tab: (typeof tabs)[0]) => {
    if (tab.isCategory) {
      setShowCategories((prev) => !prev);
      setDragOffset(0);
      return;
    }
    setShowCategories(false);
    setDragOffset(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
    onNavigate(tab.id);
  };

  const handleCategorySelect = (catId: string) => {
    onCategoryChange?.(catId);
    window.scrollTo({ top: 0, behavior: "smooth" });
    onNavigate("recipes");
    setShowCategories(false);
  };

  const closePanel = () => {
    setShowCategories(false);
    setDragOffset(0);
  };

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

  return (
    <>
      {/* ── BACKDROP ── */}
      {showCategories && (
        <div
          onClick={closePanel}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 48,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            animation: "fadeInBg 0.2s ease",
          }}
        />
      )}

      {/* ── KATEGORIYALAR PANELI — nav ORQASIDA (z:49) ── */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          maxHeight: "78vh",
          zIndex: 49,
          transform: showCategories
            ? `translateY(${dragOffset}px)`
            : "translateY(105%)",
          transition: dragging.current
            ? "none"
            : showCategories
              ? "transform 0.44s cubic-bezier(0.34,1.3,0.64,1)"
              : "transform 0.28s cubic-bezier(0.55,0,0.45,1)",
          willChange: "transform",
          pointerEvents: showCategories ? "auto" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "78vh",
            background: "rgba(4,20,10,0.97)",
            backdropFilter: "blur(40px)",
            borderRadius: "28px 28px 0 0",
            borderTop: "1.5px solid rgba(74,222,128,0.35)",
            borderLeft: "1px solid rgba(74,222,128,0.15)",
            borderRight: "1px solid rgba(74,222,128,0.15)",
            boxShadow: "0 -20px 80px rgba(34,197,94,0.25)",
            /* Nav balandligi qadar joy qoldirish */
            paddingBottom: "calc(100px + env(safe-area-inset-bottom, 0px))",
          }}
        >
          {/* Drag handle */}
          <div
            style={{ flexShrink: 0, cursor: "grab", userSelect: "none" }}
            className="flex flex-col items-center pt-3 pb-1"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
          >
            <div
              style={{
                width: 44,
                height: 4,
                borderRadius: 99,
                background: "rgba(74,222,128,0.4)",
                marginBottom: 14,
              }}
            />
            <div className="flex items-center justify-between w-full px-5 mb-3">
              <div>
                <p
                  style={{
                    color: "#4ade80",
                    fontWeight: 800,
                    fontSize: 16,
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                  }}
                >
                  🍽️ {lang === "uz" ? "Kategoriyalar" : "Categories"}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: 11,
                    marginTop: 2,
                  }}
                >
                  {lang === "uz" ? "Taom turini tanlang" : "Choose food type"}
                </p>
              </div>
              <button
                onClick={closePanel}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 99,
                  background: "rgba(74,222,128,0.1)",
                  border: "1px solid rgba(74,222,128,0.3)",
                  color: "#4ade80",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <ChevronDown size={16} strokeWidth={2.5} />
              </button>
            </div>
            <div
              style={{
                margin: "0 20px",
                height: 1,
                background:
                  "linear-gradient(90deg,transparent,rgba(74,222,128,0.3),transparent)",
                alignSelf: "stretch",
              }}
            />
          </div>

          {/* Kategoriyalar grid */}
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px 8px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {categoryList.map((cat, i) => {
                const isAct = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "14px 14px",
                      borderRadius: 16,
                      background: isAct
                        ? "rgba(34,197,94,0.22)"
                        : "rgba(255,255,255,0.04)",
                      border: isAct
                        ? "1.5px solid rgba(74,222,128,0.6)"
                        : "1px solid rgba(255,255,255,0.07)",
                      color: isAct ? "#4ade80" : "rgba(255,255,255,0.6)",
                      fontWeight: isAct ? 800 : 600,
                      fontSize: 13,
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
                      boxShadow: isAct
                        ? "0 0 20px rgba(34,197,94,0.2), inset 0 0 20px rgba(74,222,128,0.05)"
                        : "none",
                      cursor: "pointer",
                      textAlign: "left",
                      opacity: panelVisible ? 1 : 0,
                      transform: panelVisible
                        ? "translateY(0) scale(1)"
                        : "translateY(16px) scale(0.97)",
                      transition: `opacity 0.25s ease ${i * 0.03}s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.03}s, background 0.2s`,
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{cat.emoji}</span>
                    <span style={{ flex: 1, lineHeight: 1.2 }}>
                      {cat[lang]}
                    </span>
                    {isAct && (
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 99,
                          background: "#4ade80",
                          boxShadow: "0 0 6px #4ade80",
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM NAV — z:100, DOIM USTIDA ── */}
      <nav
        className="md:hidden"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "10px 14px",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 10px)",
        }}
      >
        {/* Outer glow */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "10%",
            right: "10%",
            height: 60,
            background:
              "radial-gradient(ellipse at center, rgba(34,197,94,0.35) 0%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(12px)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            borderRadius: 24,
            padding: "6px 8px",
            background:
              "linear-gradient(135deg, rgba(10,40,20,0.92) 0%, rgba(6,26,14,0.96) 100%)",
            backdropFilter: "blur(40px)",
            border: "1.5px solid rgba(74,222,128,0.25)",
            boxShadow:
              "0 0 0 1px rgba(74,222,128,0.08), " +
              "0 -2px 30px rgba(34,197,94,0.15), " +
              "inset 0 1px 0 rgba(74,222,128,0.12), " +
              "0 8px 40px rgba(0,0,0,0.5)",
          }}
        >
          {/* Inner top glow line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "15%",
              right: "15%",
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(74,222,128,0.8) 50%, transparent)",
              borderRadius: 99,
              pointerEvents: "none",
            }}
          />

          {tabs.map(({ id, icon: Icon, label, isCategory }) => {
            const isActive = id === activeId;
            return (
              <button
                key={id}
                onClick={() =>
                  handleTabClick({ id, icon: Icon, label, isCategory })
                }
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
                {/* Icon container */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isActive ? 52 : 44,
                    height: isActive ? 52 : 44,
                    borderRadius: isActive ? 99 : 14,
                    background: isActive
                      ? "radial-gradient(circle at 40% 35%, rgba(74,222,128,0.9) 0%, rgba(34,197,94,0.75) 60%, rgba(21,128,61,0.8) 100%)"
                      : "rgba(255,255,255,0.06)",
                    border: isActive
                      ? "1.5px solid rgba(255,255,255,0.3)"
                      : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: isActive
                      ? "0 0 0 3px rgba(74,222,128,0.25), 0 0 30px rgba(74,222,128,0.55), inset 0 1px 0 rgba(255,255,255,0.25)"
                      : "none",
                    transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                    transform: isActive ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  <Icon
                    size={isActive ? 22 : 19}
                    strokeWidth={isActive ? 2.2 : 1.6}
                    style={{
                      color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                      filter: isActive
                        ? "drop-shadow(0 1px 4px rgba(0,0,0,0.3))"
                        : "none",
                      transition: "all 0.3s",
                    }}
                  />
                </div>

                {/* Label */}
                <span
                  style={{
                    fontSize: isActive ? 10 : 9.5,
                    fontWeight: isActive ? 800 : 500,
                    color: isActive ? "#4ade80" : "rgba(255,255,255,0.35)",
                    lineHeight: 1,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    transition: "all 0.3s",
                    letterSpacing: isActive ? "0.01em" : "0",
                    filter: isActive
                      ? "drop-shadow(0 0 6px rgba(74,222,128,0.6))"
                      : "none",
                  }}
                >
                  {label}
                </span>

                {/* Active dot at bottom */}
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      width: 5,
                      height: 5,
                      borderRadius: 99,
                      background: "#4ade80",
                      boxShadow:
                        "0 0 10px rgba(74,222,128,0.9), 0 0 20px rgba(74,222,128,0.4)",
                      animation: "dotPulse 2s ease-in-out infinite",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <style>{`
        @keyframes fadeInBg {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px rgba(74,222,128,0.9), 0 0 20px rgba(74,222,128,0.4); }
          50%       { opacity: 0.6; box-shadow: 0 0 6px rgba(74,222,128,0.5), 0 0 12px rgba(74,222,128,0.2); }
        }
      `}</style>
    </>
  );
};

export default BottomNav;
