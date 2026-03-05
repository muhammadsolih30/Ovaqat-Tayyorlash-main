// src/contexts/PremiumContext.tsx
// YANGI FAYL — bu faylni src/contexts/ papkasiga qo'shing

import React, { createContext, useContext, useState, ReactNode } from "react";

interface PremiumContextType {
  isPremium: boolean;
  setIsPremium: (val: boolean) => void;
  showPremiumModal: boolean;
  openPremiumModal: () => void;
  closePremiumModal: () => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const PremiumProvider = ({ children }: { children: ReactNode }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  return (
    <PremiumContext.Provider
      value={{
        isPremium,
        setIsPremium,
        showPremiumModal,
        openPremiumModal: () => setShowPremiumModal(true),
        closePremiumModal: () => setShowPremiumModal(false),
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = () => {
  const ctx = useContext(PremiumContext);
  if (!ctx) throw new Error("usePremium must be used within PremiumProvider");
  return ctx;
};
