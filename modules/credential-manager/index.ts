import { EventSubscription } from "expo-modules-core";

import CredentialManagerModule from "./src/CredentialManagerModule";
import { Theme, ThemeChangeEvent } from "./src/CredentialManager.types";

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
