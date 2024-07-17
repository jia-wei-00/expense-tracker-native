import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { NativeBaseProvider, extendTheme, Text } from "native-base";
import React from "react";
import { Appearance } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Define the config
const config = {
  useSystemColorMode: true,
  initialColorMode: "dark",
};

const customTheme = extendTheme({
  config,
});

export default function RootLayout() {
  return (
    <ThemeProvider
      value={Appearance.getColorScheme() === "dark" ? DarkTheme : DefaultTheme}
    >
      <NativeBaseProvider theme={customTheme}>
        <Stack>
          <Stack.Screen name="index" />
        </Stack>
      </NativeBaseProvider>
    </ThemeProvider>
  );
}
