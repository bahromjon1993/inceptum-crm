import React, { createContext, useContext, useState } from "react";

interface MaskingContextType {
  isMasked: boolean;
  toggleMasking: () => void;
  maskValue: (value: string | number) => string;
}

const MaskingContext = createContext<MaskingContextType | null>(null);

export function MaskingProvider({ children }: { children: React.ReactNode }) {
  // Default to false (visible) or true (masked like in initial video frame)
  const [isMasked, setIsMasked] = useState<boolean>(false);

  const toggleMasking = () => {
    setIsMasked((prev) => !prev);
  };

  const maskValue = (value: string | number): string => {
    if (isMasked) {
      return "***";
    }
    return String(value);
  };

  return (
    <MaskingContext.Provider value={{ isMasked, toggleMasking, maskValue }}>
      {children}
    </MaskingContext.Provider>
  );
}

export function useMasking() {
  const context = useContext(MaskingContext);
  if (!context) {
    return {
      isMasked: false,
      toggleMasking: () => {},
      maskValue: (v: string | number) => String(v),
    };
  }
  return context;
}
