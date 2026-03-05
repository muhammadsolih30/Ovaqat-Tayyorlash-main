// src/components/ProfileSection.tsx
// MAVJUD FAYLNI BU KOD BILAN ALMASHTIRING

import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { usePremium } from "@/contexts/PremiumContext";
import {
  Globe,
  Shield,
  ChevronRight,
  Info,
  Star,
  Heart,
  Leaf,
  Crown,
  Check,
} from "lucide-react";

interface ProfileSectionProps {
  onOpenAdmin?: () => void;
}

const ProfileSection = ({ onOpenAdmin }: ProfileSectionProps) => {
  const { lang, setLang, t } = useLang();
  const { isPremium, openPremiumModal } = usePremium();
  const [showAdminHint, setShowAdminHint] = useState(false);

  return (
    <div className="p-4 pb-24 md:pb-8 animate-fade-in">
      {/* Profile hero */}
      <div
        className="rounded-3xl p-6 mb-5 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, hsl(152 72% 18%) 0%, hsl(148 65% 12%) 100%)",
        }}
      >
        {/* Decorative */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-15"
          style={{
            background: "hsl(145 65% 55%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl relative z-10"
          style={{
            background: "hsl(0 0% 100% / 0.15)",
            border: "3px solid hsl(0 0% 100% / 0.25)",
          }}
        >
          👨‍🍳
        </div>
        <h2
          className="font-bold text-xl text-white mb-1 relative z-10"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("profile")}
        </h2>
        <p className="text-white/60 text-sm relative z-10">
          {lang === "uz"
            ? "Ilovadan foydalanganingiz uchun rahmat!"
            : "Thank you for using the app!"}
        </p>
        {isPremium && (
          <div
            className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full text-xs font-black relative z-10"
            style={{ background: "rgba(249,168,37,0.25)", color: "#f9a825" }}
          >
            <Crown size={12} />
            Premium Foydalanuvchi
          </div>
        )}
      </div>

      {/* Premium CTA (agar premium emas bo'lsa) */}
      {!isPremium && (
        <button
          onClick={openPremiumModal}
          className="w-full rounded-2xl p-4 mb-4 flex items-center justify-between transition-all hover:scale-[1.01] active:scale-[0.99]"
          style={{
            background: "linear-gradient(135deg, #fff8e1 0%, #fff3cd 100%)",
            border: "2px solid #f9a825",
            boxShadow: "0 6px 20px rgba(249,168,37,0.2)",
          }}
        >
          <div className="text-left">
            <div
              className="font-black text-base mb-0.5"
              style={{
                fontFamily: "var(--font-display)",
                color: "hsl(150 35% 8%)",
              }}
            >
              👑 Premium olish
            </div>
            <div
              className="text-xs font-semibold"
              style={{ color: "hsl(145 12% 45%)" }}
            >
              {lang === "uz"
                ? "Barcha jahon taomlarini ko'ring"
                : "Unlock all world cuisines"}
            </div>
          </div>
          <div className="flex items-center gap-1" style={{ color: "#e65c00" }}>
            <span
              className="font-black text-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              $18
            </span>
            <ChevronRight size={18} />
          </div>
        </button>
      )}

      {/* Premium faol bo'lsa */}
      {isPremium && (
        <div
          className="w-full rounded-2xl p-4 mb-4 flex items-center gap-3"
          style={{
            background: "hsl(145 55% 95%)",
            border: "2px solid hsl(152 72% 40%)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "hsl(152 72% 28%)" }}
          >
            <Check size={18} className="text-white" />
          </div>
          <div>
            <div
              className="font-black text-sm"
              style={{
                fontFamily: "var(--font-display)",
                color: "hsl(150 35% 8%)",
              }}
            >
              Premium Faol ✓
            </div>
            <div className="text-xs" style={{ color: "hsl(152 72% 28%)" }}>
              {lang === "uz" ? "Barcha taomlar ochiq" : "All recipes unlocked"}
            </div>
          </div>
        </div>
      )}

      {/* Language */}
      <div
        className="rounded-2xl p-5 mb-4"
        style={{
          background: "white",
          border: "1.5px solid hsl(140 22% 87%)",
          boxShadow: "0 2px 12px hsl(152 40% 25% / 0.07)",
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
          {(["uz", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="py-3 rounded-xl text-sm font-semibold transition-all"
              style={
                lang === l
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
              {l === "uz" ? "🇺🇿 O'zbekcha" : "🇬🇧 English"}
            </button>
          ))}
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

      {/* Admin */}
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
                ? "Admin paneliga kirish uchun maxsus login va parol kerak."
                : "Admin panel requires special credentials."}
            </p>
            <button
              onClick={() => onOpenAdmin?.()}
              className="w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
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
