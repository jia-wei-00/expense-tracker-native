import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useState } from "react";
import { Appearance, useColorScheme } from "react-native";

export interface SetThemeType {
  theme: "dark" | "light";
}

const useTheme = () => {
  const [colorScheme, setColorScheme] = useState("dark");
  const theme = useColorScheme();

  const setTheme = ({ theme }: SetThemeType) => {
    Appearance.setColorScheme(theme);
    setColorScheme(theme);
  };

  const toggleTheme = () => {
    const color = colorScheme === "light" ? "dark" : "light";
    Appearance.setColorScheme(color);
    setColorScheme(color);
  };

  return {
    value: theme === "light" ? DefaultTheme : DarkTheme,
    currentTheme: theme,
    toggleTheme: toggleTheme,
    setTheme,
  };
};

export default useTheme;
