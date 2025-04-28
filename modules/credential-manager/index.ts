import { EventSubscription } from "expo-modules-core";
import { CredentialManagerChangeEvents } from "./src/CredentialManager.types";
import CredentialManagerModule from "./src/CredentialManagerModule";

export function addListener(
  listener: (event: CredentialManagerChangeEvents) => void
): EventSubscription {
  return CredentialManagerModule.addListener("onChange", listener);
}

export function getTheme(): string {
  return CredentialManagerModule.getTheme();
}

export function setTheme(theme: string): void {
  return CredentialManagerModule.setTheme(theme);
}
