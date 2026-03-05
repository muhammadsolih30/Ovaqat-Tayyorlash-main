import { useState, useRef } from "react";
import { useLang } from "@/contexts/LangContext";
import { Home, TrendingUp, LayoutGrid, Bookmark, Globe, X } from "lucide-react";

interface BottomNavProps {
  active: string;
  onNavigate: (tab: string) => void;
  activeCategory?: string;
  onCategoryChange?: (cat: string) => void;
}

// Barcha kategoriyalar — to'liq ro'yxat
const allCategories = [
  // O'zbek taomlari — KATTA KARTA
  {
    id: "uzbek",
    uz: "O'zbek taomlari",
    en: "Uzbek Dishes",
    emoji: "🇺🇿",
    type: "big",
    desc_uz: "Palov, Lagman, Somsa...",
  },

  // Asosiy kategoriyalar — 3 ustunli grid
  {
    id: "fast",
    uz: "Tez taomlar",
    en: "Fast Food",
    emoji: "⚡",
    type: "small",
  },
  {
    id: "healthy",
    uz: "Sog'lom ovqat",
    en: "Healthy Food",
    emoji: "🥗",
    type: "small",
  },
  {
    id: "dessert",
    uz: "Shirinliklar",
    en: "Desserts",
    emoji: "🍰",
    type: "small",
  },
  {
    id: "vegetarian",
    uz: "Vegetarian",
    en: "Vegetarian",
    emoji: "🥦",
    type: "small",
  },
  {
    id: "breakfast",
    uz: "Nonushta",
    en: "Breakfast",
    emoji: "☀️",
    type: "small",
  },
  {
    id: "grill",
    uz: "Kabob & Gril",
    en: "Kabob & Grill",
    emoji: "🔥",
    type: "small",
  },

  // Vaqt bo'yicha — alohida bo'lim
  {
    id: "morning",
    uz: "Nonushta uchun",
    en: "For Breakfast",
    emoji: "🌅",
    type: "time",
  },
  {
    id: "lunch",
    uz: "Tushlik uchun",
    en: "For Lunch",
    emoji: "🌞",
    type: "time",
  },
  {
    id: "dinner",
    uz: "Kechgi taomlar",
    en: "For Dinner",
    emoji: "🌙",
    type: "time",
  },

  // Admin — alohida
  {
    id: "admin",
    uz: "Admin Panel",
    en: "Admin Panel",
    emoji: "⚙️",
    type: "admin",
  },

  // Davlat taomlari — KATTA KARTA (eng oxirida)
  {
    id: "world",
    uz: "Davlat Taomlari",
    en: "World Cuisines",
    emoji: "🌍",
    type: "big",
    desc_uz: "10+ mamlakat oshxonasi",
  },
];

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
    if (catId === "admin") {
      onNavigate("admin");
      setShowCategories(false);
      return;
    }
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
  const NAV_HEIGHT = 80;

  const bigCats = allCategories.filter((c) => c.type === "big");
  const smallCats = allCategories.filter((c) => c.type === "small");
  const timeCats = allCategories.filter((c) => c.type === "time");
  const adminCat = allCategories.find((c) => c.type === "admin")!;
  const uzbekCat = bigCats.find((c) => c.id === "uzbek")!;
  const worldCat = bigCats.find((c) => c.id === "world")!;

  return (
    <>
      <style>{`
        @keyframes fadeInBg {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes navGlow {
          0%,100% { box-shadow: 0 0 30px rgba(34,197,94,0.45), 0 0 60px rgba(34,197,94,0.2), inset 0 1px 0 rgba(255,255,255,0.15); }
          50%      { box-shadow: 0 0 45px rgba(34,197,94,0.65), 0 0 90px rgba(34,197,94,0.3), inset 0 1px 0 rgba(255,255,255,0.2); }
        }
        @keyframes activeGlow {
          0%,100% { box-shadow: 0 0 0 2.5px rgba(255,255,255,0.45), 0 0 22px rgba(74,222,128,0.85), 0 0 44px rgba(34,197,94,0.5); }
          50%      { box-shadow: 0 0 0 2.5px rgba(255,255,255,0.55), 0 0 32px rgba(74,222,128,1), 0 0 60px rgba(34,197,94,0.7); }
        }
      `}</style>

      {/* BACKDROP */}
      {showCategories && (
        <div
          onClick={closePanel}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 48,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            animation: "fadeInBg 0.2s ease",
          }}
        />
      )}

      {/* ═══ KATEGORIYALAR PANELI ═══
          bottom: NAV_HEIGHT → nav ustini HECH QACHON yopmaydi
          zIndex: 49         → nav (100) dan past, nav doim ko'rinadi
      */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: NAV_HEIGHT,
          zIndex: 49,
          maxHeight: "72vh",
          transform: showCategories
            ? `translateY(${dragOffset}px)`
            : "translateY(110%)",
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
            maxHeight: "72vh",
            background: "#ffffff",
            borderRadius: "24px 24px 0 0",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
            overflow: "hidden",
          }}
        >
          {/* Drag handle + Header */}
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
                  background: "#e0e0e0",
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
                    color: "#111",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {lang === "uz" ? "Kategoriyalar" : "Categories"}
                </p>
                <p style={{ margin: "3px 0 0", fontSize: 12, color: "#999" }}>
                  {lang === "uz" ? "Taom turini tanlang" : "Choose food type"}
                </p>
              </div>
              <button
                onClick={closePanel}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 99,
                  background: "#f0f0f0",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#666",
                }}
              >
                <X size={16} />
              </button>
            </div>
            <div
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg,transparent,rgba(0,0,0,0.08),transparent)",
                margin: "0 20px",
              }}
            />
          </div>

          {/* Scroll content */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {/* 1. O'zbek taomlari */}
            <BigCard
              cat={uzbekCat}
              lang={lang}
              isAct={activeCategory === uzbekCat.id}
              panelVisible={panelVisible}
              onSelect={handleCategorySelect}
              delay={0}
            />

            {/* 2. Vaqt bo'yicha taomlar — O'zbek dan keyin */}
            {[
              {
                id: "morning",
                emoji: "🌅",
                uz: "Nonushta taomlar",
                en: "Breakfast Meals",
              },
              {
                id: "lunch",
                emoji: "🌞",
                uz: "Tushlik taomlari",
                en: "Lunch Meals",
              },
              {
                id: "dinner",
                emoji: "🌙",
                uz: "Kechgi taomlar",
                en: "Dinner Meals",
              },
            ].map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleCategorySelect(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "13px 18px",
                  borderRadius: 14,
                  background:
                    activeCategory === item.id
                      ? "rgba(34,197,94,0.1)"
                      : "#f7f7f7",
                  border:
                    activeCategory === item.id
                      ? "1.5px solid rgba(34,197,94,0.4)"
                      : "1.5px solid #ebebeb",
                  cursor: "pointer",
                  textAlign: "left",
                  opacity: panelVisible ? 1 : 0,
                  transform: panelVisible
                    ? "translateY(0)"
                    : "translateY(10px)",
                  transition: `opacity 0.25s ease ${i * 0.05 + 0.05}s, transform 0.3s ease ${i * 0.05 + 0.05}s`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 24 }}>{item.emoji}</span>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: activeCategory === item.id ? "#16a34a" : "#333",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {lang === "uz" ? item.uz : item.en}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 18,
                    color: activeCategory === item.id ? "#16a34a" : "#aaa",
                  }}
                >
                  ›
                </span>
              </button>
            ))}

            {/* 3. Admin panel */}
            <button
              onClick={() => handleCategorySelect("admin")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "13px 18px",
                borderRadius: 14,
                background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                opacity: panelVisible ? 1 : 0,
                transform: panelVisible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.25s ease 0.2s, transform 0.3s ease 0.2s",
              }}
            >
              <span style={{ fontSize: 22 }}>⚙️</span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {lang === "uz" ? "Admin Panel" : "Admin Panel"}
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 18,
                }}
              >
                ›
              </span>
            </button>

            {/* 4. Davlat Taomlari */}
            <BigCard
              cat={worldCat}
              lang={lang}
              isAct={activeCategory === worldCat.id}
              panelVisible={panelVisible}
              onSelect={handleCategorySelect}
              delay={0.05}
              isWorld
            />

            {/* 3. Asosiy kategoriyalar */}
            <SectionLabel
              label={lang === "uz" ? "Taom turlari" : "Food Types"}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 8,
              }}
            >
              {smallCats.map((cat, i) => (
                <SmallCard
                  key={cat.id}
                  cat={cat}
                  lang={lang}
                  isAct={activeCategory === cat.id}
                  panelVisible={panelVisible}
                  onSelect={handleCategorySelect}
                  delay={i * 0.04 + 0.05}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM NAV — yashil glassmorphism, DOIM ENG USTIDA ═══ */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "10px 16px",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 10px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "5%",
            right: "5%",
            height: 50,
            background:
              "radial-gradient(ellipse at center, rgba(34,197,94,0.55) 0%, transparent 70%)",
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
            borderRadius: 28,
            padding: "8px 6px",
            background:
              "linear-gradient(145deg, rgba(20,90,45,0.88) 0%, rgba(12,60,28,0.94) 50%, rgba(18,80,40,0.90) 100%)",
            backdropFilter: "blur(30px)",
            border: "1.5px solid rgba(74,222,128,0.4)",
            animation: "navGlow 3s ease-in-out infinite",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "8%",
              right: "8%",
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(134,239,172,0.8) 30%, rgba(200,255,220,0.95) 50%, rgba(134,239,172,0.8) 70%, transparent)",
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
                  gap: 5,
                  flex: 1,
                  padding: "4px 0 3px",
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
                    width: 48,
                    height: 48,
                    borderRadius: isActive ? 99 : 16,
                    background: isActive
                      ? "radial-gradient(circle at 40% 30%, rgba(150,255,180,0.95) 0%, rgba(34,197,94,0.88) 50%, rgba(21,128,61,0.92) 100%)"
                      : "rgba(255,255,255,0.09)",
                    border: isActive
                      ? "2px solid rgba(255,255,255,0.55)"
                      : "1.5px solid rgba(255,255,255,0.13)",
                    animation: isActive
                      ? "activeGlow 2.5s ease-in-out infinite"
                      : "none",
                    transition: "all 0.32s cubic-bezier(0.34,1.4,0.64,1)",
                    transform: isActive
                      ? "translateY(-2px) scale(1.06)"
                      : "translateY(0) scale(1)",
                  }}
                >
                  <Icon
                    size={21}
                    strokeWidth={isActive ? 2.2 : 1.7}
                    style={{
                      color: "#ffffff",
                      filter: isActive
                        ? "drop-shadow(0 0 5px rgba(255,255,255,0.7))"
                        : "none",
                      transition: "all 0.3s",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: isActive ? 800 : 500,
                    color: isActive ? "#86efac" : "rgba(255,255,255,0.5)",
                    lineHeight: 1,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    letterSpacing: isActive ? "0.01em" : "0",
                    filter: isActive
                      ? "drop-shadow(0 0 5px rgba(134,239,172,0.7))"
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

// ── Katta karta (uzbek / world) ──
const BigCard = ({
  cat,
  lang,
  isAct,
  panelVisible,
  onSelect,
  delay,
  isWorld,
}: any) => (
  <button
    onClick={() => onSelect(cat.id)}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: "15px 18px",
      borderRadius: 16,
      background: isWorld
        ? isAct
          ? "rgba(59,130,246,0.15)"
          : "#f7f7f7"
        : isAct
          ? "rgba(34,197,94,0.88)"
          : "rgba(34,197,94,0.12)",
      border: isWorld
        ? isAct
          ? "1.5px solid rgba(59,130,246,0.4)"
          : "1.5px solid #ebebeb"
        : "none",
      cursor: "pointer",
      textAlign: "left",
      opacity: panelVisible ? 1 : 0,
      transform: panelVisible ? "translateY(0)" : "translateY(12px)",
      transition: `opacity 0.25s ease ${delay}s, transform 0.3s ease ${delay}s`,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: isWorld
            ? "rgba(59,130,246,0.1)"
            : isAct
              ? "rgba(255,255,255,0.25)"
              : "rgba(34,197,94,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
        }}
      >
        {cat.emoji}
      </div>
      <div style={{ textAlign: "left" }}>
        <p
          style={{
            margin: 0,
            fontWeight: 800,
            fontSize: 15,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: isWorld ? "#111" : isAct ? "#fff" : "#16a34a",
          }}
        >
          {cat[lang]}
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: 12,
            color: isWorld
              ? "#999"
              : isAct
                ? "rgba(255,255,255,0.7)"
                : "rgba(0,0,0,0.4)",
          }}
        >
          {cat.desc_uz}
        </p>
      </div>
    </div>
    <span
      style={{
        fontSize: 20,
        color: isWorld ? "#aaa" : isAct ? "#fff" : "#16a34a",
      }}
    >
      ›
    </span>
  </button>
);

