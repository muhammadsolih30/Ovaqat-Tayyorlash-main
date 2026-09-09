import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { X, ChefHat, LogIn, Sparkles, User, Mail, Lock } from "lucide-react";

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(name || (mode === "login" ? "Aziz Foydalanuvchi" : "Yangi Oshpaz"), email || "user@taom.uz");
  };

  const handleGoogleMock = () => {
    login("Google Foydalanuvchisi", "google.user@gmail.com");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={closeLoginModal}
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl transition-all"
        style={{
          background: "linear-gradient(180deg, #18181b 0%, #0f0f11 100%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(22, 163, 74, 0.15)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeLoginModal}
          className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header Branding */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-3">
            <ChefHat size={28} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Taom<span className="text-emerald-500">.uz</span>
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            {mode === "login"
              ? "Videolarga like bosish, izoh qoldirish va sevimli qilish uchun kiring"
              : "Yangi akkaunt ochib, eng sara retseptlarni o'rganing"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === "register" && (
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Ismingiz
              </label>
              <div className="relative flex items-center">
                <User size={17} className="absolute left-3.5 text-zinc-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ism familiyangiz"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Email yoki Telefon
            </label>
            <div className="relative flex items-center">
              <Mail size={17} className="absolute left-3.5 text-zinc-500" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="misol@taom.uz"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Parol
            </label>
            <div className="relative flex items-center">
              <Lock size={17} className="absolute left-3.5 text-zinc-500" />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-[0.98] transition-all"
          >
            <LogIn size={18} />
            {mode === "login" ? "Kirish" : "Ro'yxatdan o'tish"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-zinc-800" />
          <span className="px-3 text-xs text-zinc-500 uppercase">yoki</span>
          <div className="flex-1 border-t border-zinc-800" />
        </div>

        {/* Google Mock */}
        <button
          onClick={handleGoogleMock}
          type="button"
          className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-700/70 text-zinc-200 text-sm font-medium flex items-center justify-center gap-2.5 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          Google orqali davom etish
        </button>

        {/* Switch Mode Footer */}
        <div className="mt-5 text-center text-xs text-zinc-400">
          {mode === "login" ? (
            <p>
              Akkauntingiz yo'qmi?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="text-emerald-400 hover:underline font-semibold"
              >
                Ro'yxatdan o'tish
              </button>
            </p>
          ) : (
            <p>
              Hisobingiz bormi?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-emerald-400 hover:underline font-semibold"
              >
                Kirish
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
