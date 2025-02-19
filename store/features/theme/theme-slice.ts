// DUCKS PATTERN
import { storage } from "@/store/mmkv";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  theme: "light" | "dark" | "system";
}

const initialState: ThemeState = {
  theme: (storage?.getString("theme") as ThemeState["theme"]) || "system",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState["theme"]>) => {
      state.theme = action.payload;
      storage?.set("theme", action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
