import { useState, useRef } from "react";
import {
  Youtube,
  Link as LinkIcon,
  Check,
  X,
  ChefHat,
  Clock,
  Upload,
  Languages,
  Loader2,
  RotateCcw,
  Volume2,
  Info,
  Eye,
  Plus,
  Trash2,
  MapPin,
  Utensils,
  Zap,
  Tag,
  Image as Img,
  Globe,
  Flag,
  Flame,
  Star,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Recipe, categoryList as recipeCategoryList } from "@/data/recipes";

// ══════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════
interface Ingredient {
  uz: string;
  en: string;
  ru: string;
  amount: string;
}
interface Step {
  uz: string;
  en: string;
  ru: string;
  time?: string;
}
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
  country?: string;
  mealTime?: string;
  foodType?: string;
  ingredients: Ingredient[];
  steps: Step[];
}
interface Props {
  addVideo: (v: VideoItem) => void;
  addRecipe: (r: Recipe) => void;
  updateRecipe: (r: Recipe) => void;
  editRecipeId?: string | null;
  editRecipeData?: any;
  toast: (msg: string, ok?: boolean) => void;
  onDone: () => void;
  onRecipeDone: () => void;
}

// ══════════════════════════════════════════════════════
// CONSTANTS
// ══════════════════════════════════════════════════════
const G = "#1DB954";
const SPEEDS = [0.5, 0.75, 1, 1.5, 2];

const COUNTRIES = [
  { v: "uzbekiston", f: "🇺🇿", l: "O'zbekiston" },
  { v: "turkiya", f: "🇹🇷", l: "Turkiya" },
  { v: "italiya", f: "🇮🇹", l: "Italiya" },
  { v: "fransiya", f: "🇫🇷", l: "Fransiya" },
  { v: "yaponiya", f: "🇯🇵", l: "Yaponiya" },
  { v: "koreya", f: "🇰🇷", l: "Koreya" },
  { v: "xitoy", f: "🇨🇳", l: "Xitoy" },
  { v: "hindiston", f: "🇮🇳", l: "Hindiston" },
  { v: "meksika", f: "🇲🇽", l: "Meksika" },
  { v: "aqsh", f: "🇺🇸", l: "AQSh" },
  { v: "rossiya", f: "🇷🇺", l: "Rossiya" },
  { v: "germaniya", f: "🇩🇪", l: "Germaniya" },
  { v: "ispaniya", f: "🇪🇸", l: "Ispaniya" },
  { v: "gretsiya", f: "🇬🇷", l: "Gretsiya" },
];

const MEAL_TIMES = [
  { id: "breakfast", e: "🌅", l: "Nonushta", desc: "07:00–10:00" },
  { id: "lunch", e: "☀️", l: "Tushlik", desc: "12:00–15:00" },
  { id: "dinner", e: "🌙", l: "Kechki ovqat", desc: "18:00–21:00" },
  { id: "anytime", e: "🍽️", l: "Istalgan vaqt", desc: "Har doim" },
];

const FOOD_TYPES = [
  { id: "sweet", e: "🍰", l: "Shirinlik" },
  { id: "meat", e: "🥩", l: "Go'shtli taom" },
  { id: "healthy", e: "🥗", l: "Sog'lom ovqat" },
  { id: "fast", e: "⚡", l: "Tez tayyor" },
  { id: "veg", e: "🥦", l: "Vegetarian" },
  { id: "soup", e: "🍲", l: "Sho'rva" },
  { id: "bread", e: "🥖", l: "Non" },
  { id: "salad", e: "🥙", l: "Salat" },
];

const VIDEO_CATS = [
  { id: "uzbek", l: "O'zbek", e: "🇺🇿" },
  { id: "world", l: "Jahon", e: "🌍" },
  { id: "quick", l: "Tez", e: "⚡" },
  { id: "healthy", l: "Sog'lom", e: "🥗" },
  { id: "dessert", l: "Shirinlik", e: "🍰" },
  { id: "bbq", l: "Kabob", e: "🔥" },
  { id: "vegetarian", l: "Vegetarian", e: "🥦" },
  { id: "breakfast", l: "Nonushta", e: "☀️" },
  { id: "dinner", l: "Kechki", e: "🌙" },
  { id: "lunch", l: "Tushlik", e: "🌞" },
];

// ══════════════════════════════════════════════════════
// STYLES
// ══════════════════════════════════════════════════════
const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid rgba(21,128,61,0.09)",
  borderRadius: 22,
  boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
};

function inpStyle(
  focused = false,
  error = false,
  disabled = false,
): React.CSSProperties {
  return {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 13,
    fontSize: 13,
    background: disabled
      ? "#f9fafb"
      : focused
        ? "rgba(29,185,84,0.04)"
        : "#fafafa",
    border: `1.5px solid ${error ? "#ef4444" : focused ? G : "rgba(21,128,61,0.15)"}`,
    color: disabled ? "#9ca3af" : "#111827",
    outline: "none",
    fontFamily: "'DM Sans',sans-serif",
    transition: "all 0.2s",
    boxSizing: "border-box" as const,
    cursor: disabled ? "not-allowed" : "text",
  };
}

const lbl: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: "#6b7280",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  display: "block",
  marginBottom: 7,
};

const diffColor = (d: string) =>
  d === "easy" ? G : d === "medium" ? "#f59e0b" : "#ef4444";
const diffLabel = (d: string) =>
  d === "easy"
    ? "Hamma qila oladi"
    : d === "medium"
      ? "Biroz tajriba kerak"
      : "Tajribali oshpaz uchun";

// ══════════════════════════════════════════════════════
// REUSABLE COMPONENTS
// ══════════════════════════════════════════════════════

function FInput({
  value,
  onChange,
  placeholder,
  icon: Icon,
  type = "text",
  multiline = false,
  rows = 3,
  error = false,
  disabled = false,
  suffix = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: any;
  type?: string;
  multiline?: boolean;
  rows?: number;
  error?: boolean;
  disabled?: boolean;
  suffix?: string;
}) {
  const [f, setF] = useState(false);
  const s = {
    ...inpStyle(f, error, disabled),
    paddingLeft: Icon ? 42 : 14,
    paddingRight: suffix ? 48 : 14,
  };
  return (
    <div style={{ position: "relative" }}>
      {Icon && (
        <Icon
          size={14}
          style={{
            position: "absolute",
            left: 14,
            top: multiline ? 15 : "50%",
            transform: multiline ? "none" : "translateY(-50%)",
            color: f ? G : "#9ca3af",
            transition: "color 0.2s",
            pointerEvents: "none",
          }}
        />
      )}
      {multiline ? (
        <textarea
          value={value}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setF(true)}
          onBlur={() => setF(false)}
          style={{ ...s, resize: "none" } as React.CSSProperties}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setF(true)}
          onBlur={() => setF(false)}
          style={s}
        />
      )}
      {suffix && (
        <span
          style={{
            position: "absolute",
            right: 14,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 11,
            fontWeight: 800,
            color: "#9ca3af",
          }}
        >
          {suffix}
        </span>
      )}
    </div>
  );
}

// Tarjima tugmasi — 3 holat: kutish / jarayon / tugadi
function TrBtn({
  loading,
  done,
  disabled,
  onClick,
  label,
}: {
  loading: boolean;
  done: boolean;
  disabled: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      style={{
        width: "100%",
        padding: "11px 16px",
        borderRadius: 12,
        cursor: loading || disabled ? "not-allowed" : "pointer",
        border: `1.5px solid ${done ? "rgba(29,185,84,0.4)" : disabled ? "rgba(0,0,0,0.08)" : "rgba(29,185,84,0.25)"}`,
        background: done
          ? "rgba(29,185,84,0.06)"
          : disabled
            ? "rgba(0,0,0,0.03)"
            : "rgba(29,185,84,0.05)",
        color: done ? G : disabled ? "#c4c4c4" : "#374151",
        fontSize: 13,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        transition: "all 0.2s",
      }}
    >
      {loading ? (
        <>
          <Loader2
            size={14}
            style={{ animation: "spin .7s linear infinite" }}
          />
          <span>AI tarjima qilmoqda...</span>
        </>
      ) : done ? (
        <>
          <CheckCircle2 size={14} style={{ color: G }} />
          <span style={{ color: G }}>
            Tarjima tayyor — qayta tarjima qilish
          </span>
        </>
      ) : (
        <>
          <Languages size={14} style={{ color: G }} />
          <span>
            {label || "🤖 AI tarjima: O'zbekcha → Inglizcha + Ruscha"}
          </span>
        </>
      )}
    </button>
  );
}

