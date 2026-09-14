import { useState, useEffect } from "react";
import { Download, X, Smartphone, Sparkles } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode (already installed)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Check if user previously dismissed today
    const lastDismissed = localStorage.getItem("taomuz_install_dismissed");
    if (lastDismissed) {
      const diff = Date.now() - parseInt(lastDismissed, 10);
      if (diff < 24 * 60 * 60 * 1000) {
        // Dismissed within last 24h
        return;
      }
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Wait a bit before showing to not be intrusive
      const timer = setTimeout(() => {
        setVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setVisible(false);
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem("taomuz_install_dismissed", Date.now().toString());
  };

  if (!visible || isInstalled || !deferredPrompt) {
    return null;
  }

  return (
    <aside aria-label="Ilovani o'rnatish" className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="p-4 rounded-3xl bg-zinc-900/95 border border-emerald-500/40 text-white shadow-2xl shadow-black/80 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 shadow-lg shadow-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <img
                src="/favicon.svg"
                alt="TaomUz"
                className="w-10 h-10 rounded-2xl object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm text-white">TaomUz Ilovasi</h4>
                <Sparkles size={13} className="text-amber-400" />
              </div>
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <Smartphone size={11} /> To'liq oflayn ishlaydi
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 text-zinc-400 hover:text-zinc-200 rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Yopish"
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-xs text-zinc-300 mb-4 leading-relaxed">
          Ilovani qurilmangizga o'rnating va barcha retseptlardan internet yo'q paytda ham bemalol foydalaning!
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="flex-1 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
          >
            <Download size={15} />
            <span>Ilovani o'rnatish</span>
          </button>
          <button
            onClick={handleDismiss}
            className="py-2.5 px-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
          >
            Keyinroq
          </button>
        </div>
      </div>
    </aside>
  );
};

export default InstallPrompt;
