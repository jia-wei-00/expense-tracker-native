import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { NativeBaseProvider, ColorMode, extendTheme } from "native-base";
import React from "react";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const theme = useColorScheme();

  return (
    <ThemeProvider value={theme !== "dark" ? DarkTheme : DefaultTheme}>
      <NativeBaseProvider>
        <Stack>
          <Stack.Screen name="index" />
        </Stack>
      </NativeBaseProvider>
    </ThemeProvider>
  );
}
