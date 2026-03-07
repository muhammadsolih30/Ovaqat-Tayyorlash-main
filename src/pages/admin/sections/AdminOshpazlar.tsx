// src/pages/admin/sections/AdminOshpazlar.tsx

import { useState } from "react";
import {
  Plus,
  Trash2,
  Shield,
  Check,
  X,
  Eye,
  EyeOff,
  Video,
  Clock,
  Calendar,
  Lock,
  ChefHat,
  AlertTriangle,
  Search,
  Filter,
  MoreVertical,
  Play,
} from "lucide-react";

interface AdminUser {
  id: string;
  username: string;
  password: string;
  name: string;
  role: "super" | "chef";
  blocked: boolean;
  createdAt: string;
  videoCount: number;
  avatar: string;
}

interface VideoItem {
  id: string;
  title: { uz: string; en: string; ru: string };
  thumbnail: string;
  views: number;
  cookTime: number;
  difficulty: "easy" | "medium" | "hard";
  chef: string;
  publishedAt: string;
  category: string;
  blocked?: boolean;
}

interface Props {
  adminUsers: AdminUser[];
  videoList: VideoItem[];
  addAdminUser: (u: AdminUser) => void;
  deleteAdminUser: (id: string) => void;
  toggleBlockAdmin: (id: string) => void;
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

export default function AdminOshpazlar({
  adminUsers,
  videoList,
  addAdminUser,
  deleteAdminUser,
  toggleBlockAdmin,
  deleteVideo,
  updateVideo,
  toast,
}: Props) {
  const [tab, setTab] = useState<"list" | "add" | "detail">("list");
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [blockVideoId, setBlockVideoId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  });

