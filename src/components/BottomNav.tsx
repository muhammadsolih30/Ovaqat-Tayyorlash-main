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

const NAV_HEIGHT = 76;

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
    { id: "ingredients", icon: TrendingUp, label: "Trend", isCategory: false },
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
    // Panel ochiq qoladi — boshqa kategoriya tanlash uchun qulay
  };

  const closePanel = () => {
    setShowCategories(false);
    setDragOffset(0);
  };

  // ── Swipe down to close ──────────────────────────────────────
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

  return (
    <>
      {/* ── 1. BACKDROP — navni YOPMAYDI (z:48) ── */}
      {showCategories && (
        <div
          onClick={closePanel}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            // Faqat nav tepasigacha — nav ko'rinadi
            bottom: NAV_HEIGHT + 12,
            zIndex: 48,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(3px)",
            animation: "fadeIn 0.22s ease",
          }}
        />
      )}

      {/* ── 2. KATEGORIYALAR PANELI — nav ustida, lekin navni yopmaydi (z:49) ── */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          // Nav TEPASIDAN boshlanadi — nav hech qachon yo'qolmaydi
          bottom: NAV_HEIGHT + 12,
          maxHeight: "70vh",
          zIndex: 49,
          transform: showCategories
            ? `translateY(${dragOffset}px)`
            : "translateY(calc(70vh + 40px))",
          transition: dragging.current
            ? "none"
            : showCategories
              ? "transform 0.44s cubic-bezier(0.34,1.4,0.64,1)"
              : "transform 0.32s cubic-bezier(0.55,0,0.45,1)",
          willChange: "transform",
          pointerEvents: showCategories ? "auto" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "70vh",
            background: "rgba(5,26,14,0.97)",
            backdropFilter: "blur(32px)",
            borderRadius: "24px 24px 0 0",
            borderTop: "1px solid rgba(74,222,128,0.28)",
            borderLeft: "1px solid rgba(74,222,128,0.12)",
            borderRight: "1px solid rgba(74,222,128,0.12)",
            boxShadow: "0 -16px 60px rgba(34,168,106,0.2)",
          }}
        >
          {/* Drag handle */}
          <div
            style={{ flexShrink: 0, cursor: "grab", userSelect: "none" }}
            className="flex flex-col items-center pt-3 pb-2"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
          >
            <div
              style={{
                width: 40,
                height: 4,
                borderRadius: 9999,
                background: "rgba(74,222,128,0.35)",
                marginBottom: 10,
              }}
            />
            <div className="flex items-center justify-between w-full px-5">
              <div>
                <p style={{ color: "#4ade80", fontWeight: 800, fontSize: 15 }}>
                  🍽️ {lang === "uz" ? "Kategoriyalar" : "Categories"}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    fontSize: 11,
                    marginTop: 1,
                  }}
                >
                  {lang === "uz" ? "Taom turini tanlang" : "Choose food type"}
                </p>
              </div>
              <button
                onClick={closePanel}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 9999,
                  background: "rgba(74,222,128,0.12)",
                  border: "1px solid rgba(74,222,128,0.25)",
                  color: "#4ade80",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <ChevronDown size={15} strokeWidth={2.5} />
              </button>
            </div>
            <div
              style={{
                margin: "12px 20px 0",
                height: 1,
                background:
                  "linear-gradient(90deg,transparent,rgba(74,222,128,0.3),transparent)",
                alignSelf: "stretch",
              }}
            />
          </div>

          {/* Scroll list */}
          <div
            style={{ flex: 1, overflowY: "auto", padding: "12px 16px 16px" }}
          >
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
                      padding: "14px 16px",
                      borderRadius: 16,
                      background: isAct
                        ? "rgba(34,168,106,0.28)"
                        : "rgba(255,255,255,0.05)",
                      border: isAct
                        ? "1.5px solid rgba(74,222,128,0.55)"
                        : "1px solid rgba(255,255,255,0.08)",
                      color: isAct ? "#4ade80" : "rgba(255,255,255,0.65)",
                      fontWeight: isAct ? 800 : 600,
                      fontSize: 13,
                      boxShadow: isAct
                        ? "0 0 18px rgba(34,168,106,0.2)"
                        : "none",
                      cursor: "pointer",
                      textAlign: "left",
                      opacity: showCategories ? 1 : 0,
                      transform: showCategories
                        ? "translateY(0)"
                        : "translateY(14px)",
                      transition: `opacity 0.3s ease ${i * 0.04}s, transform 0.38s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.04}s, background 0.2s`,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{cat.emoji}</span>
                    <span style={{ flex: 1 }}>{cat[lang]}</span>
                    {isAct && <span style={{ fontSize: 11 }}>✓</span>}
                  </button>
                );
              })}
            </div>

            {/* Admin kirish tugmasi */}
            <button
              onClick={() => {
                closePanel();
                onNavigate("admin");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                marginTop: 10,
                padding: "13px 16px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                textAlign: "left",
                opacity: showCategories ? 1 : 0,
                transform: showCategories
                  ? "translateY(0)"
                  : "translateY(14px)",
                transition: `opacity 0.3s ease ${categoryList.length * 0.04 + 0.06}s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${categoryList.length * 0.04 + 0.06}s`,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  flexShrink: 0,
                  background: "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                🛡️
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  Admin Panel
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: 11,
                    marginTop: 1,
                  }}
                >
                  {lang === "uz" ? "Boshqaruv paneli" : "Management panel"}
                </div>
              </div>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 18 }}>
                ›
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 3. BOTTOM NAV — DOIM z:50, hech narsa ustiga chiqmaydi ── */}
      <nav
        className="md:hidden"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          paddingBottom: "calc(env(safe-area-inset-bottom) + 10px)",
          paddingTop: 10,
          paddingLeft: 12,
          paddingRight: 12,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            borderRadius: 20,
            padding: "4px 4px",
            background: "rgba(6,24,13,0.96)",
            backdropFilter: "blur(32px)",
            border: "1px solid rgba(46,208,128,0.22)",
            boxShadow:
              "0 0 0 1px rgba(46,208,128,0.07), 0 -4px 40px rgba(34,168,106,0.12), 0 8px 48px rgba(0,0,0,0.6)",
          }}
        >
          {/* Top neon line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 32,
              right: 32,
              height: 1,
              background:
                "linear-gradient(90deg,transparent,rgba(74,222,128,0.7) 50%,transparent)",
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
                  gap: 2,
                  flex: 1,
                  padding: "8px 0",
                  color: isActive ? "#4ade80" : "rgba(255,255,255,0.32)",
                  transform: isActive
                    ? "scale(1.1) translateY(-1px)"
                    : "scale(1)",
                  transition: "all 0.3s",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 42,
                    height: 42,
                    borderRadius: 14,
                    background: isActive
                      ? "rgba(34,168,106,0.22)"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(74,222,128,0.4)"
                      : "1px solid transparent",
                    boxShadow: isActive
                      ? "0 0 22px rgba(74,222,128,0.32)"
                      : "none",
                    transition: "all 0.3s",
                  }}
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 1.6}
                    style={{
                      filter: isActive
                        ? "drop-shadow(0 0 7px rgba(74,222,128,0.9))"
                        : "none",
                      transition: "filter 0.3s",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: isActive ? 800 : 500,
                    opacity: isActive ? 1 : 0.4,
                    lineHeight: 1,
                    transition: "all 0.3s",
                  }}
                >
                  {label}
                </span>
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: -2,
                      width: 4,
                      height: 4,
                      borderRadius: 9999,
                      background: "#4ade80",
                      boxShadow: "0 0 8px #4ade80",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default BottomNav;
