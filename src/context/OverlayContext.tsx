// OverlayContext.tsx
import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { useAddItemStore } from '@/store/MemoryStore';

interface OverlayContextProps {
  isAdd: boolean;
  overlayHandler: () => void;
}

export const OverlayContext = createContext<OverlayContextProps | undefined>(
  undefined
);

interface OverlayProviderProps {
  children: ReactNode;
}

export const OverlayProvider: React.FC<OverlayProviderProps> = ({
  children,
}) => {
  const [isAdd, setIsAdd] = useState(false);

  const overlayHandler = useCallback(() => {
    setIsAdd(!isAdd);
  }, [isAdd]);

  return (
    <OverlayContext.Provider value={{ isAdd, overlayHandler }}>
      {children}
    </OverlayContext.Provider>
  );
};
