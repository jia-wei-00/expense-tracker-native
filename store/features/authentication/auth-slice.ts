import { createSlice } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { logout } from "./logout";
import { signIn } from "./signin";
import { signUp } from "./signup";

interface AuthState {
  session: Session | null;
  isLoggingIn: boolean;
  isSigningUp: boolean;
  isLoggingOut: boolean;
  isLoading: boolean;
}

export interface SignupPayload {
  email: string;
  password: string;
}

const initialState: AuthState = {
  session: null,
  isLoggingIn: false,
  isSigningUp: false,
  isLoggingOut: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    },
    setIsLoggingOut: (state, action) => {
      state.isLoggingOut = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
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
    builder.addCase(signIn.fulfilled, (state) => {
      state.isLoggingIn = false;
    });
    builder.addCase(signIn.pending, (state) => {
      state.isLoggingIn = true;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.isLoggingIn = false;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.isSigningUp = false;
    });
    builder.addCase(signUp.pending, (state) => {
      state.isSigningUp = true;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.isSigningUp = false;
    });
  },
});

export const { setSession, setIsLoggingOut, setIsLoading } = authSlice.actions;
export const authReducer = authSlice.reducer;
