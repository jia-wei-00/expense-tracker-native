import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignupPayload } from "./auth-slice";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload: SignupPayload) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });
      if (error) {
        console.log(error);
        throw error;
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);
