import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthError } from "@supabase/supabase-js";
import { showSuccessToast, showServerErrorToast } from "@/utils/toast-helpers";

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      showSuccessToast("Toast.Password reset email sent");
      return { data: "success" };
    } catch (error) {
      if (error instanceof AuthError) {
        showServerErrorToast(error.message);
      } else {
        showServerErrorToast(JSON.stringify(error));
      }
      throw error;
    }
  }
);
