import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, useRootNavigationState, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import * as SplashScreen from "expo-splash-screen";
import { getAuthStateChange, getSession } from "@/store/features";

export function useProtectedRoute() {
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const dispatch = useAppDispatch();

  const { isSessionLoading, session } = useAppSelector((state) => state.auth);

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
    dispatch(getSession());
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && !isSessionLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isSessionLoading]);

  useEffect(() => {
    if (!navigationState?.key) return;
    const inAuthGroup = segments[0] === "(auth)";
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !session &&
      !inAuthGroup
    ) {
      router.push("/sign-in");
    } else if (session && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.push("/(tabs)");
    }
  }, [session, segments]);
}
