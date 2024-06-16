// import "@tamagui/core/reset.css";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "../tamagui.config";
import useTheme from "@/hooks/useTheme";

export default function RootLayout() {
  const { currentTheme } = useTheme();

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={currentTheme!}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </TamaguiProvider>
  );
}
