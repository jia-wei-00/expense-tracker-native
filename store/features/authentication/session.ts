import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "sonner-native";

export const getSession = createAsyncThunk("auth/getSession", async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      if (error.message.includes("expired")) {
        toast.error("Your session has expired. Please sign in again.");
        // You might want to redirect to login or trigger a sign-out action here
      }
      throw error;
    }
    return data;
  } catch (error) {
    if (error instanceof AuthError) {
      toast.error(error.message);
    } else {
      toast.error(JSON.stringify(error));
    }
    return null;
  }
});
