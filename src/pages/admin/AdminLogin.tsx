import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
  Lock,
  User,
  ChefHat,
  Utensils,
} from "lucide-react";

interface AdminLoginProps {
  onSuccess: () => void;
  onBack: () => void;
}

const AdminLogin = ({ onSuccess, onBack }: AdminLoginProps) => {
  const { adminLogin } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    await new Promise((r) => setTimeout(r, 800));

    const ok = adminLogin(username.trim(), password);
    setLoading(false);

    if (ok) {
      onSuccess();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError(
        newAttempts >= 3
          ? `Noto'g'ri ma'lumot! (${newAttempts} urinish) Ehtiyot bo'ling.`
          : "Noto'g'ri foydalanuvchi nomi yoki parol!",
      );
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background:
          "linear-gradient(135deg, #020d06 0%, #071a0e 40%, #0a2415 70%, #0d2e1a 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background circles */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {[
          { size: 400, top: "-10%", left: "-5%", delay: "0s" },
          { size: 300, top: "60%", left: "70%", delay: "1.5s" },
          { size: 200, top: "30%", left: "80%", delay: "0.8s" },
          { size: 150, top: "70%", left: "10%", delay: "2s" },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: c.size,
              height: c.size,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(29,185,84,0.12) 0%, transparent 70%)",
              top: c.top,
              left: c.left,
              animation: `breathe 4s ease-in-out ${c.delay} infinite`,
            }}
          />
        ))}
        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(29,185,84,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(29,185,84,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Main card */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 440,
          animation: shake ? "shake 0.5s ease" : "slideUp 0.6s ease",
        }}
      >
        {/* Top badge */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 99,
              background: "rgba(29,185,84,0.15)",
              border: "1px solid rgba(29,185,84,0.3)",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#1DB954",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                color: "#1DB954",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              SUPER ADMIN TIZIMI
            </span>
          </div>

          {/* Logo */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 24,
              margin: "0 auto 16px",
              background: "linear-gradient(135deg, #1DB954 0%, #15803d 100%)",
              boxShadow:
                "0 0 0 1px rgba(29,185,84,0.3), 0 0 40px rgba(29,185,84,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <ChefHat size={38} style={{ color: "#fff" }} />
            <div
              style={{
                position: "absolute",
                bottom: -4,
                right: -4,
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0d2818, #166534)",
                border: "2px solid #1DB954",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShieldCheck size={12} style={{ color: "#1DB954" }} />
            </div>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            Taom<span style={{ color: "#1DB954" }}>Uz</span>
          </h1>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              fontWeight: 500,
            }}
          >
            Admin paneliga kirish
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 28,
            padding: 32,
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontSize: 11,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Foydalanuvchi nomi
              </label>
              <div style={{ position: "relative" }}>
                <User
                  size={15}
                  style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#1DB954",
                  }}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username kiriting"
                  required
                  autoComplete="off"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "14px 16px 14px 44px",
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.06)",
                    border: `1.5px solid ${error ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)"}`,
                    color: "#fff",
                    fontSize: 14,
                    outline: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "border 0.2s, background 0.2s",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1.5px solid #1DB954";
                    e.target.style.background = "rgba(29,185,84,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = `1.5px solid ${error ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)"}`;
                    e.target.style.background = "rgba(255,255,255,0.06)";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontSize: 11,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Parol
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={15}
                  style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#1DB954",
                  }}
                />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "14px 48px 14px 44px",
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.06)",
                    border: `1.5px solid ${error ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)"}`,
                    color: "#fff",
                    fontSize: 14,
                    outline: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "border 0.2s, background 0.2s",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1.5px solid #1DB954";
                    e.target.style.background = "rgba(29,185,84,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = `1.5px solid ${error ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)"}`;
                    e.target.style.background = "rgba(255,255,255,0.06)";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.3)",
                    display: "flex",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.3)")
                  }
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 16px",
                  borderRadius: 14,
                  marginBottom: 16,
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  animation: "fadeIn 0.3s ease",
                }}
              >
                <AlertCircle
                  size={15}
                  style={{ color: "#f87171", flexShrink: 0 }}
                />
                <span
                  style={{ fontSize: 13, color: "#fca5a5", fontWeight: 600 }}
                >
                  {error}
                </span>
              </div>
            )}

            {/* Attempts warning */}
            {attempts >= 2 && !error && (
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  marginBottom: 16,
                  background: "rgba(245,158,11,0.1)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  fontSize: 12,
                  color: "#fbbf24",
                  fontWeight: 600,
                }}
              >
                ⚠️ Ogohlantirish: Ko'p marta noto'g'ri urinish qayd etildi
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !username || !password}
              style={{
                width: "100%",
                padding: "15px 24px",
                borderRadius: 18,
                border: "none",
                cursor: loading ? "wait" : "pointer",
                background:
                  loading || !username || !password
                    ? "rgba(29,185,84,0.3)"
                    : "linear-gradient(135deg, #1DB954 0%, #15803d 100%)",
                boxShadow:
                  loading || !username || !password
                    ? "none"
                    : "0 8px 30px rgba(29,185,84,0.4)",
                color: "#fff",
                fontSize: 15,
                fontWeight: 900,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "all 0.3s",
                transform: "scale(1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {loading ? (
                <>
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      border: "2.5px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                    }}
                  />
                  Tekshirilmoqda...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Tizimga kirish
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              margin: "20px 0 16px",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.08)",
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.2)",
                fontWeight: 600,
              }}
            >
              YOKI
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.08)",
              }}
            />
          </div>

          <button
            onClick={onBack}
            style={{
              width: "100%",
              padding: "13px 24px",
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
              cursor: "pointer",
              color: "rgba(255,255,255,0.45)",
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.color = "rgba(255,255,255,0.45)";
            }}
          >
            <Utensils size={14} />
            Saytga qaytish
          </button>
        </div>

        {/* Footer note */}
        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 11,
            color: "rgba(255,255,255,0.2)",
            fontWeight: 500,
          }}
        >
          🔒 Barcha harakatlar qayd etiladi
        </p>
      </div>

      <style>{`
        @keyframes breathe { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.15);opacity:1} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-10px)} 40%{transform:translateX(10px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-5px)} to{opacity:1;transform:translateY(0)} }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
};

export default AdminLogin;
