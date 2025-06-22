import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLoanRecords = createAsyncThunk(
  "loanRecord/fetchLoanRecords",
  async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("loan_record")
        .select("*")
        .eq("user_id", userId);
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
