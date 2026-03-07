import { useState, useRef } from "react";
import {
  Youtube,
  Link,
  Image,
  Check,
  X,
  Globe,
  Tag,
  ChefHat,
  Clock,
  Flame,
  Star,
  Upload,
  Play,
  Languages,
  Loader2,
  AlertTriangle,
  Eye,
  EyeOff,
  Zap,
  FileImage,
  ExternalLink,
  RotateCcw,
  Volume2,
  Settings2,
  Info,
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
  ingredients: any[];
  steps: any[];
}

interface Props {
  addVideo: (v: VideoItem) => void;
  toast: (msg: string, ok?: boolean) => void;
  onDone: () => void;
}

const G = "#1DB954";

const card = {
  background: "#fff",
  border: "1px solid rgba(21,128,61,0.08)",
  borderRadius: 20,
  boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
} as React.CSSProperties;

const inp = (focused = false) =>
  ({
    width: "100%",
    padding: "12px 14px",
    borderRadius: 14,
    fontSize: 13,
    background: focused ? "rgba(29,185,84,0.06)" : "rgba(21,128,61,0.03)",
    border: `1.5px solid ${focused ? G : "rgba(21,128,61,0.15)"}`,
    color: "#111827",
    outline: "none",
    fontFamily: "'DM Sans',sans-serif",
    transition: "all 0.2s",
    boxSizing: "border-box" as const,
  }) as React.CSSProperties;

const lbl = {
  fontSize: 11,
  fontWeight: 700,
  color: "#6b7280",
  textTransform: "uppercase" as const,
  letterSpacing: "0.07em",
  display: "block",
  marginBottom: 7,
};

const VIDEO_CATS = [
  { id: "uzbek", l: "O'zbek taomlari", e: "🇺🇿" },
  { id: "world", l: "Jahon taomlari", e: "🌍" },
  { id: "quick", l: "Tez taomlar", e: "⚡" },
  { id: "healthy", l: "Sog'lom ovqat", e: "🥗" },
  { id: "dessert", l: "Shirinliklar", e: "🍰" },
  { id: "bbq", l: "Kabob & Gril", e: "🔥" },
  { id: "vegetarian", l: "Vegetarian", e: "🥦" },
  { id: "breakfast", l: "Nonushta", e: "☀️" },
  { id: "dinner", l: "Kechki ovqat", e: "🌙" },
  { id: "lunch", l: "Tushlik", e: "🌞" },
];

const SPEEDS = [0.5, 0.75, 1, 1.5, 2];

const CUISINES = [
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
];

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

// ─── Anthropic API orqali tarjima ───
async function autoTranslate(
  text: string,
  targetLang: "en" | "ru",
): Promise<string> {
  if (!text.trim()) return "";
  try {
    const langName = targetLang === "en" ? "English" : "Russian";
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: `Translate this Uzbek food/cooking text to ${langName}. Return ONLY the translation, no explanations:\n\n"${text}"`,
          },
        ],
      }),
    });
    const data = await response.json();
    if (data.content?.[0]?.text) {
      return data.content[0].text.trim().replace(/^["']|["']$/g, "");
    }
    return text;
  } catch {
    return text;
  }
}

// ─── Barcha tarjima ───
async function translateAll(
  uz: string,
  field: "title" | "desc",
): Promise<{ en: string; ru: string }> {
  const [en, ru] = await Promise.all([
    autoTranslate(uz, "en"),
    autoTranslate(uz, "ru"),
  ]);
  return { en, ru };
}

// ─── FocusInput wrapper ───
const FocusInput = ({
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  multiline = false,
  rows = 3,
}: {
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: any;
  multiline?: boolean;
  rows?: number;
}) => {
  const [focused, setFocused] = useState(false);
  const style = inp(focused);
  return (
    <div style={{ position: "relative" }}>
      {Icon && (
        <Icon
          size={14}
          style={{
            position: "absolute",
            left: 14,
            top: multiline ? 14 : "50%",
            transform: multiline ? "none" : "translateY(-50%)",
            color: focused ? G : "#9ca3af",
            transition: "color 0.2s",
          }}
        />
      )}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={
            {
              ...style,
              paddingLeft: Icon ? 40 : 14,
              resize: "none",
            } as React.CSSProperties
          }
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...style, paddingLeft: Icon ? 40 : 14 }}
        />
      )}
    </div>
  );
};

