import { useState, useEffect } from "react";
import { WifiOff, Wifi, X, Info } from "lucide-react";

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const [showRestored, setShowRestored] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowRestored(true);
      setDismissed(false);
      const timer = setTimeout(() => {
        setShowRestored(false);
      }, 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowRestored(false);
      setDismissed(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline && !showRestored) {
    return null;
  }

  if (dismissed && !isOnline) {
    // Show a minimal floating badge when dismissed
    return (
      <button
        onClick={() => setDismissed(false)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/90 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-500/20 backdrop-blur hover:bg-amber-400 transition-all animate-fade-in"
        title="Oflayn rejim faol - ko'rish uchun bosing"
      >
        <WifiOff size={14} />
        <span>Oflayn</span>
      </button>
    );
  }

  return (
    <aside aria-label="Tarmoq holati" className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-lg animate-in slide-in-from-top-4 duration-300">
      {showRestored ? (
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-950/40 border border-emerald-400/40 backdrop-blur-md">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1 rounded-full bg-white/20">
              <Wifi size={16} className="animate-pulse" />
            </div>
            <p className="text-xs sm:text-sm font-semibold truncate">
              Internet aloqasi tiklandi!
            </p>
          </div>
          <button
            onClick={() => setShowRestored(false)}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors text-white/80 hover:text-white"
            aria-label="Yopish"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-3 p-3 sm:px-4 sm:py-3 rounded-2xl bg-zinc-900/95 text-zinc-100 shadow-2xl shadow-black/80 border border-amber-500/40 backdrop-blur-md">
          <div className="flex items-start gap-3 min-w-0">
            <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 mt-0.5 flex-shrink-0">
              <WifiOff size={18} />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-amber-400">
                  Oflayn rejim faol
                </h4>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  PWA
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed">
                Barcha retseptlar, masalliqlar va saqlangan taomlar oflayn mavjud.
                <span className="text-zinc-400 block mt-0.5">
                  <Info size={11} className="inline mr-1 text-amber-400/80" />
                  Videolarni tomosha qilish uchun internet aloqasi talab etiladi.
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors flex-shrink-0"
            aria-label="Yashirish"
            title="Yashirish"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </aside>
  );
};

export default OfflineIndicator;
