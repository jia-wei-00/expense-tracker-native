import { Appearance, useColorScheme } from "react-native";

export interface SetThemeType {
  theme: "dark" | "light";
}

const useTheme = () => {
  const colorScheme = useColorScheme();

  const setTheme = ({ theme }: SetThemeType) => {
    Appearance.setColorScheme(theme);
  };

  const toggleTheme = () => {
    const color = colorScheme === "light" ? "dark" : "light";
    Appearance.setColorScheme(color);
  };

  return {
    currentTheme: colorScheme,
    toggleTheme: toggleTheme,
    setTheme: setTheme,
  };
};

export default useTheme;
