import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/supabase";

export const fetchLoans = createAsyncThunk("loan/fetchLoans", async () => {
  try {
    const { data, error } = await supabase.from("loan").select("*");
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
});
