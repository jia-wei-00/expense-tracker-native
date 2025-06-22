import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/supabase";

export const fetchLoans = createAsyncThunk(
  "loan/fetchLoans",
  async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("loan")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .range(0, -1);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);
