import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

// Register Service Worker for offline capability
registerSW({
  immediate: true,
  onOfflineReady() {
    console.log("TaomUz PWA oflayn rejimda ishlashga tayyor!");
  },
});

createRoot(document.getElementById("root")!).render(<App />);