import { useColorMode } from "native-base";
import React from "react";
import { Appearance } from "react-native";

const useTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const toggleTheme = () => {
    toggleColorMode();
    Appearance.setColorScheme(colorMode);
  };

  return {
    toggleTheme,
  };
};

export default useTheme;
