import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthError } from "@supabase/supabase-js";
import { showSuccessToast, showServerErrorToast } from "@/utils/toast-helpers";

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    showSuccessToast("Logged out successfully");
    return { data: "success" };
  } catch (error) {
    if (error instanceof AuthError) {
      showServerErrorToast(error.message);
    } else {
      showServerErrorToast(JSON.stringify(error));
    }
    throw error;
  }
});
