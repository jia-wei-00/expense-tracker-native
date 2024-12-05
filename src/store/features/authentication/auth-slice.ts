import { createSlice } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";

interface AuthState {
  session: Session | null;
}

const initialState: AuthState = {
  session: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    },
  },
});

export const { setSession } = authSlice.actions;
export const authReducer = authSlice.reducer;
