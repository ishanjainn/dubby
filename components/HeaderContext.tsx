"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface HeaderContextType {
  forceLightHeader: boolean;
  setForceLightHeader: (value: boolean) => void;
}

const HeaderContext = createContext<HeaderContextType>({
  forceLightHeader: false,
  setForceLightHeader: () => {},
});

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [forceLightHeader, setForceLightHeader] = useState(false);

  return (
    <HeaderContext.Provider value={{ forceLightHeader, setForceLightHeader }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeaderContext() {
  return useContext(HeaderContext);
}
