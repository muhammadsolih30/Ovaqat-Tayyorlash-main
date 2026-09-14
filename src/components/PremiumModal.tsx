// src/components/PremiumModal.tsx
// YANGI FAYL — src/components/ papkasiga qo'shing

import { usePremium } from "@/contexts/PremiumContext";
import { useLang } from "@/contexts/LangContext";
import { Crown, X, Zap, Globe, ChefHat, Star } from "lucide-react";

const PremiumModal = () => {
  const { showPremiumModal, closePremiumModal, setIsPremium } = usePremium();
  const { lang } = useLang();

  if (!showPremiumModal) return null;

  const handleBuy = (plan: "monthly" | "yearly") => {
    // Bu yerga to'lov tizimini ulashingiz mumkin
    alert(
      plan === "monthly"
        ? lang === "uz"
          ? "1 Oylik — $18 to'lov sahifasiga o'tilmoqda..."
          : "Monthly $18 — Redirecting to payment..."
        : lang === "uz"
          ? "1 Yillik — $150 to'lov sahifasiga o'tilmoqda..."
          : "Yearly $150 — Redirecting to payment...",
    );
    // Test uchun: setIsPremium(true) — haqiqiy to'lovdan keyin chaqiring
    // setIsPremium(true);
    closePremiumModal();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4"
        style={{
          background: "rgba(13,59,46,0.65)",
          backdropFilter: "blur(8px)",
        }}
        onClick={closePremiumModal}
      >
        {/* Modal */}
        <div
          className="relative w-full max-w-md rounded-3xl overflow-hidden animate-slide-up"
          style={{
            background: "white",
            boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header gradient */}
          <div
            className="relative px-6 pt-8 pb-6 text-center overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, hsl(152 72% 18%) 0%, hsl(148 65% 28%) 100%)",
            }}
          >
            {/* Decorative circles */}
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
              style={{
                background: "hsl(145 65% 60%)",
                transform: "translate(30%, -30%)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-15"
              style={{
                background: "hsl(145 65% 60%)",
                transform: "translate(-30%, 30%)",
              }}
            />

            <button
              onClick={closePremiumModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
            >
              <X size={16} />
            </button>

            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              <Crown size={32} style={{ color: "#f9a825" }} />
            </div>
            <h2
              className="text-2xl font-black text-zinc-900 dark:text-white mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lang === "uz" ? "Premium Obuna" : "Premium Plan"}
            </h2>
            <p className="text-white/70 text-sm">
              {lang === "uz"
                ? "Barcha jahon taomlarini ko'ring"
                : "Unlock all world cuisines"}
            </p>
          </div>

          {/* Plans */}
          <div className="p-5 space-y-3">
            {/* Features */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                {
                  icon: Globe,
                  text: lang === "uz" ? "Barcha mamlakatlar" : "All countries",
                },
                {
                  icon: ChefHat,
                  text: lang === "uz" ? "Maxsus retseptlar" : "Special recipes",
                },
                {
                  icon: Zap,
                  text: lang === "uz" ? "Tezkor yangilanish" : "Fast updates",
                },
                { icon: Star, text: lang === "uz" ? "Reklama yo'q" : "No ads" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 p-2 rounded-xl text-xs font-semibold"
                  style={{
                    background: "hsl(145 55% 95%)",
                    color: "hsl(152 72% 22%)",
                  }}
                >
                  <Icon size={14} style={{ color: "hsl(152 72% 30%)" }} />
                  {text}
                </div>
              ))}
            </div>

            {/* Monthly plan */}
            <div
              className="relative rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.01]"
              style={{
                border: "2px solid hsl(143 40% 80%)",
                background: "hsl(145 55% 97%)",
              }}
              onClick={() => handleBuy("monthly")}
            >
              {/* 5 kun badge */}
              <div
                className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[11px] font-black text-white"
                style={{
                  background: "linear-gradient(135deg, #ff6b35, #f9a825)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              >
                ⏰ {lang === "uz" ? "Faqat 5 kun!" : "5 days only!"}
              </div>
              <p
                className="text-sm font-bold mb-1"
                style={{
                  color: "hsl(150 35% 8%)",
                  fontFamily: "var(--font-display)",
                }}
              >
                📅 {lang === "uz" ? "1 Oylik" : "1 Month"}
              </p>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-2xl font-black"
                  style={{
                    color: "hsl(152 72% 25%)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  $18
                </span>
                <span
                  className="text-sm line-through"
                  style={{ color: "hsl(145 12% 55%)" }}
                >
                  $25
                </span>
              </div>
              <p className="text-xs mt-1" style={{ color: "hsl(145 12% 45%)" }}>
                {lang === "uz" ? "Oylik to'lov" : "Billed monthly"}
              </p>
            </div>

            {/* Yearly plan */}
            <div
              className="relative rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.01]"
              style={{
                border: "2px solid hsl(152 72% 40%)",
                background:
                  "linear-gradient(135deg, hsl(145 55% 95%) 0%, hsl(143 60% 92%) 100%)",
              }}
              onClick={() => handleBuy("yearly")}
            >
              {/* Mashhur badge */}
              <div
                className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[11px] font-black text-white"
                style={{ background: "hsl(152 72% 28%)" }}
              >
                ⭐ {lang === "uz" ? "Mashhur" : "Popular"}
              </div>
              <p
                className="text-sm font-bold mb-1"
                style={{
                  color: "hsl(150 35% 8%)",
                  fontFamily: "var(--font-display)",
                }}
              >
                🗓️ {lang === "uz" ? "1 Yillik" : "1 Year"}
              </p>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-3xl font-black"
                  style={{
                    color: "#e65c00",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  $150
                </span>
                <span
                  className="text-sm line-through"
                  style={{ color: "hsl(145 12% 55%)" }}
                >
                  $300
                </span>
                <span
                  className="text-xs font-black px-2 py-0.5 rounded-full text-white"
                  style={{ background: "#e65c00" }}
                >
                  -50%
                </span>
              </div>
              <p className="text-xs mt-1" style={{ color: "hsl(145 12% 45%)" }}>
                {lang === "uz"
                  ? "Yillik to'lov • Eng tejamkor!"
                  : "Billed yearly • Best value!"}
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => handleBuy("yearly")}
              className="w-full py-4 rounded-2xl font-black text-zinc-900 dark:text-white text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                fontFamily: "var(--font-display)",
                background:
                  "linear-gradient(135deg, hsl(152 72% 28%) 0%, hsl(148 65% 22%) 100%)",
                boxShadow: "0 8px 24px hsl(152 72% 25% / 0.4)",
              }}
            >
              ✨ {lang === "uz" ? "Premium Boshlash" : "Start Premium"}
            </button>

            <p
              className="text-center text-xs"
              style={{ color: "hsl(145 12% 50%)" }}
            >
              {lang === "uz"
                ? "Istalgan vaqt bekor qilish mumkin"
                : "Cancel anytime"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumModal;
