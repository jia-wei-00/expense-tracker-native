import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignupPayload } from "./auth-slice";
import { toast } from "sonner-native";
import { AuthError } from "@supabase/supabase-js";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload: SignupPayload) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

      if (error) throw error;

      const name =
        data.session.user.user_metadata.display_name || data.session.user.email;

      toast.success(`Welcome, ${name}!`);
      return data;
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error(error.message);
      } else {
        toast.error(JSON.stringify(error));
      }
      throw error;
    }
  }
);
