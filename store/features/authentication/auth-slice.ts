import { createSlice } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { logout } from "./logout";
import {
  signIn,
  signInWithGoogleCredentialsManager,
  signInWithOAuth,
} from "./signin";
import { signUp } from "./signup";
import { createSessionFromUrl, getSession } from "./session";

interface AuthState {
  session: Session | null;
  isLoggingIn: boolean;
  isSigningUp: boolean;
  isLoggingOut: boolean;
  isLoading: boolean;
  isSessionLoading: boolean;
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
  isSessionLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggingOut: (state, action) => {
      state.isLoggingOut = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.session = null;
      state.isLoggingOut = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoggingOut = true;
    });
    builder.addCase(logout.rejected, (state) => {
      state.isLoggingOut = false;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.session = action.payload?.session ?? null;
      state.isLoggingIn = false;
    });
    builder.addCase(signIn.pending, (state) => {
      state.isLoggingIn = true;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.session = null;
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
    builder.addCase(getSession.fulfilled, (state, action) => {
      state.session = action.payload?.session ?? null;
      state.isSessionLoading = false;
    });
    builder.addCase(getSession.pending, (state) => {
      state.isSessionLoading = true;
    });
    builder.addCase(getSession.rejected, (state) => {
      state.session = null;
      state.isSessionLoading = false;
    });
    builder.addCase(createSessionFromUrl.fulfilled, (state, action) => {
      state.session = action.payload?.session ?? null;
    });
    builder.addCase(signInWithOAuth.fulfilled, (state) => {
      state.isLoggingIn = false;
    });
    builder.addCase(signInWithOAuth.pending, (state) => {
      state.isLoggingIn = true;
    });
    builder.addCase(signInWithOAuth.rejected, (state) => {
      state.isLoggingIn = false;
    });
    builder.addCase(
      signInWithGoogleCredentialsManager.fulfilled,
      (state, action) => {
        // createSessionFromUrl(action.payload);
        state.isLoggingIn = false;
      }
    );
    builder.addCase(signInWithGoogleCredentialsManager.pending, (state) => {
      state.isLoggingIn = true;
    });
    builder.addCase(signInWithGoogleCredentialsManager.rejected, (state) => {
      state.isLoggingIn = false;
    });
  },
});

export const { setIsLoggingOut, setIsLoading } = authSlice.actions;
export const authReducer = authSlice.reducer;
