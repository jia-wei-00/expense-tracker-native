import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLoanRecords = createAsyncThunk(
  "loanRecord/fetchLoanRecords",
  async () => {
    try {
      const { data, error } = await supabase.from("loan_record").select("*");
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
