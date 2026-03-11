import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Video, chefs } from "@/data/videos";
import { Recipe, categoryList as recipeCategoryList } from "@/data/recipes";
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
  Edit3,
  Star,
  Tag,
  Users,
  MessageSquare,
  Share2,
  Lock,
  Globe,
  Bell,
  Database,
  Key,
  UserCheck,
  UserX,
  Ban,
  Clock,
  ThumbsUp,
  MessageCircle,
  Copy,
  ExternalLink,
  Phone,
  Mail,
  Calendar,
  Activity,
  ToggleLeft,
  ToggleRight,
  Upload,
  Image as Img,
  Smartphone,
} from "lucide-react";
import QoshishPage from "@/pages/admin/sections/QoshishPage";

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
  | "categories"
  | "users"
  | "comments"
  | "share";

const G = "#1DB954";

const card: React.CSSProperties = {
  background: "white",
  border: "1px solid rgba(21,128,61,0.1)",
  borderRadius: "16px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
};
const inp: React.CSSProperties = {
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
};
const lbl: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "700",
  color: "#6b7280",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  display: "block",
  marginBottom: "6px",
};
const diffColor = (d: string) =>
  d === "easy" ? G : d === "medium" ? "#f59e0b" : "#ef4444";

// ══════════════════════════════════════════════════
// MOCK DATA — Foydalanuvchilar va Kommentariyalar
// ══════════════════════════════════════════════════
const MOCK_USERS = [
  {
    id: "u1",
    name: "Aziz Karimov",
    email: "aziz@gmail.com",
    phone: "+998901234567",
    avatar: "https://i.pravatar.cc/40?img=1",
    method: "google",
    joined: "2024-01-15",
    lastSeen: "2024-12-20",
    status: "active",
    views: 120,
  },
  {
    id: "u2",
    name: "Malika Yusupova",
    email: "malika@gmail.com",
    phone: "+998901234568",
    avatar: "https://i.pravatar.cc/40?img=5",
    method: "google",
    joined: "2024-02-10",
    lastSeen: "2024-12-19",
    status: "active",
    views: 85,
  },
  {
    id: "u3",
    name: "Jasur Toshmatov",
    email: "",
    phone: "+998901234569",
    avatar: "https://i.pravatar.cc/40?img=3",
    method: "phone",
    joined: "2024-03-05",
    lastSeen: "2024-12-18",
    status: "active",
    views: 200,
  },
  {
    id: "u4",
    name: "Nilufar Rahimova",
    email: "nilufar@mail.ru",
    phone: "+998901234570",
    avatar: "https://i.pravatar.cc/40?img=7",
    method: "phone",
    joined: "2024-03-20",
    lastSeen: "2024-11-30",
    status: "blocked",
    views: 45,
  },
  {
    id: "u5",
    name: "Bobur Mirzayev",
    email: "bobur@gmail.com",
    phone: "+998901234571",
    avatar: "https://i.pravatar.cc/40?img=8",
    method: "google",
    joined: "2024-04-01",
    lastSeen: "2024-12-21",
    status: "active",
    views: 310,
  },
  {
    id: "u6",
    name: "Shahlo Ergasheva",
    email: "shahlo@gmail.com",
    phone: "+998901234572",
    avatar: "https://i.pravatar.cc/40?img=9",
    method: "google",
    joined: "2024-04-15",
    lastSeen: "2024-12-15",
    status: "active",
    views: 78,
  },
];

const MOCK_COMMENTS = [
  {
    id: "c1",
    user: "Aziz Karimov",
    avatar: "https://i.pravatar.cc/32?img=1",
    video: "Osh (Palov) tayyorlash",
    text: "Juda zo'r retsept! Sinab ko'rdim, oila yaxshi ko'rdi 😍",
    time: "2 soat oldin",
    likes: 24,
    replies: 3,
    pinned: false,
    status: "active",
  },
  {
    id: "c2",
    user: "Malika Yusupova",
    avatar: "https://i.pravatar.cc/32?img=5",
    video: "Somsa tayyorlash",
    text: "Admin, ko'proq o'zbek taomlari videolari qo'shinglar!",
    time: "5 soat oldin",
    likes: 41,
    replies: 7,
    pinned: true,
    status: "active",
  },
  {
    id: "c3",
    user: "Jasur Toshmatov",
    avatar: "https://i.pravatar.cc/32?img=3",
    video: "Shurpa",
    text: "Bu retseptda qancha suv kerak? Aniq yozmabsiz...",
    time: "1 kun oldin",
    likes: 8,
    replies: 2,
    pinned: false,
    status: "active",
  },
  {
    id: "c4",
    user: "Anonim",
    avatar: "https://i.pravatar.cc/32?img=11",
    video: "Manti tayyorlash",
    text: "Spam spam spam reklama...",
    time: "2 kun oldin",
    likes: 0,
    replies: 0,
    pinned: false,
    status: "spam",
  },
  {
    id: "c5",
    user: "Nilufar Rahimova",
    avatar: "https://i.pravatar.cc/32?img=7",
    video: "Lag'mon",
    text: "Rahmat! Aniq ko'rsatilgan, boshlang'ich uchun ham qulay 👍",
    time: "3 kun oldin",
    likes: 15,
    replies: 1,
    pinned: false,
    status: "active",
  },
  {
    id: "c6",
    user: "Bobur Mirzayev",
    avatar: "https://i.pravatar.cc/32?img=8",
    video: "Dimlama",
    text: "Ingredientlar ro'yxatini description ga ham yozing iltimos",
    time: "3 kun oldin",
    likes: 19,
    replies: 4,
    pinned: false,
    status: "active",
  },
];

