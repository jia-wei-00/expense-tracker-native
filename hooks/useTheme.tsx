import { Appearance } from "react-native";

const useCustomTheme = () => {
  const currentTheme = Appearance.getColorScheme();

  const toggleTheme = () => {
    Appearance.setColorScheme(currentTheme === "dark" ? "light" : "dark");
  };

  return { currentTheme, toggleTheme };
};

export default useCustomTheme;
