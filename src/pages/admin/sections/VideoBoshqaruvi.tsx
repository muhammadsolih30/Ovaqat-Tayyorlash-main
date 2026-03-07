// src/pages/admin/sections/VideoBoshqaruvi.tsx

import { useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  Edit3,
  Eye,
  Filter,
  Check,
  X,
  Youtube,
  Link,
  Image,
  Tag,
  Globe,
  Clock,
  Flame,
  Lock,
  ChevronDown,
  Star,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

interface VideoItem {
  id: string;
  title: { uz: string; en: string; ru: string };
  description: { uz: string; en: string; ru: string };
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: number;
  cookTime: number;
  difficulty: "easy" | "medium" | "hard";
  cuisine: string;
  category: string;
  chef: string;
  chefAvatar: string;
  tags: string[];
  publishedAt: string;
  calories?: number;
  servings?: number;
  featured?: boolean;
  blocked?: boolean;
  likes?: number;
  ingredients: any[];
  steps: any[];
}

interface Props {
  videoList: VideoItem[];
  addVideo: (v: VideoItem) => void;
  deleteVideo: (id: string) => void;
  updateVideo: (v: VideoItem) => void;
  toast: (msg: string, ok?: boolean) => void;
}

const G = "#1DB954";

const card = {
  background: "#fff",
  border: "1px solid rgba(21,128,61,0.08)",
  borderRadius: 20,
  boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
} as React.CSSProperties;

const inp = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 12,
  fontSize: 13,
  background: "rgba(21,128,61,0.04)",
  border: "1.5px solid rgba(21,128,61,0.18)",
  color: "#111827",
  outline: "none",
  fontFamily: "'DM Sans',sans-serif",
  boxSizing: "border-box" as const,
} as React.CSSProperties;

const lbl = {
  fontSize: 11,
  fontWeight: 700,
  color: "#6b7280",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  display: "block",
  marginBottom: 6,
};

const diffColor = (d: string) =>
  d === "easy" ? G : d === "medium" ? "#f59e0b" : "#ef4444";

const VIDEO_CATEGORIES = [
  { id: "all", label: "Barchasi", emoji: "🍽️" },
  { id: "uzbek", label: "O'zbek taomlari", emoji: "🇺🇿" },
  { id: "world", label: "Jahon taomlari", emoji: "🌍" },
  { id: "quick", label: "Tez taomlar", emoji: "⚡" },
  { id: "healthy", label: "Sog'lom ovqat", emoji: "🥗" },
  { id: "dessert", label: "Shirinliklar", emoji: "🍰" },
  { id: "bbq", label: "Kabob & Gril", emoji: "🔥" },
  { id: "vegetarian", label: "Vegetarian", emoji: "🥦" },
  { id: "breakfast", label: "Nonushta", emoji: "☀️" },
  { id: "dinner", label: "Kechki ovqat", emoji: "🌙" },
  { id: "lunch", label: "Tushlik", emoji: "🌞" },
];

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