// Sarlavha blok
function SectionTitle({
  emoji,
  title,
  sub,
}: {
  emoji: string;
  title: string;
  sub?: string;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h3
        style={{
          margin: 0,
          fontSize: 15,
          fontWeight: 900,
          color: "#111827",
          display: "flex",
          alignItems: "center",
          gap: 9,
        }}
      >
        <span style={{ fontSize: 18 }}>{emoji}</span>
        {title}
      </h3>
      {sub && (
        <p
          style={{
            margin: "5px 0 0",
            fontSize: 12,
            color: "#9ca3af",
            paddingLeft: 27,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

// Til ko'rsatgichi badge
function LangBadge({ lang }: { lang: "uz" | "en" | "ru" }) {
  const map = {
    uz: { f: "🇺🇿", l: "O'zbek", c: "#1a7a3f" },
    en: { f: "🇬🇧", l: "English", c: "#2563eb" },
    ru: { f: "🇷🇺", l: "Русский", c: "#7c3aed" },
  };
  const { f, l, c } = map[lang];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 9px",
        borderRadius: 99,
        background: `rgba(0,0,0,0.05)`,
        fontSize: 10,
        fontWeight: 800,
        color: c,
      }}
    >
      {f} {l}
    </span>
  );
}

// AI tarjima qilingan matn ko'rsatgich
function TranslatedField({
  lang,
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 2,
  loading = false,
}: {
  lang: "en" | "ru";
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  loading?: boolean;
}) {
  const colors = { en: "#2563eb", ru: "#7c3aed" };
  const flags = { en: "🇬🇧", ru: "🇷🇺" };
  const labels = { en: "English", ru: "Русский" };
  const c = colors[lang];
  return (
    <div
      style={{
        borderRadius: 13,
        border: `1.5px solid ${value ? "rgba(" + (lang === "en" ? "37,99,235" : "124,58,237") + ",0.2)" : "rgba(0,0,0,0.08)"}`,
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "7px 12px",
          background: value
            ? `rgba(${lang === "en" ? "37,99,235" : "124,58,237"},0.04)`
            : "#fafafa",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: value ? c : "#9ca3af",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          {flags[lang]} {labels[lang]}
        </span>
        {loading && (
          <Loader2
            size={11}
            style={{ color: c, animation: "spin .7s linear infinite" }}
          />
        )}
        {!loading && value && <CheckCircle2 size={11} style={{ color: c }} />}
        {!loading && !value && (
          <span style={{ fontSize: 10, color: "#c4c4c4" }}>
            Tarjima kutilmoqda
          </span>
        )}
      </div>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || `${labels[lang]} tarjimasi...`}
          rows={rows}
          style={
            {
              width: "100%",
              padding: "10px 12px",
              border: "none",
              outline: "none",
              fontSize: 12,
              color: value ? "#374151" : "#9ca3af",
              background: "transparent",
              resize: "none",
              fontFamily: "inherit",
              boxSizing: "border-box",
            } as React.CSSProperties
          }
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || `${labels[lang]} tarjimasi...`}
          style={
            {
              width: "100%",
              padding: "10px 12px",
              border: "none",
              outline: "none",
              fontSize: 12,
              color: value ? "#374151" : "#9ca3af",
              background: "transparent",
              fontFamily: "inherit",
              boxSizing: "border-box",
            } as React.CSSProperties
          }
        />
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════
function parseYtId(s: string): string {
  for (const p of [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
    /^([A-Za-z0-9_-]{11})$/,
  ]) {
    const m = s.match(p);
    if (m) return m[1];
  }
  return "";
}

async function aiTranslate(text: string, lang: "en" | "ru"): Promise<string> {
  if (!text.trim()) return "";
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 800,
        messages: [
          {
            role: "user",
            content: `You are a professional food/cooking translator. Translate the following Uzbek text to ${lang === "en" ? "English" : "Russian"}. Return ONLY the translation, nothing else:\n\n${text}`,
          },
        ],
      }),
    });
    const d = await res.json();
    return d.content?.[0]?.text?.trim() ?? text;
  } catch {
    return text;
  }
}

async function translateBoth(uz: string): Promise<{ en: string; ru: string }> {
  const [en, ru] = await Promise.all([
    aiTranslate(uz, "en"),
    aiTranslate(uz, "ru"),
  ]);
  return { en, ru };
}

