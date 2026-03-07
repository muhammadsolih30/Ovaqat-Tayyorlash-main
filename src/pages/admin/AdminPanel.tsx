import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import VideoYuklash from "@/pages/admin/sections/VideoYuklash";
import { Video, chefs } from "@/data/videos";
import { Recipe, categoryList as recipeCategoryList } from "@/data/recipes";
import AdminOshpazlar from "@/pages/admin/sections/AdminOshpazlar";
import VideoBoshqaruvi from "@/pages/admin/sections/VideoBoshqaruvi";
import {
  LayoutDashboard,
  PlaySquare,
  ChefHat,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Eye,
  Search,
  Film,
  Flame,
  X,
  Check,
  AlertTriangle,
  Shield,
  Youtube,
  Image,
  Link,
  Edit3,
  Star,
  TrendingUp,
  Globe,
  Tag,
  Users,
  MessageSquare,
  Bell,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Zap,
  Lock,
} from "lucide-react";

interface AdminPanelProps {
  onExit: () => void;
}

type AdminPage =
  | "dashboard"
  | "videos"
  | "add"
  | "chefs"
  | "stats"
  | "settings"
  | "recipes"
  | "add-recipe"
  | "categories"
  | "users"
  | "admins"
  | "logs";

const G = "#1DB954";

const card = {
  background: "white",
  border: "1px solid rgba(21,128,61,0.08)",
  borderRadius: "20px",
  boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
} as React.CSSProperties;

const inp = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "12px",
  fontSize: "13px",
  background: "rgba(21,128,61,0.04)",
  border: "1.5px solid rgba(21,128,61,0.18)",
  color: "#111827",
  outline: "none",
  fontFamily: "'DM Sans',sans-serif",
  transition: "border 0.2s",
  boxSizing: "border-box" as const,
} as React.CSSProperties;

const lbl = {
  fontSize: "11px",
  fontWeight: "700",
  color: "#6b7280",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  display: "block",
  marginBottom: "6px",
};

const diffColor = (d: string) =>
  d === "easy" ? G : d === "medium" ? "#f59e0b" : "#ef4444";

// Stat card component
const StatCard = ({
  label,
  value,
  icon: Icon,
  color,
  bg,
  change,
  sub,
}: any) => (
  <div style={{ ...card, padding: 20 }}>
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 14,
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={22} style={{ color }} />
      </div>
      {change !== undefined && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
            fontWeight: 700,
            color: change >= 0 ? "#16a34a" : "#dc2626",
            background:
              change >= 0 ? "rgba(22,163,74,0.08)" : "rgba(220,38,38,0.08)",
            padding: "3px 8px",
            borderRadius: 99,
          }}
        >
          {change >= 0 ? (
            <ArrowUpRight size={12} />
          ) : (
            <ArrowDownRight size={12} />
          )}
          {Math.abs(change)}%
        </div>
      )}
    </div>
    <div
      style={{
        fontSize: 28,
        fontWeight: 900,
        color: "#111827",
        lineHeight: 1,
        marginBottom: 4,
      }}
    >
      {value}
    </div>
    <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>
      {label}
    </div>
    {sub && (
      <div style={{ fontSize: 11, color: "#d1d5db", marginTop: 2 }}>{sub}</div>
    )}
  </div>
);

// Mini bar chart
const MiniBar = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  return (
    <div
      style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 40 }}
    >
      {data.map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            borderRadius: 4,
            background: i === data.length - 1 ? color : color + "40",
            height: `${(v / max) * 100}%`,
            minHeight: 4,
            transition: "height 0.3s",
          }}
        />
      ))}
    </div>
  );
};