// ══════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════
const AdminPanel = ({ onExit }: AdminPanelProps) => {
  const {
    adminLogout,
    videoList,
    addVideo,
    deleteVideo,
    updateVideo,
    recipeList,
    addRecipe,
    deleteRecipe,
    updateRecipe,
  } = useAdmin();

  const [page, setPage] = useState<AdminPage>("dashboard");
  const [searchQ, setSearchQ] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editVideo, setEditVideo] = useState<Video | null>(null);
  const [notif, setNotif] = useState<{ msg: string; ok: boolean } | null>(null);
  const [editRecipeId, setEditRecipeId] = useState<string | null>(null);
  const [editRecipeData, setEditRecipeData] = useState<Recipe | null>(null);

  // ── 7. Kategoriya CRUD state
  const [categories, setCategories] = useState(
    recipeCategoryList.map((c) => ({ ...c, active: true })),
  );
  const [catModal, setCatModal] = useState(false);
  const [editCat, setEditCat] = useState<any>(null);
  const [catForm, setCatForm] = useState({ uz: "", en: "", ru: "", emoji: "" });

  // ── 8. Kommentariya state
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [commentFilter, setCommentFilter] = useState<"all" | "pinned" | "spam">(
    "all",
  );

  // ── 10. Foydalanuvchilar state
  const [users, setUsers] = useState(MOCK_USERS);
  const [userFilter, setUserFilter] = useState<"all" | "active" | "blocked">(
    "all",
  );
  const [userSearch, setUserSearch] = useState("");

  // ── 11. Sozlamalar state
  const [siteName, setSiteName] = useState("TaomUz");
  const [siteDesc, setSiteDesc] = useState("O'zbek milliy taomlar sayt");
  const [defaultLang, setDefaultLang] = useState("uz");
  const [commentsOn, setCommentsOn] = useState(true);
  const [spamFilter, setSpamFilter] = useState(true);
  const [adminApprove, setAdminApprove] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [maxThumb, setMaxThumb] = useState("5");
  const [allowedFmt, setAllowedFmt] = useState("jpg,png,webp");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [shareNotif, setShareNotif] = useState<string | null>(null);

  const toast = (msg: string, ok = true) => {
    setNotif({ msg, ok });
    setTimeout(() => setNotif(null), 3500);
  };

  const filtered = videoList.filter(
    (v) =>
      v.title.uz.toLowerCase().includes(searchQ.toLowerCase()) ||
      v.chef.toLowerCase().includes(searchQ.toLowerCase()),
  );
  const totalViews = videoList.reduce((a, v) => a + v.views, 0);
  const topVideos = [...videoList].sort((a, b) => b.views - a.views);

  const navGroups = [
    {
      title: "ASOSIY",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "videos", label: "Videolar", icon: PlaySquare },
        { id: "add", label: "Yangi Qo'shish", icon: Plus },
      ],
    },
    {
      title: "KONTENT",
      items: [
        { id: "recipes", label: "Taomlar", icon: Tag },
        { id: "categories", label: "Kategoriyalar", icon: LayoutDashboard },
        { id: "chefs", label: "Oshpazlar", icon: ChefHat },
        { id: "comments", label: "Kommentariyalar", icon: MessageSquare },
      ],
    },
    {
      title: "FOYDALANUVCHILAR",
      items: [
        { id: "users", label: "Foydalanuvchilar", icon: Users },
        { id: "share", label: "Video Ulashish", icon: Share2 },
      ],
    },
    {
      title: "BOSHQA",
      items: [
        { id: "stats", label: "Statistika", icon: BarChart3 },
        { id: "settings", label: "Sozlamalar", icon: Settings },
      ],
    },
  ] as {
    title: string;
    items: { id: AdminPage; label: string; icon: any }[];
  }[];

  // ── Toggle helpers
  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <div
      onClick={onToggle}
      style={{
        width: 46,
        height: 25,
        borderRadius: 99,
        cursor: "pointer",
        background: on ? G : "#d1d5db",
        position: "relative",
        transition: "background 0.25s",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          width: 19,
          height: 19,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 5px rgba(0,0,0,0.2)",
          left: on ? 24 : 3,
          transition: "left 0.25s",
        }}
      />
    </div>
  );

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: "#f0fdf4",
        fontFamily: "'Plus Jakarta Sans',sans-serif",
      }}
    >
      {/* Toast */}
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

      {/* Share copy notif */}
      {shareNotif && (
        <div
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-2 px-5 py-3 rounded-2xl text-white text-sm font-bold shadow-2xl"
          style={{ background: "linear-gradient(135deg,#3b82f6,#1d4ed8)" }}
        >
          <Copy size={14} /> {shareNotif}
        </div>
      )}

      {/* ═══ SIDEBAR ═══ */}
      <aside
        className="w-56 flex-shrink-0 flex flex-col h-screen sticky top-0"
        style={{
          background: "linear-gradient(180deg,#0d2818 0%,#166534 100%)",
        }}
      >
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
              Taom<span className="text-white">Uz</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 pt-4 overflow-y-auto">
          {navGroups.map(({ title, items }) => (
            <div key={title} className="mb-4">
              <p
                className="text-[9px] font-black px-3 mb-2"
                style={{
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.12em",
                }}
              >
                {title}
              </p>
              {items.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setPage(id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all mb-0.5"
                  style={{
                    background:
                      page === id ? "rgba(255,255,255,0.18)" : "transparent",
                    color: page === id ? "white" : "rgba(255,255,255,0.5)",
                    borderLeft:
                      page === id ? `3px solid ${G}` : "3px solid transparent",
                  }}
                >
                  <Icon size={16} /> <span>{label}</span>
                  {id === "comments" &&
                    comments.filter((c) => c.status === "spam").length > 0 && (
                      <span
                        className="ml-auto text-[10px] font-black px-1.5 py-0.5 rounded-full"
                        style={{ background: "#ef4444", color: "#fff" }}
                      >
                        {comments.filter((c) => c.status === "spam").length}
                      </span>
                    )}
                  {id === "users" &&
                    users.filter((u) => u.status === "blocked").length > 0 && (
                      <span
                        className="ml-auto text-[10px] font-black px-1.5 py-0.5 rounded-full"
                        style={{ background: "#f59e0b", color: "#fff" }}
                      >
                        {users.filter((u) => u.status === "blocked").length}
                      </span>
                    )}
                </button>
              ))}
            </div>
          ))}
        </nav>

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
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-red-500/20"
            style={{ color: "rgba(255,160,160,0.8)" }}
          >
            <LogOut size={15} /> Chiqish
          </button>
        </div>
      </aside>

      {/* ═══ MAIN ═══ */}
      <main className="flex-1 min-w-0 overflow-auto p-6">
        {/* ════ DASHBOARD ════ */}
        {page === "dashboard" && (
          <div>
            <h1
              className="text-2xl font-black mb-1"
              style={{ color: "#111827" }}
            >
              📊 Dashboard
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              TaomUz boshqaruv markazi
            </p>
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
                  label: "Foydalanuvchilar",
                  val: users.length,
                  icon: Users,
                  color: "#f59e0b",
                  bg: "rgba(245,158,11,0.1)",
                },
                {
                  label: "Kommentariyalar",
                  val: comments.filter((c) => c.status === "active").length,
                  icon: MessageSquare,
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

            {/* So'nggi videolar */}
            <div className="rounded-2xl overflow-hidden mb-4" style={card}>
              <div className="px-5 py-4 flex items-center justify-between border-b border-green-50">
                <h3 className="font-black text-sm" style={{ color: "#111827" }}>
                  🎬 So'nggi videolar
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
                  {videoList.slice(0, 5).map((v, i) => (
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

            {/* So'nggi foydalanuvchilar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden" style={card}>
                <div className="px-5 py-4 flex items-center justify-between border-b border-green-50">
                  <h3
                    className="font-black text-sm"
                    style={{ color: "#111827" }}
                  >
                    👥 So'nggi foydalanuvchilar
                  </h3>
                  <button
                    onClick={() => setPage("users")}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg"
                    style={{
                      background: "rgba(245,158,11,0.1)",
                      color: "#f59e0b",
                    }}
                  >
                    Barchasi →
                  </button>
                </div>
                {users.slice(0, 4).map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center gap-3 px-4 py-3 border-b border-green-50/50 last:border-0"
                  >
                    <img
                      src={u.avatar}
                      className="w-8 h-8 rounded-full object-cover"
                      alt=""
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold truncate"
                        style={{ color: "#111827" }}
                      >
                        {u.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {u.method === "google" ? "🔵 Google" : "📱 Telefon"} ·{" "}
                        {u.joined}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${u.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                    >
                      {u.status === "active" ? "Faol" : "Bloklangan"}
                    </span>
                  </div>
                ))}
              </div>

              {/* So'nggi kommentariyalar */}
              <div className="rounded-2xl overflow-hidden" style={card}>
                <div className="px-5 py-4 flex items-center justify-between border-b border-green-50">
                  <h3
                    className="font-black text-sm"
                    style={{ color: "#111827" }}
                  >
                    💬 So'nggi kommentariyalar
                  </h3>
                  <button
                    onClick={() => setPage("comments")}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg"
                    style={{
                      background: "rgba(139,92,246,0.1)",
                      color: "#8b5cf6",
                    }}
                  >
                    Barchasi →
                  </button>
                </div>
                {comments.slice(0, 4).map((c) => (
                  <div
                    key={c.id}
                    className="flex items-start gap-3 px-4 py-3 border-b border-green-50/50 last:border-0"
                  >
                    <img
                      src={c.avatar}
                      className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-0.5"
                      alt=""
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-bold"
                        style={{ color: "#111827" }}
                      >
                        {c.user}
                      </p>
                      <p className="text-xs text-gray-400 line-clamp-1">
                        {c.text}
                      </p>
                    </div>
                    {c.status === "spam" && (
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-red-100 text-red-600 flex-shrink-0">
                        SPAM
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════ VIDEO QO'SHISH ════ */}
        {page === "add" && (
          <QoshishPage
            addVideo={addVideo as any}
            addRecipe={addRecipe}
            updateRecipe={updateRecipe}
            editRecipeId={editRecipeId}
            editRecipeData={editRecipeData}
            toast={toast}
            onDone={() => setPage("videos")}
            onRecipeDone={() => {
              setEditRecipeId(null);
              setEditRecipeData(null);
              setPage("recipes");
            }}
          />
        )}

        {/* ════ VIDEOLAR ════ */}
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
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm"
                style={{
                  background: "linear-gradient(135deg,#1DB954,#15803d)",
                  boxShadow: "0 4px 15px rgba(29,185,84,0.35)",
                }}
              >
                <Plus size={17} /> Yangi Video
              </button>
            </div>
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
                placeholder="Video yoki oshpaz..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  background: "white",
                  border: "1.5px solid rgba(21,128,61,0.2)",
                  color: "#111827",
                }}
              />
            </div>
            <div className="rounded-2xl overflow-hidden" style={card}>
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
                        <p className="text-xs text-gray-400">{v.publishedAt}</p>
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
                            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-50"
                            style={{ color: "#3b82f6" }}
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteId(v.id)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50"
                            style={{ color: "#ef4444" }}
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
        )}

        {/* ════ OSHPAZLAR ════ */}
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
                const cv = videoList.filter((v) => v.chef === chef.name);
                const tv = cv.reduce((a, v) => a + v.views, 0);
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
                        { label: "Videolar", val: cv.length },
                        {
                          label: "Ko'rishlar",
                          val: `${(tv / 1000).toFixed(0)}K`,
                        },
                        { label: "Aktiv", val: cv.length > 0 ? "✅" : "—" },
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

        {/* ════ STATISTIKA ════ */}
        {page === "stats" && (
          <div>
            <h1
              className="text-2xl font-black mb-1"
              style={{ color: "#111827" }}
            >
              📈 Statistika
            </h1>
            <p className="text-sm text-gray-400 mb-6">Sayt faoliyati tahlili</p>
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
                      className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
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
          </div>
        )}

        {/* ════════════════════════════════════════════
            7. KATEGORIYALAR BOSHQARUVI — TO'LIQ CRUD
        ════════════════════════════════════════════ */}
        {page === "categories" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1
                  className="text-2xl font-black"
                  style={{ color: "#111827" }}
                >
                  📂 Kategoriyalar Boshqaruvi
                </h1>
                <p className="text-sm text-gray-400 mt-0.5">
                  {categories.length} ta kategoriya
                </p>
              </div>
              <button
                onClick={() => {
                  setCatForm({ uz: "", en: "", ru: "", emoji: "" });
                  setEditCat(null);
                  setCatModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white text-sm"
                style={{ background: `linear-gradient(135deg,${G},#15803d)` }}
              >
                <Plus size={15} /> Yangi Kategoriya
              </button>
            </div>

            {/* Kategoriya kartalar */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((cat) => {
                const cnt = recipeList.filter(
                  (r) => r.category === cat.id,
                ).length;
                return (
                  <div
                    key={cat.id}
                    style={{ ...card, opacity: cat.active ? 1 : 0.5 }}
                    className="p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{cat.emoji}</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setEditCat(cat);
                            setCatForm({
                              uz: cat.uz,
                              en: cat.en || "",
                              ru: cat.ru || "",
                              emoji: cat.emoji,
                            });
                            setCatModal(true);
                          }}
                          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-blue-50"
                          style={{ color: "#3b82f6" }}
                        >
                          <Edit3 size={12} />
                        </button>
                        <button
                          onClick={() =>
                            setCategories((p) =>
                              p.map((c) =>
                                c.id === cat.id
                                  ? { ...c, active: !c.active }
                                  : c,
                              ),
                            )
                          }
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ color: cat.active ? "#f59e0b" : "#9ca3af" }}
                        >
                          {cat.active ? (
                            <ToggleRight size={14} />
                          ) : (
                            <ToggleLeft size={14} />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`"${cat.uz}" o'chirilsinmi?`))
                              setCategories((p) =>
                                p.filter((c) => c.id !== cat.id),
                              );
                          }}
                          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50"
                          style={{ color: "#ef4444" }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                    <p
                      className="font-black text-sm mb-0.5"
                      style={{ color: "#111827" }}
                    >
                      {cat.uz}
                    </p>
                    {cat.en && (
                      <p className="text-xs text-gray-400 mb-1">{cat.en}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">
                        {cnt} ta taom
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                      >
                        {cat.active ? "Aktiv" : "Nofaol"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════
            8. KOMMENTARIYA TIZIMI
        ════════════════════════════════════════════ */}
        {page === "comments" && (
          <div>
            <h1
              className="text-2xl font-black mb-1"
              style={{ color: "#111827" }}
            >
              💬 Kommentariya Boshqaruvi
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              {comments.length} ta kommentariya
            </p>

            {/* Statistika */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                {
                  label: "Jami kommentariya",
                  val: comments.length,
                  color: "#3b82f6",
                  bg: "rgba(59,130,246,0.1)",
                  icon: MessageSquare,
                },
                {
                  label: "Jami like",
                  val: comments.reduce((a, c) => a + c.likes, 0),
                  color: G,
                  bg: "rgba(29,185,84,0.1)",
                  icon: ThumbsUp,
                },
                {
                  label: "Spam / Blok",
                  val: comments.filter((c) => c.status === "spam").length,
                  color: "#ef4444",
                  bg: "rgba(239,68,68,0.1)",
                  icon: Ban,
                },
              ].map(({ label, val, color, bg, icon: Icon }) => (
                <div key={label} className="p-4 rounded-2xl" style={card}>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
                    style={{ background: bg }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div
                    className="text-xl font-black"
                    style={{ color: "#111827" }}
                  >
                    {val}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-4">
              {(
                [
                  ["all", "Barchasi"],
                  ["pinned", "Pinlangan"],
                  ["spam", "Spam"],
                ] as const
              ).map(([f, l]) => (
                <button
                  key={f}
                  onClick={() => setCommentFilter(f)}
                  className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: commentFilter === f ? G : "rgba(0,0,0,0.05)",
                    color: commentFilter === f ? "#fff" : "#6b7280",
                  }}
                >
                  {l} (
                  {f === "all"
                    ? comments.length
                    : f === "pinned"
                      ? comments.filter((c) => c.pinned).length
                      : comments.filter((c) => c.status === "spam").length}
                  )
                </button>
              ))}
            </div>

            {/* Kommentariya ro'yxati */}
            <div className="space-y-3">
              {comments
                .filter((c) =>
                  commentFilter === "all"
                    ? true
                    : commentFilter === "pinned"
                      ? c.pinned
                      : c.status === "spam",
                )
                .map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl"
                    style={{
                      ...card,
                      borderLeft: c.pinned
                        ? `3px solid ${G}`
                        : c.status === "spam"
                          ? "3px solid #ef4444"
                          : "3px solid transparent",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={c.avatar}
                        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                        alt=""
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span
                            className="text-sm font-black"
                            style={{ color: "#111827" }}
                          >
                            {c.user}
                          </span>
                          {c.pinned && (
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{
                                background: "rgba(29,185,84,0.1)",
                                color: G,
                              }}
                            >
                              📌 Pinlangan
                            </span>
                          )}
                          {c.status === "spam" && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                              🚫 SPAM
                            </span>
                          )}
                          <span className="text-xs text-gray-400 ml-auto">
                            {c.time}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">
                          📹 {c.video}
                        </p>
                        <p className="text-sm text-gray-700 mb-3">{c.text}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <ThumbsUp size={11} /> {c.likes}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <MessageCircle size={11} /> {c.replies} javob
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <button
                          onClick={() =>
                            setComments((p) =>
                              p.map((x) =>
                                x.id === c.id ? { ...x, pinned: !x.pinned } : x,
                              ),
                            )
                          }
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                          style={{
                            background: c.pinned
                              ? "rgba(29,185,84,0.12)"
                              : "rgba(0,0,0,0.05)",
                            color: c.pinned ? G : "#6b7280",
                          }}
                          title={
                            c.pinned ? "Pinni olib tashlash" : "Pin qilish"
                          }
                        >
                          📌
                        </button>
                        <button
                          onClick={() =>
                            setComments((p) =>
                              p.map((x) =>
                                x.id === c.id
                                  ? {
                                      ...x,
                                      status:
                                        x.status === "spam" ? "active" : "spam",
                                    }
                                  : x,
                              ),
                            )
                          }
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{
                            background:
                              c.status === "spam"
                                ? "rgba(239,68,68,0.1)"
                                : "rgba(0,0,0,0.05)",
                            color: c.status === "spam" ? "#ef4444" : "#6b7280",
                          }}
                        >
                          <Ban size={13} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("O'chirilsinmi?"))
                              setComments((p) =>
                                p.filter((x) => x.id !== c.id),
                              );
                          }}
                          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50"
                          style={{ color: "#ef4444" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════
            9. VIDEO ULASHISH TIZIMI
        ════════════════════════════════════════════ */}
        {page === "share" && (
          <div>
            <h1
              className="text-2xl font-black mb-1"
              style={{ color: "#111827" }}
            >
              🔗 Video Ulashish Tizimi
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              Har bir video to'g'ridan-to'g'ri ochiladi
            </p>

            {/* Qanday ishlaydi */}
            <div
              className="p-5 rounded-2xl mb-6"
              style={{
                ...card,
                background:
                  "linear-gradient(135deg,rgba(59,130,246,0.05),rgba(139,92,246,0.05))",
                border: "1.5px solid rgba(59,130,246,0.15)",
              }}
            >
              <h3
                className="font-black text-sm mb-4"
                style={{ color: "#111827" }}
              >
                📖 Qanday ishlaydi?
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    n: "1️⃣",
                    t: "Link nusxalanadi",
                    d: "Admin yoki foydalanuvchi video linkini nusxalaydi",
                  },
                  {
                    n: "2️⃣",
                    t: "Platforma ga yuboriladi",
                    d: "Telegram, WhatsApp, Instagram va boshqalarga yuboriladi",
                  },
                  {
                    n: "3️⃣",
                    t: "To'g'ri sahifa ochiladi",
                    d: "Link bosilganda saytdagi aynan o'sha video ochiladi",
                  },
                ].map(({ n, t, d }) => (
                  <div
                    key={n}
                    className="text-center p-4 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.7)" }}
                  >
                    <div className="text-2xl mb-2">{n}</div>
                    <div
                      className="text-sm font-bold mb-1"
                      style={{ color: "#111827" }}
                    >
                      {t}
                    </div>
                    <div className="text-xs text-gray-400">{d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video linklarini ko'rish */}
            <div className="rounded-2xl overflow-hidden" style={card}>
              <div className="px-5 py-4 border-b border-green-50">
                <h3 className="font-black text-sm" style={{ color: "#111827" }}>
                  🎬 Video linklarini boshqarish
                </h3>
              </div>
              <div className="divide-y divide-green-50/50">
                {videoList.slice(0, 8).map((v) => {
                  const shareUrl = `https://taomuz.uz/video/${v.id}`;
                  return (
                    <div
                      key={v.id}
                      className="flex items-center gap-4 px-5 py-4"
                    >
                      <img
                        src={v.thumbnail}
                        onError={(e) =>
                          (e.currentTarget.src =
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=50&fit=crop")
                        }
                        className="w-16 h-10 rounded-lg object-cover flex-shrink-0"
                        alt=""
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-semibold line-clamp-1"
                          style={{ color: "#111827" }}
                        >
                          {v.title.uz}
                        </p>
                        <code className="text-xs text-gray-400 font-mono">
                          {shareUrl}
                        </code>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        {/* Ko'rish linkini nusxalash */}
                        <button
                          onClick={() => {
                            navigator.clipboard
                              ?.writeText(shareUrl)
                              .catch(() => {});
                            setShareNotif("Link nusxalandi! ✅");
                            setTimeout(() => setShareNotif(null), 2000);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
                          style={{
                            background: "rgba(59,130,246,0.1)",
                            color: "#3b82f6",
                          }}
                        >
                          <Copy size={11} /> Nusxa
                        </button>
                        {/* Telegram ulashish */}
                        <button
                          onClick={() =>
                            window.open(
                              `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(v.title.uz)}`,
                              `_blank`,
                            )
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
                          style={{
                            background: "rgba(0,136,204,0.1)",
                            color: "#0088cc",
                          }}
                        >
                          📨 Telegram
                        </button>
                        {/* WhatsApp */}
                        <button
                          onClick={() =>
                            window.open(
                              `https://wa.me/?text=${encodeURIComponent(v.title.uz + " " + shareUrl)}`,
                              `_blank`,
                            )
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
                          style={{
                            background: "rgba(37,211,102,0.1)",
                            color: "#25D366",
                          }}
                        >
                          💬 WhatsApp
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════
            10. FOYDALANUVCHILAR BOSHQARUVI
        ════════════════════════════════════════════ */}
        {page === "users" && (
          <div>
            <h1
              className="text-2xl font-black mb-1"
              style={{ color: "#111827" }}
            >
              👥 Foydalanuvchilar Boshqaruvi
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              {users.length} ta ro'yxatdan o'tgan foydalanuvchi
            </p>

            {/* Statistika kartalar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                {
                  label: "Jami users",
                  val: users.length,
                  color: "#3b82f6",
                  bg: "rgba(59,130,246,0.1)",
                  icon: Users,
                },
                {
                  label: "Faol users",
                  val: users.filter((u) => u.status === "active").length,
                  color: G,
                  bg: "rgba(29,185,84,0.1)",
                  icon: UserCheck,
                },
                {
                  label: "Bloklangan",
                  val: users.filter((u) => u.status === "blocked").length,
                  color: "#ef4444",
                  bg: "rgba(239,68,68,0.1)",
                  icon: UserX,
                },
                {
                  label: "Google orqali",
                  val: users.filter((u) => u.method === "google").length,
                  color: "#f59e0b",
                  bg: "rgba(245,158,11,0.1)",
                  icon: Globe,
                },
              ].map(({ label, val, color, bg, icon: Icon }) => (
                <div key={label} className="p-4 rounded-2xl" style={card}>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
                    style={{ background: bg }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div
                    className="text-xl font-black"
                    style={{ color: "#111827" }}
                  >
                    {val}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Filter va qidiruv */}
            <div className="flex gap-3 mb-4 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: G }}
                />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Ism yoki email qidirish..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{
                    background: "white",
                    border: "1.5px solid rgba(21,128,61,0.2)",
                    color: "#111827",
                  }}
                />
              </div>
              {(
                [
                  ["all", "Barchasi"],
                  ["active", "Faol"],
                  ["blocked", "Bloklangan"],
                ] as const
              ).map(([f, l]) => (
                <button
                  key={f}
                  onClick={() => setUserFilter(f)}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold"
                  style={{
                    background: userFilter === f ? G : "rgba(0,0,0,0.05)",
                    color: userFilter === f ? "#fff" : "#6b7280",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Users jadval */}
            <div className="rounded-2xl overflow-hidden" style={card}>
              <table className="w-full">
                <thead>
                  <tr
                    style={{
                      background: "#f0fdf4",
                      borderBottom: "1px solid rgba(21,128,61,0.1)",
                    }}
                  >
                    {[
                      "Foydalanuvchi",
                      "Kirish usuli",
                      "Telefon",
                      "Ro'yxat sanasi",
                      "So'nggi kirish",
                      "Ko'rishlar",
                      "Holat",
                      "Amallar",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs font-bold uppercase"
                        style={{ color: "#6b7280", letterSpacing: "0.05em" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((u) =>
                      userFilter === "all" ? true : u.status === userFilter,
                    )
                    .filter(
                      (u) =>
                        !userSearch ||
                        u.name
                          .toLowerCase()
                          .includes(userSearch.toLowerCase()) ||
                        u.email
                          .toLowerCase()
                          .includes(userSearch.toLowerCase()),
                    )
                    .map((u, i) => (
                      <tr
                        key={u.id}
                        style={{
                          borderBottom:
                            i < users.length - 1
                              ? "1px solid rgba(0,0,0,0.04)"
                              : "none",
                        }}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={u.avatar}
                              className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                              alt=""
                            />
                            <div>
                              <p
                                className="text-sm font-semibold"
                                style={{ color: "#111827" }}
                              >
                                {u.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                {u.email || "—"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="flex items-center gap-1.5 text-xs font-bold"
                            style={{
                              color:
                                u.method === "google" ? "#ea4335" : "#25D366",
                            }}
                          >
                            {u.method === "google" ? "🔵 Google" : "📱 Telefon"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500 font-mono">
                          {u.phone}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-400">
                          {u.joined}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-400">
                          {u.lastSeen}
                        </td>
                        <td
                          className="px-4 py-3 text-xs font-bold"
                          style={{ color: G }}
                        >
                          {u.views}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-[10px] font-bold px-2 py-1 rounded-full ${u.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                          >
                            {u.status === "active"
                              ? "✅ Faol"
                              : "🚫 Bloklangan"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button
                              onClick={() =>
                                setUsers((p) =>
                                  p.map((x) =>
                                    x.id === u.id
                                      ? {
                                          ...x,
                                          status:
                                            x.status === "active"
                                              ? "blocked"
                                              : "active",
                                        }
                                      : x,
                                  ),
                                )
                              }
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                              style={{
                                background:
                                  u.status === "active"
                                    ? "rgba(239,68,68,0.08)"
                                    : "rgba(29,185,84,0.08)",
                                color: u.status === "active" ? "#ef4444" : G,
                              }}
                            >
                              {u.status === "active" ? (
                                <>
                                  <Ban size={11} /> Blok
                                </>
                              ) : (
                                <>
                                  <UserCheck size={11} /> Faol
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════
            11. SOZLAMALAR — TO'LIQ
        ════════════════════════════════════════════ */}
        {page === "settings" && (
          <div>
            <h1
              className="text-2xl font-black mb-1"
              style={{ color: "#111827" }}
            >
              ⚙️ Sozlamalar
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              Super Admin panel sozlamalari
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* ── Sayt umumiy sozlamalari */}
              <div className="p-5 rounded-2xl" style={card}>
                <h3
                  className="font-black text-sm mb-4 flex items-center gap-2"
                  style={{ color: "#111827" }}
                >
                  <Globe size={15} style={{ color: G }} /> Sayt Umumiy
                  Sozlamalari
                </h3>
                <div className="space-y-3">
                  <div>
                    <label style={lbl}>Sayt nomi</label>
                    <input
                      type="text"
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      style={inp}
                    />
                  </div>
                  <div>
                    <label style={lbl}>Sayt tavsifi</label>
                    <textarea
                      value={siteDesc}
                      onChange={(e) => setSiteDesc(e.target.value)}
                      rows={2}
                      style={{ ...inp, resize: "none" } as React.CSSProperties}
                    />
                  </div>
                  <div>
                    <label style={lbl}>Default til</label>
                    <select
                      value={defaultLang}
                      onChange={(e) => setDefaultLang(e.target.value)}
                      style={{ ...inp, cursor: "pointer" }}
                    >
                      <option value="uz">🇺🇿 O'zbek</option>
                      <option value="ru">🇷🇺 Русский</option>
                      <option value="en">🇬🇧 English</option>
                    </select>
                  </div>
                  <button
                    onClick={() => toast("Sayt sozlamalari saqlandi ✅")}
                    className="w-full py-2.5 rounded-xl font-bold text-white text-sm"
                    style={{
                      background: `linear-gradient(135deg,${G},#15803d)`,
                    }}
                  >
                    Saqlash
                  </button>
                </div>
              </div>

              {/* ── Parol o'zgartirish */}
              <div className="p-5 rounded-2xl" style={card}>
                <h3
                  className="font-black text-sm mb-4 flex items-center gap-2"
                  style={{ color: "#111827" }}
                >
                  <Key size={15} style={{ color: "#f59e0b" }} /> Parol
                  O'zgartirish
                </h3>
                <div className="space-y-3">
                  <div>
                    <label style={lbl}>Eski parol</label>
                    <input
                      type="password"
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                      placeholder="••••••••"
                      style={inp}
                    />
                  </div>
                  <div>
                    <label style={lbl}>Yangi parol</label>
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="••••••••"
                      style={inp}
                    />
                  </div>
                  <div>
                    <label style={lbl}>Yangi parolni tasdiqlang</label>
                    <input
                      type="password"
                      value={newPass2}
                      onChange={(e) => setNewPass2(e.target.value)}
                      placeholder="••••••••"
                      style={{
                        ...inp,
                        borderColor:
                          newPass2 && newPass !== newPass2
                            ? "#ef4444"
                            : "rgba(21,128,61,0.18)",
                      }}
                    />
                    {newPass2 && newPass !== newPass2 && (
                      <p className="text-xs text-red-500 mt-1">
                        ⚠ Parollar mos emas!
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (!oldPass) {
                        toast("Eski parolni kiriting!", false);
                        return;
                      }
                      if (newPass !== newPass2) {
                        toast("Yangi parollar mos emas!", false);
                        return;
                      }
                      if (newPass.length < 6) {
                        toast("Parol kamida 6 ta belgi!", false);
                        return;
                      }
                      setOldPass("");
                      setNewPass("");
                      setNewPass2("");
                      toast("Parol muvaffaqiyatli o'zgartirildi ✅");
                    }}
                    className="w-full py-2.5 rounded-xl font-bold text-white text-sm"
                    style={{
                      background: "linear-gradient(135deg,#f59e0b,#d97706)",
                    }}
                  >
                    Parolni O'zgartirish
                  </button>
                </div>
              </div>

              {/* ── Xavfsizlik sozlamalari */}
              <div className="p-5 rounded-2xl" style={card}>
                <h3
                  className="font-black text-sm mb-4 flex items-center gap-2"
                  style={{ color: "#111827" }}
                >
                  <Shield size={15} style={{ color: "#8b5cf6" }} /> Xavfsizlik
                  Sozlamalari
                </h3>
                <div className="space-y-3">
                  {/* 2FA */}
                  <div
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{
                      background: "rgba(139,92,246,0.04)",
                      border: "1px solid rgba(139,92,246,0.12)",
                    }}
                  >
                    <div>
                      <p
                        className="text-sm font-bold"
                        style={{ color: "#111827" }}
                      >
                        🔐 2 bosqichli autentifikatsiya (2FA)
                      </p>
                      <p className="text-xs text-gray-400">
                        SMS orqali tasdiqlash kodi
                      </p>
                    </div>
                    <div
                      onClick={() => setTwoFA(!twoFA)}
                      style={{
                        width: 46,
                        height: 25,
                        borderRadius: 99,
                        cursor: "pointer",
                        background: twoFA ? "#8b5cf6" : "#d1d5db",
                        position: "relative",
                        transition: "all 0.25s",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 3,
                          width: 19,
                          height: 19,
                          borderRadius: "50%",
                          background: "#fff",
                          boxShadow: "0 1px 5px rgba(0,0,0,0.2)",
                          left: twoFA ? 24 : 3,
                          transition: "left 0.25s",
                        }}
                      />
                    </div>
                  </div>

                  {/* Login loglari */}
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background: "rgba(0,0,0,0.02)",
                      border: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <p
                      className="text-sm font-bold mb-2"
                      style={{ color: "#111827" }}
                    >
                      📋 Oxirgi login harakatlari
                    </p>
                    {[
                      { ip: "192.168.1.1", time: "Bugun 09:15", ok: true },
                      { ip: "87.249.30.41", time: "Kecha 22:40", ok: true },
                      { ip: "185.220.101.5", time: "3 kun oldin", ok: false },
                    ].map((l, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${l.ok ? "bg-green-400" : "bg-red-400"}`}
                          />
                          <code className="text-xs text-gray-600">{l.ip}</code>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">
                            {l.time}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${l.ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                          >
                            {l.ok ? "✅" : "❌"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* IP nazorat */}
                  <div>
                    <label style={lbl}>IP ruxsat ro'yxati (ixtiyoriy)</label>
                    <input
                      type="text"
                      placeholder="192.168.1.1, 87.249.0.0/16"
                      style={inp}
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Bo'sh qoldirsangiz — barcha IP lar ruxsatli
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Komment sozlamalari */}
              <div className="p-5 rounded-2xl" style={card}>
                <h3
                  className="font-black text-sm mb-4 flex items-center gap-2"
                  style={{ color: "#111827" }}
                >
                  <MessageSquare size={15} style={{ color: "#3b82f6" }} />{" "}
                  Kommentariya Sozlamalari
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "Kommentariyalarni yoqish",
                      sub: "Foydalanuvchilar komment yoza oladi",
                      state: commentsOn,
                      set: setCommentsOn,
                      color: G,
                    },
                    {
                      label: "Spam filtri",
                      sub: "Avtomatik spam aniqlash va bloklash",
                      state: spamFilter,
                      set: setSpamFilter,
                      color: "#f59e0b",
                    },
                    {
                      label: "Admin tasdiqlash",
                      sub: "Har bir komment admin roziligini kutadi",
                      state: adminApprove,
                      set: setAdminApprove,
                      color: "#8b5cf6",
                    },
                  ].map(({ label, sub, state, set, color }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between p-3 rounded-xl"
                      style={{
                        background: "rgba(0,0,0,0.02)",
                        border: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      <div>
                        <p
                          className="text-sm font-bold"
                          style={{ color: "#111827" }}
                        >
                          {label}
                        </p>
                        <p className="text-xs text-gray-400">{sub}</p>
                      </div>
                      <div
                        onClick={() => set(!state)}
                        style={{
                          width: 46,
                          height: 25,
                          borderRadius: 99,
                          cursor: "pointer",
                          background: state ? color : "#d1d5db",
                          position: "relative",
                          transition: "all 0.25s",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 3,
                            width: 19,
                            height: 19,
                            borderRadius: "50%",
                            background: "#fff",
                            boxShadow: "0 1px 5px rgba(0,0,0,0.2)",
                            left: state ? 24 : 3,
                            transition: "left 0.25s",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Media sozlamalari */}
              <div className="p-5 rounded-2xl" style={card}>
                <h3
                  className="font-black text-sm mb-4 flex items-center gap-2"
                  style={{ color: "#111827" }}
                >
                  <Img size={15} style={{ color: "#ef4444" }} /> Media
                  Sozlamalari
                </h3>
                <div className="space-y-3">
                  <div>
                    <label style={lbl}>Maksimal thumbnail hajmi (MB)</label>
                    <input
                      type="number"
                      value={maxThumb}
                      onChange={(e) => setMaxThumb(e.target.value)}
                      style={inp}
                    />
                  </div>
                  <div>
                    <label style={lbl}>Ruxsat etilgan formatlar</label>
                    <input
                      type="text"
                      value={allowedFmt}
                      onChange={(e) => setAllowedFmt(e.target.value)}
                      style={inp}
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Vergul bilan ajrating: jpg,png,webp
                    </p>
                  </div>
                  <button
                    onClick={() => toast("Media sozlamalari saqlandi ✅")}
                    className="w-full py-2.5 rounded-xl font-bold text-white text-sm"
                    style={{
                      background: "linear-gradient(135deg,#ef4444,#dc2626)",
                    }}
                  >
                    Saqlash
                  </button>
                </div>
              </div>

              {/* ── Backup tizimi */}
              <div className="p-5 rounded-2xl" style={card}>
                <h3
                  className="font-black text-sm mb-4 flex items-center gap-2"
                  style={{ color: "#111827" }}
                >
                  <Database size={15} style={{ color: "#10b981" }} /> Backup
                  Tizimi
                </h3>
                <div className="space-y-3">
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background: "rgba(16,185,129,0.05)",
                      border: "1px solid rgba(16,185,129,0.15)",
                    }}
                  >
                    <p
                      className="text-xs font-bold mb-2"
                      style={{ color: "#059669" }}
                    >
                      📅 Oxirgi backup vaqtlari
                    </p>
                    {[
                      {
                        t: "Database backup",
                        d: "Bugun 03:00",
                        size: "2.4 MB",
                      },
                      {
                        t: "Video metadata backup",
                        d: "Kecha 03:00",
                        size: "456 KB",
                      },
                      {
                        t: "Foydalanuvchi ma'lumotlari",
                        d: "2 kun oldin 03:00",
                        size: "128 KB",
                      },
                    ].map(({ t, d, size }) => (
                      <div
                        key={t}
                        className="flex items-center justify-between py-2 border-b border-green-50 last:border-0"
                      >
                        <div>
                          <p
                            className="text-xs font-semibold"
                            style={{ color: "#111827" }}
                          >
                            {t}
                          </p>
                          <p className="text-xs text-gray-400">
                            {d} · {size}
                          </p>
                        </div>
                        <button
                          onClick={() => toast(`${t} yuklab olindi ✅`)}
                          className="text-[10px] font-bold px-2.5 py-1 rounded-lg"
                          style={{
                            background: "rgba(16,185,129,0.1)",
                            color: "#059669",
                          }}
                        >
                          ⬇ Yuklab olish
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => toast("Backup yaratilmoqda... ⏳")}
                    className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                    style={{
                      background: "rgba(16,185,129,0.1)",
                      color: "#059669",
                      border: "1.5px solid rgba(16,185,129,0.2)",
                    }}
                  >
                    <Database size={14} /> Hoziroq Backup Yaratish
                  </button>
                </div>
              </div>

              {/* ── Statistika */}
              <div className="p-5 rounded-2xl" style={card}>
                <h3
                  className="font-black text-sm mb-4 flex items-center gap-2"
                  style={{ color: "#111827" }}
                >
                  <Activity size={15} style={{ color: G }} /> Sayt Statistikasi
                </h3>
                {[
                  ["Jami videolar", videoList.length],
                  ["Jami taomlar", recipeList.length],
                  ["Jami ko'rishlar", `${(totalViews / 1000).toFixed(1)}K`],
                  ["Kategoriyalar", categories.length],
                  ["Foydalanuvchilar", users.length],
                  [
                    "Faol foydalanuvchilar",
                    users.filter((u) => u.status === "active").length,
                  ],
                  ["Jami kommentariyalar", comments.length],
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

              {/* Chiqish */}
              <div className="lg:col-span-2">
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
                  🚪 Admin paneldan chiqish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ════ TAOMLAR ════ */}
        {page === "recipes" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-black" style={{ color: "#111827" }}>
                🍽️ Taomlar
              </h1>
              <button
                onClick={() => {
                  setEditRecipeId(null);
                  setEditRecipeData(null);
                  setPage("add");
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: `linear-gradient(135deg,${G},#15803d)` }}
              >
                <Plus size={15} /> Taom Qo'shish
              </button>
            </div>
            <div style={{ ...card, overflow: "hidden" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr
                    style={{
                      background: "#f0fdf4",
                      borderBottom: "1px solid rgba(21,128,61,0.1)",
                    }}
                  >
                    {["Rasm", "Nomi", "Kategoriya", "Vaqt", "Amallar"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left px-4 py-3 text-xs font-bold uppercase"
                          style={{ color: "#6b7280", letterSpacing: "0.05em" }}
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {recipeList.map((r, i) => (
                    <tr
                      key={r.id}
                      style={{
                        borderBottom:
                          i < recipeList.length - 1
                            ? "1px solid rgba(0,0,0,0.04)"
                            : "none",
                      }}
                    >
                      <td className="px-4 py-3">
                        <img
                          src={r.image}
                          alt={r.name.uz}
                          className="w-12 h-10 rounded-lg object-cover"
                        />
                      </td>
                      <td
                        className="px-4 py-3 font-semibold"
                        style={{ color: "#111827" }}
                      >
                        {r.name.uz}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-bold"
                          style={{
                            background: "rgba(21,128,61,0.1)",
                            color: "#15803d",
                          }}
                        >
                          {
                            recipeCategoryList.find((c) => c.id === r.category)
                              ?.emoji
                          }{" "}
                          {recipeCategoryList.find((c) => c.id === r.category)
                            ?.uz || r.category}
                        </span>
                      </td>
                      <td
                        className="px-4 py-3 text-xs"
                        style={{ color: "#6b7280" }}
                      >
                        ⏱ {r.time} daq
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditRecipeId(r.id);
                              setEditRecipeData(r);
                              setPage("add");
                            }}
                            className="p-1.5 rounded-lg hover:bg-blue-50"
                            style={{ color: "#3b82f6" }}
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("O'chirilsinmi?")) {
                                deleteRecipe(r.id);
                                toast("Taom o'chirildi", true);
                              }
                            }}
                            className="p-1.5 rounded-lg hover:bg-red-50"
                            style={{ color: "#ef4444" }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {recipeList.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-12 text-center text-sm"
                        style={{ color: "#9ca3af" }}
                      >
                        Hech qanday taom yo'q
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ════ DELETE MODAL ════ */}
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

      {/* ════ KATEGORIYA MODAL (7) ════ */}
      {catModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="w-full max-w-md rounded-3xl p-6 bg-white">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black" style={{ color: "#111827" }}>
                {editCat ? "Kategoriya tahrirlash" : "Yangi kategoriya"}
              </h3>
              <button
                onClick={() => setCatModal(false)}
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "#f3f4f6" }}
              >
                <X size={15} style={{ color: "#6b7280" }} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label style={lbl}>Emoji</label>
                <input
                  type="text"
                  value={catForm.emoji}
                  onChange={(e) =>
                    setCatForm((p) => ({ ...p, emoji: e.target.value }))
                  }
                  placeholder="🍜"
                  style={inp}
                />
              </div>
              <div>
                <label style={lbl}>🇺🇿 O'zbekcha nomi</label>
                <input
                  type="text"
                  value={catForm.uz}
                  onChange={(e) =>
                    setCatForm((p) => ({ ...p, uz: e.target.value }))
                  }
                  placeholder="Nonushta"
                  style={inp}
                />
              </div>
              <div>
                <label style={lbl}>🇬🇧 English</label>
                <input
                  type="text"
                  value={catForm.en}
                  onChange={(e) =>
                    setCatForm((p) => ({ ...p, en: e.target.value }))
                  }
                  placeholder="Breakfast"
                  style={inp}
                />
              </div>
              <div>
                <label style={lbl}>🇷🇺 Ruscha</label>
                <input
                  type="text"
                  value={catForm.ru}
                  onChange={(e) =>
                    setCatForm((p) => ({ ...p, ru: e.target.value }))
                  }
                  placeholder="Завтрак"
                  style={inp}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setCatModal(false)}
                className="flex-1 py-3 rounded-xl font-bold text-sm"
                style={{ background: "#f3f4f6", color: "#374151" }}
              >
                Bekor
              </button>
              <button
                onClick={() => {
                  if (!catForm.uz.trim()) {
                    toast("Nomi majburiy!", false);
                    return;
                  }
                  if (editCat) {
                    setCategories((p) =>
                      p.map((c) =>
                        c.id === editCat.id ? { ...c, ...catForm } : c,
                      ),
                    );
                    toast("Kategoriya yangilandi ✅");
                  } else {
                    setCategories((p) => [
                      ...p,
                      {
                        id: `cat_${Date.now()}`,
                        uz: catForm.uz,
                        en: catForm.en,
                        ru: catForm.ru,
                        emoji: catForm.emoji || "🍽️",
                        active: true,
                      },
                    ]);
                    toast("Yangi kategoriya qo'shildi ✅");
                  }
                  setCatModal(false);
                }}
                className="flex-1 py-3 rounded-xl font-bold text-sm text-white"
                style={{ background: `linear-gradient(135deg,${G},#15803d)` }}
              >
                {editCat ? "Saqlash" : "Qo'shish"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════ EDIT VIDEO MODAL ════ */}
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
                <label style={lbl}>Qiyinlik</label>
                <select
                  value={editVideo.difficulty}
                  onChange={(e) =>
                    setEditVideo({
                      ...editVideo,
                      difficulty: e.target.value as "easy" | "medium" | "hard",
                    })
                  }
                  style={{ ...inp, cursor: "pointer" }}
                >
                  <option value="easy">Oson</option>
                  <option value="medium">O'rtacha</option>
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
                onClick={() => {
                  updateVideo(editVideo);
                  setEditVideo(null);
                  toast("Video yangilandi! ✅");
                }}
                className="flex-1 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg,${G},#15803d)` }}
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