export default function VideoBoshqaruvi({
  videoList,
  addVideo,
  deleteVideo,
  updateVideo,
  toast,
}: Props) {
  const [tab, setTab] = useState<"list" | "add" | "edit">("list");
  const [editVideo, setEditVideo] = useState<VideoItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchQ, setSearchQ] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [filterDiff, setFilterDiff] = useState("all");
  const [showPreview, setShowPreview] = useState<VideoItem | null>(null);

  // Add form state
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
    likes: "0",
  };
  const [form, setForm] = useState(emptyForm);
  const [ytPreview, setYtPreview] = useState("");
  const [ytThumb, setYtThumb] = useState("");
  const [addStep, setAddStep] = useState(1); // multi-step form

  const setF = (k: string, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleYtUrl = (val: string) => {
    setF("ytUrl", val);
    const id = parseYoutubeId(val);
    if (id) {
      setF("ytId", id);
      setYtPreview(
        `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`,
      );
      setYtThumb(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
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

  // Filter videos
  const filteredVideos = videoList.filter((v) => {
    const q = searchQ.toLowerCase();
    const matchQ =
      v.title.uz.toLowerCase().includes(q) ||
      v.chef.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q);
    const matchCat = filterCat === "all" || v.category === filterCat;
    const matchDiff = filterDiff === "all" || v.difficulty === filterDiff;
    return matchQ && matchCat && matchDiff;
  });

  const handleAddVideo = () => {
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
      toast("Davomiylik majburiy! (15:30)", false);
      return;
    }

    const v: VideoItem = {
      id: `v${Date.now()}`,
      title: {
        uz: form.title_uz,
        en: form.title_en || form.title_uz,
        ru: form.title_ru || form.title_uz,
      },
      description: {
        uz: form.desc_uz || "—",
        en: form.desc_en || "—",
        ru: "—",
      },
      thumbnail: finalThumb,
      videoUrl: `https://www.youtube.com/embed/${form.ytId}?rel=0&modestbranding=1`,
      duration: form.duration,
      views: 0,
      likes: parseInt(form.likes) || 0,
      cookTime: parseInt(form.cookTime) || 30,
      difficulty: form.difficulty as "easy" | "medium" | "hard",
      cuisine: form.cuisine,
      category: form.category,
      chef: form.chef,
      chefAvatar: "https://i.pravatar.cc/150?img=1",
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim())
        : [form.category],
      publishedAt: new Date().toISOString().split("T")[0],
      calories: form.calories ? parseInt(form.calories) : undefined,
      servings: form.servings ? parseInt(form.servings) : 4,
      featured: form.featured,
      blocked: false,
      ingredients: [],
      steps: [],
    };
    addVideo(v);
    setForm(emptyForm);
    setYtPreview("");
    setYtThumb("");
    setAddStep(1);
    setTab("list");
    toast("Video muvaffaqiyatli qo'shildi! ✅");
  };

  // ══════════════════════════════════════════
  // RO'YXAT VIEW
  // ══════════════════════════════════════════
  if (tab === "list")
    return (
      <div>
        {/* Header */}
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
              🎬 Taom Videolari
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#9ca3af" }}>
              {videoList.length} ta video •{" "}
              {videoList.filter((v) => (v as any).blocked).length} ta bloklangan
            </p>
          </div>
          <button
            onClick={() => {
              setForm(emptyForm);
              setAddStep(1);
              setTab("add");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 20px",
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
            <Plus size={16} /> Yangi Video
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 14,
            marginBottom: 20,
          }}
        >
          {[
            {
              label: "Jami videolar",
              value: videoList.length,
              emoji: "🎬",
              color: G,
              bg: "rgba(29,185,84,0.08)",
            },
            {
              label: "Umumiy ko'rishlar",
              value: `${(videoList.reduce((a, v) => a + v.views, 0) / 1000).toFixed(0)}K`,
              emoji: "👁",
              color: "#3b82f6",
              bg: "rgba(59,130,246,0.08)",
            },
            {
              label: "Aktiv videolar",
              value: videoList.filter((v) => !(v as any).blocked).length,
              emoji: "✅",
              color: G,
              bg: "rgba(29,185,84,0.08)",
            },
            {
              label: "Bloklangan",
              value: videoList.filter((v) => (v as any).blocked).length,
              emoji: "🔒",
              color: "#ef4444",
              bg: "rgba(239,68,68,0.08)",
            },
          ].map(({ label, value, emoji, color, bg }) => (
            <div
              key={label}
              style={{
                ...card,
                padding: 16,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                {emoji}
              </div>
              <div>
                <div
                  style={{ fontSize: 22, fontWeight: 900, color: "#111827" }}
                >
                  {value}
                </div>
                <div
                  style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}
                >
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          {/* Search */}
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search
              size={14}
              style={{
                position: "absolute",
                left: 13,
                top: "50%",
                transform: "translateY(-50%)",
                color: G,
              }}
            />
            <input
              type="text"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Video nomi, oshpaz, kategoriya..."
              style={{ ...inp, paddingLeft: 40, background: "#fff" }}
            />
          </div>

          {/* Category filter */}
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            style={{
              ...inp,
              width: "auto",
              minWidth: 160,
              background: "#fff",
              cursor: "pointer",
            }}
          >
            {VIDEO_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.emoji} {c.label}
              </option>
            ))}
          </select>

          {/* Difficulty filter */}
          <select
            value={filterDiff}
            onChange={(e) => setFilterDiff(e.target.value)}
            style={{
              ...inp,
              width: "auto",
              minWidth: 130,
              background: "#fff",
              cursor: "pointer",
            }}
          >
            <option value="all">Barcha darajalar</option>
            <option value="easy">🟢 Oson</option>
            <option value="medium">🟡 O'rtacha</option>
            <option value="hard">🔴 Qiyin</option>
          </select>
        </div>

        {/* Category filter chips */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 20,
            overflowX: "auto",
            paddingBottom: 4,
          }}
        >
          {VIDEO_CATEGORIES.map((c) => {
            const count =
              c.id === "all"
                ? videoList.length
                : videoList.filter((v) => v.category === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setFilterCat(c.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 99,
                  border: "none",
                  cursor: "pointer",
                  background: filterCat === c.id ? G : "rgba(0,0,0,0.05)",
                  color: filterCat === c.id ? "#fff" : "#6b7280",
                  fontSize: 12,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                  flexShrink: 0,
                  boxShadow:
                    filterCat === c.id
                      ? "0 4px 12px rgba(29,185,84,0.3)"
                      : "none",
                }}
              >
                {c.emoji} {c.label}{" "}
                <span style={{ opacity: 0.7 }}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Video table */}
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
                    "Video",
                    "Nomi",
                    "Ko'rishlar",
                    "Like",
                    "Kategoriya",
                    "Qiyinlik",
                    "Vaqt",
                    "Sana",
                    "Holat",
                    "Amallar",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 14px",
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
                {filteredVideos.map((v, i) => (
                  <tr
                    key={v.id}
                    style={{
                      borderTop: "1px solid rgba(0,0,0,0.04)",
                      background: (v as any).blocked
                        ? "rgba(239,68,68,0.02)"
                        : i % 2 === 0
                          ? "#fff"
                          : "rgba(29,185,84,0.008)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!(v as any).blocked)
                        (e.currentTarget as HTMLElement).style.background =
                          "rgba(29,185,84,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = (
                        v as any
                      ).blocked
                        ? "rgba(239,68,68,0.02)"
                        : i % 2 === 0
                          ? "#fff"
                          : "rgba(29,185,84,0.008)";
                    }}
                  >
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 12,
                        color: "#d1d5db",
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <div
                        onClick={() => setShowPreview(v)}
                        style={{
                          position: "relative",
                          width: 72,
                          height: 44,
                          borderRadius: 10,
                          overflow: "hidden",
                          cursor: "pointer",
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
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0,0,0,0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            transition: "opacity 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.opacity =
                              "1";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.opacity =
                              "0";
                          }}
                        >
                          <div
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: "50%",
                              background: "rgba(255,255,255,0.9)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Eye size={12} style={{ color: "#111" }} />
                          </div>
                        </div>
                        {(v as any).blocked && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "rgba(239,68,68,0.5)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Lock size={14} style={{ color: "#fff" }} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "10px 14px", maxWidth: 180 }}>
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
                        {v.chef}
                      </p>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 13,
                          color: "#374151",
                          fontWeight: 600,
                        }}
                      >
                        <Eye size={12} style={{ color: G }} />
                        {v.views >= 1000
                          ? `${(v.views / 1000).toFixed(1)}K`
                          : v.views}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 13,
                        color: "#6b7280",
                      }}
                    >
                      ❤️ {(v as any).likes || 0}
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#374151",
                        }}
                      >
                        {
                          VIDEO_CATEGORIES.find((c) => c.id === v.category)
                            ?.emoji
                        }{" "}
                        {VIDEO_CATEGORIES.find((c) => c.id === v.category)
                          ?.label || v.category}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
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
                            ? "O'rtacha"
                            : "Qiyin"}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 12,
                        color: "#6b7280",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ⏱ {v.cookTime} min
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 12,
                        color: "#9ca3af",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {v.publishedAt}
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: 99,
                          fontSize: 11,
                          fontWeight: 700,
                          background: (v as any).blocked
                            ? "rgba(239,68,68,0.1)"
                            : "rgba(29,185,84,0.1)",
                          color: (v as any).blocked ? "#ef4444" : G,
                        }}
                      >
                        {(v as any).blocked ? "🔒 Bloklangan" : "✅ Aktiv"}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button
                          onClick={() => {
                            setEditVideo({ ...v });
                            setTab("edit");
                          }}
                          title="Tahrirlash"
                          style={{
                            width: 30,
                            height: 30,
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
                              "rgba(59,130,246,0.2)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                              "rgba(59,130,246,0.08)";
                          }}
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => {
                            updateVideo({
                              ...v,
                              blocked: !(v as any).blocked,
                            } as any);
                            toast(
                              (v as any).blocked
                                ? "Video blokdan chiqarildi"
                                : "Video bloklandi",
                            );
                          }}
                          title={
                            (v as any).blocked
                              ? "Blokdan chiqarish"
                              : "Bloklash"
                          }
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 10,
                            border: "none",
                            cursor: "pointer",
                            background: (v as any).blocked
                              ? "rgba(29,185,84,0.08)"
                              : "rgba(245,158,11,0.08)",
                            color: (v as any).blocked ? G : "#f59e0b",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s",
                          }}
                        >
                          <Lock size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteId(v.id)}
                          title="O'chirish"
                          style={{
                            width: 30,
                            height: 30,
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
                              "rgba(239,68,68,0.2)";
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

            {filteredVideos.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <p style={{ fontSize: 40, marginBottom: 12 }}>🎬</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#374151" }}>
                  Video topilmadi
                </p>
                <p style={{ fontSize: 13, color: "#9ca3af" }}>
                  Qidiruv yoki filterni o'zgartiring
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Preview modal */}
        {showPreview && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                ...card,
                width: "100%",
                maxWidth: 620,
                maxHeight: "90vh",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#111827",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: 440,
                  }}
                >
                  {showPreview.title.uz}
                </h3>
                <button
                  onClick={() => setShowPreview(null)}
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
              <div style={{ overflowY: "auto", padding: 20 }}>
                {/* Video embed */}
                <div
                  style={{
                    borderRadius: 14,
                    overflow: "hidden",
                    marginBottom: 16,
                    aspectRatio: "16/9",
                    background: "#000",
                  }}
                >
                  <iframe
                    src={showPreview.videoUrl}
                    style={{ width: "100%", height: "100%", border: "none" }}
                    allowFullScreen
                    title="preview"
                  />
                </div>
                {/* Video info */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 10,
                  }}
                >
                  {[
                    {
                      label: "Ko'rishlar",
                      value: `${(showPreview.views / 1000).toFixed(1)}K`,
                      emoji: "👁",
                    },
                    {
                      label: "Like",
                      value: String((showPreview as any).likes || 0),
                      emoji: "❤️",
                    },
                    {
                      label: "Pishirish vaqti",
                      value: `${showPreview.cookTime} min`,
                      emoji: "⏱",
                    },
                    {
                      label: "Qiyinlik",
                      value:
                        showPreview.difficulty === "easy"
                          ? "Oson"
                          : showPreview.difficulty === "medium"
                            ? "O'rtacha"
                            : "Qiyin",
                      emoji: "📊",
                    },
                    {
                      label: "Kategoriya",
                      value:
                        VIDEO_CATEGORIES.find(
                          (c) => c.id === showPreview.category,
                        )?.label || showPreview.category,
                      emoji: "🏷️",
                    },
                    {
                      label: "Sana",
                      value: showPreview.publishedAt,
                      emoji: "📅",
                    },
                  ].map(({ label, value, emoji }) => (
                    <div
                      key={label}
                      style={{
                        padding: "12px 14px",
                        borderRadius: 12,
                        background: "rgba(29,185,84,0.04)",
                        border: "1px solid rgba(29,185,84,0.08)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          color: "#9ca3af",
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        {emoji} {label}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 800,
                          color: "#111827",
                        }}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete confirm */}
        {deleteId && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
              background: "rgba(0,0,0,0.5)",
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
                <AlertTriangle size={26} style={{ color: "#ef4444" }} />
              </div>
              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#111827",
                }}
              >
                Videoni o'chirish?
              </h3>
              <p style={{ margin: "0 0 24px", fontSize: 13, color: "#9ca3af" }}>
                Bu amalni qaytarib bo'lmaydi
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setDeleteId(null)}
                  style={{
                    flex: 1,
                    padding: 12,
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
                    padding: 12,
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
      </div>
    );

  // ══════════════════════════════════════════
  // VIDEO QO'SHISH — Ko'p bosqichli form
  // ══════════════════════════════════════════
  if (tab === "add")
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 28,
          }}
        >
          <button
            onClick={() => setTab("list")}
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              border: "1.5px solid rgba(0,0,0,0.08)",
              background: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "#374151",
            }}
          >
            ‹
          </button>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 900,
                color: "#111827",
              }}
            >
              ➕ Yangi Video Qo'shish
            </h1>
            <p style={{ margin: "3px 0 0", fontSize: 13, color: "#9ca3af" }}>
              YouTube orqali video qo'shish
            </p>
          </div>
        </div>

        {/* Step indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: 28,
            maxWidth: 600,
          }}
        >
          {[
            { n: 1, label: "YouTube" },
            { n: 2, label: "Sarlavha" },
            { n: 3, label: "Ma'lumotlar" },
          ].map(({ n, label }, i) => (
            <div
              key={n}
              style={{ display: "flex", alignItems: "center", flex: 1 }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background:
                      addStep >= n
                        ? "linear-gradient(135deg,#1DB954,#15803d)"
                        : "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: addStep >= n ? "#fff" : "#9ca3af",
                    fontWeight: 900,
                    fontSize: 14,
                    boxShadow:
                      addStep >= n ? "0 4px 12px rgba(29,185,84,0.3)" : "none",
                    transition: "all 0.3s",
                    cursor: addStep > n ? "pointer" : "default",
                  }}
                  onClick={() => {
                    if (addStep > n) setAddStep(n);
                  }}
                >
                  {addStep > n ? <Check size={16} /> : n}
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: addStep >= n ? G : "#9ca3af",
                  }}
                >
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    background: addStep > n + 0.5 ? G : "#e5e7eb",
                    margin: "0 4px",
                    marginBottom: 22,
                    transition: "background 0.3s",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}
        >
          <div>
            {/* STEP 1: YouTube */}
            {addStep === 1 && (
              <div style={{ ...card, padding: 28 }}>
                <h3
                  style={{
                    margin: "0 0 20px",
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#111827",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Youtube size={18} style={{ color: "#ff0000" }} /> YouTube
                  Video
                </h3>
                <div style={{ marginBottom: 20 }}>
                  <label style={lbl}>YouTube URL yoki Video ID *</label>
                  <div style={{ position: "relative" }}>
                    <Link
                      size={14}
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
                      value={form.ytUrl}
                      onChange={(e) => handleYtUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      style={{ ...inp, paddingLeft: 42 }}
                      onFocus={(e) => {
                        e.target.style.borderColor = G;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(21,128,61,0.18)";
                      }}
                    />
                  </div>
                  {form.ytId && (
                    <p
                      style={{
                        margin: "6px 0 0",
                        fontSize: 12,
                        color: G,
                        fontWeight: 700,
                      }}
                    >
                      ✓ Video ID: {form.ytId}
                    </p>
                  )}
                </div>

                {/* Custom thumbnail toggle */}
                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      cursor: "pointer",
                    }}
                  >
                    <div
                      onClick={() =>
                        setF("useCustomThumb", !form.useCustomThumb)
                      }
                      style={{
                        width: 44,
                        height: 24,
                        borderRadius: 99,
                        background: form.useCustomThumb ? G : "#d1d5db",
                        position: "relative",
                        transition: "background 0.2s",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 3,
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "#fff",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                          left: form.useCustomThumb ? 23 : 3,
                          transition: "left 0.2s",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#374151",
                      }}
                    >
                      O'zim thumbnail qo'yaman
                    </span>
                  </label>
                  {form.useCustomThumb && (
                    <div style={{ marginTop: 12 }}>
                      <label style={lbl}>Thumbnail URL</label>
                      <div style={{ position: "relative" }}>
                        <Image
                          size={14}
                          style={{
                            position: "absolute",
                            left: 14,
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: G,
                          }}
                        />
                        <input
                          type="url"
                          value={form.thumbnailCustom}
                          onChange={(e) =>
                            setF("thumbnailCustom", e.target.value)
                          }
                          placeholder="https://..."
                          style={{ ...inp, paddingLeft: 42 }}
                          onFocus={(e) => {
                            e.target.style.borderColor = G;
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(21,128,61,0.18)";
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (!form.ytId) {
                      toast("YouTube URL kiriting!", false);
                      return;
                    }
                    setAddStep(2);
                  }}
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: 14,
                    border: "none",
                    cursor: "pointer",
                    background: form.ytId
                      ? "linear-gradient(135deg,#1DB954,#15803d)"
                      : "rgba(29,185,84,0.3)",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 14,
                    boxShadow: form.ytId
                      ? "0 6px 20px rgba(29,185,84,0.35)"
                      : "none",
                  }}
                >
                  Keyingi →
                </button>
              </div>
            )}

            {/* STEP 2: Sarlavhalar */}
            {addStep === 2 && (
              <div style={{ ...card, padding: 28 }}>
                <h3
                  style={{
                    margin: "0 0 20px",
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#111827",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Globe size={16} style={{ color: G }} /> Sarlavha va Tavsif
                </h3>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {[
                    {
                      label: "🇺🇿 O'zbekcha sarlavha *",
                      key: "title_uz",
                      ph: "Osh (Palov) tayyorlash",
                    },
                    {
                      label: "🇬🇧 Inglizcha sarlavha",
                      key: "title_en",
                      ph: "How to cook Uzbek Plov",
                    },
                    {
                      label: "🇷🇺 Ruscha sarlavha",
                      key: "title_ru",
                      ph: "Как приготовить плов",
                    },
                  ].map(({ label, key, ph }) => (
                    <div key={key}>
                      <label style={lbl}>{label}</label>
                      <input
                        type="text"
                        value={(form as any)[key]}
                        onChange={(e) => setF(key, e.target.value)}
                        placeholder={ph}
                        style={inp}
                        onFocus={(e) => {
                          e.target.style.borderColor = G;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(21,128,61,0.18)";
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={lbl}>📝 O'zbekcha tavsif</label>
                    <textarea
                      value={form.desc_uz}
                      onChange={(e) => setF("desc_uz", e.target.value)}
                      rows={3}
                      placeholder="Video haqida qisqacha tavsif..."
                      style={{ ...inp, resize: "none" } as React.CSSProperties}
                      onFocus={(e) => {
                        e.target.style.borderColor = G;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(21,128,61,0.18)";
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  <button
                    onClick={() => setAddStep(1)}
                    style={{
                      flex: 1,
                      padding: "13px",
                      borderRadius: 14,
                      border: "none",
                      background: "#f3f4f6",
                      color: "#374151",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    ← Orqaga
                  </button>
                  <button
                    onClick={() => {
                      if (!form.title_uz) {
                        toast("UZ sarlavha majburiy!", false);
                        return;
                      }
                      setAddStep(3);
                    }}
                    style={{
                      flex: 2,
                      padding: "13px",
                      borderRadius: 14,
                      border: "none",
                      cursor: "pointer",
                      background: form.title_uz
                        ? "linear-gradient(135deg,#1DB954,#15803d)"
                        : "rgba(29,185,84,0.3)",
                      color: "#fff",
                      fontWeight: 800,
                    }}
                  >
                    Keyingi →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Video ma'lumotlari */}
            {addStep === 3 && (
              <div style={{ ...card, padding: 28 }}>
                <h3
                  style={{
                    margin: "0 0 20px",
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  ⚙️ Video Ma'lumotlari
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                  }}
                >
                  <div>
                    <label style={lbl}>Oshpaz nomi *</label>
                    <input
                      type="text"
                      value={form.chef}
                      onChange={(e) => setF("chef", e.target.value)}
                      placeholder="Aziz Karimov"
                      style={inp}
                      onFocus={(e) => {
                        e.target.style.borderColor = G;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(21,128,61,0.18)";
                      }}
                    />
                  </div>
                  <div>
                    <label style={lbl}>Davomiylik * (15:30)</label>
                    <input
                      type="text"
                      value={form.duration}
                      onChange={(e) => setF("duration", e.target.value)}
                      placeholder="15:30"
                      style={inp}
                      onFocus={(e) => {
                        e.target.style.borderColor = G;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(21,128,61,0.18)";
                      }}
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
                    <label style={lbl}>Kaloriya</label>
                    <input
                      type="number"
                      value={form.calories}
                      onChange={(e) => setF("calories", e.target.value)}
                      placeholder="450 kcal"
                      style={inp}
                    />
                  </div>
                  <div>
                    <label style={lbl}>Qiyinlik darajasi</label>
                    <select
                      value={form.difficulty}
                      onChange={(e) => setF("difficulty", e.target.value)}
                      style={{ ...inp, cursor: "pointer" }}
                    >
                      <option value="easy">🟢 Oson</option>
                      <option value="medium">🟡 O'rtacha</option>
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
                    <label style={lbl}>Kategoriya</label>
                    <select
                      value={form.category}
                      onChange={(e) => setF("category", e.target.value)}
                      style={{ ...inp, cursor: "pointer" }}
                    >
                      {VIDEO_CATEGORIES.filter((c) => c.id !== "all").map(
                        (c) => (
                          <option key={c.id} value={c.id}>
                            {c.emoji} {c.label}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>Oshxona turi</label>
                    <select
                      value={form.cuisine}
                      onChange={(e) => setF("cuisine", e.target.value)}
                      style={{ ...inp, cursor: "pointer" }}
                    >
                      {[
                        ["uzbek", "🇺🇿 O'zbek"],
                        ["italian", "🇮🇹 Italyan"],
                        ["japanese", "🇯🇵 Yapon"],
                        ["french", "🇫🇷 Fransuz"],
                        ["american", "🇺🇸 Amerika"],
                        ["turkish", "🇹🇷 Turk"],
                        ["korean", "🇰🇷 Koreys"],
                        ["chinese", "🇨🇳 Xitoy"],
                        ["indian", "🇮🇳 Hind"],
                        ["russian", "🇷🇺 Rus"],
                        ["mexican", "🇲🇽 Meksika"],
                      ].map(([v, l]) => (
                        <option key={v} value={v}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ gridColumn: "1/-1" }}>
                    <label style={lbl}>Teglar (vergul bilan)</label>
                    <div style={{ position: "relative" }}>
                      <Tag
                        size={14}
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
                        value={form.tags}
                        onChange={(e) => setF("tags", e.target.value)}
                        placeholder="palov, uzbek, rice"
                        style={{ ...inp, paddingLeft: 42 }}
                      />
                    </div>
                  </div>
                  <div style={{ gridColumn: "1/-1" }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        cursor: "pointer",
                      }}
                    >
                      <div
                        onClick={() => setF("featured", !form.featured)}
                        style={{
                          width: 44,
                          height: 24,
                          borderRadius: 99,
                          background: form.featured ? G : "#d1d5db",
                          position: "relative",
                          transition: "background 0.2s",
                          cursor: "pointer",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 3,
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            background: "#fff",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                            left: form.featured ? 23 : 3,
                            transition: "left 0.2s",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#374151",
                        }}
                      >
                        ⭐ Tanlangan (Featured) video
                      </span>
                    </label>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  <button
                    onClick={() => setAddStep(2)}
                    style={{
                      flex: 1,
                      padding: "13px",
                      borderRadius: 14,
                      border: "none",
                      background: "#f3f4f6",
                      color: "#374151",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    ← Orqaga
                  </button>
                  <button
                    onClick={handleAddVideo}
                    style={{
                      flex: 2,
                      padding: "13px",
                      borderRadius: 14,
                      border: "none",
                      cursor: "pointer",
                      background: "linear-gradient(135deg,#1DB954,#15803d)",
                      color: "#fff",
                      fontWeight: 800,
                      boxShadow: "0 6px 20px rgba(29,185,84,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <Plus size={16} /> Video Qo'shish
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Live preview panel */}
          <div
            style={{
              ...card,
              padding: 20,
              position: "sticky" as any,
              top: 20,
              alignSelf: "flex-start",
            }}
          >
            <h3
              style={{
                margin: "0 0 14px",
                fontSize: 14,
                fontWeight: 800,
                color: "#111827",
              }}
            >
              👁 Live Ko'rinish
            </h3>
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                marginBottom: 14,
                aspectRatio: "16/9",
                background: "#111",
              }}
            >
              {ytPreview ? (
                <iframe
                  src={ytPreview}
                  style={{ width: "100%", height: "100%", border: "none" }}
                  allowFullScreen
                  title="preview"
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <Youtube size={36} style={{ color: "#333" }} />
                  <p style={{ margin: 0, fontSize: 12, color: "#555" }}>
                    YouTube URL kiriting
                  </p>
                </div>
              )}
            </div>
            {/* Thumbnail preview */}
            <div style={{ marginBottom: 14 }}>
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Thumbnail
              </p>
              <div
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  aspectRatio: "16/9",
                }}
              >
                <img
                  src={
                    form.useCustomThumb && form.thumbnailCustom
                      ? form.thumbnailCustom
                      : ytThumb ||
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=225&fit=crop"
                  }
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=225&fit=crop";
                  }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt="thumbnail"
                />
              </div>
            </div>
            {/* Card preview */}
            <div
              style={{
                padding: "14px",
                borderRadius: 14,
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#111827",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {form.title_uz || "Sarlavha..."}
              </p>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 12,
                  color: G,
                  fontWeight: 600,
                }}
              >
                {form.chef || "Oshpaz nomi"}
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
                {form.cookTime && (
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>
                    ⏱ {form.cookTime} min
                  </span>
                )}
                {form.difficulty && (
                  <span
                    style={{
                      fontSize: 11,
                      color: diffColor(form.difficulty),
                      fontWeight: 600,
                    }}
                  >
                    {form.difficulty === "easy"
                      ? "🟢 Oson"
                      : form.difficulty === "medium"
                        ? "🟡 O'rtacha"
                        : "🔴 Qiyin"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  // ══════════════════════════════════════════
  // VIDEO TAHRIRLASH
  // ══════════════════════════════════════════
  if (tab === "edit" && editVideo)
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 28,
          }}
        >
          <button
            onClick={() => setTab("list")}
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              border: "1.5px solid rgba(0,0,0,0.08)",
              background: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "#374151",
            }}
          >
            ‹
          </button>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 900,
                color: "#111827",
              }}
            >
              ✏️ Videoni Tahrirlash
            </h1>
            <p
              style={{
                margin: "3px 0 0",
                fontSize: 13,
                color: "#9ca3af",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: 400,
              }}
            >
              {editVideo.title.uz}
            </p>
          </div>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Sarlavhalar */}
            <div style={{ ...card, padding: 24 }}>
              <h3
                style={{
                  margin: "0 0 16px",
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#111827",
                }}
              >
                📝 Video Nomi
              </h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {[
                  ["🇺🇿 O'zbekcha *", "uz"],
                  ["🇬🇧 Inglizcha", "en"],
                  ["🇷🇺 Ruscha", "ru"],
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
                      onFocus={(e) => {
                        e.target.style.borderColor = G;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(21,128,61,0.18)";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Thumbnail almashtirish */}
            <div style={{ ...card, padding: 24 }}>
              <h3
                style={{
                  margin: "0 0 16px",
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#111827",
                }}
              >
                🖼️ Thumbnail (Abloshka)
              </h3>
              <div
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  marginBottom: 14,
                  height: 160,
                }}
              >
                <img
                  src={editVideo.thumbnail}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=225&fit=crop";
                  }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt="thumbnail"
                />
              </div>
              <label style={lbl}>Yangi thumbnail URL</label>
              <div style={{ position: "relative" }}>
                <Image
                  size={14}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: G,
                  }}
                />
                <input
                  type="url"
                  value={editVideo.thumbnail}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, thumbnail: e.target.value })
                  }
                  placeholder="https://..."
                  style={{ ...inp, paddingLeft: 42 }}
                  onFocus={(e) => {
                    e.target.style.borderColor = G;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(21,128,61,0.18)";
                  }}
                />
              </div>
            </div>

            {/* Video URL almashtirish */}
            <div style={{ ...card, padding: 24 }}>
              <h3
                style={{
                  margin: "0 0 16px",
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#111827",
                }}
              >
                🎬 Video URL (almashtirish)
              </h3>
              <label style={lbl}>YouTube Embed URL</label>
              <div style={{ position: "relative" }}>
                <Youtube
                  size={14}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#ff0000",
                  }}
                />
                <input
                  type="text"
                  value={editVideo.videoUrl}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, videoUrl: e.target.value })
                  }
                  placeholder="https://www.youtube.com/embed/..."
                  style={{ ...inp, paddingLeft: 42 }}
                  onFocus={(e) => {
                    e.target.style.borderColor = G;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(21,128,61,0.18)";
                  }}
                />
              </div>
            </div>

            {/* Asosiy ma'lumotlar */}
            <div style={{ ...card, padding: 24 }}>
              <h3
                style={{
                  margin: "0 0 16px",
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#111827",
                }}
              >
                ⚙️ Video Ma'lumotlari
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <div>
                  <label style={lbl}>Oshpaz nomi</label>
                  <input
                    type="text"
                    value={editVideo.chef}
                    onChange={(e) =>
                      setEditVideo({ ...editVideo, chef: e.target.value })
                    }
                    style={inp}
                    onFocus={(e) => {
                      e.target.style.borderColor = G;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(21,128,61,0.18)";
                    }}
                  />
                </div>
                <div>
                  <label style={lbl}>Davomiylik (15:30)</label>
                  <input
                    type="text"
                    value={editVideo.duration}
                    onChange={(e) =>
                      setEditVideo({ ...editVideo, duration: e.target.value })
                    }
                    style={inp}
                    onFocus={(e) => {
                      e.target.style.borderColor = G;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(21,128,61,0.18)";
                    }}
                  />
                </div>
                <div>
                  <label style={lbl}>Pishirish vaqti (min)</label>
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
                <div>
                  <label style={lbl}>Kaloriya</label>
                  <input
                    type="number"
                    value={editVideo.calories || ""}
                    onChange={(e) =>
                      setEditVideo({
                        ...editVideo,
                        calories: parseInt(e.target.value) || undefined,
                      })
                    }
                    style={inp}
                  />
                </div>
                <div>
                  <label style={lbl}>Qiyinlik darajasi</label>
                  <select
                    value={editVideo.difficulty}
                    onChange={(e) =>
                      setEditVideo({
                        ...editVideo,
                        difficulty: e.target.value as
                          | "easy"
                          | "medium"
                          | "hard",
                      })
                    }
                    style={{ ...inp, cursor: "pointer" }}
                  >
                    <option value="easy">🟢 Oson</option>
                    <option value="medium">🟡 O'rtacha</option>
                    <option value="hard">🔴 Qiyin</option>
                  </select>
                </div>
                <div>
                  <label style={lbl}>Kategoriya</label>
                  <select
                    value={editVideo.category}
                    onChange={(e) =>
                      setEditVideo({ ...editVideo, category: e.target.value })
                    }
                    style={{ ...inp, cursor: "pointer" }}
                  >
                    {VIDEO_CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.emoji} {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky preview */}
          <div>
            <div
              style={{
                ...card,
                padding: 20,
                position: "sticky" as any,
                top: 20,
              }}
            >
              <h3
                style={{
                  margin: "0 0 14px",
                  fontSize: 14,
                  fontWeight: 800,
                  color: "#111827",
                }}
              >
                👁 Ko'rinish
              </h3>
              <div
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  marginBottom: 14,
                  aspectRatio: "16/9",
                }}
              >
                <img
                  src={editVideo.thumbnail}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=225&fit=crop";
                  }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt=""
                />
              </div>
              <div
                style={{
                  padding: 14,
                  borderRadius: 14,
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  marginBottom: 16,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  {editVideo.title.uz}
                </p>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 12,
                    color: G,
                    fontWeight: 600,
                  }}
                >
                  {editVideo.chef}
                </p>
                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>
                    ⏱ {editVideo.cookTime} min
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: diffColor(editVideo.difficulty),
                      fontWeight: 700,
                    }}
                  >
                    {editVideo.difficulty === "easy"
                      ? "🟢 Oson"
                      : editVideo.difficulty === "medium"
                        ? "🟡 O'rtacha"
                        : "🔴 Qiyin"}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setTab("list")}
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
                    updateVideo(editVideo);
                    setTab("list");
                    toast("Video yangilandi! ✅");
                  }}
                  style={{
                    flex: 2,
                    padding: "11px",
                    borderRadius: 14,
                    border: "none",
                    cursor: "pointer",
                    background: "linear-gradient(135deg,#1DB954,#15803d)",
                    color: "#fff",
                    fontWeight: 800,
                    boxShadow: "0 6px 20px rgba(29,185,84,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <Check size={15} /> Saqlash
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return null;
}
