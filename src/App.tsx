import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VideoApp from "./pages/VideoApp";
import NotFound from "./pages/NotFound";
import OfflineIndicator from "./components/pwa/OfflineIndicator";
import InstallPrompt from "./components/pwa/InstallPrompt";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <OfflineIndicator />
      <InstallPrompt />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VideoApp />} />
          <Route path="/admin" element={<VideoApp />} />
          <Route path="/recipes" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
