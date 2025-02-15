import { createSlice } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { logout } from "./logout";

interface AuthState {
  session: Session | null;
  loading: boolean;
  isLoggingOut: boolean;
}

const initialState: AuthState = {
  session: null,
  loading: false,
  isLoggingOut: false,
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
    setIsLoggingOut: (state, action) => {
      state.isLoggingOut = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggingOut = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoggingOut = true;
    });
    builder.addCase(logout.rejected, (state) => {
      state.isLoggingOut = false;
    });
  },
});

export const { setSession, setLoading, setIsLoggingOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
