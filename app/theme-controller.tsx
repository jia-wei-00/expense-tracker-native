import { useColorMode } from "native-base";
import React, { useEffect } from "react";
import { Alert, Appearance, Platform, useColorScheme } from "react-native";

const ThemeController = () => {
  const { setColorMode } = useColorMode();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (colorScheme) {
      Alert.alert(`${colorScheme}`);
      setColorMode(colorScheme);
    }
  }, [colorScheme, setColorMode]);

  return <></>;
};

export default ThemeController;
