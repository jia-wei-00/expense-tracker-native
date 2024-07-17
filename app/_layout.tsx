import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { NativeBaseProvider, useColorMode, useTheme } from "native-base";
import React from "react";
import { Appearance, Platform, useColorScheme } from "react-native";

export default function RootLayout() {
  return (
    <NativeBaseProvider>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </NativeBaseProvider>
  );
}