const AdminPanel = ({ onExit }: AdminPanelProps) => {
  const {
    adminLogout,
    videoList,
    addVideo,
    deleteVideo,
    updateVideo,
    incrementView,
    recipeList,
    addRecipe,
    deleteRecipe,
    updateRecipe,
    adminUsers,
    addAdminUser,
    deleteAdminUser,
    toggleBlockAdmin,
    siteUsers,
    toggleBlockUser,
    loginLogs,
    currentAdmin,
  } = useAdmin();

  const [page, setPage] = useState<AdminPage>("dashboard");
  const [searchQ, setSearchQ] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editVideo, setEditVideo] = useState<Video | null>(null);
  const [notif, setNotif] = useState<{ msg: string; ok: boolean } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Admin user form
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [adminForm, setAdminForm] = useState({
    username: "",
    password: "",
    name: "",
  });

  const [recipeForm, setRecipeForm] = useState({
    name_uz: "",
    name_en: "",
    desc_uz: "",
    desc_en: "",
    image: "",
    country: "uzbek",
    time: "30",
    servings: "4",
    category: "dinner",
    calories: "",
    ingredients_uz: "",
    ingredients_en: "",
    steps_uz: "",
    steps_en: "",
  });
  const [editRecipeId, setEditRecipeId] = useState<string | null>(null);

  const emptyForm = {
    ytUrl: "",
    ytId: "",
    thumbnailCustom: "",
    useCustomThumb: false,
    title_uz: "",
    title_en: "",
    title_ru: "",
    desc_uz: "",
    desc_en: "",
    desc_ru: "",
    chef: "",
    duration: "",
    cookTime: "30",
    difficulty: "easy",
    cuisine: "uzbek",
    category: "uzbek",
    calories: "",
    servings: "4",
    tags: "",
    featured: false,
  };
  const [form, setForm] = useState(emptyForm);
  const [ytPreview, setYtPreview] = useState("");
  const [ytThumb, setYtThumb] = useState("");

  const toast = (msg: string, ok = true) => {
    setNotif({ msg, ok });
    setTimeout(() => setNotif(null), 3500);
  };

  const setF = (k: string, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));

  function parseYoutubeId(input: string) {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
      /^([A-Za-z0-9_-]{11})$/,
    ];
    for (const p of patterns) {
      const m = input.match(p);
      if (m) return m[1];
    }
    return "";
  }
  const ytEmbed = (id: string) =>
    `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
  const ytThumbnail = (id: string) =>
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  const handleYtUrl = (val: string) => {
    setF("ytUrl", val);
    const id = parseYoutubeId(val);
    if (id) {
      setF("ytId", id);
      setYtPreview(ytEmbed(id));
      setYtThumb(ytThumbnail(id));
    } else {
      setF("ytId", "");
      setYtPreview("");
      setYtThumb("");
    }
  };

  const handleAdd = () => {
    if (!form.ytId) {
      toast("YouTube URL to'g'ri emas!", false);
      return;
    }
    if (!form.title_uz) {
      toast("UZ sarlavha majburiy!", false);
      return;
    }
    if (!form.chef) {
      toast("Oshpaz nomi majburiy!", false);
      return;
    }
    if (!form.duration) {
      toast("Davomiylik majburiy!", false);
      return;
    }
    const finalThumb =
      form.useCustomThumb && form.thumbnailCustom
        ? form.thumbnailCustom
        : ytThumb ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=640&h=360&fit=crop";
    const v: Video = {
      id: `v${Date.now()}`,
      title: {
        uz: form.title_uz,
        en: form.title_en || form.title_uz,
        ru: form.title_ru || form.title_uz,
      },
      description: {
        uz: form.desc_uz || "—",
        en: form.desc_en || "—",
        ru: form.desc_ru || "—",
      },
      thumbnail: finalThumb,
      videoUrl: ytEmbed(form.ytId),
      duration: form.duration,
      views: 0,
      cookTime: parseInt(form.cookTime) || 30,
      difficulty: form.difficulty as "easy" | "medium" | "hard",
      cuisine: form.cuisine,
      category: form.category,
      chef: form.chef,
      chefAvatar: "https://i.pravatar.cc/150?img=1",
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim())
        : [form.cuisine],
      publishedAt: new Date().toISOString().split("T")[0],
      calories: form.calories ? parseInt(form.calories) : undefined,
      servings: form.servings ? parseInt(form.servings) : 4,
      featured: form.featured,
      ingredients: [],
      steps: [],
    };
    addVideo(v);
    setForm(emptyForm);
    setYtPreview("");
    setYtThumb("");
    setPage("videos");
    toast("Video muvaffaqiyatli qo'shildi! ✅");
  };

  const totalViews = videoList.reduce((a, v) => a + v.views, 0);
  const topVideos = [...videoList].sort((a, b) => b.views - a.views);
  const filtered = videoList.filter(
    (v) =>
      v.title.uz.toLowerCase().includes(searchQ.toLowerCase()) ||
      v.chef.toLowerCase().includes(searchQ.toLowerCase()),
  );

  // Category stats for dashboard
  const catStats = [
    { label: "Shirinliklar", views: 1000000, color: "#ec4899" },
    { label: "Jahon taomlari", views: 2000000, color: "#3b82f6" },
    { label: "O'zbek taomlari", views: 500000, color: G },
    { label: "Nonushta", views: 750000, color: "#f59e0b" },
    { label: "Tez taomlar", views: 380000, color: "#8b5cf6" },
  ];
  const maxViews = Math.max(...catStats.map((c) => c.views));

  // Weekly data for mini chart
  const weeklyData = [120, 180, 150, 220, 190, 280, 310];

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      section: "main",
    },
    { id: "videos", label: "Videolar", icon: PlaySquare, section: "main" },
    { id: "add", label: "Video Qo'shish", icon: Plus, section: "main" },
    { id: "recipes", label: "Taomlar", icon: Tag, section: "main" },
    { id: "add-recipe", label: "Taom Qo'shish", icon: Plus, section: "main" },
    {
      id: "categories",
      label: "Kategoriyalar",
      icon: LayoutDashboard,
      section: "main",
    },
    { id: "admins", label: "Oshpaz Adminlar", icon: ChefHat, section: "users" },
    { id: "users", label: "Foydalanuvchilar", icon: Users, section: "users" },
    { id: "logs", label: "Login Loglar", icon: Activity, section: "users" },
    { id: "admins", label: "Adminlar", icon: Shield, section: "users" },
    { id: "users", label: "Foydalanuvchilar", icon: Users, section: "users" },
    { id: "logs", label: "Login Loglar", icon: Activity, section: "users" },
    { id: "chefs", label: "Oshpazlar", icon: ChefHat, section: "other" },
    { id: "stats", label: "Statistika", icon: BarChart3, section: "other" },
    { id: "settings", label: "Sozlamalar", icon: Settings, section: "other" },
  ] as {
    id: AdminPage;
    label: string;
    icon: typeof LayoutDashboard;
    section: string;
  }[];

  const sections = [
    { key: "main", label: "ASOSIY" },
    { key: "users", label: "FOYDALANUVCHILAR" },
    { key: "other", label: "BOSHQA" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#f8fffe",
        fontFamily: "'Plus Jakarta Sans',sans-serif",
      }}
    >
      {/* Toast */}
      {notif && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 20px",
            borderRadius: 16,
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            background: notif.ok
              ? "linear-gradient(135deg,#1DB954,#15803d)"
              : "linear-gradient(135deg,#ef4444,#dc2626)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
            animation: "slideIn 0.3s ease",
          }}
        >
          {notif.ok ? <Check size={16} /> : <AlertTriangle size={16} />}
          {notif.msg}
        </div>
      )}

      {/* ═══ SIDEBAR ═══ */}
      <aside
        style={{
          width: sidebarOpen ? 240 : 72,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          position: "sticky",
          top: 0,
          background:
            "linear-gradient(180deg, #071a0e 0%, #0d2818 40%, #0a1f12 100%)",
          transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
          borderRight: "1px solid rgba(29,185,84,0.1)",
          boxShadow: "4px 0 24px rgba(0,0,0,0.15)",
          zIndex: 50,
        }}
      >
        {/* Sidebar header */}
        <div
          style={{
            padding: "20px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            minHeight: 76,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 14,
              flexShrink: 0,
              background: "linear-gradient(135deg,#1DB954,#15803d)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(29,185,84,0.4)",
            }}
          >
            <Shield size={20} style={{ color: "#fff" }} />
          </div>
          {sidebarOpen && (
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 14,
                  whiteSpace: "nowrap",
                }}
              >
                Admin Panel
              </div>
              <div style={{ color: G, fontSize: 11, fontWeight: 700 }}>
                Taom<span style={{ color: "rgba(255,255,255,0.5)" }}>Uz</span>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              marginLeft: "auto",
              background: "rgba(255,255,255,0.06)",
              border: "none",
              borderRadius: 10,
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(255,255,255,0.4)",
              flexShrink: 0,
              transition: "all 0.2s",
            }}
          >
            {sidebarOpen ? "‹" : "›"}
          </button>
        </div>

        {/* Nav items */}
        <nav
          style={{
            flex: 1,
            padding: "12px 10px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {sections.map((sec) => {
            const items = navItems.filter((n) => n.section === sec.key);
            return (
              <div key={sec.key} style={{ marginBottom: 8 }}>
                {sidebarOpen && (
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: "rgba(255,255,255,0.2)",
                      letterSpacing: "0.1em",
                      padding: "8px 10px 4px",
                      margin: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {sec.label}
                  </p>
                )}
                {items.map(({ id, label, icon: Icon }) => {
                  const isAct = page === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setPage(id)}
                      title={!sidebarOpen ? label : undefined}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        width: "100%",
                        padding: sidebarOpen ? "9px 12px" : "9px",
                        borderRadius: 12,
                        marginBottom: 2,
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        background: isAct
                          ? "rgba(29,185,84,0.18)"
                          : "transparent",
                        borderLeft: isAct
                          ? `3px solid ${G}`
                          : "3px solid transparent",
                        color: isAct ? "#fff" : "rgba(255,255,255,0.45)",
                        fontSize: 13,
                        fontWeight: isAct ? 700 : 500,
                        transition: "all 0.2s",
                        justifyContent: sidebarOpen ? "flex-start" : "center",
                      }}
                      onMouseEnter={(e) => {
                        if (!isAct) {
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.06)";
                          e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isAct) {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color =
                            "rgba(255,255,255,0.45)";
                        }
                      }}
                    >
                      <Icon size={17} style={{ flexShrink: 0 }} />
                      {sidebarOpen && label}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* User info + logout */}
        <div
          style={{
            padding: "12px 10px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {sidebarOpen && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 10px",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg,rgba(29,185,84,0.4),rgba(29,185,84,0.2))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: G,
                  fontWeight: 900,
                  fontSize: 13,
                  flexShrink: 0,
                }}
              >
                {currentAdmin?.name?.[0] || "M"}
              </div>
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {currentAdmin?.name || "Muhammad Solih"}
                </div>
                <div style={{ color: G, fontSize: 10, fontWeight: 600 }}>
                  Super Admin
                </div>
              </div>
            </div>
          )}
          <button
            onClick={() => {
              adminLogout();
              onExit();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              padding: "9px 12px",
              borderRadius: 12,
              border: "none",
              background: "rgba(239,68,68,0.1)",
              cursor: "pointer",
              color: "rgba(255,160,160,0.8)",
              fontSize: 13,
              fontWeight: 600,
              justifyContent: sidebarOpen ? "flex-start" : "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.2)";
              e.currentTarget.style.color = "#fca5a5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.1)";
              e.currentTarget.style.color = "rgba(255,160,160,0.8)";
            }}
          >
            <LogOut size={16} style={{ flexShrink: 0 }} />
            {sidebarOpen && "Chiqish"}
          </button>
        </div>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          overflowY: "auto",
          padding: "28px 28px",
        }}
      >
        {page === "add" && (
          <VideoYuklash
            addVideo={addVideo as any}
            toast={toast}
            onDone={() => setPage("videos")}
          />
        )}

        {(page === "videos" || page === "add") && (
          <VideoBoshqaruvi
            videoList={videoList as any}
            addVideo={addVideo as any}
            deleteVideo={deleteVideo}
            updateVideo={updateVideo as any}
            toast={toast}
          />
        )}
        {/* ══════════════════════════════════════════
            DASHBOARD
        ══════════════════════════════════════════ */}
        {page === "dashboard" && (
          <div>
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 28,
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: 24,
                    fontWeight: 900,
                    color: "#111827",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Xush kelibsiz, {currentAdmin?.name?.split(" ")[0] || "Admin"}{" "}
                  👋
                </h1>
                <p
                  style={{ margin: "4px 0 0", fontSize: 13, color: "#9ca3af" }}
                >
                  {new Date().toLocaleDateString("uz-UZ", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setPage("add")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 18px",
                    borderRadius: 14,
                    border: "none",
                    cursor: "pointer",
                    background: "linear-gradient(135deg,#1DB954,#15803d)",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    boxShadow: "0 4px 16px rgba(29,185,84,0.35)",
                  }}
                >
                  <Plus size={16} /> Video Qo'shish
                </button>
              </div>
            </div>

            {/* ── 4 ta asosiy stat karta ── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 16,
                marginBottom: 24,
              }}
            >
              <StatCard
                label="Jami Videolar"
                value={videoList.length}
                icon={Film}
                color={G}
                bg="rgba(29,185,84,0.1)"
                change={12}
                sub="O'tgan oydan"
              />
              <StatCard
                label="Jami Ko'rishlar"
                value={`${(totalViews / 1000).toFixed(1)}K`}
                icon={Eye}
                color="#3b82f6"
                bg="rgba(59,130,246,0.1)"
                change={8}
                sub="Bu hafta"
              />
              <StatCard
                label="Foydalanuvchilar"
                value={siteUsers.length}
                icon={Users}
                color="#f59e0b"
                bg="rgba(245,158,11,0.1)"
                change={5}
                sub="Jami ro'yxatdan"
              />
              <StatCard
                label="Jami Taomlar"
                value={recipeList.length}
                icon={Tag}
                color="#8b5cf6"
                bg="rgba(139,92,246,0.1)"
                change={3}
                sub="Retseptlar"
              />
            </div>

            {/* ── Ikkinchi qator: Haftalik + Tezkor harakatlar ── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: 16,
                marginBottom: 24,
              }}
            >
              {/* Haftalik statistika */}
              <div style={{ ...card, padding: 24 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 15,
                        fontWeight: 800,
                        color: "#111827",
                      }}
                    >
                      📈 Haftalik Ko'rishlar
                    </h3>
                    <p
                      style={{
                        margin: "3px 0 0",
                        fontSize: 12,
                        color: "#9ca3af",
                      }}
                    >
                      So'nggi 7 kun
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 900,
                        color: "#111827",
                      }}
                    >
                      +31%
                    </div>
                    <div style={{ fontSize: 11, color: G, fontWeight: 600 }}>
                      o'tgan haftadan
                    </div>
                  </div>
                </div>
                {/* Bar chart */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 6,
                    height: 80,
                    marginBottom: 10,
                  }}
                >
                  {weeklyData.map((v, i) => {
                    const max = Math.max(...weeklyData);
                    const days = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];
                    const isLast = i === weeklyData.length - 1;
                    return (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            borderRadius: 8,
                            background: isLast
                              ? `linear-gradient(180deg,#1DB954,#15803d)`
                              : "rgba(29,185,84,0.2)",
                            height: `${(v / max) * 80}px`,
                            transition: "height 0.5s ease",
                            boxShadow: isLast
                              ? "0 4px 12px rgba(29,185,84,0.4)"
                              : "none",
                          }}
                        />
                        <span
                          style={{
                            fontSize: 10,
                            color: "#9ca3af",
                            fontWeight: 600,
                          }}
                        >
                          {days[i]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tezkor harakatlar */}
              <div style={{ ...card, padding: 24 }}>
                <h3
                  style={{
                    margin: "0 0 16px",
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  ⚡ Tezkor Harakatlar
                </h3>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {[
                    {
                      label: "Video Qo'shish",
                      icon: Plus,
                      action: () => setPage("add"),
                      color: G,
                      bg: "rgba(29,185,84,0.1)",
                    },
                    {
                      label: "Taom Qo'shish",
                      icon: Tag,
                      action: () => setPage("add-recipe"),
                      color: "#f59e0b",
                      bg: "rgba(245,158,11,0.1)",
                    },
                    {
                      label: "Admin Qo'shish",
                      icon: Shield,
                      action: () => setPage("admins"),
                      color: "#8b5cf6",
                      bg: "rgba(139,92,246,0.1)",
                    },
                    {
                      label: "Statistika",
                      icon: BarChart3,
                      action: () => setPage("stats"),
                      color: "#3b82f6",
                      bg: "rgba(59,130,246,0.1)",
                    },
                  ].map(({ label, icon: Icon, action, color, bg }) => (
                    <button
                      key={label}
                      onClick={action}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "11px 14px",
                        borderRadius: 14,
                        border: "none",
                        cursor: "pointer",
                        background: bg,
                        textAlign: "left",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 10,
                          background: color + "20",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={16} style={{ color }} />
                      </div>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#374151",
                        }}
                      >
                        {label}
                      </span>
                      <ArrowUpRight
                        size={14}
                        style={{ marginLeft: "auto", color: "#d1d5db" }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Uchinchi qator: Kategoriya statistikasi + Oxirgi loginlar ── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 24,
              }}
            >
              {/* Kategoriya bo'yicha ko'rishlar */}
              <div style={{ ...card, padding: 24 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 15,
                      fontWeight: 800,
                      color: "#111827",
                    }}
                  >
                    📊 Kategoriya Ko'rishlar
                  </h3>
                  <button
                    onClick={() => setPage("stats")}
                    style={{
                      fontSize: 12,
                      color: G,
                      fontWeight: 700,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Barchasi →
                  </button>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  {catStats.map((c) => (
                    <div key={c.label}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 6,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                          }}
                        >
                          {c.label}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 800,
                            color: c.color,
                          }}
                        >
                          {c.views >= 1000000
                            ? `${(c.views / 1000000).toFixed(1)}M`
                            : `${(c.views / 1000).toFixed(0)}K`}
                        </span>
                      </div>
                      <div
                        style={{
                          height: 6,
                          borderRadius: 99,
                          background: "#f3f4f6",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            borderRadius: 99,
                            background: c.color,
                            width: `${(c.views / maxViews) * 100}%`,
                            transition: "width 0.8s ease",
                            boxShadow: `0 0 8px ${c.color}60`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Oxirgi login loglar */}
              <div style={{ ...card, padding: 24 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 15,
                      fontWeight: 800,
                      color: "#111827",
                    }}
                  >
                    🔐 Oxirgi Loginlar
                  </h3>
                  <button
                    onClick={() => setPage("logs")}
                    style={{
                      fontSize: 12,
                      color: G,
                      fontWeight: 700,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Barchasi →
                  </button>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {loginLogs.slice(0, 5).map((log) => (
                    <div
                      key={log.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 12px",
                        borderRadius: 12,
                        background:
                          log.status === "success"
                            ? "rgba(29,185,84,0.04)"
                            : "rgba(239,68,68,0.04)",
                        border: `1px solid ${log.status === "success" ? "rgba(29,185,84,0.1)" : "rgba(239,68,68,0.1)"}`,
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 10,
                          flexShrink: 0,
                          background:
                            log.status === "success"
                              ? "rgba(29,185,84,0.12)"
                              : "rgba(239,68,68,0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {log.status === "success" ? (
                          <Check size={14} style={{ color: G }} />
                        ) : (
                          <X size={14} style={{ color: "#ef4444" }} />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#111827",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {log.username}
                        </div>
                        <div style={{ fontSize: 11, color: "#9ca3af" }}>
                          {log.ip}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: 99,
                            background:
                              log.status === "success"
                                ? "rgba(29,185,84,0.12)"
                                : "rgba(239,68,68,0.12)",
                            color: log.status === "success" ? G : "#ef4444",
                          }}
                        >
                          {log.status === "success" ? "Muvaffaq" : "Xato"}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: "#d1d5db",
                            marginTop: 2,
                          }}
                        >
                          {log.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── To'rtinchi qator: So'nggi videolar jadval ── */}
            <div style={{ ...card, overflow: "hidden" }}>
              <div
                style={{
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgba(21,128,61,0.06)",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  🎬 So'nggi Videolar
                </h3>
                <button
                  onClick={() => setPage("videos")}
                  style={{
                    fontSize: 12,
                    color: G,
                    fontWeight: 700,
                    padding: "6px 14px",
                    borderRadius: 10,
                    background: "rgba(29,185,84,0.08)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Barchasi →
                </button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "rgba(29,185,84,0.03)" }}>
                      {[
                        "Video",
                        "Oshpaz",
                        "Ko'rishlar",
                        "Vaqt",
                        "Qiyinlik",
                        "Sana",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "12px 16px",
                            textAlign: "left",
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#9ca3af",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {videoList.slice(0, 7).map((v, i) => (
                      <tr
                        key={v.id}
                        style={{
                          borderTop: "1px solid rgba(0,0,0,0.04)",
                          background:
                            i % 2 === 0 ? "#fff" : "rgba(29,185,84,0.01)",
                        }}
                      >
                        <td style={{ padding: "12px 16px" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                            }}
                          >
                            <img
                              src={v.thumbnail}
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=50&fit=crop";
                              }}
                              style={{
                                width: 56,
                                height: 36,
                                borderRadius: 8,
                                objectFit: "cover",
                                flexShrink: 0,
                              }}
                              alt=""
                            />
                            <span
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#111827",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: 160,
                              }}
                            >
                              {v.title.uz}
                            </span>
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontSize: 13,
                            fontWeight: 600,
                            color: G,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {v.chef}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontSize: 13,
                            color: "#6b7280",
                          }}
                        >
                          {(v.views / 1000).toFixed(1)}K
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontSize: 13,
                            color: "#6b7280",
                          }}
                        >
                          {v.cookTime} min
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span
                            style={{
                              padding: "3px 10px",
                              borderRadius: 99,
                              fontSize: 11,
                              fontWeight: 700,
                              background: diffColor(v.difficulty) + "18",
                              color: diffColor(v.difficulty),
                            }}
                          >
                            {v.difficulty === "easy"
                              ? "Oson"
                              : v.difficulty === "medium"
                                ? "O'rta"
                                : "Qiyin"}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontSize: 12,
                            color: "#9ca3af",
                          }}
                        >
                          {v.publishedAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            ADMINLAR BOSHQARUVI
        ══════════════════════════════════════════ */}
        {page === "admins" && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: 22,
                    fontWeight: 900,
                    color: "#111827",
                  }}
                >
                  🛡️ Adminlar Boshqaruvi
                </h1>
                <p
                  style={{ margin: "4px 0 0", fontSize: 13, color: "#9ca3af" }}
                >
                  {adminUsers.length} ta oshpaz admin
                </p>
              </div>
              <button
                onClick={() => setShowAddAdmin(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 18px",
                  borderRadius: 14,
                  border: "none",
                  cursor: "pointer",
                  background: "linear-gradient(135deg,#1DB954,#15803d)",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  boxShadow: "0 4px 16px rgba(29,185,84,0.3)",
                }}
              >
                <Plus size={16} /> Admin Qo'shish
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                gap: 16,
              }}
            >
              {adminUsers.map((admin) => (
                <div
                  key={admin.id}
                  style={{
                    ...card,
                    padding: 20,
                    opacity: admin.blocked ? 0.7 : 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        flexShrink: 0,
                        background:
                          "linear-gradient(135deg,rgba(29,185,84,0.2),rgba(29,185,84,0.1))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        border: "2px solid rgba(29,185,84,0.2)",
                      }}
                    >
                      👨‍🍳
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: 14,
                          color: "#111827",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {admin.name}
                      </div>
                      <div
                        style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}
                      >
                        @{admin.username}
                      </div>
                    </div>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: 99,
                        fontSize: 11,
                        fontWeight: 700,
                        background: admin.blocked
                          ? "rgba(239,68,68,0.1)"
                          : "rgba(29,185,84,0.1)",
                        color: admin.blocked ? "#ef4444" : G,
                      }}
                    >
                      {admin.blocked ? "Bloklangan" : "Aktiv"}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 8,
                      marginBottom: 14,
                    }}
                  >
                    {[
                      { label: "Videolar", value: admin.videoCount },
                      { label: "Qo'shilgan", value: admin.createdAt },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 12,
                          background: "rgba(29,185,84,0.04)",
                          border: "1px solid rgba(29,185,84,0.08)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 900,
                            color: "#111827",
                          }}
                        >
                          {value}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: "#9ca3af",
                            fontWeight: 600,
                          }}
                        >
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => {
                        toggleBlockAdmin(admin.id);
                        toast(
                          admin.blocked
                            ? "Admin blokdan chiqarildi"
                            : "Admin bloklandi",
                        );
                      }}
                      style={{
                        flex: 1,
                        padding: "9px 12px",
                        borderRadius: 12,
                        border: "none",
                        cursor: "pointer",
                        background: admin.blocked
                          ? "rgba(29,185,84,0.1)"
                          : "rgba(245,158,11,0.1)",
                        color: admin.blocked ? G : "#f59e0b",
                        fontSize: 12,
                        fontWeight: 700,
                        transition: "all 0.2s",
                      }}
                    >
                      {admin.blocked ? "✅ Blokdan chiq." : "🔒 Bloklash"}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`${admin.name} ni o'chirasizmi?`)) {
                          deleteAdminUser(admin.id);
                          toast("Admin o'chirildi");
                        }
                      }}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 12,
                        border: "none",
                        cursor: "pointer",
                        background: "rgba(239,68,68,0.08)",
                        color: "#ef4444",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(239,68,68,0.18)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(239,68,68,0.08)";
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Admin Modal */}
            {showAddAdmin && (
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 16,
                  background: "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  style={{ ...card, padding: 28, width: "100%", maxWidth: 420 }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 20,
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 18,
                        fontWeight: 900,
                        color: "#111827",
                      }}
                    >
                      ➕ Yangi Admin Qo'shish
                    </h3>
                    <button
                      onClick={() => setShowAddAdmin(false)}
                      style={{
                        background: "#f3f4f6",
                        border: "none",
                        borderRadius: 10,
                        width: 32,
                        height: 32,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                    }}
                  >
                    {[
                      {
                        label: "To'liq ismi",
                        key: "name",
                        placeholder: "Sarvar Rahimov",
                      },
                      {
                        label: "Username",
                        key: "username",
                        placeholder: "oshpaz_sarvar",
                      },
                      {
                        label: "Parol",
                        key: "password",
                        placeholder: "••••••••",
                      },
                    ].map(({ label, key, placeholder }) => (
                      <div key={key}>
                        <label style={lbl}>{label}</label>
                        <input
                          style={inp}
                          type={key === "password" ? "password" : "text"}
                          value={(adminForm as any)[key]}
                          onChange={(e) =>
                            setAdminForm((f) => ({
                              ...f,
                              [key]: e.target.value,
                            }))
                          }
                          placeholder={placeholder}
                        />
                      </div>
                    ))}
                    <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                      <button
                        onClick={() => setShowAddAdmin(false)}
                        style={{
                          flex: 1,
                          padding: "11px",
                          borderRadius: 14,
                          border: "none",
                          background: "#f3f4f6",
                          color: "#374151",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        Bekor
                      </button>
                      <button
                        onClick={() => {
                          if (
                            !adminForm.name ||
                            !adminForm.username ||
                            !adminForm.password
                          ) {
                            toast("Barcha maydonlar to'ldirilsin!", false);
                            return;
                          }
                          addAdminUser({
                            id: `a${Date.now()}`,
                            ...adminForm,
                            role: "chef",
                            blocked: false,
                            createdAt: new Date().toISOString().split("T")[0],
                            videoCount: 0,
                            avatar: "",
                          });
                          setAdminForm({
                            username: "",
                            password: "",
                            name: "",
                          });
                          setShowAddAdmin(false);
                          toast("Yangi admin qo'shildi! ✅");
                        }}
                        style={{
                          flex: 1,
                          padding: "11px",
                          borderRadius: 14,
                          border: "none",
                          background: "linear-gradient(135deg,#1DB954,#15803d)",
                          color: "#fff",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        <Check
                          size={14}
                          style={{ display: "inline", marginRight: 6 }}
                        />
                        Saqlash
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════
            FOYDALANUVCHILAR
        ══════════════════════════════════════════ */}
        {page === "users" && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: 22,
                    fontWeight: 900,
                    color: "#111827",
                  }}
                >
                  👥 Foydalanuvchilar
                </h1>
                <p
                  style={{ margin: "4px 0 0", fontSize: 13, color: "#9ca3af" }}
                >
                  {siteUsers.length} ta foydalanuvchi
                </p>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div
                  style={{
                    padding: "6px 14px",
                    borderRadius: 99,
                    background: "rgba(29,185,84,0.1)",
                    fontSize: 12,
                    fontWeight: 700,
                    color: G,
                  }}
                >
                  ✅ Aktiv: {siteUsers.filter((u) => !u.blocked).length}
                </div>
                <div
                  style={{
                    padding: "6px 14px",
                    borderRadius: 99,
                    background: "rgba(239,68,68,0.1)",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#ef4444",
                  }}
                >
                  🔒 Bloklangan: {siteUsers.filter((u) => u.blocked).length}
                </div>
              </div>
            </div>

            <div style={{ ...card, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr
                      style={{
                        background: "rgba(29,185,84,0.04)",
                        borderBottom: "1px solid rgba(29,185,84,0.08)",
                      }}
                    >
                      {[
                        "Foydalanuvchi",
                        "Email",
                        "Telefon",
                        "Kirish usuli",
                        "Ro'yxat",
                        "Oxirgi kirish",
                        "Holat",
                        "Amal",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "12px 16px",
                            textAlign: "left",
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#9ca3af",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {siteUsers.map((user, i) => (
                      <tr
                        key={user.id}
                        style={{
                          borderTop: "1px solid rgba(0,0,0,0.04)",
                          background: user.blocked
                            ? "rgba(239,68,68,0.02)"
                            : i % 2 === 0
                              ? "#fff"
                              : "rgba(29,185,84,0.01)",
                        }}
                      >
                        <td style={{ padding: "12px 16px" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <img
                              src={user.avatar}
                              alt=""
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                objectFit: "cover",
                                flexShrink: 0,
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                            <span
                              style={{
                                fontSize: 13,
                                fontWeight: 700,
                                color: "#111827",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontSize: 12,
                            color: "#6b7280",
                          }}
                        >
                          {user.email}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontSize: 12,
                            color: "#6b7280",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {user.phone}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              padding: "3px 10px",
                              borderRadius: 99,
                              background:
                                user.loginMethod === "google"
                                  ? "rgba(59,130,246,0.1)"
                                  : "rgba(29,185,84,0.1)",
                              color:
                                user.loginMethod === "google" ? "#3b82f6" : G,
                            }}
                          >
                            {user.loginMethod === "google"
                              ? "🔵 Google"
                              : "📱 Telefon"}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontSize: 12,
                            color: "#9ca3af",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {user.registeredAt}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontSize: 12,
                            color: "#9ca3af",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {user.lastLogin}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              padding: "3px 10px",
                              borderRadius: 99,
                              background: user.blocked
                                ? "rgba(239,68,68,0.1)"
                                : "rgba(29,185,84,0.1)",
                              color: user.blocked ? "#ef4444" : G,
                            }}
                          >
                            {user.blocked ? "Bloklangan" : "Aktiv"}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <button
                            onClick={() => {
                              toggleBlockUser(user.id);
                              toast(
                                user.blocked
                                  ? "Foydalanuvchi blokdan chiqarildi"
                                  : "Foydalanuvchi bloklandi",
                                !user.blocked,
                              );
                            }}
                            style={{
                              padding: "6px 14px",
                              borderRadius: 10,
                              border: "none",
                              cursor: "pointer",
                              fontSize: 12,
                              fontWeight: 700,
                              background: user.blocked
                                ? "rgba(29,185,84,0.1)"
                                : "rgba(239,68,68,0.1)",
                              color: user.blocked ? G : "#ef4444",
                              whiteSpace: "nowrap",
                              transition: "all 0.2s",
                            }}
                          >
                            {user.blocked ? "Blokdan chiq." : "Bloklash"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            LOGIN LOGLAR
        ══════════════════════════════════════════ */}
        {page === "logs" && (
          <div>
            <h1
              style={{
                margin: "0 0 4px",
                fontSize: 22,
                fontWeight: 900,
                color: "#111827",
              }}
            >
              🔐 Login Loglar
            </h1>
            <p style={{ margin: "0 0 24px", fontSize: 13, color: "#9ca3af" }}>
              Barcha kirish urinishlari qayd etiladi
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 14,
                marginBottom: 20,
              }}
            >
              {[
                {
                  label: "Jami urinishlar",
                  value: loginLogs.length,
                  color: "#3b82f6",
                  bg: "rgba(59,130,246,0.08)",
                  icon: Activity,
                },
                {
                  label: "Muvaffaqiyatli",
                  value: loginLogs.filter((l) => l.status === "success").length,
                  color: G,
                  bg: "rgba(29,185,84,0.08)",
                  icon: Check,
                },
                {
                  label: "Muvaffaqiyatsiz",
                  value: loginLogs.filter((l) => l.status === "failed").length,
                  color: "#ef4444",
                  bg: "rgba(239,68,68,0.08)",
                  icon: AlertTriangle,
                },
              ].map(({ label, value, color, bg, icon: Icon }) => (
                <div
                  key={label}
                  style={{
                    ...card,
                    padding: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      background: bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 26,
                        fontWeight: 900,
                        color: "#111827",
                      }}
                    >
                      {value}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#9ca3af",
                        fontWeight: 600,
                      }}
                    >
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ ...card, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      background: "rgba(29,185,84,0.04)",
                      borderBottom: "1px solid rgba(29,185,84,0.08)",
                    }}
                  >
                    {["#", "Foydalanuvchi", "IP Manzil", "Vaqt", "Natija"].map(
                      (h) => (
                        <th
                          key={h}
                          style={{
                            padding: "12px 18px",
                            textAlign: "left",
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#9ca3af",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {loginLogs.map((log, i) => (
                    <tr
                      key={log.id}
                      style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}
                    >
                      <td
                        style={{
                          padding: "12px 18px",
                          fontSize: 12,
                          color: "#d1d5db",
                          fontWeight: 700,
                        }}
                      >
                        {i + 1}
                      </td>
                      <td style={{ padding: "12px 18px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 10,
                              background:
                                log.status === "success"
                                  ? "rgba(29,185,84,0.1)"
                                  : "rgba(239,68,68,0.1)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {log.status === "success" ? (
                              <Shield size={14} style={{ color: G }} />
                            ) : (
                              <AlertTriangle
                                size={14}
                                style={{ color: "#ef4444" }}
                              />
                            )}
                          </div>
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: 13,
                              color: "#111827",
                            }}
                          >
                            {log.username}
                          </span>
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "12px 18px",
                          fontSize: 13,
                          color: "#6b7280",
                          fontFamily: "monospace",
                        }}
                      >
                        {log.ip}
                      </td>
                      <td
                        style={{
                          padding: "12px 18px",
                          fontSize: 13,
                          color: "#6b7280",
                        }}
                      >
                        {log.time}
                      </td>
                      <td style={{ padding: "12px 18px" }}>
                        <span
                          style={{
                            padding: "4px 12px",
                            borderRadius: 99,
                            fontSize: 12,
                            fontWeight: 700,
                            background:
                              log.status === "success"
                                ? "rgba(29,185,84,0.1)"
                                : "rgba(239,68,68,0.1)",
                            color: log.status === "success" ? G : "#ef4444",
                          }}
                        >
                          {log.status === "success"
                            ? "✅ Muvaffaqiyatli"
                            : "❌ Xato"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            VIDEOLAR RO'YXATI (oldingi kod saqlanadi)
        ══════════════════════════════════════════ */}
        {page === "videos" && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: 22,
                    fontWeight: 900,
                    color: "#111827",
                  }}
                >
                  🎬 Videolar
                </h1>
                <p
                  style={{ margin: "4px 0 0", fontSize: 13, color: "#9ca3af" }}
                >
                  {videoList.length} ta video
                </p>
              </div>
              <button
                onClick={() => setPage("add")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 18px",
                  borderRadius: 14,
                  border: "none",
                  cursor: "pointer",
                  background: "linear-gradient(135deg,#1DB954,#15803d)",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  boxShadow: "0 4px 16px rgba(29,185,84,0.3)",
                }}
              >
                <Plus size={16} /> Yangi Video
              </button>
            </div>
            <div style={{ position: "relative", marginBottom: 16 }}>
              <Search
                size={15}
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: G,
                }}
              />
              <input
                type="text"
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Video yoki oshpaz..."
                style={{ ...inp, paddingLeft: 42 }}
              />
            </div>
            <div style={{ ...card, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr
                      style={{
                        background: "rgba(29,185,84,0.04)",
                        borderBottom: "1px solid rgba(29,185,84,0.08)",
                      }}
                    >
                      {[
                        "#",
                        "Thumbnail",
                        "Sarlavha",
                        "Oshpaz",
                        "Ko'rishlar",
                        "Davomiylik",
                        "Qiyinlik",
                        "Amallar",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "12px 16px",
                            textAlign: "left",
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#9ca3af",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((v, i) => (
                      <tr
                        key={v.id}
                        style={{
                          borderTop: "1px solid rgba(0,0,0,0.04)",
                          background:
                            i % 2 === 0 ? "#fff" : "rgba(29,185,84,0.01)",
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 16px",
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#d1d5db",
                          }}
                        >
                          {i + 1}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <div
                            style={{
                              position: "relative",
                              width: 64,
                              height: 40,
                              borderRadius: 8,
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={v.thumbnail}
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=50&fit=crop";
                              }}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                              alt=""
                            />
                          </div>
                        </td>
                        <td style={{ padding: "12px 16px", maxWidth: 180 }}>
                          <p
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 600,
                              color: "#111827",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {v.title.uz}
                          </p>
                          <p
                            style={{
                              margin: "2px 0 0",
                              fontSize: 11,
                              color: "#9ca3af",
                            }}
                          >
                            {v.publishedAt}
                          </p>
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontSize: 13,
                            fontWeight: 600,
                            color: G,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {v.chef}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontSize: 13,
                            color: "#6b7280",
                          }}
                        >
                          {(v.views / 1000).toFixed(1)}K
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontSize: 13,
                            color: "#6b7280",
                          }}
                        >
                          {v.duration}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span
                            style={{
                              padding: "3px 10px",
                              borderRadius: 99,
                              fontSize: 11,
                              fontWeight: 700,
                              background: diffColor(v.difficulty) + "18",
                              color: diffColor(v.difficulty),
                            }}
                          >
                            {v.difficulty === "easy"
                              ? "Oson"
                              : v.difficulty === "medium"
                                ? "O'rta"
                                : "Qiyin"}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", gap: 4 }}>
                            <button
                              onClick={() => setEditVideo({ ...v })}
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: 10,
                                border: "none",
                                cursor: "pointer",
                                background: "rgba(59,130,246,0.08)",
                                color: "#3b82f6",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(59,130,246,0.18)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(59,130,246,0.08)";
                              }}
                            >
                              <Edit3 size={13} />
                            </button>
                            <button
                              onClick={() => setDeleteId(v.id)}
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: 10,
                                border: "none",
                                cursor: "pointer",
                                background: "rgba(239,68,68,0.08)",
                                color: "#ef4444",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(239,68,68,0.18)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(239,68,68,0.08)";
                              }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div style={{ textAlign: "center", padding: "48px 0" }}>
                    <p style={{ fontSize: 32, marginBottom: 8 }}>🔍</p>
                    <p style={{ fontSize: 14, color: "#9ca3af" }}>
                      Natija topilmadi
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Qolgan bo'limlar (add, recipes, add-recipe, categories, chefs, stats, settings) 
            — oldingi AdminPanel.tsx dagi kodni shu yerga ko'chiring */}
      </main>

      {/* Delete modal */}
      {deleteId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              ...card,
              padding: 28,
              maxWidth: 360,
              width: "100%",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                background: "rgba(239,68,68,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <AlertTriangle size={28} style={{ color: "#ef4444" }} />
            </div>
            <h3
              style={{
                margin: "0 0 8px",
                fontSize: 18,
                fontWeight: 900,
                color: "#111827",
              }}
            >
              Videoni o'chirish
            </h3>
            <p style={{ margin: "0 0 24px", fontSize: 13, color: "#9ca3af" }}>
              Bu amalni qaytarib bo'lmaydi
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setDeleteId(null)}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: 14,
                  border: "none",
                  background: "#f3f4f6",
                  color: "#374151",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Bekor
              </button>
              <button
                onClick={() => {
                  deleteVideo(deleteId);
                  setDeleteId(null);
                  toast("Video o'chirildi!");
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: 14,
                  border: "none",
                  background: "linear-gradient(135deg,#ef4444,#dc2626)",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit video modal */}
      {editVideo && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              ...card,
              padding: 28,
              maxWidth: 500,
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#111827",
                }}
              >
                ✏️ Videoni Tahrirlash
              </h3>
              <button
                onClick={() => setEditVideo(null)}
                style={{
                  background: "#f3f4f6",
                  border: "none",
                  borderRadius: 10,
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={15} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                ["Sarlavha (UZ)", "uz"],
                ["Sarlavha (EN)", "en"],
                ["Sarlavha (RU)", "ru"],
              ].map(([label, lg]) => (
                <div key={lg}>
                  <label style={lbl}>{label}</label>
                  <input
                    type="text"
                    value={editVideo.title[lg as "uz" | "en" | "ru"]}
                    onChange={(e) =>
                      setEditVideo({
                        ...editVideo,
                        title: { ...editVideo.title, [lg]: e.target.value },
                      })
                    }
                    style={inp}
                  />
                </div>
              ))}
              <div>
                <label style={lbl}>Oshpaz</label>
                <input
                  type="text"
                  value={editVideo.chef}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, chef: e.target.value })
                  }
                  style={inp}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <div>
                  <label style={lbl}>Davomiylik</label>
                  <input
                    type="text"
                    value={editVideo.duration}
                    onChange={(e) =>
                      setEditVideo({ ...editVideo, duration: e.target.value })
                    }
                    style={inp}
                  />
                </div>
                <div>
                  <label style={lbl}>Pishirish vaqti</label>
                  <input
                    type="number"
                    value={editVideo.cookTime}
                    onChange={(e) =>
                      setEditVideo({
                        ...editVideo,
                        cookTime: parseInt(e.target.value) || 0,
                      })
                    }
                    style={inp}
                  />
                </div>
              </div>
              <div>
                <label style={lbl}>Qiyinlik</label>
                <select
                  value={editVideo.difficulty}
                  onChange={(e) =>
                    setEditVideo({
                      ...editVideo,
                      difficulty: e.target.value as "easy" | "medium" | "hard",
                    })
                  }
                  style={inp}
                >
                  <option value="easy">Oson</option>
                  <option value="medium">O'rta</option>
                  <option value="hard">Qiyin</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button
                onClick={() => setEditVideo(null)}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: 14,
                  border: "none",
                  background: "#f3f4f6",
                  color: "#374151",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Bekor
              </button>
              <button
                onClick={() => {
                  updateVideo(editVideo);
                  setEditVideo(null);
                  toast("Video yangilandi! ✅");
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: 14,
                  border: "none",
                  background: "linear-gradient(135deg,#1DB954,#15803d)",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Check size={14} /> Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(29,185,84,0.3); border-radius: 99px; }
      `}</style>
    </div>
  );
};

export default AdminPanel;
