import { createContext, type ReactNode, useContext, useState } from "react";

interface SelectedContextType {
  selected: string[];
  addEmoji: (emoji: string) => void;
  clearEmoji: () => void;
}

const SelectedContext = createContext<SelectedContextType>({
  selected: [],
  addEmoji: () => {},
  clearEmoji: () => {},
});

export const useSelected = () => useContext(SelectedContext);

export const SelectedProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const addEmoji = (emoji: string) => {
    setSelected((prev) => [...prev, emoji]);
  };

  const clearEmoji = () => {
    setSelected([]);
  };

  return (
    <SelectedContext.Provider value={{ selected, addEmoji, clearEmoji }}>
      {children}
    </SelectedContext.Provider>
  );
};
