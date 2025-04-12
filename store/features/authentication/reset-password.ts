import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "sonner-native";

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      toast.success("Password reset email sent");
      return { data: "success" };
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
