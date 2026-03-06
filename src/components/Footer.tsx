import { useLang } from "@/contexts/LangContext";
import { UtensilsCrossed, Instagram, Youtube, Send } from "lucide-react";

const Footer = () => {
  const { lang } = useLang();

  const categories = [
    { uz: "O'zbek taomlari", en: "Uzbek Dishes" },
    { uz: "Tez taomlar", en: "Fast Food" },
    { uz: "Sog'lom ovqat", en: "Healthy Food" },
    { uz: "Shirinliklar", en: "Desserts" },
    { uz: "Nonushta", en: "Breakfast" },
    { uz: "Kabob & Gril", en: "Kabob & Grill" },
  ];

  const pages = [
    { uz: "Bosh sahifa", en: "Home" },
    { uz: "Trend", en: "Trending" },
    { uz: "Sevimlilar", en: "Saved" },
    { uz: "Dunyo", en: "World" },
  ];

  return (
    <footer
      style={{
        background: "hsl(150 35% 8%)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        paddingBottom: "calc(90px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "44px 24px 36px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 36,
        }}
      >
        {/* Logo + tavsif */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "hsl(152 72% 28%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UtensilsCrossed size={20} color="#fff" />
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>
              Taom<span style={{ color: "hsl(152 62% 50%)" }}>Uz</span>
            </span>
          </div>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 210,
              marginBottom: 20,
            }}
          >
            {lang === "uz"
              ? "O'zbek va jahon taomlarining eng yaxshi retseptlari bir joyda."
              : "The best Uzbek and world cuisine recipes in one place."}
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {(
              [
                ["Instagram", Instagram],
                ["YouTube", Youtube],
                ["Telegram", Send],
              ] as const
            ).map(([label, Icon]) => (
              <button
                key={label}
                title={label}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>

        {/* Kategoriyalar */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "hsl(152 62% 50%)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 16,
            }}
          >
            {lang === "uz" ? "Kategoriyalar" : "Categories"}
          </p>
          {categories.map((item) => (
            <p
              key={item.uz}
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.45)",
                marginBottom: 10,
                cursor: "pointer",
              }}
            >
              {lang === "uz" ? item.uz : item.en}
            </p>
          ))}
        </div>

        {/* Sahifalar */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "hsl(152 62% 50%)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 16,
            }}
          >
            {lang === "uz" ? "Sahifalar" : "Pages"}
          </p>
          {pages.map((item) => (
            <p
              key={item.uz}
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.45)",
                marginBottom: 10,
                cursor: "pointer",
              }}
            >
              {lang === "uz" ? item.uz : item.en}
            </p>
          ))}
        </div>

        {/* Aloqa */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "hsl(152 62% 50%)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 16,
            }}
          >
            {lang === "uz" ? "Aloqa" : "Contact"}
          </p>
          {["📧 info@taomuz.uz", "📱 @taomuz", "📍 Toshkent, O'zbekiston"].map(
            (item) => (
              <p
                key={item}
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 10,
                }}
              >
                {item}
              </p>
            ),
          )}
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: "rgba(255,255,255,0.07)",
          margin: "0 24px",
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
          © 2025 TaomUz.{" "}
          {lang === "uz"
            ? "Barcha huquqlar himoyalangan."
            : "All rights reserved."}
        </p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
          {lang === "uz"
            ? "Muhabbat bilan tayyorlangan 🍽️"
            : "Made with love 🍽️"}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
