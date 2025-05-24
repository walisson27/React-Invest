import { createContext, useContext, useState, ReactNode } from "react";

type DarkModeContextType = {
  dark: boolean;
  setDark: (value: boolean) => void;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [dark, setDark] = useState(false);
  return <DarkModeContext.Provider value={{ dark, setDark }}>{children}</DarkModeContext.Provider>;
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error("useDarkMode deve estar dentro de um DarkModeProvider");
  return context;
};