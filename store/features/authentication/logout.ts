import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      throw error;
    }
    return { data: "success" };
  } catch (error) {
    console.log(error);
    return [];
  }
});
