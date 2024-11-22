//DUCK Pattern
import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incremented: (state, action) => {
      state.value += action.payload;
    },
    decremented: (state, action) => {
      state.value -= action.payload;
    },
  },
});

export const { incremented, decremented } = counterSlice.actions;

export default counterSlice.reducer;