  const chefAdmins = adminUsers.filter((a) => a.role === "chef");
  const filtered = chefAdmins.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQ.toLowerCase()) ||
      a.username.toLowerCase().includes(searchQ.toLowerCase()),
  );

  const getAdminVideos = (adminName: string) =>
    videoList.filter((v) => v.chef === adminName);

  const handleAddAdmin = () => {
    if (!form.name.trim()) {
      toast("To'liq ism kiritilmadi!", false);
      return;
    }
    if (!form.username.trim()) {
      toast("Username kiritilmadi!", false);
      return;
    }
    if (form.password.length < 6) {
      toast("Parol kamida 6 ta belgi bo'lsin!", false);
      return;
    }
    if (adminUsers.find((a) => a.username === form.username.trim())) {
      toast("Bu username allaqachon mavjud!", false);
      return;
    }
    addAdminUser({
      id: `a${Date.now()}`,
      name: form.name.trim(),
      username: form.username.trim(),
      password: form.password,
      role: "chef",
      blocked: false,
      createdAt: new Date().toISOString().split("T")[0],
      videoCount: 0,
      avatar: `https://i.pravatar.cc/80?img=${Math.floor(Math.random() * 70)}`,
    });
    setForm({ name: "", username: "", password: "" });
    setTab("list");
    toast("Yangi oshpaz admin qo'shildi! ✅");
  };

  // ── Ro'yxat ──
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
              👨‍🍳 Oshpaz Adminlar
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#9ca3af" }}>
              {chefAdmins.length} ta oshpaz admin •{" "}
              {chefAdmins.filter((a) => !a.blocked).length} aktiv
            </p>
          </div>
          <button
            onClick={() => setTab("add")}
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
            <Plus size={16} /> Admin Qo'shish
          </button>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 20 }}>
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
            placeholder="Admin ismi yoki username..."
            style={{ ...inp, paddingLeft: 42, background: "#fff" }}
          />
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 14,
            marginBottom: 24,
          }}
        >
          {[
            {
              label: "Jami adminlar",
              value: chefAdmins.length,
              color: G,
              bg: "rgba(29,185,84,0.08)",
              emoji: "👥",
            },
            {
              label: "Aktiv adminlar",
              value: chefAdmins.filter((a) => !a.blocked).length,
              color: "#3b82f6",
              bg: "rgba(59,130,246,0.08)",
              emoji: "✅",
            },
            {
              label: "Bloklangan",
              value: chefAdmins.filter((a) => a.blocked).length,
              color: "#ef4444",
              bg: "rgba(239,68,68,0.08)",
              emoji: "🔒",
            },
          ].map(({ label, value, color, bg, emoji }) => (
            <div
              key={label}
              style={{
                ...card,
                padding: 18,
                display: "flex",
                alignItems: "center",
                gap: 14,
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
                  fontSize: 20,
                }}
              >
                {emoji}
              </div>
              <div>
                <div
                  style={{ fontSize: 24, fontWeight: 900, color: "#111827" }}
                >
                  {value}
                </div>
                <div
                  style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}
                >
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Admin kartalar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((admin) => {
            const videos = getAdminVideos(admin.name);
            const lastVideo = videos[0];
            return (
              <div
                key={admin.id}
                style={{
                  ...card,
                  padding: 20,
                  opacity: admin.blocked ? 0.75 : 1,
                  borderLeft: `3px solid ${admin.blocked ? "#ef4444" : G}`,
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {/* Avatar */}
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      flexShrink: 0,
                      background: admin.blocked
                        ? "rgba(239,68,68,0.1)"
                        : "linear-gradient(135deg,rgba(29,185,84,0.2),rgba(29,185,84,0.08))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      border: `2px solid ${admin.blocked ? "rgba(239,68,68,0.2)" : "rgba(29,185,84,0.2)"}`,
                    }}
                  >
                    👨‍🍳
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 2,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 800,
                          color: "#111827",
                        }}
                      >
                        {admin.name}
                      </span>
                      <span
                        style={{
                          padding: "2px 8px",
                          borderRadius: 99,
                          fontSize: 11,
                          fontWeight: 700,
                          background: admin.blocked
                            ? "rgba(239,68,68,0.1)"
                            : "rgba(29,185,84,0.1)",
                          color: admin.blocked ? "#ef4444" : G,
                        }}
                      >
                        {admin.blocked ? "🔒 Bloklangan" : "✅ Aktiv"}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: "#9ca3af" }}>
                      @{admin.username}
                    </div>
                    <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
                      <span
                        style={{
                          fontSize: 12,
                          color: "#6b7280",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Video size={12} /> {videos.length} ta video
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "#6b7280",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Calendar size={12} /> {admin.createdAt}
                      </span>
                      {lastVideo && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#6b7280",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Clock size={12} /> Oxirgi: {lastVideo.publishedAt}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button
                      onClick={() => {
                        setSelectedAdmin(admin);
                        setTab("detail");
                      }}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 12,
                        border: "none",
                        cursor: "pointer",
                        background: "rgba(59,130,246,0.08)",
                        color: "#3b82f6",
                        fontSize: 12,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
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
                      <Eye size={13} /> Ko'rish
                    </button>
                    <button
                      onClick={() => {
                        toggleBlockAdmin(admin.id);
                        toast(
                          admin.blocked
                            ? `${admin.name} blokdan chiqarildi`
                            : `${admin.name} bloklandi`,
                          !admin.blocked,
                        );
                      }}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 12,
                        border: "none",
                        cursor: "pointer",
                        background: admin.blocked
                          ? "rgba(29,185,84,0.08)"
                          : "rgba(245,158,11,0.08)",
                        color: admin.blocked ? G : "#f59e0b",
                        fontSize: 12,
                        fontWeight: 700,
                        transition: "all 0.2s",
                      }}
                    >
                      {admin.blocked ? "✅ Blokdan chiq." : "🔒 Bloklash"}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(admin.id)}
                      style={{
                        width: 36,
                        height: 36,
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
                          "rgba(239,68,68,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(239,68,68,0.08)";
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>👨‍🍳</div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#374151" }}>
                Admin topilmadi
              </p>
              <p style={{ fontSize: 13, color: "#9ca3af" }}>
                Yangi oshpaz admin qo'shing
              </p>
            </div>
          )}
        </div>

        {/* Delete confirm modal */}
        {deleteConfirm && (
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
                Adminni o'chirish
              </h3>
              <p style={{ margin: "0 0 24px", fontSize: 13, color: "#9ca3af" }}>
                Bu adminning barcha ma'lumotlari o'chadi. Qaytarib bo'lmaydi.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setDeleteConfirm(null)}
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
                    deleteAdminUser(deleteConfirm);
                    setDeleteConfirm(null);
                    toast("Admin o'chirildi");
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

  // ── Admin qo'shish ──
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
              ➕ Yangi Oshpaz Admin
            </h1>
            <p style={{ margin: "3px 0 0", fontSize: 13, color: "#9ca3af" }}>
              Login ma'lumotlarini kiriting
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 520 }}>
          <div style={{ ...card, padding: 28 }}>
            {/* Info banner */}
            <div
              style={{
                padding: "14px 18px",
                borderRadius: 14,
                marginBottom: 24,
                background: "rgba(29,185,84,0.06)",
                border: "1px solid rgba(29,185,84,0.18)",
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <Shield
                size={18}
                style={{ color: G, flexShrink: 0, marginTop: 1 }}
              />
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#15803d",
                  }}
                >
                  Muhim qoida
                </p>
                <p
                  style={{ margin: "4px 0 0", fontSize: 12, color: "#16a34a" }}
                >
                  Oshpaz admin faqat o'z videolarini boshqara oladi. Saytda kim
                  video yuklagani ko'rinmaydi.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {/* To'liq ism */}
              <div>
                <label style={lbl}>To'liq ismi *</label>
                <div style={{ position: "relative" }}>
                  <ChefHat
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
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Sarvar Rahimov"
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

              {/* Username */}
              <div>
                <label style={lbl}>Username (login uchun) *</label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    @
                  </span>
                  <input
                    type="text"
                    value={form.username}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        username: e.target.value
                          .toLowerCase()
                          .replace(/\s/g, "_"),
                      }))
                    }
                    placeholder="oshpaz_sarvar"
                    style={{ ...inp, paddingLeft: 36 }}
                    onFocus={(e) => {
                      e.target.style.borderColor = G;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(21,128,61,0.18)";
                    }}
                  />
                </div>
                {form.username && (
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: 11,
                      color: G,
                      fontWeight: 600,
                    }}
                  >
                    ✓ Login: {form.username}
                  </p>
                )}
              </div>

              {/* Parol */}
              <div>
                <label style={lbl}>Parol *</label>
                <div style={{ position: "relative" }}>
                  <Lock
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
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, password: e.target.value }))
                    }
                    placeholder="Kamida 6 ta belgi"
                    style={{ ...inp, paddingLeft: 42, paddingRight: 44 }}
                    onFocus={(e) => {
                      e.target.style.borderColor = G;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(21,128,61,0.18)";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#9ca3af",
                      display: "flex",
                    }}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {/* Password strength */}
                {form.password && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                      {[1, 2, 3, 4].map((n) => (
                        <div
                          key={n}
                          style={{
                            flex: 1,
                            height: 3,
                            borderRadius: 99,
                            background:
                              form.password.length >= n * 3
                                ? n <= 1
                                  ? "#ef4444"
                                  : n <= 2
                                    ? "#f59e0b"
                                    : n <= 3
                                      ? "#3b82f6"
                                      : G
                                : "#e5e7eb",
                            transition: "background 0.2s",
                          }}
                        />
                      ))}
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 11,
                        color: form.password.length < 6 ? "#ef4444" : G,
                        fontWeight: 600,
                      }}
                    >
                      {form.password.length < 6
                        ? `${6 - form.password.length} ta belgi yana kerak`
                        : "✓ Parol yetarli"}
                    </p>
                  </div>
                )}
              </div>

              {/* Preview card */}
              {form.name && form.username && (
                <div
                  style={{
                    padding: 16,
                    borderRadius: 14,
                    background:
                      "linear-gradient(135deg,rgba(29,185,84,0.06),rgba(29,185,84,0.03))",
                    border: "1px solid rgba(29,185,84,0.15)",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 10px",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Ko'rinish
                  </p>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: "rgba(29,185,84,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                      }}
                    >
                      👨‍🍳
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: 14,
                          color: "#111827",
                        }}
                      >
                        {form.name}
                      </div>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>
                        @{form.username} • Oshpaz Admin
                      </div>
                    </div>
                    <span
                      style={{
                        marginLeft: "auto",
                        padding: "3px 10px",
                        borderRadius: 99,
                        fontSize: 11,
                        fontWeight: 700,
                        background: "rgba(29,185,84,0.1)",
                        color: G,
                      }}
                    >
                      Yangi
                    </span>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
                <button
                  onClick={() => setTab("list")}
                  style={{
                    flex: 1,
                    padding: "13px",
                    borderRadius: 14,
                    border: "none",
                    background: "#f3f4f6",
                    color: "#374151",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  Bekor
                </button>
                <button
                  onClick={handleAddAdmin}
                  style={{
                    flex: 2,
                    padding: "13px",
                    borderRadius: 14,
                    border: "none",
                    cursor: "pointer",
                    background:
                      form.name && form.username && form.password.length >= 6
                        ? "linear-gradient(135deg,#1DB954,#15803d)"
                        : "rgba(29,185,84,0.3)",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 14,
                    boxShadow:
                      form.name && form.username && form.password.length >= 6
                        ? "0 6px 20px rgba(29,185,84,0.35)"
                        : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    transition: "all 0.2s",
                  }}
                >
                  <Check size={16} /> Admin Yaratish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  // ── Admin detail (uning videolari) ──
  if (tab === "detail" && selectedAdmin) {
    const adminVideos = getAdminVideos(selectedAdmin.name);
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 24,
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
          <div style={{ flex: 1 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 900,
                color: "#111827",
              }}
            >
              👨‍🍳 {selectedAdmin.name}
            </h1>
            <p style={{ margin: "3px 0 0", fontSize: 13, color: "#9ca3af" }}>
              @{selectedAdmin.username} — admin faoliyati
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => {
                toggleBlockAdmin(selectedAdmin.id);
                setSelectedAdmin((p) =>
                  p ? { ...p, blocked: !p.blocked } : null,
                );
                toast(
                  selectedAdmin.blocked ? "Blokdan chiqarildi" : "Bloklandi",
                  !selectedAdmin.blocked,
                );
              }}
              style={{
                padding: "9px 18px",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                background: selectedAdmin.blocked
                  ? "rgba(29,185,84,0.1)"
                  : "rgba(245,158,11,0.1)",
                color: selectedAdmin.blocked ? G : "#f59e0b",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {selectedAdmin.blocked ? "✅ Blokdan chiqarish" : "🔒 Bloklash"}
            </button>
          </div>
        </div>

        {/* Admin profil kartasi */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: 20,
            marginBottom: 24,
          }}
        >
          <div style={{ ...card, padding: 24 }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 20,
                  background:
                    "linear-gradient(135deg,rgba(29,185,84,0.2),rgba(29,185,84,0.08))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 34,
                  margin: "0 auto 12px",
                  border: "2px solid rgba(29,185,84,0.2)",
                }}
              >
                👨‍🍳
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 900,
                  color: "#111827",
                }}
              >
                {selectedAdmin.name}
              </h3>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#9ca3af" }}>
                @{selectedAdmin.username}
              </p>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  padding: "4px 12px",
                  borderRadius: 99,
                  fontSize: 12,
                  fontWeight: 700,
                  background: selectedAdmin.blocked
                    ? "rgba(239,68,68,0.1)"
                    : "rgba(29,185,84,0.1)",
                  color: selectedAdmin.blocked ? "#ef4444" : G,
                }}
              >
                {selectedAdmin.blocked ? "🔒 Bloklangan" : "✅ Aktiv"}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                {
                  label: "Jami videolar",
                  value: String(adminVideos.length),
                  icon: "🎬",
                },
                {
                  label: "Qo'shilgan sana",
                  value: selectedAdmin.createdAt,
                  icon: "📅",
                },
                {
                  label: "Umumiy ko'rishlar",
                  value: `${(adminVideos.reduce((a, v) => a + v.views, 0) / 1000).toFixed(1)}K`,
                  icon: "👁",
                },
              ].map(({ label, value, icon }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    borderRadius: 12,
                    background: "rgba(29,185,84,0.04)",
                    border: "1px solid rgba(29,185,84,0.08)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: "#6b7280",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    {icon} {label}
                  </span>
                  <span
                    style={{ fontSize: 14, fontWeight: 800, color: "#111827" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Admin login ma'lumotlari */}
          <div style={{ ...card, padding: 24 }}>
            <h3
              style={{
                margin: "0 0 16px",
                fontSize: 15,
                fontWeight: 800,
                color: "#111827",
              }}
            >
              🔑 Login Ma'lumotlari
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: 14,
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                }}
              >
                <p style={lbl}>Username</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <code
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#111827",
                      fontFamily: "monospace",
                    }}
                  >
                    {selectedAdmin.username}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedAdmin.username);
                      toast("Username nusxalandi!");
                    }}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 8,
                      border: "none",
                      background: "rgba(29,185,84,0.1)",
                      color: G,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Nusxa
                  </button>
                </div>
              </div>
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: 14,
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                }}
              >
                <p style={lbl}>Parol</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <code
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#111827",
                      fontFamily: "monospace",
                    }}
                  >
                    {showPass ? selectedAdmin.password : "••••••••••"}
                  </code>
                  <button
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 8,
                      border: "none",
                      background: "rgba(59,130,246,0.1)",
                      color: "#3b82f6",
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {showPass ? "Yashir" : "Ko'rish"}
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedAdmin.password);
                      toast("Parol nusxalandi!");
                    }}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 8,
                      border: "none",
                      background: "rgba(29,185,84,0.1)",
                      color: G,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Nusxa
                  </button>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 20,
                padding: "14px 16px",
                borderRadius: 14,
                background: "rgba(245,158,11,0.06)",
                border: "1px solid rgba(245,158,11,0.2)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#92400e",
                }}
              >
                ⚠️ Eslatma
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "#a16207" }}>
                Saytda video kim yuklagani ko'rinmaydi. Bu admin faqat o'z
                paneliga kira oladi.
              </p>
            </div>
          </div>
        </div>

        {/* Bu admining videolari */}
        <div style={{ ...card, overflow: "hidden" }}>
          <div
            style={{
              padding: "18px 20px",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
              🎬 Bu Admin Yuklagan Videolar ({adminVideos.length})
            </h3>
          </div>

          {adminVideos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🎬</div>
              <p style={{ fontSize: 14, color: "#9ca3af" }}>
                Bu admin hali video yuklamagan
              </p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "rgba(29,185,84,0.04)" }}>
                    {[
                      "#",
                      "Thumbnail",
                      "Video nomi",
                      "Ko'rishlar",
                      "Davomiylik",
                      "Sana",
                      "Holat",
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
                  {adminVideos.map((v, i) => (
                    <tr
                      key={v.id}
                      style={{
                        borderTop: "1px solid rgba(0,0,0,0.04)",
                        background: (v as any).blocked
                          ? "rgba(239,68,68,0.02)"
                          : i % 2 === 0
                            ? "#fff"
                            : "rgba(29,185,84,0.01)",
                      }}
                    >
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: 12,
                          color: "#d1d5db",
                          fontWeight: 700,
                        }}
                      >
                        {i + 1}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ position: "relative" }}>
                          <img
                            src={v.thumbnail}
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=50&fit=crop";
                            }}
                            style={{
                              width: 64,
                              height: 40,
                              borderRadius: 8,
                              objectFit: "cover",
                              display: "block",
                            }}
                            alt=""
                          />
                          {(v as any).blocked && (
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                borderRadius: 8,
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
                      <td style={{ padding: "12px 16px", maxWidth: 200 }}>
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
                          {v.category}
                        </p>
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
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: 12,
                          color: "#9ca3af",
                        }}
                      >
                        {v.publishedAt}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
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
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
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
                            style={{
                              padding: "5px 12px",
                              borderRadius: 10,
                              border: "none",
                              cursor: "pointer",
                              background: (v as any).blocked
                                ? "rgba(29,185,84,0.08)"
                                : "rgba(245,158,11,0.08)",
                              color: (v as any).blocked ? G : "#f59e0b",
                              fontSize: 11,
                              fontWeight: 700,
                            }}
                          >
                            {(v as any).blocked
                              ? "✅ Blok chiq."
                              : "🔒 Bloklash"}
                          </button>
                          <button
                            onClick={() => setBlockVideoId(v.id)}
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
            </div>
          )}
        </div>

        {/* Video delete confirm */}
        {blockVideoId && (
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
                <Trash2 size={26} style={{ color: "#ef4444" }} />
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
                  onClick={() => setBlockVideoId(null)}
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
                    deleteVideo(blockVideoId);
                    setBlockVideoId(null);
                    toast("Video o'chirildi");
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
  }

  return null;
}
