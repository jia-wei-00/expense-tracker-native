import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, SettingsScreen } from "@/app-example/app/(tabs)";

const Tabs = createBottomTabNavigator({
  screens: {
    home: HomeScreen,
    settings: SettingsScreen,
  },
});

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
