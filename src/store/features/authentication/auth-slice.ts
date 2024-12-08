import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../../lib/supabase";
interface AuthState {
  session: Session | null;
  loading: boolean;
}

const initialState: AuthState = {
  session: null,
  loading: false,
};

export const signInWithEmail = createAsyncThunk(
  "auth/signInWithEmail",
  async ({ email, password }: { email: string; password: string }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return "success";
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(signInWithEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInWithEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signInWithEmail.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSession, setLoading } = authSlice.actions;
export const authReducer = authSlice.reducer;
