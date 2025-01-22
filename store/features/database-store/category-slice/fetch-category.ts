import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("expense_category")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.log(error);
        throw error;
      }

      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);
