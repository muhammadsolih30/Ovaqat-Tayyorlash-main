import { useState, useRef } from "react";
import { useLang } from "@/contexts/LangContext";
import { Home, TrendingUp, LayoutGrid, Bookmark, Globe, X } from "lucide-react";

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

  const smallCats = [
    { id: "fast", uz: "Tez taomlar", en: "Fast Food", emoji: "⚡" },
    { id: "healthy", uz: "Sog'lom ovqat", en: "Healthy Food", emoji: "🥗" },
    { id: "dessert", uz: "Shirinliklar", en: "Desserts", emoji: "🍰" },
    { id: "vegetarian", uz: "Vegetarian", en: "Vegetarian", emoji: "🥦" },
    { id: "breakfast", uz: "Nonushta", en: "Breakfast", emoji: "☀️" },
    { id: "grill", uz: "Kabob & Gril", en: "Kabob & Grill", emoji: "🔥" },
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

  return (
    <>
      <style>{`
        @keyframes fadeInBg { from{opacity:0} to{opacity:1} }
        @keyframes navGlow {
          0%,100%{box-shadow:0 0 30px rgba(34,197,94,0.45),0 0 60px rgba(34,197,94,0.2),inset 0 1px 0 rgba(255,255,255,0.15)}
          50%{box-shadow:0 0 45px rgba(34,197,94,0.65),0 0 90px rgba(34,197,94,0.3),inset 0 1px 0 rgba(255,255,255,0.2)}
        }
        @keyframes activeGlow {
          0%,100%{box-shadow:0 0 0 2.5px rgba(255,255,255,0.45),0 0 22px rgba(74,222,128,0.85),0 0 44px rgba(34,197,94,0.5)}
          50%{box-shadow:0 0 0 2.5px rgba(255,255,255,0.55),0 0 32px rgba(74,222,128,1),0 0 60px rgba(34,197,94,0.7)}
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

      {/* ═══ KATEGORIYALAR PANELI ═══ */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: NAV_HEIGHT,
          zIndex: 49,
          maxHeight: "80vh",
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
            maxHeight: "80vh",
            background: "#fff",
            borderRadius: "24px 24px 0 0",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
            overflow: "hidden",
          }}
        >
          {/* ── Header ── */}
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
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
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
                aria-label={lang === "uz" ? "Yopish" : "Close"}
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

          {/* ── Scroll Content ── */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 14px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {/* 1. O'ZBEK TAOMLARI */}
            <BigCard
              id="uzbek"
              emoji="🇺🇿"
              titleUz="O'zbek taomlari"
              titleEn="Uzbek Dishes"
              descUz="Palov, Lagman, Somsa..."
              descEn="Palov, Lagman, Somsa..."
              color="green"
              lang={lang}
              isAct={activeCategory === "uzbek"}
              panelVisible={panelVisible}
              onSelect={handleCategorySelect}
              delay={0}
            />

            {/* 2. DAVLAT TAOMLARI */}
            <BigCard
              id="world"
              emoji="🌍"
              titleUz="Davlat Taomlari"
              titleEn="World Cuisines"
              descUz="10+ mamlakat oshxonasi"
              descEn="10+ country cuisines"
              color="blue"
              lang={lang}
              isAct={activeCategory === "world"}
              panelVisible={panelVisible}
              onSelect={handleCategorySelect}
              delay={0.04}
            />

            <Divider visible={panelVisible} />

            {/* VAQT BO'YICHA */}
            <SectionLabel
              label={lang === "uz" ? "🕐  Vaqt bo'yicha" : "🕐  By Time of Day"}
              panelVisible={panelVisible}
              delay={0.08}
            />

            {/* 3. ERTALABGI NONUSHTA */}
            <TimeCard
              id="morning"
              emoji="🌅"
              titleUz="Ertalabgi nonushta"
              titleEn="Morning Breakfast"
              descUz="Tarvuz, yumurtqa, choy..."
              descEn="Eggs, tea, fresh fruits..."
              gradient="linear-gradient(135deg,#fff7ed,#ffedd5)"
              borderColor="rgba(251,146,60,0.35)"
              iconBg="rgba(251,146,60,0.15)"
              textColor="#c2410c"
              lang={lang}
              isAct={activeCategory === "morning"}
              panelVisible={panelVisible}
              onSelect={handleCategorySelect}
              delay={0.1}
            />

            {/* 4. TUSHLIK */}
            <TimeCard
              id="lunch"
              emoji="🌞"
              titleUz="Tushlik taomlari"
              titleEn="Lunch Meals"
              descUz="Sho'rva, lagman, palov..."
              descEn="Soup, lagman, rice..."
              gradient="linear-gradient(135deg,#fefce8,#fef9c3)"
              borderColor="rgba(234,179,8,0.35)"
              iconBg="rgba(234,179,8,0.15)"
              textColor="#a16207"
              lang={lang}
              isAct={activeCategory === "lunch"}
              panelVisible={panelVisible}
              onSelect={handleCategorySelect}
              delay={0.14}
            />

            {/* 5. KECHGI NONUSHTA */}
            <TimeCard
              id="dinner"
              emoji="🌙"
              titleUz="Kechgi nonushta"
              titleEn="Evening Dinner"
              descUz="Yengil va mazali kechki taomlar"
              descEn="Light & tasty dinner meals"
              gradient="linear-gradient(135deg,#f5f3ff,#ede9fe)"
              borderColor="rgba(139,92,246,0.35)"
              iconBg="rgba(139,92,246,0.15)"
              textColor="#7c3aed"
              lang={lang}
              isAct={activeCategory === "dinner"}
              panelVisible={panelVisible}
              onSelect={handleCategorySelect}
              delay={0.18}
            />

            <Divider visible={panelVisible} />

            {/* TAOM TURLARI */}
            <SectionLabel
              label={lang === "uz" ? "🍽  Taom turlari" : "🍽  Food Types"}
              panelVisible={panelVisible}
              delay={0.22}
            />

            {/* 6. KICHIK GRID */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 8,
                opacity: panelVisible ? 1 : 0,
                transform: panelVisible ? "translateY(0)" : "translateY(12px)",
                transition:
                  "opacity 0.28s ease 0.24s, transform 0.3s ease 0.24s",
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
                  delay={i * 0.03 + 0.24}
                />
              ))}
            </div>

            <Divider visible={panelVisible} />

            {/* 7. ADMIN PANEL */}
            <button
              onClick={() => handleCategorySelect("admin")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 18px",
                borderRadius: 16,
                background:
                  "linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0f172a 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
                textAlign: "left",
                opacity: panelVisible ? 1 : 0,
                transform: panelVisible ? "translateY(0)" : "translateY(10px)",
                transition:
                  "opacity 0.28s ease 0.38s, transform 0.3s ease 0.38s",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                ⚙️
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 800,
                    fontSize: 14,
                    color: "#fff",
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                  }}
                >
                  Admin Panel
                </p>
                <p
                  style={{
                    margin: "2px 0 0",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {lang === "uz" ? "Boshqaruv paneli" : "Management panel"}
                </p>
              </div>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 18 }}>
                ›
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM NAV ═══ */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "10px 16px",
          paddingBottom: "calc(env(safe-area-inset-bottom,0px) + 10px)",
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
              "radial-gradient(ellipse at center,rgba(34,197,94,0.55) 0%,transparent 70%)",
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
              "linear-gradient(145deg,rgba(20,90,45,0.88) 0%,rgba(12,60,28,0.94) 50%,rgba(18,80,40,0.90) 100%)",
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
                "linear-gradient(90deg,transparent,rgba(134,239,172,0.8) 30%,rgba(200,255,220,0.95) 50%,rgba(134,239,172,0.8) 70%,transparent)",
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
                      ? "radial-gradient(circle at 40% 30%,rgba(150,255,180,0.95) 0%,rgba(34,197,94,0.88) 50%,rgba(21,128,61,0.92) 100%)"
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
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
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

// ══════════════════════════════════════════════
// ── BigCard (O'zbek / Davlat taomlari) ──
// ══════════════════════════════════════════════
const BigCard = ({
  id,
  emoji,
  titleUz,
  titleEn,
  descUz,
  descEn,
  color,
  lang,
  isAct,
  panelVisible,
  onSelect,
  delay,
}: any) => {
  const g = color === "green";
  return (
    <button
      onClick={() => onSelect(id)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "15px 18px",
        borderRadius: 18,
        background: g
          ? isAct
            ? "rgba(34,197,94,0.92)"
            : "linear-gradient(135deg,rgba(34,197,94,0.12),rgba(34,197,94,0.06))"
          : isAct
            ? "rgba(59,130,246,0.18)"
            : "linear-gradient(135deg,rgba(59,130,246,0.09),rgba(59,130,246,0.04))",
        border: `1.5px solid ${g ? (isAct ? "rgba(34,197,94,0.6)" : "rgba(34,197,94,0.25)") : isAct ? "rgba(59,130,246,0.5)" : "rgba(59,130,246,0.2)"}`,
        cursor: "pointer",
        textAlign: "left",
        opacity: panelVisible ? 1 : 0,
        transform: panelVisible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.25s ease ${delay}s, transform 0.3s ease ${delay}s`,
        boxShadow: isAct
          ? g
            ? "0 4px 20px rgba(34,197,94,0.3)"
            : "0 4px 20px rgba(59,130,246,0.2)"
          : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: g
              ? isAct
                ? "rgba(255,255,255,0.22)"
                : "rgba(34,197,94,0.18)"
              : isAct
                ? "rgba(59,130,246,0.15)"
                : "rgba(59,130,246,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
        >
          {emoji}
        </div>
        <div>
          <p
            style={{
              margin: 0,
              fontWeight: 800,
              fontSize: 15,
              color: g
                ? isAct
                  ? "#fff"
                  : "#16a34a"
                : isAct
                  ? "#1d4ed8"
                  : "#2563eb",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
            }}
          >
            {lang === "uz" ? titleUz : titleEn}
          </p>
          <p
            style={{
              margin: "3px 0 0",
              fontSize: 12,
              color: g
                ? isAct
                  ? "rgba(255,255,255,0.75)"
                  : "rgba(0,0,0,0.4)"
                : isAct
                  ? "rgba(29,78,216,0.7)"
                  : "rgba(0,0,0,0.4)",
            }}
          >
            {lang === "uz" ? descUz : descEn}
          </p>
        </div>
      </div>
      <span
        style={{
          fontSize: 22,
          color: g
            ? isAct
              ? "#fff"
              : "#16a34a"
            : isAct
              ? "#2563eb"
              : "#60a5fa",
          fontWeight: 300,
        }}
      >
        ›
      </span>
    </button>
  );
};

// ══════════════════════════════════════════════
// ── TimeCard (Ertalab / Tushlik / Kechki) ──
// ══════════════════════════════════════════════
const TimeCard = ({
  id,
  emoji,
  titleUz,
  titleEn,
  descUz,
  descEn,
  gradient,
  borderColor,
  iconBg,
  textColor,
  lang,
  isAct,
  panelVisible,
  onSelect,
  delay,
}: any) => (
  <button
    onClick={() => onSelect(id)}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: "13px 16px",
      borderRadius: 16,
      background: isAct ? gradient : "#f9f9f9",
      border: `1.5px solid ${isAct ? borderColor : "#efefef"}`,
      cursor: "pointer",
      textAlign: "left",
      opacity: panelVisible ? 1 : 0,
      transform: panelVisible ? "translateY(0)" : "translateY(10px)",
      transition: `opacity 0.25s ease ${delay}s, transform 0.3s ease ${delay}s`,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: isAct ? iconBg : "rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
        }}
      >
        {emoji}
      </div>
      <div>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 700,
            color: isAct ? textColor : "#222",
            fontFamily: "'Plus Jakarta Sans',sans-serif",
          }}
        >
          {lang === "uz" ? titleUz : titleEn}
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: 11,
            color: isAct ? textColor + "99" : "#aaa",
          }}
        >
          {lang === "uz" ? descUz : descEn}
        </p>
      </div>
    </div>
    <span style={{ fontSize: 20, color: isAct ? textColor : "#ccc" }}>›</span>
  </button>
);

// ══════════════════════════════════════════════
// ── SmallCard (3×2 grid) ──
// ══════════════════════════════════════════════
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
        fontFamily: "'Plus Jakarta Sans',sans-serif",
      }}
    >
      {cat[lang]}
    </span>
  </button>
);

// ── SectionLabel ──
const SectionLabel = ({
  label,
  panelVisible,
  delay,
}: {
  label: string;
  panelVisible: boolean;
  delay: number;
}) => (
  <p
    style={{
      margin: "4px 2px 0",
      fontSize: 11,
      fontWeight: 700,
      color: "#bbb",
      textTransform: "uppercase",
      letterSpacing: "0.07em",
      fontFamily: "'Plus Jakarta Sans',sans-serif",
      opacity: panelVisible ? 1 : 0,
      transition: `opacity 0.25s ease ${delay}s`,
    }}
  >
    {label}
  </p>
);

// ── Divider ──
const Divider = ({ visible }: { visible: boolean }) => (
  <div
    style={{
      height: 1,
      background: "linear-gradient(90deg,transparent,#e8e8e8,transparent)",
      margin: "2px 4px",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.3s ease",
    }}
  />
);

export default BottomNav;
