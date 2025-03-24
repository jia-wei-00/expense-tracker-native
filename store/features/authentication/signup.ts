import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignupPayload } from "./auth-slice";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (payload: SignupPayload) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
      });
      if (error) {
        console.log(error);
        throw error;
      }
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);
