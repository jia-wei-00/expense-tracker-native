import { Provider } from "react-redux";
import { store } from "@/store";
import { useProtectedRoute } from "@/features/authentication/auth.guard";
import * as SplashScreen from "expo-splash-screen";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useColorScheme } from "@/components/useColorScheme";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import React from "react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "gluestack",
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // useLayoutEffect(() => {
  //   setStyleLoaded(true);
  // }, [styleLoaded]);

  // if (!loaded || !styleLoaded) {
  //   return null;
  // }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  // const theme = storage.getString("theme");
  // if (!theme) {
  //   storage.set("theme", "system");
  // }
  // const themeMode = theme === "system" ? colorScheme : theme;

  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode={colorScheme === "dark" ? "dark" : "light"}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

function App() {
  useProtectedRoute();

  return (
    <Stack>
      <Stack.Screen name="(auth)/sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