export default function VideoYuklash({ addVideo, toast, onDone }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Form state ──
  const [ytUrl, setYtUrl] = useState("");
  const [ytId, setYtId] = useState("");
  const [ytPreview, setYtPreview] = useState("");
  const [ytThumb, setYtThumb] = useState("");
  const [thumbMode, setThumbMode] = useState<"auto" | "link" | "file">("auto");
  const [thumbLink, setThumbLink] = useState("");
  const [thumbFile, setThumbFile] = useState<string | null>(null);
  const [thumbFileName, setThumbFileName] = useState("");

  // Title/desc state
  const [titleUz, setTitleUz] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleRu, setTitleRu] = useState("");
  const [descUz, setDescUz] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descRu, setDescRu] = useState("");

  // Translate loading state
  const [translatingTitle, setTranslatingTitle] = useState(false);
  const [translatingDesc, setTranslatingDesc] = useState(false);
  const [translatedTitle, setTranslatedTitle] = useState(false);
  const [translatedDesc, setTranslatedDesc] = useState(false);

  // Video info
  const [chef, setChef] = useState("");
  const [duration, setDuration] = useState("");
  const [cookTime, setCookTime] = useState("30");
  const [difficulty, setDifficulty] = useState("easy");
  const [cuisine, setCuisine] = useState("uzbek");
  const [category, setCategory] = useState("uzbek");
  const [calories, setCalories] = useState("");
  const [servings, setServings] = useState("4");
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);

  // Player speed
  const [speed, setSpeed] = useState(1);

  // UI
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── YouTube URL handler ──
  const handleYtUrl = (val: string) => {
    setYtUrl(val);
    const id = parseYoutubeId(val);
    if (id) {
      setYtId(id);
      setYtPreview(
        `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playbackRate=${speed}`,
      );
      setYtThumb(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
      setErrors((e) => ({ ...e, ytUrl: "" }));
    } else {
      setYtId("");
      setYtPreview("");
      setYtThumb("");
    }
  };

  // ── Thumbnail file upload ──
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast("Fayl hajmi 5MB dan oshmasin!", false);
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setThumbFile(ev.target?.result as string);
      setThumbFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  // ── Final thumbnail ──
  const finalThumb =
    thumbMode === "link" && thumbLink
      ? thumbLink
      : thumbMode === "file" && thumbFile
        ? thumbFile
        : ytThumb ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=640&h=360&fit=crop";

  // ── Auto translate title ──
  const handleTranslateTitle = async () => {
    if (!titleUz.trim()) {
      toast("Avval O'zbek sarlavha kiriting!", false);
      return;
    }
    setTranslatingTitle(true);
    try {
      const { en, ru } = await translateAll(titleUz, "title");
      setTitleEn(en);
      setTitleRu(ru);
      setTranslatedTitle(true);
      toast("Sarlavha tarjima qilindi! ✅");
    } catch {
      toast("Tarjima xatosi. Qayta urinib ko'ring.", false);
    }
    setTranslatingTitle(false);
  };

  // ── Auto translate desc ──
  const handleTranslateDesc = async () => {
    if (!descUz.trim()) {
      toast("Avval O'zbek tavsif kiriting!", false);
      return;
    }
    setTranslatingDesc(true);
    try {
      const { en, ru } = await translateAll(descUz, "desc");
      setDescEn(en);
      setDescRu(ru);
      setTranslatedDesc(true);
      toast("Tavsif tarjima qilindi! ✅");
    } catch {
      toast("Tarjima xatosi. Qayta urinib ko'ring.", false);
    }
    setTranslatingDesc(false);
  };

  // ── Validation ──
  const validate = () => {
    const e: Record<string, string> = {};
    if (!ytId) e.ytUrl = "YouTube URL to'g'ri emas!";
    if (!titleUz.trim()) e.titleUz = "O'zbek sarlavha majburiy!";
    if (!chef.trim()) e.chef = "Oshpaz nomi majburiy!";
    if (!duration.trim()) e.duration = "Davomiylik majburiy! (masalan: 15:30)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Save ──
  const handleSave = () => {
    if (!validate()) {
      toast("Majburiy maydonlarni to'ldiring!", false);
      return;
    }
    const v: VideoItem = {
      id: `v${Date.now()}`,
      title: { uz: titleUz, en: titleEn || titleUz, ru: titleRu || titleUz },
      description: { uz: descUz || "—", en: descEn || "—", ru: descRu || "—" },
      thumbnail: finalThumb,
      videoUrl: `https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`,
      duration,
      views: 0,
      cookTime: parseInt(cookTime) || 30,
      difficulty: difficulty as "easy" | "medium" | "hard",
      cuisine,
      category,
      chef,
      chefAvatar: "https://i.pravatar.cc/150?img=1",
      tags: tags ? tags.split(",").map((t) => t.trim()) : [category],
      publishedAt: new Date().toISOString().split("T")[0],
      calories: calories ? parseInt(calories) : undefined,
      servings: servings ? parseInt(servings) : 4,
      featured,
      ingredients: [],
      steps: [],
    };
    addVideo(v);
    toast("Video muvaffaqiyatli qo'shildi! ✅");
    onDone();
  };

  // ── Reset ──
  const handleReset = () => {
    setYtUrl("");
    setYtId("");
    setYtPreview("");
    setYtThumb("");
    setThumbMode("auto");
    setThumbLink("");
    setThumbFile(null);
    setThumbFileName("");
    setTitleUz("");
    setTitleEn("");
    setTitleRu("");
    setDescUz("");
    setDescEn("");
    setDescRu("");
    setChef("");
    setDuration("");
    setCookTime("30");
    setDifficulty("easy");
    setCuisine("uzbek");
    setCategory("uzbek");
    setCalories("");
    setServings("4");
    setTags("");
    setFeatured(false);
    setSpeed(1);
    setStep(1);
    setErrors({});
    setTranslatedTitle(false);
    setTranslatedDesc(false);
  };

  const diffColor = (d: string) =>
    d === "easy" ? G : d === "medium" ? "#f59e0b" : "#ef4444";

  // Step validity
  const step1Valid = !!ytId;
  const step2Valid = !!titleUz.trim();
  const step3Valid = !!chef.trim() && !!duration.trim();

  return (
    <div>
      {/* ── Header ── */}
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
            ➕ Yangi Video Qo'shish
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#9ca3af" }}>
            YouTube orqali video yuklanadi — server yuklanmaydi
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={handleReset}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 16px",
              borderRadius: 12,
              border: "1.5px solid rgba(0,0,0,0.08)",
              background: "#fff",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 700,
              color: "#6b7280",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ef4444";
              e.currentTarget.style.color = "#ef4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
              e.currentTarget.style.color = "#6b7280";
            }}
          >
            <RotateCcw size={13} /> Tozalash
          </button>
        </div>
      </div>

      {/* ── Step indicator ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 28,
          maxWidth: 500,
        }}
      >
        {[
          { n: 1, label: "YouTube", valid: step1Valid },
          { n: 2, label: "Sarlavha", valid: step2Valid },
          { n: 3, label: "Ma'lumot", valid: step3Valid },
        ].map(({ n, label, valid }, i) => (
          <div
            key={n}
            style={{
              display: "flex",
              alignItems: "center",
              flex: n < 3 ? 1 : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 5,
              }}
            >
              <div
                onClick={() => {
                  if (step > n) setStep(n);
                }}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  cursor: step > n ? "pointer" : "default",
                  background:
                    step > n
                      ? "linear-gradient(135deg,#1DB954,#15803d)"
                      : step === n
                        ? "#fff"
                        : "#f3f4f6",
                  border:
                    step === n ? `2px solid ${G}` : "2px solid transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: step > n ? "#fff" : step === n ? G : "#9ca3af",
                  fontWeight: 900,
                  fontSize: 14,
                  boxShadow:
                    step === n ? `0 0 0 4px rgba(29,185,84,0.15)` : "none",
                  transition: "all 0.3s",
                }}
              >
                {step > n ? <Check size={16} /> : n}
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: step >= n ? G : "#9ca3af",
                  whiteSpace: "nowrap",
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
                  margin: "0 6px",
                  marginBottom: 18,
                  background: step > n ? G : "#e5e7eb",
                  transition: "background 0.4s",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* ── Layout: left form + right preview ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* ════════════════════════════════
            LEFT: Form
        ════════════════════════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* ── STEP 1: YouTube ── */}
          <div style={{ ...card, padding: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 18,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#111827",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Youtube size={18} style={{ color: "#ff0000" }} />
                1. YouTube Video
              </h3>
              {ytId && (
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: 99,
                    background: "rgba(29,185,84,0.1)",
                    color: G,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  ✅ Video topildi
                </span>
              )}
            </div>

            {/* YouTube URL input */}
            <div style={{ marginBottom: errors.ytUrl ? 4 : 16 }}>
              <label style={lbl}>YouTube URL yoki Video ID *</label>
              <div style={{ position: "relative" }}>
                <Youtube
                  size={14}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: ytId ? G : "#9ca3af",
                  }}
                />
                <input
                  type="text"
                  value={ytUrl}
                  onChange={(e) => handleYtUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=... yoki Video ID"
                  style={{
                    ...inp(!!ytId),
                    paddingLeft: 42,
                    borderColor: errors.ytUrl
                      ? "#ef4444"
                      : ytId
                        ? G
                        : "rgba(21,128,61,0.15)",
                  }}
                />
                {ytUrl && (
                  <button
                    onClick={() => {
                      setYtUrl("");
                      setYtId("");
                      setYtPreview("");
                      setYtThumb("");
                    }}
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
                    <X size={15} />
                  </button>
                )}
              </div>
              {errors.ytUrl && (
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 11,
                    color: "#ef4444",
                    fontWeight: 600,
                  }}
                >
                  ⚠ {errors.ytUrl}
                </p>
              )}
              {ytId && (
                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: 12,
                    color: G,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Check size={12} /> Video ID:{" "}
                  <code
                    style={{
                      background: "rgba(29,185,84,0.1)",
                      padding: "1px 6px",
                      borderRadius: 6,
                    }}
                  >
                    {ytId}
                  </code>
                </p>
              )}
            </div>

            {/* Jarayon banner */}
            <div
              style={{
                display: "flex",
                gap: 0,
                marginBottom: 16,
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid rgba(29,185,84,0.1)",
              }}
            >
              {[
                { n: "1️⃣", t: "YouTube ga yuklang" },
                { n: "2️⃣", t: "Linkni nusxalang" },
                { n: "3️⃣", t: "Bu yerga qo'ying" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    background: "rgba(29,185,84,0.03)",
                    borderRight:
                      i < 2 ? "1px solid rgba(29,185,84,0.1)" : "none",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 18, marginBottom: 2 }}>{s.n}</div>
                  <div
                    style={{ fontSize: 10, fontWeight: 700, color: "#6b7280" }}
                  >
                    {s.t}
                  </div>
                </div>
              ))}
            </div>

            {/* Thumbnail section */}
            <div
              style={{
                borderTop: "1px solid rgba(0,0,0,0.06)",
                paddingTop: 18,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <label style={{ ...lbl, marginBottom: 0 }}>
                  🖼️ Thumbnail (Abloshka)
                </label>
                <div style={{ display: "flex", gap: 6 }}>
                  {(["auto", "link", "file"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setThumbMode(m)}
                      style={{
                        padding: "4px 12px",
                        borderRadius: 99,
                        border: "none",
                        cursor: "pointer",
                        fontSize: 11,
                        fontWeight: 700,
                        transition: "all 0.2s",
                        background: thumbMode === m ? G : "rgba(0,0,0,0.06)",
                        color: thumbMode === m ? "#fff" : "#6b7280",
                        boxShadow:
                          thumbMode === m
                            ? "0 3px 10px rgba(29,185,84,0.3)"
                            : "none",
                      }}
                    >
                      {m === "auto"
                        ? "🤖 Auto"
                        : m === "link"
                          ? "🔗 Link"
                          : "📁 Fayl"}
                    </button>
                  ))}
                </div>
              </div>

              {thumbMode === "auto" && (
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: 14,
                    background: "rgba(29,185,84,0.04)",
                    border: "1px solid rgba(29,185,84,0.1)",
                    fontSize: 13,
                    color: "#374151",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Zap size={15} style={{ color: G, flexShrink: 0 }} />
                  <span>
                    YouTube thumbnailidan <strong>avtomatik</strong> olinadi.
                    URL kiritganingizda ko'rinadi.
                  </span>
                </div>
              )}

              {thumbMode === "link" && (
                <div>
                  <FocusInput
                    value={thumbLink}
                    onChange={setThumbLink}
                    placeholder="https://example.com/rasm.jpg"
                    icon={Link}
                  />
                  {thumbLink && (
                    <div
                      style={{
                        marginTop: 10,
                        borderRadius: 12,
                        overflow: "hidden",
                        height: 80,
                      }}
                    >
                      <img
                        src={thumbLink}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=225&fit=crop";
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        alt="preview"
                      />
                    </div>
                  )}
                </div>
              )}

              {thumbMode === "file" && (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: "2px dashed rgba(29,185,84,0.3)",
                      borderRadius: 14,
                      padding: 24,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      background: thumbFile
                        ? "rgba(29,185,84,0.04)"
                        : "rgba(29,185,84,0.02)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = G;
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(29,185,84,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(29,185,84,0.3)";
                      (e.currentTarget as HTMLElement).style.background =
                        thumbFile
                          ? "rgba(29,185,84,0.04)"
                          : "rgba(29,185,84,0.02)";
                    }}
                  >
                    {thumbFile ? (
                      <div>
                        <img
                          src={thumbFile}
                          style={{
                            width: "100%",
                            height: 100,
                            objectFit: "cover",
                            borderRadius: 10,
                            marginBottom: 8,
                          }}
                          alt="uploaded"
                        />
                        <p
                          style={{
                            margin: 0,
                            fontSize: 12,
                            color: G,
                            fontWeight: 700,
                          }}
                        >
                          ✅ {thumbFileName}
                        </p>
                        <p
                          style={{
                            margin: "4px 0 0",
                            fontSize: 11,
                            color: "#9ca3af",
                          }}
                        >
                          O'zgartirish uchun bosing
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 14,
                            background: "rgba(29,185,84,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 10px",
                          }}
                        >
                          <Upload size={20} style={{ color: G }} />
                        </div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#374151",
                          }}
                        >
                          Telefon/Kompyuterdan yuklash
                        </p>
                        <p
                          style={{
                            margin: "4px 0 0",
                            fontSize: 11,
                            color: "#9ca3af",
                          }}
                        >
                          JPG, PNG, WebP — max 5MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Video speed settings */}
            <div
              style={{
                borderTop: "1px solid rgba(0,0,0,0.06)",
                paddingTop: 18,
                marginTop: 18,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <Settings2 size={14} style={{ color: G }} />
                <label style={{ ...lbl, marginBottom: 0 }}>
                  Player Tezlik Sozlamasi
                </label>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {SPEEDS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    style={{
                      flex: 1,
                      padding: "8px 4px",
                      borderRadius: 12,
                      border: "none",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 800,
                      transition: "all 0.2s",
                      background:
                        speed === s
                          ? "linear-gradient(135deg,#1DB954,#15803d)"
                          : "rgba(0,0,0,0.05)",
                      color: speed === s ? "#fff" : "#374151",
                      boxShadow:
                        speed === s ? "0 4px 12px rgba(29,185,84,0.3)" : "none",
                      transform: speed === s ? "translateY(-1px)" : "none",
                    }}
                  >
                    {s === 1 ? "1x ✓" : `${s}x`}
                  </button>
                ))}
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 11, color: "#9ca3af" }}>
                Default: 1x — saytda foydalanuvchilar o'zlari o'zgartira oladi
              </p>
            </div>
          </div>

          {/* ── STEP 2: Sarlavha + Avtomatik Tarjima ── */}
          <div style={{ ...card, padding: 24 }}>
            <h3
              style={{
                margin: "0 0 18px",
                fontSize: 15,
                fontWeight: 800,
                color: "#111827",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Globe size={16} style={{ color: G }} />
              2. Sarlavha va Tavsif
            </h3>

            {/* Title UZ */}
            <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 7,
                }}
              >
                <label style={{ ...lbl, marginBottom: 0 }}>
                  🇺🇿 O'zbek sarlavha *
                </label>
                {titleUz && (
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>
                    {titleUz.length} ta belgi
                  </span>
                )}
              </div>
              <FocusInput
                value={titleUz}
                onChange={(v) => {
                  setTitleUz(v);
                  setTranslatedTitle(false);
                  setErrors((e) => ({ ...e, titleUz: "" }));
                }}
                placeholder="Osh (Palov) tayyorlash usuli"
              />
              {errors.titleUz && (
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 11,
                    color: "#ef4444",
                    fontWeight: 600,
                  }}
                >
                  ⚠ {errors.titleUz}
                </p>
              )}
            </div>

            {/* Translate title button */}
            <button
              onClick={handleTranslateTitle}
              disabled={translatingTitle || !titleUz.trim()}
              style={{
                width: "100%",
                padding: "11px",
                borderRadius: 14,
                border: "none",
                cursor:
                  translatingTitle || !titleUz.trim()
                    ? "not-allowed"
                    : "pointer",
                background: translatingTitle
                  ? "rgba(29,185,84,0.2)"
                  : translatedTitle
                    ? "rgba(29,185,84,0.08)"
                    : "linear-gradient(135deg,rgba(29,185,84,0.15),rgba(29,185,84,0.08))",
                border: `1px solid ${translatedTitle ? G : "rgba(29,185,84,0.2)"}`,
                color: translatingTitle || !titleUz.trim() ? "#9ca3af" : G,
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "all 0.2s",
              }}
            >
              {translatingTitle ? (
                <>
                  <Loader2
                    size={15}
                    style={{ animation: "spin 0.8s linear infinite" }}
                  />{" "}
                  AI tarjima qilmoqda...
                </>
              ) : translatedTitle ? (
                <>
                  <Check size={15} /> Sarlavha tarjima qilindi — qayta qilish
                </>
              ) : (
                <>
                  <Languages size={15} /> 🤖 AI: UZ → EN + RU avtomatik tarjima
                </>
              )}
            </button>

            {/* Title EN / RU */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <div>
                <label style={lbl}>🇬🇧 Inglizcha</label>
                <FocusInput
                  value={titleEn}
                  onChange={setTitleEn}
                  placeholder="How to cook Uzbek Plov"
                />
              </div>
              <div>
                <label style={lbl}>🇷🇺 Ruscha</label>
                <FocusInput
                  value={titleRu}
                  onChange={setTitleRu}
                  placeholder="Как приготовить плов"
                />
              </div>
            </div>

            {/* Desc UZ */}
            <div
              style={{
                borderTop: "1px solid rgba(0,0,0,0.06)",
                paddingTop: 18,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 7,
                }}
              >
                <label style={{ ...lbl, marginBottom: 0 }}>
                  🇺🇿 O'zbek tavsif
                </label>
              </div>
              <FocusInput
                value={descUz}
                onChange={(v) => {
                  setDescUz(v);
                  setTranslatedDesc(false);
                }}
                placeholder="Video haqida qisqacha tavsif..."
                multiline
                rows={3}
              />
            </div>

            {/* Translate desc button */}
            <button
              onClick={handleTranslateDesc}
              disabled={translatingDesc || !descUz.trim()}
              style={{
                width: "100%",
                padding: "11px",
                borderRadius: 14,
                border: "none",
                cursor:
                  translatingDesc || !descUz.trim() ? "not-allowed" : "pointer",
                background: translatingDesc
                  ? "rgba(59,130,246,0.2)"
                  : "linear-gradient(135deg,rgba(59,130,246,0.1),rgba(59,130,246,0.05))",
                border: `1px solid ${translatedDesc ? "#3b82f6" : "rgba(59,130,246,0.2)"}`,
                color:
                  translatingDesc || !descUz.trim() ? "#9ca3af" : "#3b82f6",
                fontSize: 13,
                fontWeight: 700,
                margin: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "all 0.2s",
              }}
            >
              {translatingDesc ? (
                <>
                  <Loader2
                    size={15}
                    style={{ animation: "spin 0.8s linear infinite" }}
                  />{" "}
                  AI tarjima qilmoqda...
                </>
              ) : translatedDesc ? (
                <>
                  <Check size={15} /> Tavsif tarjima qilindi — qayta qilish
                </>
              ) : (
                <>
                  <Languages size={15} /> 🤖 AI: Tavsif UZ → EN + RU
                </>
              )}
            </button>

            {/* Desc EN / RU */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              <div>
                <label style={lbl}>🇬🇧 Inglizcha tavsif</label>
                <FocusInput
                  value={descEn}
                  onChange={setDescEn}
                  placeholder="Short description..."
                  multiline
                  rows={2}
                />
              </div>
              <div>
                <label style={lbl}>🇷🇺 Ruscha tavsif</label>
                <FocusInput
                  value={descRu}
                  onChange={setDescRu}
                  placeholder="Краткое описание..."
                  multiline
                  rows={2}
                />
              </div>
            </div>

            {/* AI info banner */}
            <div
              style={{
                marginTop: 14,
                padding: "12px 16px",
                borderRadius: 14,
                background: "rgba(139,92,246,0.06)",
                border: "1px solid rgba(139,92,246,0.15)",
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
              }}
            >
              <Info
                size={14}
                style={{ color: "#8b5cf6", flexShrink: 0, marginTop: 1 }}
              />
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#7c3aed",
                  }}
                >
                  Tarjima tizimi
                </p>
                <p
                  style={{ margin: "3px 0 0", fontSize: 11, color: "#8b5cf6" }}
                >
                  Admin faqat O'zbek tilida yozadi — tizim avtomatik UZ→EN va
                  UZ→RU tarjima qiladi. Tarjimani qo'lda ham o'zgartirish
                  mumkin.
                </p>
              </div>
            </div>
          </div>

          {/* ── STEP 3: Video ma'lumotlari ── */}
          <div style={{ ...card, padding: 24 }}>
            <h3
              style={{
                margin: "0 0 18px",
                fontSize: 15,
                fontWeight: 800,
                color: "#111827",
              }}
            >
              ⚙️ 3. Video Ma'lumotlari
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <div>
                <label style={lbl}>👨‍🍳 Oshpaz nomi *</label>
                <FocusInput
                  value={chef}
                  onChange={(v) => {
                    setChef(v);
                    setErrors((e) => ({ ...e, chef: "" }));
                  }}
                  placeholder="Aziz Karimov"
                  icon={ChefHat}
                />
                {errors.chef && (
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 11,
                      color: "#ef4444",
                      fontWeight: 600,
                    }}
                  >
                    ⚠ {errors.chef}
                  </p>
                )}
              </div>

              <div>
                <label style={lbl}>⏱ Davomiylik * (15:30)</label>
                <FocusInput
                  value={duration}
                  onChange={(v) => {
                    setDuration(v);
                    setErrors((e) => ({ ...e, duration: "" }));
                  }}
                  placeholder="15:30"
                  icon={Clock}
                />
                {errors.duration && (
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 11,
                      color: "#ef4444",
                      fontWeight: 600,
                    }}
                  >
                    ⚠ {errors.duration}
                  </p>
                )}
              </div>

              <div>
                <label style={lbl}>🍳 Pishirish vaqti (min)</label>
                <FocusInput
                  type="number"
                  value={cookTime}
                  onChange={setCookTime}
                  placeholder="30"
                />
              </div>

              <div>
                <label style={lbl}>🔥 Kaloriya (kcal)</label>
                <FocusInput
                  type="number"
                  value={calories}
                  onChange={setCalories}
                  placeholder="450"
                />
              </div>

              <div>
                <label style={lbl}>📊 Qiyinlik darajasi</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  style={{ ...inp(), cursor: "pointer" }}
                >
                  <option value="easy">🟢 Oson</option>
                  <option value="medium">🟡 O'rtacha</option>
                  <option value="hard">🔴 Qiyin</option>
                </select>
                {difficulty && (
                  <div
                    style={{
                      marginTop: 6,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: diffColor(difficulty),
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: diffColor(difficulty),
                      }}
                    >
                      {difficulty === "easy"
                        ? "Oson — hamma qila oladi"
                        : difficulty === "medium"
                          ? "O'rtacha — biroz tajriba kerak"
                          : "Qiyin — tajribali oshpaz uchun"}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label style={lbl}>🍽️ Porsiyalar soni</label>
                <FocusInput
                  type="number"
                  value={servings}
                  onChange={setServings}
                  placeholder="4"
                />
              </div>

              <div>
                <label style={lbl}>🌍 Oshxona turi</label>
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  style={{ ...inp(), cursor: "pointer" }}
                >
                  {CUISINES.map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={lbl}>🏷️ Kategoriya</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ ...inp(), cursor: "pointer" }}
                >
                  {VIDEO_CATS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.e} {c.l}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ gridColumn: "1/-1" }}>
                <label style={lbl}>🔖 Teglar (vergul bilan)</label>
                <FocusInput
                  value={tags}
                  onChange={setTags}
                  placeholder="palov, osh, uzbek, rice"
                  icon={Tag}
                />
                {tags && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginTop: 8,
                    }}
                  >
                    {tags
                      .split(",")
                      .filter((t) => t.trim())
                      .map((t, i) => (
                        <span
                          key={i}
                          style={{
                            padding: "3px 10px",
                            borderRadius: 99,
                            fontSize: 11,
                            fontWeight: 700,
                            background: "rgba(29,185,84,0.1)",
                            color: G,
                          }}
                        >
                          #{t.trim()}
                        </span>
                      ))}
                  </div>
                )}
              </div>

              <div style={{ gridColumn: "1/-1" }}>
                <label
                  onClick={() => setFeatured(!featured)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    cursor: "pointer",
                    padding: "12px 16px",
                    borderRadius: 14,
                    background: featured
                      ? "rgba(29,185,84,0.06)"
                      : "rgba(0,0,0,0.03)",
                    border: `1.5px solid ${featured ? "rgba(29,185,84,0.3)" : "rgba(0,0,0,0.08)"}`,
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 24,
                      borderRadius: 99,
                      background: featured ? G : "#d1d5db",
                      position: "relative",
                      transition: "background 0.2s",
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
                        left: featured ? 23 : 3,
                        transition: "left 0.2s",
                      }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#374151",
                      }}
                    >
                      ⭐ Tanlangan (Featured) video
                    </div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>
                      Asosiy sahifada birinchi ko'rsatiladi
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* ── Save button ── */}
          <button
            onClick={handleSave}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: 18,
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg,#1DB954,#15803d)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 900,
              boxShadow: "0 8px 30px rgba(29,185,84,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(29,185,84,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 30px rgba(29,185,84,0.4)";
            }}
          >
            <Play size={20} /> Video Qo'shish
          </button>
        </div>

        {/* ════════════════════════════════
            RIGHT: Live Preview (sticky)
        ════════════════════════════════ */}
        <div style={{ position: "sticky", top: 20 }}>
          <div style={{ ...card, padding: 20, marginBottom: 16 }}>
            <h3
              style={{
                margin: "0 0 14px",
                fontSize: 14,
                fontWeight: 800,
                color: "#111827",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Eye size={15} style={{ color: G }} /> Live Ko'rinish
            </h3>

            {/* Video iframe preview */}
            <div
              style={{
                borderRadius: 14,
                overflow: "hidden",
                marginBottom: 12,
                aspectRatio: "16/9",
                background: "#0a0a0a",
              }}
            >
              {ytPreview ? (
                <iframe
                  src={`${ytPreview}&playbackRate=${speed}`}
                  style={{ width: "100%", height: "100%", border: "none" }}
                  allowFullScreen
                  title="video preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 18,
                      background: "rgba(255,255,255,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Youtube size={28} style={{ color: "#333" }} />
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      color: "#444",
                      fontWeight: 600,
                    }}
                  >
                    YouTube URL kiriting
                  </p>
                </div>
              )}
            </div>

            {/* Speed display */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
                padding: "8px 14px",
                borderRadius: 12,
                background: "rgba(29,185,84,0.04)",
                border: "1px solid rgba(29,185,84,0.1)",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Volume2 size={13} style={{ color: G }} /> Tezlik:
              </span>
              <div style={{ display: "flex", gap: 4 }}>
                {SPEEDS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    style={{
                      width: 36,
                      height: 24,
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      fontSize: 10,
                      fontWeight: 800,
                      background: speed === s ? G : "rgba(0,0,0,0.06)",
                      color: speed === s ? "#fff" : "#374151",
                      transition: "all 0.15s",
                    }}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

            {/* Thumbnail preview */}
            <div style={{ marginBottom: 12 }}>
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
                  src={finalThumb}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=225&fit=crop";
                  }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt="thumbnail preview"
                />
              </div>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 10,
                  color: "#9ca3af",
                  textAlign: "center",
                }}
              >
                {thumbMode === "auto"
                  ? "🤖 YouTube thumbnail"
                  : thumbMode === "link"
                    ? "🔗 Link thumbnail"
                    : "📁 Yuklangan rasm"}
              </p>
            </div>

            {/* Card preview */}
            <div
              style={{
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid rgba(29,185,84,0.1)",
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  background: "rgba(29,185,84,0.03)",
                }}
              >
                <p
                  style={{
                    margin: "0 0 3px",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#111827",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {titleUz || "Sarlavha kiriting..."}
                </p>
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: 11,
                    color: G,
                    fontWeight: 600,
                  }}
                >
                  {chef || "Oshpaz nomi"}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  {cookTime && (
                    <span
                      style={{
                        fontSize: 10,
                        color: "#9ca3af",
                        background: "rgba(0,0,0,0.05)",
                        padding: "2px 8px",
                        borderRadius: 99,
                      }}
                    >
                      ⏱ {cookTime} min
                    </span>
                  )}
                  {difficulty && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: 99,
                        background: diffColor(difficulty) + "18",
                        color: diffColor(difficulty),
                      }}
                    >
                      {difficulty === "easy"
                        ? "🟢 Oson"
                        : difficulty === "medium"
                          ? "🟡 O'rtacha"
                          : "🔴 Qiyin"}
                    </span>
                  )}
                  {featured && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: 99,
                        background: "rgba(245,158,11,0.12)",
                        color: "#f59e0b",
                      }}
                    >
                      ⭐ Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div style={{ ...card, padding: 18 }}>
            <h4
              style={{
                margin: "0 0 12px",
                fontSize: 13,
                fontWeight: 800,
                color: "#374151",
              }}
            >
              ✅ Tekshiruv ro'yxati
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "YouTube URL", done: !!ytId },
                { label: "O'zbek sarlavha", done: !!titleUz.trim() },
                { label: "Oshpaz nomi", done: !!chef.trim() },
                { label: "Davomiylik", done: !!duration.trim() },
                {
                  label: "Thumbnail",
                  done: !!(thumbMode === "auto"
                    ? ytThumb
                    : thumbMode === "link"
                      ? thumbLink
                      : thumbFile),
                },
                {
                  label: "Tarjima (EN/RU)",
                  done: translatedTitle || !!(titleEn && titleRu),
                },
              ].map(({ label, done }) => (
                <div
                  key={label}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 6,
                      background: done
                        ? "rgba(29,185,84,0.15)"
                        : "rgba(0,0,0,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {done ? (
                      <Check size={12} style={{ color: G }} />
                    ) : (
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#d1d5db",
                        }}
                      />
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: done ? "#374151" : "#9ca3af",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
