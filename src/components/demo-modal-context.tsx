import React, { createContext, useContext, useState } from "react";

type DemoModalContextType = {
  isOpen: boolean;
  openDemoModal: () => void;
  closeDemoModal: () => void;
};

const DemoModalContext = createContext<DemoModalContextType | undefined>(undefined);

export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDemoModal = () => setIsOpen(true);
  const closeDemoModal = () => setIsOpen(false);

  return (
    <DemoModalContext.Provider value={{ isOpen, openDemoModal, closeDemoModal }}>
      {children}
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  const context = useContext(DemoModalContext);
  if (context === undefined) {
    throw new Error("useDemoModal must be used within a DemoModalProvider");
  }
  return context;
}

