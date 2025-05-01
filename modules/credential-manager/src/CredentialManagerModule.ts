import { NativeModule, requireNativeModule } from "expo";
import { EventSubscription } from "expo-modules-core";

import {
  CredentialManagerModuleEvents,
  Theme,
  ThemeChangeEvent,
} from "./CredentialManager.types";

declare class CredentialManagerModule extends NativeModule<CredentialManagerModuleEvents> {
  addThemeListener(
    listener: (event: ThemeChangeEvent) => void
  ): EventSubscription;
  getTheme(): Theme;
  setTheme(theme: Theme): void;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<CredentialManagerModule>(
  "CredentialManager"
);
