import { CommonActions, StackActions } from "@react-navigation/native";
import {
  router,
  Stack,
  useFocusEffect,
  useNavigation,
  useNavigationContainerRef,
} from "expo-router";
import React from "react";

export default function RootLayoutSettings() {
  const navigation = useNavigation();
  const navigationContainer = useNavigationContainerRef();

  return (
    <Stack>
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="category" options={{ headerShown: false }} />
    </Stack>
  );
}
