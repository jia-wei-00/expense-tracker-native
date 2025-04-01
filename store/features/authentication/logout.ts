import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "sonner-native";

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    toast.success("Logged out successfully");
    return { data: "success" };
  } catch (error) {
    if (error instanceof AuthError) {
      toast.error(error.message);
    } else {
      toast.error(JSON.stringify(error));
    }
    return [];
  }
});
