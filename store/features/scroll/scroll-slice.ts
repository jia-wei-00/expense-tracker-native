// DUCKS PATTERN
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScrollState {
  scrollEnabled: boolean;
}

const initialState: ScrollState = {
  scrollEnabled: true,
};

const counterSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    setScrollEnabled: (state, action: PayloadAction<boolean>) => {
      state.scrollEnabled = action.payload;
    },
  },
});

export const { setScrollEnabled } = counterSlice.actions;
export const scrollReducer = counterSlice.reducer;
