import { router, useRootNavigationState, useSegments } from "expo-router";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useRedux";

export function useProtectedRoute() {
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const userSession = useAppSelector((state) => state.auth.session);
  /*
  const token = AsyncStorage.getItem("@fabwert_token").then((token) => {
    return token;
  });
  */

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
      router.push("/");
    }
  }, [userSession, segments]);
}
