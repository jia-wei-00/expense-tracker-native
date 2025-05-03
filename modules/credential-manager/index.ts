import { EventSubscription } from "expo-modules-core";

import CredentialManagerModule from "./src/CredentialManagerModule";

export type Theme = "light" | "dark" | "system";

export type ThemeChangeEvent = {
  theme: Theme;
};

export function addThemeListener(
  listener: (event: ThemeChangeEvent) => void
): EventSubscription {
  return CredentialManagerModule.addListener("onChange", listener);
}

export function getTheme(): Theme {
  return CredentialManagerModule.getTheme();
}

export function setTheme(theme: Theme): void {
  return CredentialManagerModule.setTheme(theme);
}
