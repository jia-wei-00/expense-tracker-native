// DUCKS PATTERN
import { storage } from "@/store/mmkv";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark" | "system";
export type FontSize = "sm" | "md" | "lg";
export type Language = "en-US" | "zh-CN" | "zh-TW";
export type Authentication = "fingerprint" | "face-id" | "pin" | "none";

export interface SettingsState {
  theme: Theme;
  fontSize: FontSize;
  language: Language;
  authentication: Authentication;
}

const initialState: SettingsState = {
  theme: (storage?.getString("theme") as Theme) || "system",
  fontSize: (storage?.getString("fontSize") as FontSize) || "md",
  language: (storage?.getString("language") as Language) || "en-US",
  authentication:
    (storage?.getString("authentication") as Authentication) || "none",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      storage?.set("theme", action.payload);
    },
    setFontSize: (state, action: PayloadAction<FontSize>) => {
      state.fontSize = action.payload;
      storage?.set("fontSize", action.payload);
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      storage?.set("language", action.payload);
    },
    setAuthentication: (state, action: PayloadAction<Authentication>) => {
      state.authentication = action.payload;
      storage?.set("authentication", action.payload);
    },
  },
});

export const { setTheme, setFontSize, setLanguage, setAuthentication } =
  settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
