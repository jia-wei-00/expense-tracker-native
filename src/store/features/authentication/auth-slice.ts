import { createSlice } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";

interface AuthState {
  session: Session | null;
  loading: boolean;
}

const initialState: AuthState = {
  session: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setSession, setLoading } = authSlice.actions;
export const authReducer = authSlice.reducer;
