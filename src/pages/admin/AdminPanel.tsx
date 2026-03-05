import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Video, chefs } from "@/data/videos";
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
  Clock,
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
  | "settings";

// ─── helpers ──────────────────────────────────────────────────────────────
const G = "#1DB954";

// Extract YouTube video ID from any youtube URL or plain ID
function parseYoutubeId(input: string): string {
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

function ytEmbed(id: string) {
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
}

function ytThumbnail(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

// ─── styles ───────────────────────────────────────────────────────────────
const card = {
  background: "white",
  border: "1px solid rgba(21,128,61,0.1)",
  borderRadius: "16px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
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

const AdminPanel = ({ onExit }: AdminPanelProps) => {
  const {
    adminLogout,
    videoList,
    addVideo,
    deleteVideo,
    updateVideo,
    incrementView,
  } = useAdmin();
  const [page, setPage] = useState<AdminPage>("dashboard");
  const [searchQ, setSearchQ] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editVideo, setEditVideo] = useState<Video | null>(null);
  const [notif, setNotif] = useState<{ msg: string; ok: boolean } | null>(null);

  // ── Add video form ──────────────────────────────────────────────────────
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

  // Parse YouTube URL live
  const handleYtUrl = (val: string) => {
    setF("ytUrl", val);
    const id = parseYoutubeId(val);
    if (id) {
      setF("ytId", id);
      setYtPreview(ytEmbed(id));
      setYtThumb(ytThumbnail(id));
      if (!form.useCustomThumb) setF("thumbnailCustom", "");
    } else {
      setF("ytId", "");
      setYtPreview("");
      setYtThumb("");
    }
  };

  const finalThumb =
    form.useCustomThumb && form.thumbnailCustom
      ? form.thumbnailCustom
      : ytThumb ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=640&h=360&fit=crop";

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
      toast("Davomiylik majburiy! (masalan: 15:30)", false);
      return;
    }

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

  // ── Edit save ──────────────────────────────────────────────────────────
  const handleEditSave = () => {
    if (!editVideo) return;
    updateVideo(editVideo);
    setEditVideo(null);
    toast("Video yangilandi! ✅");
  };

  // ── Filtered list ──────────────────────────────────────────────────────
  const filtered = videoList.filter(
    (v) =>
      v.title.uz.toLowerCase().includes(searchQ.toLowerCase()) ||
      v.chef.toLowerCase().includes(searchQ.toLowerCase()) ||
      v.cuisine.toLowerCase().includes(searchQ.toLowerCase()),
  );

  // ── Stats ──────────────────────────────────────────────────────────────
  const totalViews = videoList.reduce((a, v) => a + v.views, 0);
  const topVideos = [...videoList].sort((a, b) => b.views - a.views);

  // ── nav ────────────────────────────────────────────────────────────────
  const navItems: {
    id: AdminPage;
    label: string;
    icon: typeof LayoutDashboard;
  }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "videos", label: "Videolar", icon: PlaySquare },
    { id: "add", label: "Video Qo'shish", icon: Plus },
    { id: "chefs", label: "Oshpazlar", icon: ChefHat },
    { id: "stats", label: "Statistika", icon: BarChart3 },
    { id: "settings", label: "Sozlamalar", icon: Settings },
  ];

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: "#f0fdf4",
        fontFamily: "'Plus Jakarta Sans',sans-serif",
      }}
    >
      {/* ── Toast ── */}
      {notif && (
        <div
          className="fixed top-5 right-5 z-[999] flex items-center gap-2.5 px-5 py-3 rounded-2xl text-white text-sm font-bold shadow-2xl"
          style={{
            background: notif.ok
              ? "linear-gradient(135deg,#1DB954,#15803d)"
              : "linear-gradient(135deg,#ef4444,#dc2626)",
            animation: "slideIn .3s ease",
          }}
        >
          {notif.ok ? <Check size={16} /> : <AlertTriangle size={16} />}
          {notif.msg}
        </div>
      )}

      {/* ── Sidebar ── */}
      <aside
        className="w-56 flex-shrink-0 flex flex-col h-screen sticky top-0"
        style={{
          background: "linear-gradient(180deg,#0d2818 0%,#166534 100%)",
        }}
      >
        {/* logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-black text-sm leading-tight">
              Admin Panel
            </div>
            <div style={{ color: G }} className="text-[10px] font-bold">
              Cook<span className="text-white">Tube</span>
            </div>
          </div>
        </div>

        {/* nav */}
        <nav className="flex-1 p-3 pt-4 flex flex-col gap-0.5">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background:
                  page === id ? "rgba(255,255,255,0.18)" : "transparent",
                color: page === id ? "white" : "rgba(255,255,255,0.5)",
                borderLeft:
                  page === id ? `3px solid ${G}` : "3px solid transparent",
              }}
            >
              <Icon size={17} /> {label}
            </button>
          ))}
        </nav>

        {/* user + logout */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-2.5 px-2 mb-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ background: "rgba(29,185,84,0.35)" }}
            >
              M
            </div>
            <div>
              <div className="text-white text-xs font-bold">muhammadsolih</div>
              <div className="text-[10px]" style={{ color: G }}>
                Super Admin
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              adminLogout();
              onExit();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-red-500/20"
            style={{ color: "rgba(255,160,160,0.8)" }}
          >
            <LogOut size={15} /> Chiqish
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 min-w-0 overflow-auto p-6">
        {/* ════════════ DASHBOARD ════════════ */}
        {page === "dashboard" && (
          <div>
            <h1
              className="text-2xl font-black mb-1"
              style={{ color: "#111827" }}
            >
              📊 Dashboard
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              CookTube boshqaruv markazi
            </p>

            {/* stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                {
                  label: "Jami Videolar",
                  val: videoList.length,
                  icon: Film,
                  color: G,
                  bg: "rgba(29,185,84,0.1)",
                },
                {
                  label: "Ko'rishlar",
                  val: `${(totalViews / 1000).toFixed(1)}K`,
                  icon: Eye,
                  color: "#3b82f6",
                  bg: "rgba(59,130,246,0.1)",
                },
                {
                  label: "Trend Videolar",
                  val: topVideos.slice(0, 3).length,
                  icon: TrendingUp,
                  color: "#f59e0b",
                  bg: "rgba(245,158,11,0.1)",
                },
                {
                  label: "O'zbek taomlari",
                  val: videoList.filter((v) => v.cuisine === "uzbek").length,
                  icon: Star,
                  color: "#8b5cf6",
                  bg: "rgba(139,92,246,0.1)",
                },
              ].map(({ label, val, icon: Icon, color, bg }) => (
                <div key={label} className="p-5 rounded-2xl" style={card}>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: bg }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div
                    className="text-2xl font-black mb-0.5"
                    style={{ color: "#111827" }}
                  >
                    {val}
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* latest 5 videos */}
            <div className="rounded-2xl overflow-hidden mb-4" style={card}>
              <div className="px-5 py-4 flex items-center justify-between border-b border-green-50">
                <h3 className="font-black text-sm" style={{ color: "#111827" }}>
                  🎬 So'nggi qo'shilgan videolar
                </h3>
                <button
                  onClick={() => setPage("videos")}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg"
                  style={{ background: "rgba(29,185,84,0.1)", color: G }}
                >
                  Barchasi →
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-green-50/40">
                    {["Video", "Oshpaz", "Ko'rishlar", "Vaqt", "Qiyinlik"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-400"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {videoList.slice(0, 6).map((v, i) => (
                    <tr
                      key={v.id}
                      className={i % 2 === 0 ? "bg-white" : "bg-green-50/20"}
                      style={{ borderTop: "1px solid rgba(21,128,61,0.05)" }}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={v.thumbnail}
                            onError={(e) =>
                              (e.currentTarget.src =
                                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=50&fit=crop")
                            }
                            className="w-14 h-9 rounded-lg object-cover flex-shrink-0"
                            alt=""
                          />
                          <span
                            className="text-sm font-semibold line-clamp-1 max-w-[160px]"
                            style={{ color: "#111827" }}
                          >
                            {v.title.uz}
                          </span>
                        </div>
                      </td>
                      <td
                        className="px-4 py-3 text-sm font-medium"
                        style={{ color: G }}
                      >
                        {v.chef}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">
                        {(v.views / 1000).toFixed(1)}K
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">
                        {v.cookTime} min
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-bold"
                          style={{
                            background: diffColor(v.difficulty) + "20",
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* quick actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  label: "Video Qo'shish",
                  icon: Plus,
                  action: () => setPage("add"),
                  color: G,
                },
                {
                  label: "Videolar Ro'yxati",
                  icon: PlaySquare,
                  action: () => setPage("videos"),
                  color: "#3b82f6",
                },
                {
                  label: "Statistika",
                  icon: BarChart3,
                  action: () => setPage("stats"),
                  color: "#f59e0b",
                },
                {
                  label: "Sozlamalar",
                  icon: Settings,
                  action: () => setPage("settings"),
                  color: "#8b5cf6",
                },
              ].map(({ label, icon: Icon, action, color }) => (
                <button
                  key={label}
                  onClick={action}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-105"
                  style={{
                    background: color + "12",
                    border: `1.5px solid ${color}25`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: color + "20" }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <span
                    className="text-xs font-bold"
                    style={{ color: "#374151" }}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ════════════ ADD VIDEO ════════════ */}
        {page === "add" && (
          <div>
            <h1
              className="text-2xl font-black mb-1"
              style={{ color: "#111827" }}
            >
              ➕ Yangi Video Qo'shish
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              YouTube linkini kiriting — thumbnail avtomatik olinadi
            </p>

            <div className="grid lg:grid-cols-[1fr_360px] gap-6">
              {/* Left: form */}
              <div className="space-y-5">
                {/* YouTube URL */}
                <div className="p-5 rounded-2xl" style={card}>
                  <h3
                    className="font-black text-sm mb-4 flex items-center gap-2"
                    style={{ color: "#111827" }}
                  >
                    <Youtube size={18} style={{ color: "#ff0000" }} /> YouTube
                    Video
                  </h3>
                  <label style={lbl}>YouTube URL yoki Video ID *</label>
                  <div className="relative">
                    <Link
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2"
                      style={{ color: G }}
                    />
                    <input
                      type="text"
                      value={form.ytUrl}
                      onChange={(e) => handleYtUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=... yoki Video ID"
                      style={{ ...inp, paddingLeft: "36px" }}
                    />
                  </div>
                  {form.ytId && (
                    <div
                      className="mt-2 flex items-center gap-2 text-xs font-semibold"
                      style={{ color: G }}
                    >
                      <Check size={13} /> Video ID topildi:{" "}
                      <span className="font-black">{form.ytId}</span>
                    </div>
                  )}

                  {/* Custom thumbnail toggle */}
                  <div className="mt-4">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <div
                        onClick={() =>
                          setF("useCustomThumb", !form.useCustomThumb)
                        }
                        className="w-10 h-5 rounded-full relative transition-all"
                        style={{
                          background: form.useCustomThumb ? G : "#d1d5db",
                        }}
                      >
                        <div
                          className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all"
                          style={{ left: form.useCustomThumb ? "22px" : "2px" }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-600">
                        O'zim thumbnail qo'yaman
                      </span>
                    </label>
                    {form.useCustomThumb && (
                      <div className="mt-3">
                        <label style={lbl}>Thumbnail URL</label>
                        <div className="relative">
                          <Image
                            size={14}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2"
                            style={{ color: G }}
                          />
                          <input
                            type="url"
                            value={form.thumbnailCustom}
                            onChange={(e) =>
                              setF("thumbnailCustom", e.target.value)
                            }
                            placeholder="https://..."
                            style={{ ...inp, paddingLeft: "36px" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Titles */}
                <div className="p-5 rounded-2xl" style={card}>
                  <h3
                    className="font-black text-sm mb-4 flex items-center gap-2"
                    style={{ color: "#111827" }}
                  >
                    <Globe size={16} style={{ color: G }} /> Sarlavhalar
                  </h3>
                  <div className="space-y-3">
                    {[
                      ["🇺🇿 UZ *", "title_uz"],
                      ["🇬🇧 EN", "title_en"],
                      ["🇷🇺 RU", "title_ru"],
                    ].map(([label, key]) => (
                      <div key={key}>
                        <label style={lbl}>{label}</label>
                        <input
                          type="text"
                          value={(form as any)[key]}
                          onChange={(e) => setF(key, e.target.value)}
                          placeholder={`Sarlavha ${label}`}
                          style={inp}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Descriptions */}
                <div className="p-5 rounded-2xl" style={card}>
                  <h3
                    className="font-black text-sm mb-4"
                    style={{ color: "#111827" }}
                  >
                    📝 Tavsiflar
                  </h3>
                  {[
                    ["🇺🇿 UZ", "desc_uz"],
                    ["🇬🇧 EN", "desc_en"],
                    ["🇷🇺 RU", "desc_ru"],
                  ].map(([label, key]) => (
                    <div key={key} className="mb-3">
                      <label style={lbl}>{label}</label>
                      <textarea
                        value={(form as any)[key]}
                        onChange={(e) => setF(key, e.target.value)}
                        rows={2}
                        placeholder="Qisqacha tavsif..."
                        style={
                          { ...inp, resize: "none" } as React.CSSProperties
                        }
                      />
                    </div>
                  ))}
                </div>

                {/* Meta */}
                <div className="p-5 rounded-2xl" style={card}>
                  <h3
                    className="font-black text-sm mb-4"
                    style={{ color: "#111827" }}
                  >
                    ⚙️ Video Ma'lumotlari
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label style={lbl}>Oshpaz nomi *</label>
                      <input
                        type="text"
                        value={form.chef}
                        onChange={(e) => setF("chef", e.target.value)}
                        placeholder="Aziz Karimov"
                        style={inp}
                      />
                    </div>
                    <div>
                      <label style={lbl}>Davomiyligi * (15:30)</label>
                      <input
                        type="text"
                        value={form.duration}
                        onChange={(e) => setF("duration", e.target.value)}
                        placeholder="15:30"
                        style={inp}
                      />
                    </div>
                    <div>
                      <label style={lbl}>Pishirish vaqti (min)</label>
                      <input
                        type="number"
                        value={form.cookTime}
                        onChange={(e) => setF("cookTime", e.target.value)}
                        placeholder="30"
                        style={inp}
                      />
                    </div>
                    <div>
                      <label style={lbl}>Kaloriya (ixtiyoriy)</label>
                      <input
                        type="number"
                        value={form.calories}
                        onChange={(e) => setF("calories", e.target.value)}
                        placeholder="450"
                        style={inp}
                      />
                    </div>
                    <div>
                      <label style={lbl}>Qiyinlik darajasi</label>
                      <select
                        value={form.difficulty}
                        onChange={(e) => setF("difficulty", e.target.value)}
                        style={inp}
                      >
                        <option value="easy">🟢 Oson</option>
                        <option value="medium">🟡 O'rta</option>
                        <option value="hard">🔴 Qiyin</option>
                      </select>
                    </div>
                    <div>
                      <label style={lbl}>Porsiyalar soni</label>
                      <input
                        type="number"
                        value={form.servings}
                        onChange={(e) => setF("servings", e.target.value)}
                        placeholder="4"
                        style={inp}
                      />
                    </div>
                    <div>
                      <label style={lbl}>Oshxona turi</label>
                      <select
                        value={form.cuisine}
                        onChange={(e) => setF("cuisine", e.target.value)}
                        style={inp}
                      >
                        {[
                          ["uzbek", "O'zbek"],
                          ["italian", "Italyan"],
                          ["japanese", "Yapon"],
                          ["american", "Amerika"],
                          ["french", "Fransuz"],
                          ["korean", "Koreys"],
                          ["indian", "Hind"],
                          ["mexican", "Meksika"],
                          ["chinese", "Xitoy"],
                          ["russian", "Rus"],
                          ["turkish", "Turk"],
                        ].map(([v, l]) => (
                          <option key={v} value={v}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={lbl}>Kategoriya</label>
                      <select
                        value={form.category}
                        onChange={(e) => setF("category", e.target.value)}
                        style={inp}
                      >
                        {[
                          ["uzbek", "O'zbek"],
                          ["world", "Jahon"],
                          ["quick", "Tez"],
                          ["healthy", "Sog'lom"],
                          ["street", "Ko'cha"],
                          ["dessert", "Shirinlik"],
                          ["bbq", "Kabob"],
                          ["vegetarian", "Vegetarian"],
                          ["breakfast", "Nonushta"],
                          ["dinner", "Kechki"],
                        ].map(([v, l]) => (
                          <option key={v} value={v}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label style={lbl}>Teglar (vergul bilan)</label>
                      <div className="relative">
                        <Tag
                          size={14}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2"
                          style={{ color: G }}
                        />
                        <input
                          type="text"
                          value={form.tags}
                          onChange={(e) => setF("tags", e.target.value)}
                          placeholder="palov, uzbek, rice"
                          style={{ ...inp, paddingLeft: "36px" }}
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <div
                          onClick={() => setF("featured", !form.featured)}
                          className="w-10 h-5 rounded-full relative transition-all"
                          style={{ background: form.featured ? G : "#d1d5db" }}
                        >
                          <div
                            className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all"
                            style={{ left: form.featured ? "22px" : "2px" }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-600">
                          ⭐ Tanlangan (Featured) video
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleAdd}
                  className="w-full py-4 rounded-2xl font-black text-white text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg,#1DB954,#15803d)",
                    boxShadow: "0 8px 25px rgba(29,185,84,0.4)",
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Plus size={20} /> Video Qo'shish
                  </span>
                </button>
              </div>

              {/* Right: live preview */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl sticky top-4" style={card}>
                  <h3
                    className="font-black text-sm mb-4"
                    style={{ color: "#111827" }}
                  >
                    👁️ Live Ko'rinish
                  </h3>

                  {/* Video preview */}
                  <div className="rounded-xl overflow-hidden mb-3 aspect-video bg-gray-100 flex items-center justify-center">
                    {ytPreview ? (
                      <iframe
                        src={ytPreview}
                        className="w-full h-full"
                        allowFullScreen
                        title="preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    ) : (
                      <div className="text-center p-6">
                        <Youtube
                          size={40}
                          className="mx-auto mb-2"
                          style={{ color: "#e5e7eb" }}
                        />
                        <p className="text-xs text-gray-300">
                          YouTube URL kiriting
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail preview */}
                  <div className="mb-3">
                    <p style={{ ...lbl, marginBottom: "8px" }}>
                      Thumbnail Ko'rinishi
                    </p>
                    <div className="rounded-xl overflow-hidden aspect-video">
                      <img
                        src={
                          form.useCustomThumb && form.thumbnailCustom
                            ? form.thumbnailCustom
                            : ytThumb ||
                              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=225&fit=crop"
                        }
                        onError={(e) =>
                          (e.currentTarget.src =
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=225&fit=crop")
                        }
                        className="w-full h-full object-cover"
                        alt="thumbnail"
                      />
                    </div>
                  </div>

                  {/* Card preview */}
                  <div
                    className="rounded-xl overflow-hidden border"
                    style={{ borderColor: "rgba(21,128,61,0.15)" }}
                  >
                    <div className="p-3 bg-green-50/40">
                      <p
                        className="text-xs font-black mb-2"
                        style={{ color: "#374151" }}
                      >
                        Karta ko'rinishi
                      </p>
                      <p
                        className="text-sm font-bold line-clamp-1"
                        style={{ color: "#111827" }}
                      >
                        {form.title_uz || "Sarlavha..."}
                      </p>
                      <p className="text-xs mt-1" style={{ color: G }}>
                        {form.chef || "Oshpaz nomi"}
                      </p>
                      <div className="flex gap-3 mt-1.5 text-xs text-gray-400">
                        <span>⏱ {form.cookTime || "—"} min</span>
                        <span>📅 {new Date().toLocaleDateString("uz")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════ VIDEOS LIST ════════════ */}
        {page === "videos" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1
                  className="text-2xl font-black"
                  style={{ color: "#111827" }}
                >
                  🎬 Videolar Boshqaruvi
                </h1>
                <p className="text-sm text-gray-400 mt-0.5">
                  {videoList.length} ta video
                </p>
              </div>
              <button
                onClick={() => setPage("add")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg,#1DB954,#15803d)",
                  boxShadow: "0 4px 15px rgba(29,185,84,0.35)",
                }}
              >
                <Plus size={17} /> Yangi Video
              </button>
            </div>

            {/* search */}
            <div className="relative mb-4">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: G }}
              />
              <input
                type="text"
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Video, oshpaz yoki oshxona turi..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  background: "white",
                  border: "1.5px solid rgba(21,128,61,0.2)",
                  color: "#111827",
                  fontFamily: "'DM Sans',sans-serif",
                }}
              />
            </div>

            {/* table */}
            <div className="rounded-2xl overflow-hidden" style={card}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-green-50/60 border-b border-green-100">
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
                          className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-400"
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
                        className={i % 2 === 0 ? "bg-white" : "bg-green-50/20"}
                        style={{ borderTop: "1px solid rgba(21,128,61,0.05)" }}
                      >
                        <td className="px-4 py-3 text-xs font-bold text-gray-300">
                          {i + 1}
                        </td>
                        <td className="px-4 py-3">
                          <div className="relative w-16 h-10 rounded-lg overflow-hidden">
                            <img
                              src={v.thumbnail}
                              onError={(e) =>
                                (e.currentTarget.src =
                                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=50&fit=crop")
                              }
                              className="w-full h-full object-cover"
                              alt=""
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <Youtube size={12} className="text-white" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 max-w-[180px]">
                          <p
                            className="text-sm font-semibold line-clamp-1"
                            style={{ color: "#111827" }}
                          >
                            {v.title.uz}
                          </p>
                          <p className="text-xs text-gray-400">
                            {v.publishedAt}
                          </p>
                        </td>
                        <td
                          className="px-4 py-3 text-sm font-medium"
                          style={{ color: G }}
                        >
                          {v.chef}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-400">
                          {(v.views / 1000).toFixed(1)}K
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-400">
                          {v.duration}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-bold"
                            style={{
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
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setEditVideo({ ...v })}
                              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-blue-50"
                              style={{ color: "#3b82f6" }}
                              title="Tahrirlash"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => setDeleteId(v.id)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-red-50"
                              style={{ color: "#ef4444" }}
                              title="O'chirish"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-3xl mb-2">🔍</p>
                    <p className="text-sm text-gray-400">Natija topilmadi</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ════════════ CHEFS ════════════ */}
        {page === "chefs" && (
          <div>
            <h1
              className="text-2xl font-black mb-1"
              style={{ color: "#111827" }}
            >
              👨‍🍳 Oshpazlar
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              {chefs.length} ta oshpaz
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chefs.map((chef) => {
                const chefVideos = videoList.filter(
                  (v) => v.chef === chef.name,
                );
                const totalV = chefVideos.reduce((a, v) => a + v.views, 0);
                return (
                  <div key={chef.id} className="p-5 rounded-2xl" style={card}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <img
                          src={chef.avatar}
                          alt={chef.name}
                          className="w-14 h-14 rounded-2xl object-cover"
                        />
                        <div
                          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: G }}
                        >
                          <Check size={10} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h3
                          className="font-black text-base"
                          style={{ color: "#111827" }}
                        >
                          {chef.name}
                        </h3>
                        <p
                          className="text-xs font-semibold"
                          style={{ color: G }}
                        >
                          {chef.specialty.uz}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {[
                        { label: "Videolar", val: chefVideos.length },
                        {
                          label: "Ko'rishlar",
                          val: `${(totalV / 1000).toFixed(0)}K`,
                        },
                        {
                          label: "Aktiv",
                          val: chefVideos.length > 0 ? "✅" : "—",
                        },
                      ].map(({ label, val }) => (
                        <div
                          key={label}
                          className="p-2 rounded-xl"
                          style={{ background: "rgba(29,185,84,0.07)" }}
                        >
                          <div
                            className="font-black text-lg"
                            style={{ color: "#111827" }}
                          >
                            {val}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════════ STATS ════════════ */}
        {page === "stats" && (
          <div>
            <h1
              className="text-2xl font-black mb-1"
              style={{ color: "#111827" }}
            >
              📈 Statistika
            </h1>
            <p className="text-sm text-gray-400 mb-6">Sayt faoliyati tahlili</p>

            {/* top 10 trending */}
            <div className="rounded-2xl overflow-hidden mb-5" style={card}>
              <div className="px-5 py-4 border-b border-green-50 flex items-center gap-2">
                <Flame size={18} style={{ color: "#ef4444" }} />
                <h3 className="font-black text-sm" style={{ color: "#111827" }}>
                  🔥 Top 10 Trend Video
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {topVideos.slice(0, 10).map((v, i) => (
                  <div key={v.id} className="flex items-center gap-4">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm text-white flex-shrink-0"
                      style={{
                        background:
                          i === 0
                            ? "#f59e0b"
                            : i === 1
                              ? "#9ca3af"
                              : i === 2
                                ? "#cd7c00"
                                : "rgba(21,128,61,0.15)",
                        color: i > 2 ? G : "white",
                      }}
                    >
                      {i + 1}
                    </div>
                    <img
                      src={v.thumbnail}
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=60&h=38&fit=crop")
                      }
                      className="w-14 h-9 rounded-lg object-cover flex-shrink-0"
                      alt=""
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold line-clamp-1"
                        style={{ color: "#111827" }}
                      >
                        {v.title.uz}
                      </p>
                      <p className="text-xs" style={{ color: G }}>
                        {v.chef}
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-1 text-sm font-black flex-shrink-0"
                      style={{ color: "#111827" }}
                    >
                      <Eye size={13} style={{ color: G }} />
                      {(v.views / 1000).toFixed(1)}K
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* by cuisine */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl" style={card}>
                <h3
                  className="font-black text-sm mb-4"
                  style={{ color: "#111827" }}
                >
                  🌍 Oshxona bo'yicha
                </h3>
                {[
                  "uzbek",
                  "italian",
                  "japanese",
                  "american",
                  "french",
                  "korean",
                ].map((c) => {
                  const cnt = videoList.filter((v) => v.cuisine === c).length;
                  const pct = videoList.length
                    ? Math.round((cnt / videoList.length) * 100)
                    : 0;
                  return (
                    <div key={c} className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-semibold capitalize text-gray-600">
                          {c}
                        </span>
                        <span
                          className="text-xs font-bold"
                          style={{ color: G }}
                        >
                          {cnt} ta ({pct}%)
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-green-50 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${pct}%`,
                            background:
                              "linear-gradient(90deg,#1DB954,#15803d)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-5 rounded-2xl" style={card}>
                <h3
                  className="font-black text-sm mb-4"
                  style={{ color: "#111827" }}
                >
                  📊 Qiyinlik darajasi
                </h3>
                {[
                  ["easy", "Oson", G],
                  ["medium", "O'rta", "#f59e0b"],
                  ["hard", "Qiyin", "#ef4444"],
                ].map(([k, l, c]) => {
                  const cnt = videoList.filter(
                    (v) => v.difficulty === k,
                  ).length;
                  const pct = videoList.length
                    ? Math.round((cnt / videoList.length) * 100)
                    : 0;
                  return (
                    <div key={k} className="mb-4">
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm font-semibold text-gray-600">
                          {l}
                        </span>
                        <span
                          className="text-sm font-black"
                          style={{ color: c }}
                        >
                          {pct}%
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, background: c }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ════════════ SETTINGS ════════════ */}
        {page === "settings" && (
          <div>
            <h1
              className="text-2xl font-black mb-1"
              style={{ color: "#111827" }}
            >
              ⚙️ Sozlamalar
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              Admin panel sozlamalari
            </p>
            <div className="max-w-lg space-y-4">
              <div className="p-5 rounded-2xl" style={card}>
                <h3
                  className="font-black text-sm mb-4 flex items-center gap-2"
                  style={{ color: "#111827" }}
                >
                  <Shield size={16} style={{ color: G }} /> Admin ma'lumotlari
                </h3>
                <div className="space-y-3">
                  <div>
                    <label style={lbl}>Foydalanuvchi nomi</label>
                    <input
                      type="text"
                      value="muhammadsolih"
                      readOnly
                      style={{ ...inp, opacity: 0.6, cursor: "not-allowed" }}
                    />
                  </div>
                  <div>
                    <label style={lbl}>Parol</label>
                    <input
                      type="password"
                      value="muhammadsolihjon"
                      readOnly
                      style={{ ...inp, opacity: 0.6, cursor: "not-allowed" }}
                    />
                  </div>
                  <p className="text-xs text-gray-400">
                    * Ma'lumotlarni o'zgartirish uchun kodni tahrirlash kerak
                  </p>
                </div>
              </div>
              <div className="p-5 rounded-2xl" style={card}>
                <h3
                  className="font-black text-sm mb-4"
                  style={{ color: "#111827" }}
                >
                  🌐 Sayt holati
                </h3>
                {[
                  ["Sayt nomi", "CookTube"],
                  ["Versiya", "2.1.0"],
                  ["Status", "🟢 Aktiv"],
                  ["Jami video", String(videoList.length)],
                  ["Jami ko'rishlar", `${(totalViews / 1000).toFixed(1)}K`],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between py-2.5 border-b last:border-0 border-green-50"
                  >
                    <span className="text-sm text-gray-500">{k}</span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: "#111827" }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  adminLogout();
                  onExit();
                }}
                className="w-full py-3 rounded-2xl font-bold text-white text-sm"
                style={{
                  background: "linear-gradient(135deg,#ef4444,#dc2626)",
                }}
              >
                Admin paneldan chiqish
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ════════ DELETE MODAL ════════ */}
      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="w-full max-w-sm rounded-3xl p-6 bg-white text-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(239,68,68,0.1)" }}
            >
              <AlertTriangle size={28} style={{ color: "#ef4444" }} />
            </div>
            <h3
              className="text-lg font-black mb-1"
              style={{ color: "#111827" }}
            >
              Videoni o'chirish
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Bu amalni qaytarib bo'lmaydi
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3 rounded-xl font-bold text-sm"
                style={{ background: "#f3f4f6", color: "#374151" }}
              >
                Bekor
              </button>
              <button
                onClick={() => {
                  deleteVideo(deleteId);
                  setDeleteId(null);
                  toast("Video o'chirildi!");
                }}
                className="flex-1 py-3 rounded-xl font-bold text-sm text-white"
                style={{
                  background: "linear-gradient(135deg,#ef4444,#dc2626)",
                }}
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════ EDIT MODAL ════════ */}
      {editVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="w-full max-w-lg rounded-3xl p-6 bg-white max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black" style={{ color: "#111827" }}>
                ✏️ Videoni Tahrirlash
              </h3>
              <button
                onClick={() => setEditVideo(null)}
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "#f3f4f6" }}
              >
                <X size={15} style={{ color: "#6b7280" }} />
              </button>
            </div>
            <div className="space-y-3">
              {[
                ["Sarlavha (UZ)", "uz"],
                ["Sarlavha (EN)", "en"],
                ["Sarlavha (RU)", "ru"],
              ].map(([label, lang]) => (
                <div key={lang}>
                  <label style={lbl}>{label}</label>
                  <input
                    type="text"
                    value={editVideo.title[lang as "uz" | "en" | "ru"]}
                    onChange={(e) =>
                      setEditVideo({
                        ...editVideo,
                        title: { ...editVideo.title, [lang]: e.target.value },
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
              <div className="grid grid-cols-2 gap-3">
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
                <label style={lbl}>Thumbnail URL</label>
                <input
                  type="url"
                  value={editVideo.thumbnail}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, thumbnail: e.target.value })
                  }
                  style={inp}
                />
              </div>
              <div>
                <label style={lbl}>YouTube Embed URL</label>
                <input
                  type="text"
                  value={editVideo.videoUrl}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, videoUrl: e.target.value })
                  }
                  style={inp}
                />
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
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setEditVideo(null)}
                className="flex-1 py-3 rounded-xl font-bold text-sm"
                style={{ background: "#f3f4f6", color: "#374151" }}
              >
                Bekor
              </button>
              <button
                onClick={handleEditSave}
                className="flex-1 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg,#1DB954,#15803d)",
                }}
              >
                <Check size={15} /> Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes slideIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
};

export default AdminPanel;
