import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, useRootNavigationState, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { useAppSelector } from "@/hooks/useRedux";
import * as SplashScreen from "expo-splash-screen";
import {
  useGetSessionMutation,
  useOnAuthStateChangeMutation,
} from "@/store/features";

export function useProtectedRoute() {
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const userSession = useAppSelector((state) => state.auth.session);

  const [onAuthStateChange, { isLoading: isOnAuthStateChangeLoading }] =
    useOnAuthStateChangeMutation();
  const [getSession, { isLoading: isGetSessionLoading }] =
    useGetSessionMutation();
  /*
  const token = AsyncStorage.getItem("@fabwert_token").then((token) => {
    return token;
  });
  */

  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [styleLoaded, setStyleLoaded] = useState(false);
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    onAuthStateChange("");
    getSession("");
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded || isGetSessionLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isGetSessionLoading]);

  useEffect(() => {
    if (!navigationState?.key) return;
    const inAuthGroup = segments[0] === "(auth)";
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !userSession &&
      !inAuthGroup
    ) {
      router.push("/sign-in");
    } else if (userSession && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.push("/(tabs)/");
    }
  }, [userSession, segments]);
}