// ── Kichik karta (grid) ──
const SmallCard = ({
  cat,
  lang,
  isAct,
  panelVisible,
  onSelect,
  delay,
}: any) => (
  <button
    onClick={() => onSelect(cat.id)}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "13px 6px",
      borderRadius: 14,
      gap: 5,
      background: isAct ? "rgba(34,197,94,0.1)" : "#f7f7f7",
      border: isAct ? "1.5px solid rgba(34,197,94,0.4)" : "1.5px solid #ebebeb",
      cursor: "pointer",
      opacity: panelVisible ? 1 : 0,
      transform: panelVisible ? "translateY(0)" : "translateY(12px)",
      transition: `opacity 0.25s ease ${delay}s, transform 0.3s ease ${delay}s`,
    }}
  >
    <span style={{ fontSize: 22 }}>{cat.emoji}</span>
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: isAct ? "#16a34a" : "#333",
        textAlign: "center",
        lineHeight: 1.2,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {cat[lang]}
    </span>
  </button>
);

// ── Bo'lim sarlavhasi ──
const SectionLabel = ({ label }: { label: string }) => (
  <p
    style={{
      margin: "2px 0 0",
      fontSize: 12,
      fontWeight: 700,
      color: "#aaa",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}
  >
    {label}
  </p>
);

export default BottomNav;
