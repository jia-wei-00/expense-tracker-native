import { Stack } from "expo-router";
import React from "react";

export default function RootLayoutSettings() {
  return (
    <Stack>
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="category" options={{ headerShown: false }} />
    </Stack>
  );
}
