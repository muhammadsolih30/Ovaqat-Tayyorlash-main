import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Leaf,
  AlertCircle,
  Lock,
  User,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simulate slight delay for UX
    await new Promise((r) => setTimeout(r, 600));
    const ok = adminLogin(username.trim(), password);
    setLoading(false);
    if (ok) {
      onSuccess();
    } else {
      setError("Noto'g'ri foydalanuvchi nomi yoki parol!");
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #0d2818 0%, #15803d 50%, #14532d 100%)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              background: "rgba(29,185,84,0.3)",
              top: `${10 + i * 15}%`,
              left: `${5 + i * 15}%`,
              animation: `pulse ${2 + i * 0.5}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      <div
        className={`relative w-full max-w-md rounded-3xl p-8 ${shake ? "animate-shake" : ""}`}
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
          animation: shake ? "shake 0.5s ease" : undefined,
        }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #1DB954, #15803d)",
              boxShadow: "0 8px 25px rgba(29,185,84,0.4)",
            }}
          >
            <ShieldCheck size={32} className="text-white" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf size={16} style={{ color: "#1DB954" }} />
            <span className="text-white font-black text-lg">
              Cook<span style={{ color: "#1DB954" }}>Tube</span>
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mb-1">Admin Panel</h1>
          <p className="text-white/50 text-sm">
            Tizimga kirish uchun ma'lumotlarni kiriting
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-white/70 text-xs font-bold uppercase tracking-wider mb-2 block">
              Foydalanuvchi nomi
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: "#1DB954" }}
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin username"
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-white text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onFocus={(e) => (e.target.style.border = "1.5px solid #1DB954")}
                onBlur={(e) =>
                  (e.target.style.border = "1.5px solid rgba(255,255,255,0.15)")
                }
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-white/70 text-xs font-bold uppercase tracking-wider mb-2 block">
              Parol
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: "#1DB954" }}
              />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-11 pr-12 py-3.5 rounded-2xl text-white text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onFocus={(e) => (e.target.style.border = "1.5px solid #1DB954")}
                onBlur={(e) =>
                  (e.target.style.border = "1.5px solid rgba(255,255,255,0.15)")
                }
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
              style={{
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#fca5a5",
              }}
            >
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl font-black text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 mt-2"
            style={{
              background: "linear-gradient(135deg, #1DB954, #15803d)",
              boxShadow: "0 8px 25px rgba(29,185,84,0.4)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "15px",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Tekshirilmoqda...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <ShieldCheck size={18} /> Admin sifatida kirish
              </span>
            )}
          </button>

          {/* Back */}
          <button
            type="button"
            onClick={onBack}
            className="w-full py-3 rounded-2xl text-white/50 text-sm font-semibold hover:text-white transition-colors"
          >
            ← Orqaga qaytish
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.5s ease; }
      `}</style>
    </div>
  );
};

export default AdminLogin;
