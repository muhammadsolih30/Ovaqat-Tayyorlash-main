import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import {
  Globe,
  Shield,
  ChevronRight,
  Info,
  Star,
  Heart,
  Leaf,
} from "lucide-react";

interface ProfileSectionProps {
  onOpenAdmin?: () => void;
}

const ProfileSection = ({ onOpenAdmin }: ProfileSectionProps) => {
  const { lang, setLang, t } = useLang();
  const [showAdminHint, setShowAdminHint] = useState(false);

  return (
    <div className="p-4 pb-24 md:pb-8 animate-fade-in">
      {/* Profile hero */}
      <div
        className="rounded-3xl p-6 mb-5 text-center"
        style={{
          background:
            "linear-gradient(135deg, hsl(152 72% 28%) 0%, hsl(148 65% 22%) 100%)",
        }}
      >
        <div
          className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
          style={{
            background: "hsl(0 0% 100% / 0.18)",
            border: "3px solid hsl(0 0% 100% / 0.3)",
          }}
        >
          👨‍🍳
        </div>
        <h2
          className="font-bold text-xl text-white mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("profile")}
        </h2>
        <p className="text-white/60 text-sm">
          {lang === "uz"
            ? "Ilovadan foydalanganingiz uchun rahmat!"
            : "Thank you for using the app!"}
        </p>
      </div>

      {/* Language */}
      <div
        className="rounded-2xl p-5 mb-4"
        style={{
          background: "hsl(0 0% 100%)",
          border: "1.5px solid hsl(140 22% 87%)",
          boxShadow: "0 2px 12px hsl(152 40% 25% / 0.08)",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "hsl(145 55% 92%)" }}
          >
            <Globe size={17} style={{ color: "hsl(152 72% 28%)" }} />
          </div>
          <div>
            <h3
              className="font-bold text-sm"
              style={{
                fontFamily: "var(--font-display)",
                color: "hsl(150 35% 8%)",
              }}
            >
              {t("language")}
            </h3>
            <p className="text-xs" style={{ color: "hsl(145 12% 45%)" }}>
              {lang === "uz" ? "Tilni tanlang" : "Choose language"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setLang("uz")}
            className="py-3 rounded-xl text-sm font-semibold transition-all"
            style={
              lang === "uz"
                ? {
                    background:
                      "linear-gradient(135deg, hsl(152 72% 28%) 0%, hsl(148 65% 22%) 100%)",
                    color: "white",
                    boxShadow: "0 4px 14px hsl(152 72% 25% / 0.4)",
                  }
                : {
                    background: "hsl(145 55% 92%)",
                    color: "hsl(152 72% 22%)",
                    border: "1.5px solid hsl(143 40% 85%)",
                  }
            }
          >
            🇺🇿 O'zbekcha
          </button>
          <button
            onClick={() => setLang("en")}
            className="py-3 rounded-xl text-sm font-semibold transition-all"
            style={
              lang === "en"
                ? {
                    background:
                      "linear-gradient(135deg, hsl(152 72% 28%) 0%, hsl(148 65% 22%) 100%)",
                    color: "white",
                    boxShadow: "0 4px 14px hsl(152 72% 25% / 0.4)",
                  }
                : {
                    background: "hsl(145 55% 92%)",
                    color: "hsl(152 72% 22%)",
                    border: "1.5px solid hsl(143 40% 85%)",
                  }
            }
          >
            🇬🇧 English
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          {
            icon: Heart,
            label: lang === "uz" ? "Saqlangan" : "Saved",
            value: "—",
          },
          {
            icon: Star,
            label: lang === "uz" ? "Retseptlar" : "Recipes",
            value: "50+",
          },
          {
            icon: Leaf,
            label: lang === "uz" ? "Kategoriya" : "Categories",
            value: "12",
          },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="rounded-2xl p-3 text-center"
            style={{
              background: "hsl(145 55% 95%)",
              border: "1.5px solid hsl(143 40% 86%)",
            }}
          >
            <Icon
              size={18}
              className="mx-auto mb-1.5"
              style={{ color: "hsl(152 72% 28%)" }}
            />
            <div
              className="text-lg font-black"
              style={{
                fontFamily: "var(--font-display)",
                color: "hsl(150 35% 8%)",
              }}
            >
              {value}
            </div>
            <div
              className="text-[10px] font-medium"
              style={{ color: "hsl(145 12% 45%)" }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* About */}
      <div
        className="rounded-2xl p-5 mb-4"
        style={{
          background: "hsl(145 55% 95%)",
          border: "1.5px solid hsl(143 40% 86%)",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Info size={18} style={{ color: "hsl(152 72% 28%)" }} />
          <h3
            className="font-bold text-sm"
            style={{
              fontFamily: "var(--font-display)",
              color: "hsl(150 35% 8%)",
            }}
          >
            {lang === "uz" ? "Ilova haqida" : "About App"}
          </h3>
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "hsl(145 18% 35%)" }}
        >
          {lang === "uz"
            ? "Sog'lom va mazali ovqatlar tayyorlashni o'rganing. Yuzlab retseptlar, video darsliklar va foydali maslahatlar siz bilan!"
            : "Learn to cook healthy and delicious meals. Hundreds of recipes, video tutorials and useful tips are with you!"}
        </p>
        <div
          className="mt-3 pt-3 flex items-center justify-between"
          style={{ borderTop: "1px solid hsl(143 40% 82%)" }}
        >
          <span
            className="text-xs font-bold"
            style={{ color: "hsl(152 72% 28%)" }}
          >
            CookTube v2.0
          </span>
          <span className="text-xs" style={{ color: "hsl(145 12% 50%)" }}>
            © 2024
          </span>
        </div>
      </div>

      {/* ===== ADMIN KIRISH TUGMASI ===== */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1.5px solid hsl(140 22% 87%)" }}
      >
        <button
          onClick={() => setShowAdminHint(!showAdminHint)}
          className="w-full flex items-center justify-between p-4 transition-all"
          style={{
            background: showAdminHint ? "hsl(152 72% 28%)" : "hsl(0 0% 100%)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: showAdminHint
                  ? "rgba(255,255,255,0.2)"
                  : "hsl(145 55% 92%)",
              }}
            >
              <Shield
                size={17}
                style={{ color: showAdminHint ? "white" : "hsl(152 72% 28%)" }}
              />
            </div>
            <div className="text-left">
              <h3
                className="font-bold text-sm"
                style={{
                  fontFamily: "var(--font-display)",
                  color: showAdminHint ? "white" : "hsl(150 35% 8%)",
                }}
              >
                {lang === "uz" ? "Admin sifatida kirish" : "Admin Access"}
              </h3>
              <p
                className="text-xs"
                style={{
                  color: showAdminHint
                    ? "rgba(255,255,255,0.65)"
                    : "hsl(145 12% 45%)",
                }}
              >
                {lang === "uz" ? "Sayt boshqaruvi" : "Site management"}
              </p>
            </div>
          </div>
          <ChevronRight
            size={18}
            style={{
              color: showAdminHint ? "white" : "hsl(152 72% 28%)",
              transform: showAdminHint ? "rotate(90deg)" : "none",
              transition: "transform 0.2s",
            }}
          />
        </button>

        {showAdminHint && (
          <div
            className="p-4"
            style={{
              background: "hsl(145 55% 97%)",
              borderTop: "1px solid hsl(143 40% 88%)",
            }}
          >
            <p className="text-xs mb-3" style={{ color: "hsl(145 18% 40%)" }}>
              {lang === "uz"
                ? "Admin paneliga kirish uchun maxsus login va parol kerak. Faqat vakolatli foydalanuvchilar uchun."
                : "Admin panel requires special credentials. Authorized users only."}
            </p>
            <button
              onClick={() => onOpenAdmin?.()}
              className="w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(135deg, hsl(152 72% 28%) 0%, hsl(148 65% 22%) 100%)",
                boxShadow: "0 4px 15px hsl(152 72% 25% / 0.35)",
                fontFamily: "var(--font-display)",
              }}
            >
              <Shield size={16} />
              {lang === "uz" ? "Admin Paneliga Kirish" : "Enter Admin Panel"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
