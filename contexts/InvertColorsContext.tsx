import { setBackgroundColorAsync } from "expo-system-ui";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface InvertColorsContextType {
  invertColors: boolean;
  setInvertColors: (value: boolean) => Promise<void>;
}

const InvertColorsContext = createContext<InvertColorsContextType>({
  invertColors: false,
  setInvertColors: async () => {
    throw new Error("useInvertColors must be used within InvertColorsProvider");
  },
});

export const useInvertColors = () => useContext(InvertColorsContext);

export const InvertColorsProvider = ({ children }: { children: ReactNode }) => {
  const [invertColors, setInvertColorsState] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("invertColors").then((val) => {
      if (val === "true") setInvertColorsState(true);
    });
  }, []);

  const setInvertColors = async (value: boolean) => {
    setInvertColorsState(value);
    await AsyncStorage.setItem("invertColors", value ? "true" : "false");
    setBackgroundColorAsync(value ? "white" : "black").catch(() => {});
  };

  useEffect(() => {
    setBackgroundColorAsync(invertColors ? "white" : "black").catch(() => {});
  }, [invertColors]);

  return (
    <InvertColorsContext.Provider value={{ invertColors, setInvertColors }}>
      {children}
    </InvertColorsContext.Provider>
  );
};