// ══════════════════════════════════════════════════════
// VIDEO QO'SHISH — ASOSIY KOMPONENT
// ══════════════════════════════════════════════════════
function VideoQoshish({
  addVideo,
  toast,
  onDone,
}: {
  addVideo: (v: VideoItem) => void;
  toast: (m: string, ok?: boolean) => void;
  onDone: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  // ── YouTube
  const [ytUrl, setYtUrl] = useState("");
  const [ytId, setYtId] = useState("");
  const [ytThumb, setYtThumb] = useState("");
  const [speed, setSpeed] = useState(1);

  // ── Thumbnail
  const [thumbMode, setThumbMode] = useState<"auto" | "link" | "file">("auto");
  const [thumbLink, setThumbLink] = useState("");
  const [thumbFile, setThumbFile] = useState<string | null>(null);
  const [thumbFileName, setThumbFileName] = useState("");

  // ── 5. TARJIMA — Sarlavha
  const [titleUz, setTitleUz] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleRu, setTitleRu] = useState("");
  const [loadingTitle, setLoadingTitle] = useState(false);
  const [doneTitle, setDoneTitle] = useState(false);

  // ── 5. TARJIMA — Tavsif
  const [descUz, setDescUz] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descRu, setDescRu] = useState("");
  const [loadingDesc, setLoadingDesc] = useState(false);
  const [doneDesc, setDoneDesc] = useState(false);

  // ── 6. TAFSILOTLAR — Asosiy
  const [chef, setChef] = useState("");
  const [duration, setDuration] = useState("");
  const [cookTime, setCookTime] = useState("30");
  const [difficulty, setDifficulty] = useState("easy");
  const [country, setCountry] = useState("uzbekiston");
  const [calories, setCalories] = useState("");
  const [servings, setServings] = useState("4");
  const [category, setCategory] = useState("uzbek");
  const [mealTime, setMealTime] = useState("anytime");
  const [foodType, setFoodType] = useState("meat");
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);

  // ── RETSEPT (ixtiyoriy)
  const [showRecipe, setShowRecipe] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { uz: "", en: "", ru: "", amount: "" },
  ]);
  const [steps, setSteps] = useState<Step[]>([
    { uz: "", en: "", ru: "", time: "" },
  ]);
  const [loadingIngr, setLoadingIngr] = useState(false);
  const [doneIngr, setDoneIngr] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState(false);
  const [doneSteps, setDoneSteps] = useState(false);

  // ── Xatolar
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // ── Computed
  const ytEmbed = ytId
    ? `https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`
    : "";
  const finalThumb =
    thumbMode === "link" && thumbLink
      ? thumbLink
      : thumbMode === "file" && thumbFile
        ? thumbFile
        : ytThumb ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=640&h=360&fit=crop";

  const selectedCountry = COUNTRIES.find((c) => c.v === country);

  // ── Handlers
  const handleYtUrl = (val: string) => {
    setYtUrl(val);
    const id = parseYtId(val);
    if (id) {
      setYtId(id);
      setYtThumb(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
      setErrors((e) => ({ ...e, yt: false }));
    } else {
      setYtId("");
      setYtThumb("");
    }
  };

  const handleThumbFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast("Fayl 5MB dan kichik bo'lsin!", false);
      return;
    }
    const r = new FileReader();
    r.onload = (ev) => {
      setThumbFile(ev.target?.result as string);
      setThumbFileName(f.name);
    };
    r.readAsDataURL(f);
  };

  // ── AI Tarjima handlers
  const trTitle = async () => {
    if (!titleUz.trim()) {
      toast("Avval O'zbekcha sarlavha yozing!", false);
      return;
    }
    setLoadingTitle(true);
    const { en, ru } = await translateBoth(titleUz);
    setTitleEn(en);
    setTitleRu(ru);
    setDoneTitle(true);
    setLoadingTitle(false);
    toast("✅ Sarlavha tarjima qilindi!");
  };

  const trDesc = async () => {
    if (!descUz.trim()) {
      toast("Avval O'zbekcha tavsif yozing!", false);
      return;
    }
    setLoadingDesc(true);
    const { en, ru } = await translateBoth(descUz);
    setDescEn(en);
    setDescRu(ru);
    setDoneDesc(true);
    setLoadingDesc(false);
    toast("✅ Tavsif tarjima qilindi!");
  };

  const trIngr = async () => {
    const list = ingredients.map((i) => i.uz).filter(Boolean);
    if (!list.length) {
      toast("Ingredientlar kiriting!", false);
      return;
    }
    setLoadingIngr(true);
    const { en, ru } = await translateBoth(list.join("\n"));
    const enL = en.split("\n"),
      ruL = ru.split("\n");
    setIngredients((p) =>
      p.map((item, i) => ({
        ...item,
        en: enL[i]?.trim() || item.en,
        ru: ruL[i]?.trim() || item.ru,
      })),
    );
    setDoneIngr(true);
    setLoadingIngr(false);
    toast("✅ Ingredientlar tarjima qilindi!");
  };

  const trSteps = async () => {
    const list = steps.map((s) => s.uz).filter(Boolean);
    if (!list.length) {
      toast("Bosqichlar kiriting!", false);
      return;
    }
    setLoadingSteps(true);
    const { en, ru } = await translateBoth(list.join("\n||||\n"));
    const enP = en.split(/\n?\|{4}\n?/),
      ruP = ru.split(/\n?\|{4}\n?/);
    setSteps((p) =>
      p.map((s, i) => ({
        ...s,
        en: enP[i]?.trim() || s.en,
        ru: ruP[i]?.trim() || s.ru,
      })),
    );
    setDoneSteps(true);
    setLoadingSteps(false);
    toast("✅ Bosqichlar tarjima qilindi!");
  };

  const setIngr = (idx: number, key: keyof Ingredient, val: string) =>
    setIngredients((p) =>
      p.map((item, i) => (i === idx ? { ...item, [key]: val } : item)),
    );
  const setStepF = (idx: number, key: keyof Step, val: string) =>
    setSteps((p) => p.map((s, i) => (i === idx ? { ...s, [key]: val } : s)));

  const handleSave = () => {
    const e: Record<string, boolean> = {};
    if (!ytId) e.yt = true;
    if (!titleUz.trim()) e.title = true;
    if (!chef.trim()) e.chef = true;
    if (!duration.trim()) e.duration = true;
    setErrors(e);
    if (Object.keys(e).length) {
      toast("Majburiy maydonlarni to'ldiring!", false);
      return;
    }

    addVideo({
      id: `v${Date.now()}`,
      title: { uz: titleUz, en: titleEn || titleUz, ru: titleRu || titleUz },
      description: { uz: descUz || "—", en: descEn || "—", ru: descRu || "—" },
      thumbnail: finalThumb,
      videoUrl: ytEmbed,
      duration,
      views: 0,
      cookTime: parseInt(cookTime) || 30,
      difficulty: difficulty as "easy" | "medium" | "hard",
      cuisine: "uzbek",
      category,
      chef,
      chefAvatar: "https://i.pravatar.cc/150?img=1",
      tags: tags ? tags.split(",").map((t) => t.trim()) : [category],
      publishedAt: new Date().toISOString().split("T")[0],
      calories: calories ? parseInt(calories) : undefined,
      servings: parseInt(servings) || 4,
      featured,
      country,
      mealTime,
      foodType,
      ingredients: showRecipe ? ingredients.filter((i) => i.uz) : [],
      steps: showRecipe ? steps.filter((s) => s.uz) : [],
    });
    toast("✅ Video muvaffaqiyatli qo'shildi!");
    onDone();
  };

  const handleReset = () => {
    if (!confirm("Barcha ma'lumotlar o'chiriladi. Davom etasizmi?")) return;
    setYtUrl("");
    setYtId("");
    setYtThumb("");
    setSpeed(1);
    setThumbMode("auto");
    setThumbLink("");
    setThumbFile(null);
    setThumbFileName("");
    setTitleUz("");
    setTitleEn("");
    setTitleRu("");
    setDoneTitle(false);
    setDescUz("");
    setDescEn("");
    setDescRu("");
    setDoneDesc(false);
    setChef("");
    setDuration("");
    setCookTime("30");
    setDifficulty("easy");
    setCountry("uzbekiston");
    setCalories("");
    setServings("4");
    setCategory("uzbek");
    setMealTime("anytime");
    setFoodType("meat");
    setTags("");
    setFeatured(false);
    setShowRecipe(false);
    setIngredients([{ uz: "", en: "", ru: "", amount: "" }]);
    setSteps([{ uz: "", en: "", ru: "", time: "" }]);
    setErrors({});
  };

  // checklist for right panel
  const checks = [
    { l: "YouTube URL", ok: !!ytId },
    { l: "O'zbek sarlavha", ok: !!titleUz.trim() },
    { l: "Oshpaz nomi", ok: !!chef.trim() },
    { l: "Davomiylik", ok: !!duration.trim() },
    {
      l: "Thumbnail",
      ok: !!(thumbMode === "auto"
        ? ytThumb
        : thumbMode === "link"
          ? thumbLink
          : thumbFile),
    },
    { l: "Sarlavha tarjimasi", ok: doneTitle || (!!titleEn && !!titleRu) },
    { l: "Tavsif tarjimasi", ok: doneDesc || (!!descEn && !!descRu) },
  ];
  const readyCount = checks.filter((c) => c.ok).length;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 310px",
        gap: 22,
        alignItems: "start",
      }}
    >
      {/* ════════════════ LEFT COLUMN ════════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {/* ── SECTION 4: YouTube ── */}
        <div style={{ ...card, padding: 26 }}>
          <SectionTitle
            emoji="🎬"
            title="4. Video Yuklash Tizimi"
            sub="YouTube orqali — server yuklanmaydi, tez ishlaydi"
          />

          {/* Steps */}
          <div
            style={{
              display: "flex",
              gap: 0,
              marginBottom: 22,
              borderRadius: 14,
              overflow: "hidden",
              border: "1.5px solid rgba(29,185,84,0.12)",
            }}
          >
            {[
              { n: "1️⃣", t: "YouTube ga yuklang" },
              { n: "2️⃣", t: "Linkni nusxalang" },
              { n: "3️⃣", t: "Bu yerga qo'ying" },
            ].map(({ n, t }, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "13px 10px",
                  background: i === 2 ? "rgba(29,185,84,0.06)" : "#fcfcfc",
                  borderRight:
                    i < 2 ? "1.5px solid rgba(29,185,84,0.1)" : "none",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 5 }}>{n}</div>
                <div
                  style={{ fontSize: 11, fontWeight: 800, color: "#374151" }}
                >
                  {t}
                </div>
              </div>
            ))}
          </div>

          {/* URL input */}
          <div style={{ marginBottom: 18 }}>
            <label style={lbl}>YouTube URL yoki Video ID *</label>
            <div style={{ position: "relative" }}>
              <Youtube
                size={15}
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
                placeholder="https://youtube.com/watch?v=..."
                style={{
                  ...inpStyle(!!ytId, errors.yt),
                  paddingLeft: 42,
                  paddingRight: ytUrl ? 40 : 14,
                }}
              />
              {ytUrl && (
                <button
                  onClick={() => {
                    setYtUrl("");
                    setYtId("");
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
                    padding: 2,
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
            {errors.yt && (
              <p
                style={{
                  margin: "5px 0 0",
                  fontSize: 11,
                  color: "#ef4444",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <AlertCircle size={11} />
                YouTube URL to'g'ri emas!
              </p>
            )}
            {ytId && (
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  borderRadius: 10,
                  background: "rgba(29,185,84,0.06)",
                  border: "1px solid rgba(29,185,84,0.2)",
                }}
              >
                <CheckCircle2 size={13} style={{ color: G, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: G, fontWeight: 700 }}>
                  Video topildi!
                </span>
                <code
                  style={{
                    fontSize: 11,
                    color: "#6b7280",
                    background: "rgba(0,0,0,0.05)",
                    padding: "2px 8px",
                    borderRadius: 6,
                    marginLeft: 4,
                  }}
                >
                  {ytId}
                </code>
              </div>
            )}
          </div>

          {/* Thumbnail */}
          <div
            style={{
              borderTop: "1px solid rgba(0,0,0,0.06)",
              paddingTop: 20,
              marginBottom: 0,
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
                🖼️ Thumbnail (Muqova rasm)
              </label>
              <div
                style={{
                  display: "flex",
                  gap: 3,
                  background: "rgba(0,0,0,0.05)",
                  borderRadius: 10,
                  padding: 3,
                }}
              >
                {(["auto", "link", "file"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setThumbMode(m)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      fontSize: 11,
                      fontWeight: 700,
                      transition: "all 0.2s",
                      background: thumbMode === m ? "#fff" : "transparent",
                      color: thumbMode === m ? "#111827" : "#9ca3af",
                      boxShadow:
                        thumbMode === m ? "0 1px 6px rgba(0,0,0,0.1)" : "none",
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
                  padding: "13px 16px",
                  borderRadius: 13,
                  background: "rgba(29,185,84,0.04)",
                  border: "1px solid rgba(29,185,84,0.15)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Zap size={15} style={{ color: G, flexShrink: 0 }} />
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#374151",
                    }}
                  >
                    YouTube thumbnail avtomatik olinadi
                  </p>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: 11,
                      color: "#9ca3af",
                    }}
                  >
                    YouTube dan eng yuqori sifatli rasm ishlatiladi
                  </p>
                </div>
              </div>
            )}
            {thumbMode === "link" && (
              <div>
                <div style={{ position: "relative" }}>
                  <LinkIcon
                    size={14}
                    style={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                    }}
                  />
                  <input
                    type="text"
                    value={thumbLink}
                    onChange={(e) => setThumbLink(e.target.value)}
                    placeholder="https://example.com/rasm.jpg"
                    style={{ ...inpStyle(), paddingLeft: 42 }}
                  />
                </div>
                {thumbLink && (
                  <div
                    style={{
                      marginTop: 10,
                      borderRadius: 12,
                      overflow: "hidden",
                      height: 100,
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
                      alt=""
                    />
                  </div>
                )}
              </div>
            )}
            {thumbMode === "file" && (
              <div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbFile}
                  style={{ display: "none" }}
                />
                <div
                  onClick={() => fileRef.current?.click()}
                  style={{
                    border: "2px dashed rgba(29,185,84,0.25)",
                    borderRadius: 14,
                    padding: thumbFile ? 14 : 30,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor = G)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(29,185,84,0.25)")
                  }
                >
                  {thumbFile ? (
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <img
                        src={thumbFile}
                        style={{
                          width: 88,
                          height: 56,
                          objectFit: "cover",
                          borderRadius: 9,
                        }}
                        alt=""
                      />
                      <div style={{ textAlign: "left" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 13,
                            fontWeight: 700,
                            color: G,
                          }}
                        >
                          ✅ {thumbFileName}
                        </p>
                        <p
                          style={{
                            margin: "3px 0 0",
                            fontSize: 11,
                            color: "#9ca3af",
                          }}
                        >
                          O'zgartirish uchun bosing
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: 14,
                          background: "rgba(29,185,84,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 12px",
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
                        📱 Telefon / 💻 Kompyuterdan yuklash
                      </p>
                      <p
                        style={{
                          margin: "5px 0 0",
                          fontSize: 11,
                          color: "#9ca3af",
                        }}
                      >
                        JPG, PNG, WebP — maksimal 5MB
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Tezlik */}
          <div
            style={{
              borderTop: "1px solid rgba(0,0,0,0.06)",
              paddingTop: 20,
              marginTop: 20,
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
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Volume2 size={14} style={{ color: G }} />
                <label style={{ ...lbl, marginBottom: 0 }}>
                  Player Tezlik Sozlamasi
                </label>
              </div>
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: 99,
                  background: "rgba(29,185,84,0.1)",
                  color: G,
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                Default: 1x
              </span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {SPEEDS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  style={{
                    flex: 1,
                    padding: "11px 4px",
                    borderRadius: 12,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 800,
                    transition: "all 0.2s",
                    background:
                      speed === s
                        ? "linear-gradient(135deg,#1DB954,#15803d)"
                        : "rgba(0,0,0,0.05)",
                    color: speed === s ? "#fff" : "#374151",
                    boxShadow:
                      speed === s ? "0 4px 14px rgba(29,185,84,0.35)" : "none",
                    transform: speed === s ? "translateY(-1px)" : "none",
                  }}
                >
                  {s === 1 ? "1x ✓" : `${s}x`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            SECTION 5: AVTOMATIK TARJIMA TIZIMI
        ════════════════════════════════════════════ */}
        <div style={{ ...card, padding: 26 }}>
          <SectionTitle
            emoji="🌐"
            title="5. Avtomatik Tarjima Tizimi"
            sub="Admin faqat O'zbekcha yozadi — AI qolgan 2 tilga avtomatik tarjima qiladi"
          />

          {/* Izoh banner */}
          <div
            style={{
              padding: "14px 18px",
              borderRadius: 14,
              background:
                "linear-gradient(135deg,rgba(139,92,246,0.07),rgba(59,130,246,0.05))",
              border: "1.5px solid rgba(139,92,246,0.18)",
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 11,
                background: "rgba(139,92,246,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Globe size={17} style={{ color: "#8b5cf6" }} />
            </div>
            <div>
              <p
                style={{
                  margin: "0 0 4px",
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#4c1d95",
                }}
              >
                3 tilli sayt tarjima tizimi
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "#6d28d9",
                  lineHeight: 1.5,
                }}
              >
                Siz faqat <strong>🇺🇿 O'zbekcha</strong> yozasiz → AI avtomatik{" "}
                <strong>🇬🇧 Inglizcha</strong> va <strong>🇷🇺 Ruscha</strong> ga
                tarjima qiladi. Tarjima natijasini tahrirlash ham mumkin.
              </p>
            </div>
          </div>

          {/* ── 5.1 Sarlavha tarjimasi ── */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#ef4444",
                  }}
                />
                <label style={{ ...lbl, marginBottom: 0 }}>
                  Video Sarlavhasi
                </label>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: 99,
                    background: "rgba(239,68,68,0.1)",
                    color: "#ef4444",
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                >
                  MAJBURIY
                </span>
              </div>
              <LangBadge lang="uz" />
            </div>

            {/* O'zbek input */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={titleUz}
                  onChange={(e) => {
                    setTitleUz(e.target.value);
                    setDoneTitle(false);
                    setErrors((er) => ({ ...er, title: false }));
                  }}
                  placeholder="Masalan: Osh (Palov) tayyorlash usuli"
                  style={{
                    ...inpStyle(!!titleUz, errors.title),
                    fontSize: 14,
                    fontWeight: 600,
                    padding: "13px 50px 13px 14px",
                  }}
                />
                {titleUz && (
                  <span
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 10,
                      color: "#9ca3af",
                      fontWeight: 700,
                    }}
                  >
                    {titleUz.length}
                  </span>
                )}
              </div>
              {errors.title && (
                <p
                  style={{
                    margin: "5px 0 0",
                    fontSize: 11,
                    color: "#ef4444",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <AlertCircle size={11} />
                  Sarlavha majburiy!
                </p>
              )}
            </div>

            {/* AI tarjima tugmasi */}
            <TrBtn
              loading={loadingTitle}
              done={doneTitle}
              disabled={!titleUz.trim()}
              onClick={trTitle}
              label="🤖 AI tarjima: O'zbekcha → Inglizcha + Ruscha"
            />

            {/* Tarjima natijalari */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginTop: 2,
              }}
            >
              <div>
                <div style={{ marginBottom: 6 }}>
                  <LangBadge lang="en" />
                </div>
                <TranslatedField
                  lang="en"
                  value={titleEn}
                  onChange={setTitleEn}
                  placeholder="How to cook Uzbek Plov"
                  loading={loadingTitle}
                />
              </div>
              <div>
                <div style={{ marginBottom: 6 }}>
                  <LangBadge lang="ru" />
                </div>
                <TranslatedField
                  lang="ru"
                  value={titleRu}
                  onChange={setTitleRu}
                  placeholder="Как приготовить плов"
                  loading={loadingTitle}
                />
              </div>
            </div>
          </div>

          {/* ── 5.2 Tavsif tarjimasi ── */}
          <div
            style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 22 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: G,
                  }}
                />
                <label style={{ ...lbl, marginBottom: 0 }}>Video Tavsifi</label>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: 99,
                    background: "rgba(29,185,84,0.1)",
                    color: G,
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                >
                  IXTIYORIY
                </span>
              </div>
              <LangBadge lang="uz" />
            </div>

            <div style={{ marginBottom: 10 }}>
              <textarea
                value={descUz}
                onChange={(e) => {
                  setDescUz(e.target.value);
                  setDoneDesc(false);
                }}
                placeholder="Video haqida qisqacha tavsif yozing... (oshpaz haqida, retseptning xususiyatlari va h.k.)"
                rows={3}
                style={
                  {
                    ...inpStyle(!!descUz),
                    resize: "none",
                  } as React.CSSProperties
                }
              />
              {descUz && (
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 10,
                    color: "#9ca3af",
                    textAlign: "right",
                  }}
                >
                  {descUz.length} belgi
                </p>
              )}
            </div>

            <TrBtn
              loading={loadingDesc}
              done={doneDesc}
              disabled={!descUz.trim()}
              onClick={trDesc}
              label="🤖 AI tarjima: O'zbekcha tavsif → EN + RU"
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginTop: 2,
              }}
            >
              <div>
                <div style={{ marginBottom: 6 }}>
                  <LangBadge lang="en" />
                </div>
                <TranslatedField
                  lang="en"
                  value={descEn}
                  onChange={setDescEn}
                  multiline
                  rows={3}
                  placeholder="Short description about this recipe..."
                  loading={loadingDesc}
                />
              </div>
              <div>
                <div style={{ marginBottom: 6 }}>
                  <LangBadge lang="ru" />
                </div>
                <TranslatedField
                  lang="ru"
                  value={descRu}
                  onChange={setDescRu}
                  multiline
                  rows={3}
                  placeholder="Краткое описание рецепта..."
                  loading={loadingDesc}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            SECTION 6: VIDEO TAFSILOTLARI
        ════════════════════════════════════════════ */}
        <div style={{ ...card, padding: 26 }}>
          <SectionTitle
            emoji="⚙️"
            title="6. Video Tafsilotlari"
            sub="Taom haqida to'liq ma'lumot — qidiruv va filtr uchun muhim"
          />

          {/* ── 6.1 Asosiy ma'lumot ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 20,
            }}
          >
            {/* Oshpaz */}
            <div>
              <label style={lbl}>👨‍🍳 Oshpaz nomi *</label>
              <div style={{ position: "relative" }}>
                <ChefHat
                  size={14}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: chef ? G : "#9ca3af",
                  }}
                />
                <input
                  type="text"
                  value={chef}
                  onChange={(e) => {
                    setChef(e.target.value);
                    setErrors((er) => ({ ...er, chef: false }));
                  }}
                  placeholder="Aziz Karimov"
                  style={{ ...inpStyle(!!chef, errors.chef), paddingLeft: 42 }}
                />
              </div>
              {errors.chef && (
                <p
                  style={{
                    margin: "5px 0 0",
                    fontSize: 11,
                    color: "#ef4444",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <AlertCircle size={11} />
                  Majburiy!
                </p>
              )}
            </div>

            {/* Davomiylik */}
            <div>
              <label style={lbl}>⏱ Davomiylik * (masalan: 15:30)</label>
              <div style={{ position: "relative" }}>
                <Clock
                  size={14}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: duration ? G : "#9ca3af",
                  }}
                />
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                    setErrors((er) => ({ ...er, duration: false }));
                  }}
                  placeholder="15:30"
                  style={{
                    ...inpStyle(!!duration, errors.duration),
                    paddingLeft: 42,
                  }}
                />
              </div>
              {errors.duration && (
                <p
                  style={{
                    margin: "5px 0 0",
                    fontSize: 11,
                    color: "#ef4444",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <AlertCircle size={11} />
                  Majburiy!
                </p>
              )}
            </div>

            {/* Kaloriya */}
            <div>
              <label style={lbl}>🔥 Kaloriya</label>
              <div style={{ position: "relative" }}>
                <Flame
                  size={14}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                />
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="450"
                  style={{ ...inpStyle(), paddingLeft: 42, paddingRight: 52 }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#9ca3af",
                  }}
                >
                  kcal
                </span>
              </div>
              {calories && (
                <p
                  style={{ margin: "4px 0 0", fontSize: 11, color: "#9ca3af" }}
                >
                  📊{" "}
                  {parseInt(calories) > 500
                    ? "Yuqori kaloriyali"
                    : parseInt(calories) > 300
                      ? "O'rtacha"
                      : "Past kaloriyali"}
                </p>
              )}
            </div>

            {/* Tayyorlanish vaqti */}
            <div>
              <label style={lbl}>🍳 Tayyorlanish vaqti</label>
              <div style={{ position: "relative" }}>
                <Clock
                  size={14}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                />
                <input
                  type="number"
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  placeholder="25"
                  style={{ ...inpStyle(), paddingLeft: 42, paddingRight: 68 }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#9ca3af",
                  }}
                >
                  daqiqa
                </span>
              </div>
              {cookTime && (
                <p
                  style={{ margin: "4px 0 0", fontSize: 11, color: "#9ca3af" }}
                >
                  {parseInt(cookTime) < 15
                    ? "Juda tez"
                    : parseInt(cookTime) < 45
                      ? "O'rtacha vaqt"
                      : "Uzoq tayyorlanadi"}
                </p>
              )}
            </div>

            {/* Porsiya */}
            <div>
              <label style={lbl}>🍽️ Porsiyalar soni</label>
              <FInput
                type="number"
                value={servings}
                onChange={setServings}
                placeholder="4"
                suffix="kishi"
              />
            </div>

            {/* Kategoriya */}
            <div>
              <label style={lbl}>🏷️ Video kategoriyasi</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ ...inpStyle(), cursor: "pointer" }}
              >
                {VIDEO_CATS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.e} {c.l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ── 6.2 Taom Davlati ── */}
          <div
            style={{
              borderTop: "1px solid rgba(0,0,0,0.06)",
              paddingTop: 20,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 14,
              }}
            >
              <Flag size={14} style={{ color: G }} />
              <label style={{ ...lbl, marginBottom: 0 }}>Taom Davlati</label>
              {selectedCountry && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "4px 12px",
                    borderRadius: 10,
                    background: "rgba(29,185,84,0.06)",
                    border: "1px solid rgba(29,185,84,0.15)",
                  }}
                >
                  {selectedCountry.f}{" "}
                  <span style={{ fontSize: 12, fontWeight: 700, color: G }}>
                    {selectedCountry.l}
                  </span>
                </span>
              )}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 8,
              }}
            >
              {COUNTRIES.map(({ v, f, l }) => (
                <button
                  key={v}
                  onClick={() => setCountry(v)}
                  style={{
                    padding: "10px 8px",
                    borderRadius: 12,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 700,
                    transition: "all 0.2s",
                    textAlign: "center",
                    background:
                      country === v
                        ? "linear-gradient(135deg,#1DB954,#15803d)"
                        : "rgba(0,0,0,0.04)",
                    color: country === v ? "#fff" : "#374151",
                    boxShadow:
                      country === v ? "0 3px 10px rgba(29,185,84,0.3)" : "none",
                    transform: country === v ? "translateY(-1px)" : "none",
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{f}</div>
                  <div>{l}</div>
                </button>
              ))}
            </div>
          </div>

          {/* ── 6.3 Taom Murakkabligi ── */}
          <div
            style={{
              borderTop: "1px solid rgba(0,0,0,0.06)",
              paddingTop: 20,
              marginBottom: 20,
            }}
          >
            <label
              style={{
                ...lbl,
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              📊 Taom Murakkabligi
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 10,
              }}
            >
              {[
                {
                  v: "easy",
                  e: "🟢",
                  l: "Oson",
                  desc: "Hamma qila oladi",
                  color: "#16a34a",
                },
                {
                  v: "medium",
                  e: "🟡",
                  l: "O'rtacha",
                  desc: "Biroz tajriba kerak",
                  color: "#d97706",
                },
                {
                  v: "hard",
                  e: "🔴",
                  l: "Qiyin",
                  desc: "Tajribali oshpaz uchun",
                  color: "#dc2626",
                },
              ].map(({ v, e, l, desc, color }) => (
                <button
                  key={v}
                  onClick={() => setDifficulty(v)}
                  style={{
                    padding: "16px 12px",
                    borderRadius: 14,
                    border: `2px solid ${difficulty === v ? color : "rgba(0,0,0,0.08)"}`,
                    cursor: "pointer",
                    background: difficulty === v ? `${color}10` : "#fafafa",
                    transition: "all 0.2s",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{e}</div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: difficulty === v ? color : "#374151",
                      marginBottom: 3,
                    }}
                  >
                    {l}
                  </div>
                  <div
                    style={{ fontSize: 10, color: "#9ca3af", lineHeight: 1.3 }}
                  >
                    {desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ── 6.4 Qachon iste'mol qilinadi ── */}
          <div
            style={{
              borderTop: "1px solid rgba(0,0,0,0.06)",
              paddingTop: 20,
              marginBottom: 20,
            }}
          >
            <label
              style={{
                ...lbl,
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Clock size={12} /> Qachon iste'mol qilinadi
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: 10,
              }}
            >
              {MEAL_TIMES.map(({ id, e, l, desc }) => (
                <button
                  key={id}
                  onClick={() => setMealTime(id)}
                  style={{
                    padding: "14px 8px",
                    borderRadius: 14,
                    border: `2px solid ${mealTime === id ? G : "rgba(0,0,0,0.08)"}`,
                    cursor: "pointer",
                    background:
                      mealTime === id ? "rgba(29,185,84,0.07)" : "#fafafa",
                    transition: "all 0.2s",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 22, marginBottom: 5 }}>{e}</div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: mealTime === id ? G : "#374151",
                      marginBottom: 2,
                    }}
                  >
                    {l}
                  </div>
                  <div style={{ fontSize: 9, color: "#9ca3af" }}>{desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* ── 6.5 Ovqat Turi ── */}
          <div
            style={{
              borderTop: "1px solid rgba(0,0,0,0.06)",
              paddingTop: 20,
              marginBottom: 20,
            }}
          >
            <label
              style={{
                ...lbl,
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Utensils size={12} /> Ovqat Turi
            </label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {FOOD_TYPES.map(({ id, e, l }) => (
                <button
                  key={id}
                  onClick={() => setFoodType(id)}
                  style={{
                    padding: "9px 16px",
                    borderRadius: 12,
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 700,
                    transition: "all 0.2s",
                    background:
                      foodType === id
                        ? "rgba(29,185,84,0.1)"
                        : "rgba(0,0,0,0.04)",
                    color: foodType === id ? G : "#6b7280",
                    border: `1.5px solid ${foodType === id ? G : "transparent"}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 16 }}>{e}</span>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* ── 6.6 Teglar & Featured ── */}
          <div
            style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 20 }}
          >
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>🔖 Teglar (vergul bilan ajrating)</label>
              <FInput
                value={tags}
                onChange={setTags}
                placeholder="palov, osh, uzbek, go'shtli"
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
                          padding: "4px 11px",
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

            {/* Featured toggle */}
            <div
              onClick={() => setFeatured(!featured)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "15px 18px",
                borderRadius: 14,
                cursor: "pointer",
                background: featured
                  ? "rgba(245,158,11,0.06)"
                  : "rgba(0,0,0,0.03)",
                border: `1.5px solid ${featured ? "rgba(245,158,11,0.4)" : "rgba(0,0,0,0.08)"}`,
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 28,
                  borderRadius: 99,
                  background: featured ? "#f59e0b" : "#d1d5db",
                  position: "relative",
                  transition: "background 0.3s",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 4,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    left: featured ? 26 : 4,
                    transition: "left 0.3s",
                  }}
                />
              </div>
              <div>
                <div
                  style={{ fontSize: 13, fontWeight: 800, color: "#374151" }}
                >
                  ⭐ Tanlangan (Featured) video
                </div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>
                  Asosiy sahifada birinchi ko'rsatiladi
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            RETSEPT (Ixtiyoriy)
        ════════════════════════════════════════════ */}
        <div style={{ ...card, overflow: "hidden" }}>
          <button
            onClick={() => setShowRecipe(!showRecipe)}
            style={{
              width: "100%",
              padding: "20px 26px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 900,
                  color: "#111827",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                📋 Retsept Yozish
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: 99,
                    fontSize: 11,
                    fontWeight: 700,
                    background: "rgba(29,185,84,0.1)",
                    color: G,
                  }}
                >
                  Ixtiyoriy
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 3 }}>
                Ingredientlar • Tayyorlash bosqichlari • Har bir bosqich vaqti
              </div>
            </div>
            <span
              style={{
                fontSize: 18,
                color: showRecipe ? G : "#9ca3af",
                transform: showRecipe ? "rotate(180deg)" : "none",
                transition: "transform 0.3s",
                display: "block",
              }}
            >
              ▼
            </span>
          </button>

          {showRecipe && (
            <div
              style={{
                padding: "0 26px 26px",
                borderTop: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ paddingTop: 22 }}>
                {/* Ingredientlar */}
                <div style={{ marginBottom: 26 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <label style={{ ...lbl, marginBottom: 0 }}>
                      🥕 Ingredientlar
                    </label>
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>
                      {ingredients.filter((i) => i.uz.trim()).length} ta
                      ingredient
                    </span>
                  </div>
                  <TrBtn
                    loading={loadingIngr}
                    done={doneIngr}
                    disabled={!ingredients.some((i) => i.uz.trim())}
                    onClick={trIngr}
                    label="🤖 Barcha ingredientlarni tarjima qilish (UZ → EN + RU)"
                  />
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    {ingredients.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            width: 26,
                            flexShrink: 0,
                            fontSize: 11,
                            fontWeight: 800,
                            color: "#9ca3af",
                            textAlign: "center",
                          }}
                        >
                          {idx + 1}.
                        </span>
                        <div style={{ flex: 2 }}>
                          <input
                            type="text"
                            value={item.uz}
                            onChange={(e) => {
                              setIngr(idx, "uz", e.target.value);
                              setDoneIngr(false);
                            }}
                            placeholder={`${idx + 1}-ingredient (masalan: Guruch)`}
                            style={inpStyle()}
                          />
                          {doneIngr && (item.en || item.ru) && (
                            <div
                              style={{ marginTop: 4, display: "flex", gap: 4 }}
                            >
                              {item.en && (
                                <span
                                  style={{
                                    fontSize: 10,
                                    color: "#2563eb",
                                    background: "rgba(37,99,235,0.06)",
                                    padding: "2px 8px",
                                    borderRadius: 6,
                                  }}
                                >
                                  🇬🇧 {item.en}
                                </span>
                              )}
                              {item.ru && (
                                <span
                                  style={{
                                    fontSize: 10,
                                    color: "#7c3aed",
                                    background: "rgba(124,58,237,0.06)",
                                    padding: "2px 8px",
                                    borderRadius: 6,
                                  }}
                                >
                                  🇷🇺 {item.ru}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <div style={{ width: 100, flexShrink: 0 }}>
                          <input
                            type="text"
                            value={item.amount}
                            onChange={(e) =>
                              setIngr(idx, "amount", e.target.value)
                            }
                            placeholder="500g"
                            style={inpStyle()}
                          />
                        </div>
                        {ingredients.length > 1 && (
                          <button
                            onClick={() =>
                              setIngredients((p) =>
                                p.filter((_, i) => i !== idx),
                              )
                            }
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: 10,
                              border: "none",
                              cursor: "pointer",
                              background: "rgba(239,68,68,0.07)",
                              color: "#ef4444",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      setIngredients((p) => [
                        ...p,
                        { uz: "", en: "", ru: "", amount: "" },
                      ])
                    }
                    style={{
                      marginTop: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "9px 16px",
                      borderRadius: 12,
                      border: "1.5px dashed rgba(29,185,84,0.3)",
                      background: "rgba(29,185,84,0.03)",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 700,
                      color: G,
                    }}
                  >
                    <Plus size={14} /> Ingredient qo'shish
                  </button>
                </div>

                {/* Bosqichlar */}
                <div
                  style={{
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                    paddingTop: 22,
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
                      📝 Tayyorlash Bosqichlari
                    </label>
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>
                      {steps.filter((s) => s.uz.trim()).length} ta bosqich
                    </span>
                  </div>
                  <TrBtn
                    loading={loadingSteps}
                    done={doneSteps}
                    disabled={!steps.some((s) => s.uz.trim())}
                    onClick={trSteps}
                    label="🤖 Barcha bosqichlarni tarjima qilish (UZ → EN + RU)"
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {steps.map((s, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: 16,
                          borderRadius: 14,
                          background: "#fafafa",
                          border: "1px solid rgba(0,0,0,0.07)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 10,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 800,
                              color: G,
                              background: "rgba(29,185,84,0.1)",
                              padding: "3px 10px",
                              borderRadius: 99,
                            }}
                          >
                            {idx + 1}-bosqich
                          </span>
                          <div
                            style={{
                              display: "flex",
                              gap: 6,
                              alignItems: "center",
                            }}
                          >
                            <div style={{ position: "relative" }}>
                              <Clock
                                size={12}
                                style={{
                                  position: "absolute",
                                  left: 9,
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  color: "#9ca3af",
                                }}
                              />
                              <input
                                type="text"
                                value={s.time || ""}
                                onChange={(e) =>
                                  setStepF(idx, "time", e.target.value)
                                }
                                placeholder="5 min"
                                style={{
                                  ...inpStyle(),
                                  width: 90,
                                  fontSize: 11,
                                  paddingLeft: 26,
                                  paddingRight: 8,
                                }}
                              />
                            </div>
                            {steps.length > 1 && (
                              <button
                                onClick={() =>
                                  setSteps((p) => p.filter((_, i) => i !== idx))
                                }
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 9,
                                  border: "none",
                                  cursor: "pointer",
                                  background: "rgba(239,68,68,0.07)",
                                  color: "#ef4444",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                        </div>
                        <textarea
                          value={s.uz}
                          onChange={(e) => {
                            setStepF(idx, "uz", e.target.value);
                            setDoneSteps(false);
                          }}
                          placeholder={`${idx + 1}-bosqich tavsifi...`}
                          rows={2}
                          style={
                            {
                              ...inpStyle(),
                              resize: "none",
                              width: "100%",
                              boxSizing: "border-box",
                            } as React.CSSProperties
                          }
                        />
                        {doneSteps && (s.en || s.ru) && (
                          <div
                            style={{
                              marginTop: 8,
                              padding: "8px 12px",
                              borderRadius: 10,
                              background: "rgba(139,92,246,0.04)",
                              border: "1px solid rgba(139,92,246,0.1)",
                            }}
                          >
                            {s.en && (
                              <p
                                style={{
                                  margin: "0 0 3px",
                                  fontSize: 11,
                                  color: "#2563eb",
                                }}
                              >
                                🇬🇧 {s.en}
                              </p>
                            )}
                            {s.ru && (
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 11,
                                  color: "#7c3aed",
                                }}
                              >
                                🇷🇺 {s.ru}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      setSteps((p) => [
                        ...p,
                        { uz: "", en: "", ru: "", time: "" },
                      ])
                    }
                    style={{
                      marginTop: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "9px 16px",
                      borderRadius: 12,
                      border: "1.5px dashed rgba(139,92,246,0.3)",
                      background: "rgba(139,92,246,0.03)",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#7c3aed",
                    }}
                  >
                    <Plus size={14} /> Bosqich qo'shish
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Saqlash tugmasi */}
        <button
          onClick={handleSave}
          style={{
            width: "100%",
            padding: "18px",
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
            transition: "all 0.25s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 14px 40px rgba(29,185,84,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(29,185,84,0.4)";
          }}
        >
          <Check size={20} /> Video Saqlash va Qo'shish
        </button>
      </div>

      {/* ════════════════ RIGHT PANEL ════════════════ */}
      <div
        style={{
          position: "sticky",
          top: 20,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Preview */}
        <div style={{ ...card, padding: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
            }}
          >
            <Eye size={14} style={{ color: G }} />
            <h4
              style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 900,
                color: "#111827",
              }}
            >
              Live Ko'rinish
            </h4>
          </div>
          <div
            style={{
              borderRadius: 14,
              overflow: "hidden",
              marginBottom: 12,
              aspectRatio: "16/9",
              background: "#0a0a0a",
            }}
          >
            {ytEmbed ? (
              <iframe
                src={ytEmbed}
                title="preview"
                style={{ width: "100%", height: "100%", border: "none" }}
                allowFullScreen
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
                  gap: 8,
                }}
              >
                <Youtube size={32} style={{ color: "#333" }} />
                <span style={{ fontSize: 11, color: "#555", fontWeight: 600 }}>
                  YouTube URL kiriting
                </span>
              </div>
            )}
          </div>
          {/* Speed mini bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
              padding: "7px 12px",
              borderRadius: 11,
              background: "rgba(29,185,84,0.04)",
              border: "1px solid rgba(29,185,84,0.1)",
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: "#6b7280",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Volume2 size={11} style={{ color: G }} /> Tezlik
            </span>
            <div style={{ display: "flex", gap: 3 }}>
              {SPEEDS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  style={{
                    width: 30,
                    height: 20,
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 9,
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
          {/* Thumbnail */}
          <div
            style={{
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 12,
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
              alt=""
            />
          </div>
          {/* Card preview */}
          <div
            style={{
              borderRadius: 14,
              padding: "12px 14px",
              background: "rgba(29,185,84,0.03)",
              border: "1px solid rgba(29,185,84,0.1)",
            }}
          >
            <p
              style={{
                margin: "0 0 2px",
                fontSize: 13,
                fontWeight: 800,
                color: "#111827",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {titleUz || "Sarlavha kiriting..."}
            </p>
            {titleEn && (
              <p
                style={{
                  margin: "0 0 5px",
                  fontSize: 10,
                  color: "#9ca3af",
                  fontStyle: "italic",
                }}
              >
                {titleEn}
              </p>
            )}
            <p
              style={{
                margin: "0 0 8px",
                fontSize: 11,
                color: G,
                fontWeight: 700,
              }}
            >
              {chef || "Oshpaz nomi"}
            </p>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {cookTime && (
                <span
                  style={{
                    fontSize: 10,
                    color: "#9ca3af",
                    background: "rgba(0,0,0,0.05)",
                    padding: "2px 7px",
                    borderRadius: 99,
                  }}
                >
                  ⏱ {cookTime} min
                </span>
              )}
              {calories && (
                <span
                  style={{
                    fontSize: 10,
                    color: "#9ca3af",
                    background: "rgba(0,0,0,0.05)",
                    padding: "2px 7px",
                    borderRadius: 99,
                  }}
                >
                  🔥 {calories} kcal
                </span>
              )}
              {selectedCountry && (
                <span
                  style={{
                    fontSize: 10,
                    color: "#9ca3af",
                    background: "rgba(0,0,0,0.05)",
                    padding: "2px 7px",
                    borderRadius: 99,
                  }}
                >
                  {selectedCountry.f}
                </span>
              )}
              {featured && (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 7px",
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

        {/* Checklist */}
        <div style={{ ...card, padding: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <h4
              style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 900,
                color: "#111827",
              }}
            >
              ✅ Tekshiruv ro'yxati
            </h4>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 800,
                background:
                  readyCount === checks.length
                    ? "rgba(29,185,84,0.1)"
                    : "rgba(0,0,0,0.05)",
                color: readyCount === checks.length ? G : "#9ca3af",
              }}
            >
              {readyCount}/{checks.length}
            </span>
          </div>
          {/* Progress bar */}
          <div
            style={{
              height: 4,
              borderRadius: 99,
              background: "rgba(0,0,0,0.06)",
              marginBottom: 14,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: 99,
                background: "linear-gradient(90deg,#1DB954,#15803d)",
                width: `${(readyCount / checks.length) * 100}%`,
                transition: "width 0.4s",
              }}
            />
          </div>
          {checks.map(({ l, ok }) => (
            <div
              key={l}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 9,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 7,
                  flexShrink: 0,
                  background: ok ? "rgba(29,185,84,0.12)" : "rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                {ok ? (
                  <Check size={12} style={{ color: G }} />
                ) : (
                  <div
                    style={{
                      width: 5,
                      height: 5,
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
                  color: ok ? "#374151" : "#9ca3af",
                  transition: "color 0.2s",
                }}
              >
                {l}
              </span>
            </div>
          ))}
          <button
            onClick={handleReset}
            style={{
              marginTop: 10,
              width: "100%",
              padding: "9px",
              borderRadius: 12,
              border: "1.5px solid rgba(239,68,68,0.2)",
              background: "rgba(239,68,68,0.04)",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 700,
              color: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              transition: "all 0.2s",
            }}
          >
            <RotateCcw size={12} /> Hammasini tozalash
          </button>
        </div>

        {/* Tarjima holati */}
        <div style={{ ...card, padding: 18 }}>
          <h4
            style={{
              margin: "0 0 14px",
              fontSize: 13,
              fontWeight: 900,
              color: "#111827",
            }}
          >
            🌐 Tarjima holati
          </h4>
          {[
            {
              l: "Sarlavha (UZ→EN→RU)",
              ok: doneTitle || (!!titleEn && !!titleRu),
              loading: loadingTitle,
            },
            {
              l: "Tavsif (UZ→EN→RU)",
              ok: doneDesc || (!!descEn && !!descRu),
              loading: loadingDesc,
            },
            {
              l: "Retsept tarjimasi",
              ok: (doneIngr || doneSteps) && showRecipe,
              loading: loadingIngr || loadingSteps,
            },
          ].map(({ l, ok, loading }) => (
            <div
              key={l}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 7,
                  flexShrink: 0,
                  background: ok
                    ? "rgba(29,185,84,0.12)"
                    : loading
                      ? "rgba(245,158,11,0.12)"
                      : "rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {loading ? (
                  <Loader2
                    size={11}
                    style={{
                      color: "#f59e0b",
                      animation: "spin .7s linear infinite",
                    }}
                  />
                ) : ok ? (
                  <Check size={11} style={{ color: G }} />
                ) : (
                  <Globe size={11} style={{ color: "#9ca3af" }} />
                )}
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: ok ? G : loading ? "#f59e0b" : "#9ca3af",
                }}
              >
                {l}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// TAOM QO'SHISH
// ══════════════════════════════════════════════════════
function TaomQoshish({
  addRecipe,
  updateRecipe,
  editRecipeId,
  editRecipeData,
  toast,
  onDone,
}: {
  addRecipe: (r: Recipe) => void;
  updateRecipe: (r: Recipe) => void;
  editRecipeId?: string | null;
  editRecipeData?: any;
  toast: (m: string, ok?: boolean) => void;
  onDone: () => void;
}) {
  const [nameUz, setNameUz] = useState(editRecipeData?.name?.uz || "");
  const [nameEn, setNameEn] = useState(editRecipeData?.name?.en || "");
  const [descUz, setDescUz] = useState(editRecipeData?.description?.uz || "");
  const [descEn, setDescEn] = useState(editRecipeData?.description?.en || "");
  const [image, setImage] = useState(editRecipeData?.image || "");
  const [country, setCountry] = useState(editRecipeData?.country || "uzbek");
  const [time, setTime] = useState(String(editRecipeData?.time || 30));
  const [servings, setServings] = useState(
    String(editRecipeData?.servings || 4),
  );
  const [category, setCategory] = useState(
    editRecipeData?.category || "dinner",
  );
  const [calories, setCalories] = useState(
    editRecipeData?.calories ? String(editRecipeData.calories) : "",
  );
  const [ingrUz, setIngrUz] = useState(
    editRecipeData?.ingredients?.map((i: any) => i.uz).join("\n") || "",
  );
  const [ingrEn, setIngrEn] = useState(
    editRecipeData?.ingredients?.map((i: any) => i.en).join("\n") || "",
  );
  const [stepsUz, setStepsUz] = useState(
    editRecipeData?.steps?.map((s: any) => s.uz).join("\n") || "",
  );
  const [stepsEn, setStepsEn] = useState(
    editRecipeData?.steps?.map((s: any) => s.en).join("\n") || "",
  );

  const [loadingName, setLoadingName] = useState(false);
  const [doneName, setDoneName] = useState(false);
  const [loadingDesc, setLoadingDesc] = useState(false);
  const [doneDesc, setDoneDesc] = useState(false);
  const [loadingIngr, setLoadingIngr] = useState(false);
  const [doneIngr, setDoneIngr] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState(false);
  const [doneSteps, setDoneSteps] = useState(false);
  const [err, setErr] = useState("");

  const trName = async () => {
    if (!nameUz.trim()) {
      toast("O'zbek nomi kiriting!", false);
      return;
    }
    setLoadingName(true);
    const { en } = await translateBoth(nameUz);
    setNameEn(en);
    setDoneName(true);
    setLoadingName(false);
    toast("Nom tarjima qilindi! ✅");
  };
  const trDesc2 = async () => {
    if (!descUz.trim()) {
      toast("O'zbek tavsif kiriting!", false);
      return;
    }
    setLoadingDesc(true);
    const { en } = await translateBoth(descUz);
    setDescEn(en);
    setDoneDesc(true);
    setLoadingDesc(false);
    toast("Tavsif tarjima qilindi! ✅");
  };
  const trIngr2 = async () => {
    if (!ingrUz.trim()) {
      toast("Ingredientlar kiriting!", false);
      return;
    }
    setLoadingIngr(true);
    const { en } = await translateBoth(ingrUz);
    setIngrEn(en);
    setDoneIngr(true);
    setLoadingIngr(false);
    toast("Ingredientlar tarjima qilindi! ✅");
  };
  const trSteps2 = async () => {
    if (!stepsUz.trim()) {
      toast("Qadamlar kiriting!", false);
      return;
    }
    setLoadingSteps(true);
    const { en } = await translateBoth(stepsUz);
    setStepsEn(en);
    setDoneSteps(true);
    setLoadingSteps(false);
    toast("Qadamlar tarjima qilindi! ✅");
  };

  const handleSave = () => {
    if (!nameUz.trim()) {
      setErr("Nomi (UZ) majburiy!");
      return;
    }
    const inUZ = ingrUz.split("\n").filter(Boolean),
      inEN = ingrEn.split("\n").filter(Boolean);
    const stUZ = stepsUz.split("\n").filter(Boolean),
      stEN = stepsEn.split("\n").filter(Boolean);
    const rec: Recipe = {
      id: editRecipeId || String(Date.now()),
      name: { uz: nameUz, en: nameEn || nameUz },
      description: { uz: descUz, en: descEn || descUz },
      image:
        image ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      country,
      time: Number(time) || 30,
      servings: Number(servings) || 4,
      category,
      calories: calories ? Number(calories) : undefined,
      ingredients: inUZ.map((u, i) => ({ uz: u, en: inEN[i] || u })),
      steps: stUZ.map((u, i) => ({ uz: u, en: stEN[i] || u })),
    };
    if (editRecipeId) {
      updateRecipe(rec);
      toast("Taom yangilandi ✅", true);
    } else {
      addRecipe(rec);
      toast("Yangi taom qo'shildi ✅", true);
    }
    onDone();
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 280px",
        gap: 20,
        alignItems: "start",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ ...card, padding: 24 }}>
          <SectionTitle
            emoji="🍽️"
            title={editRecipeId ? "Taomni Tahrirlash" : "Yangi Taom Qo'shish"}
            sub="Retsept ma'lumotlari"
          />
          {err && (
            <div
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#ef4444",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              ⚠ {err}
            </div>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div>
              <label style={lbl}>🇺🇿 Nomi (O'zbek) *</label>
              <FInput
                value={nameUz}
                onChange={(v) => {
                  setNameUz(v);
                  setDoneName(false);
                  setErr("");
                }}
                placeholder="Osh (Palov)"
              />
            </div>
            <div>
              <label style={lbl}>🇬🇧 Nomi (English)</label>
              <FInput
                value={nameEn}
                onChange={setNameEn}
                placeholder="Plov (Pilaf)"
                disabled={loadingName}
              />
            </div>
          </div>
          <TrBtn
            loading={loadingName}
            done={doneName}
            disabled={!nameUz.trim()}
            onClick={trName}
          />
          <div style={{ marginTop: 8 }}>
            <label style={lbl}>🖼️ Rasm URL</label>
            <FInput
              value={image}
              onChange={setImage}
              placeholder="https://images.unsplash.com/..."
              icon={Img}
            />
            {image && (
              <div
                style={{
                  marginTop: 10,
                  borderRadius: 12,
                  overflow: "hidden",
                  height: 100,
                }}
              >
                <img
                  src={image}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>

        <div style={{ ...card, padding: 24 }}>
          <SectionTitle emoji="📊" title="Taom Ma'lumotlari" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div>
              <label style={lbl}>Kategoriya</label>
              <select
                style={{ ...inpStyle(), cursor: "pointer" }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {recipeCategoryList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji} {c.uz}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={lbl}>⏱ Vaqt (daqiqa)</label>
              <FInput
                type="number"
                value={time}
                onChange={setTime}
                placeholder="30"
              />
            </div>
            <div>
              <label style={lbl}>🍽️ Porsiya</label>
              <FInput
                type="number"
                value={servings}
                onChange={setServings}
                placeholder="4"
              />
            </div>
            <div>
              <label style={lbl}>🔥 Kaloriya</label>
              <FInput
                type="number"
                value={calories}
                onChange={setCalories}
                placeholder="450"
                suffix="kcal"
              />
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <label style={lbl}>🌍 Davlat</label>
              <FInput
                value={country}
                onChange={setCountry}
                placeholder="uzbek"
              />
            </div>
          </div>
        </div>

        <div style={{ ...card, padding: 24 }}>
          <SectionTitle emoji="📝" title="Tavsif" />
          <div style={{ marginBottom: 10 }}>
            <label style={lbl}>🇺🇿 O'zbek</label>
            <FInput
              value={descUz}
              onChange={(v) => {
                setDescUz(v);
                setDoneDesc(false);
              }}
              placeholder="Bu taom haqida..."
              multiline
              rows={3}
            />
          </div>
          <TrBtn
            loading={loadingDesc}
            done={doneDesc}
            disabled={!descUz.trim()}
            onClick={trDesc2}
          />
          <div>
            <label style={lbl}>🇬🇧 English</label>
            <FInput
              value={descEn}
              onChange={setDescEn}
              placeholder="About this recipe..."
              multiline
              rows={3}
              disabled={loadingDesc}
            />
          </div>
        </div>

        <div style={{ ...card, padding: 24 }}>
          <SectionTitle
            emoji="🥕"
            title="Ingredientlar"
            sub="Har biri yangi qatorda yozing"
          />
          <div style={{ marginBottom: 10 }}>
            <label style={lbl}>🇺🇿 O'zbekcha</label>
            <FInput
              value={ingrUz}
              onChange={(v) => {
                setIngrUz(v);
                setDoneIngr(false);
              }}
              placeholder={"Guruch - 1 kg\nSabzi - 500 g\nPiyoz - 300 g"}
              multiline
              rows={5}
            />
          </div>
          <TrBtn
            loading={loadingIngr}
            done={doneIngr}
            disabled={!ingrUz.trim()}
            onClick={trIngr2}
          />
          <div>
            <label style={lbl}>🇬🇧 English</label>
            <FInput
              value={ingrEn}
              onChange={setIngrEn}
              placeholder={"Rice - 1 kg\nCarrots - 500 g"}
              multiline
              rows={5}
              disabled={loadingIngr}
            />
          </div>
        </div>

        <div style={{ ...card, padding: 24 }}>
          <SectionTitle
            emoji="📋"
            title="Tayyorlash Qadamlari"
            sub="Har bir qadam yangi qatorda"
          />
          <div style={{ marginBottom: 10 }}>
            <label style={lbl}>🇺🇿 O'zbekcha</label>
            <FInput
              value={stepsUz}
              onChange={(v) => {
                setStepsUz(v);
                setDoneSteps(false);
              }}
              placeholder={
                "1. Guruchni yuvib shishiring\n2. Sabzini tiling\n3. ..."
              }
              multiline
              rows={6}
            />
          </div>
          <TrBtn
            loading={loadingSteps}
            done={doneSteps}
            disabled={!stepsUz.trim()}
            onClick={trSteps2}
          />
          <div>
            <label style={lbl}>🇬🇧 English</label>
            <FInput
              value={stepsEn}
              onChange={setStepsEn}
              placeholder={"1. Wash and soak rice\n2. ..."}
              multiline
              rows={6}
              disabled={loadingSteps}
            />
          </div>
        </div>

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
            transition: "all 0.25s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
          }}
        >
          <Check size={20} />{" "}
          {editRecipeId ? "Taomni Saqlash" : "Yangi Taom Qo'shish"}
        </button>
      </div>

      <div
        style={{
          position: "sticky",
          top: 20,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div style={{ ...card, padding: 18 }}>
          <h4
            style={{
              margin: "0 0 14px",
              fontSize: 13,
              fontWeight: 900,
              color: "#111827",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Eye size={14} style={{ color: G }} /> Ko'rinish
          </h4>
          {image && (
            <div
              style={{
                borderRadius: 14,
                overflow: "hidden",
                marginBottom: 12,
                height: 130,
              }}
            >
              <img
                src={image}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt=""
              />
            </div>
          )}
          <div
            style={{
              borderRadius: 14,
              padding: "14px",
              background: "rgba(29,185,84,0.03)",
              border: "1px solid rgba(29,185,84,0.1)",
            }}
          >
            <p
              style={{
                margin: "0 0 4px",
                fontSize: 14,
                fontWeight: 800,
                color: "#111827",
              }}
            >
              {nameUz || "Taom nomi..."}
            </p>
            {nameEn && (
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: 12,
                  color: "#9ca3af",
                  fontStyle: "italic",
                }}
              >
                {nameEn}
              </p>
            )}
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {time && (
                <span
                  style={{
                    fontSize: 10,
                    background: "rgba(0,0,0,0.05)",
                    color: "#9ca3af",
                    padding: "2px 7px",
                    borderRadius: 99,
                  }}
                >
                  ⏱ {time} min
                </span>
              )}
              {servings && (
                <span
                  style={{
                    fontSize: 10,
                    background: "rgba(0,0,0,0.05)",
                    color: "#9ca3af",
                    padding: "2px 7px",
                    borderRadius: 99,
                  }}
                >
                  🍽️ {servings} porsiya
                </span>
              )}
              {calories && (
                <span
                  style={{
                    fontSize: 10,
                    background: "rgba(0,0,0,0.05)",
                    color: "#9ca3af",
                    padding: "2px 7px",
                    borderRadius: 99,
                  }}
                >
                  🔥 {calories} kcal
                </span>
              )}
            </div>
          </div>
        </div>
        <div style={{ ...card, padding: 18 }}>
          <h4
            style={{
              margin: "0 0 12px",
              fontSize: 13,
              fontWeight: 900,
              color: "#111827",
            }}
          >
            🌐 Tarjima holati
          </h4>
          {[
            { l: "Nom", ok: doneName || (!!nameUz && !!nameEn) },
            { l: "Tavsif", ok: doneDesc || (!!descUz && !!descEn) },
            { l: "Ingredientlar", ok: doneIngr || (!!ingrUz && !!ingrEn) },
            { l: "Qadamlar", ok: doneSteps || (!!stepsUz && !!stepsEn) },
          ].map(({ l, ok }) => (
            <div
              key={l}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 9,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 7,
                  flexShrink: 0,
                  background: ok ? "rgba(29,185,84,0.12)" : "rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {ok ? (
                  <Check size={11} style={{ color: G }} />
                ) : (
                  <Languages size={10} style={{ color: "#9ca3af" }} />
                )}
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: ok ? "#374151" : "#9ca3af",
                }}
              >
                {l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// MAIN EXPORT — Tab bilan birlashgan
// ══════════════════════════════════════════════════════
export default function QoshishPage({
  addVideo,
  addRecipe,
  updateRecipe,
  editRecipeId,
  editRecipeData,
  toast,
  onDone,
  onRecipeDone,
}: Props) {
  const [tab, setTab] = useState<"video" | "taom">(
    editRecipeId ? "taom" : "video",
  );

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#111827" }}
        >
          ➕ Yangi Qo'shish
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "#9ca3af" }}>
          Video yoki taom — ikkalasini ham bu yerdan qo'shing
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 0,
          marginBottom: 28,
          background: "rgba(0,0,0,0.04)",
          borderRadius: 16,
          padding: 4,
          width: "fit-content",
        }}
      >
        {(
          [
            ["video", "🎬", "Video Qo'shish"],
            ["taom", "🍽️", "Taom Qo'shish"],
          ] as const
        ).map(([id, e, l]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 28px",
              borderRadius: 13,
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 800,
              transition: "all 0.25s",
              background: tab === id ? "#fff" : "transparent",
              color: tab === id ? "#111827" : "#9ca3af",
              boxShadow: tab === id ? "0 2px 16px rgba(0,0,0,0.1)" : "none",
            }}
          >
            <span style={{ fontSize: 18 }}>{e}</span>
            {l}
            {tab === id && (
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: G,
                  marginLeft: 2,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {tab === "video" && (
        <VideoQoshish addVideo={addVideo} toast={toast} onDone={onDone} />
      )}
      {tab === "taom" && (
        <TaomQoshish
          addRecipe={addRecipe}
          updateRecipe={updateRecipe}
          editRecipeId={editRecipeId}
          editRecipeData={editRecipeData}
          toast={toast}
          onDone={onRecipeDone}
        />
      )}
    </div>
  );
}
