import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/supabase";
import { Loan } from "./loan-slice";

export const updateLoan = createAsyncThunk(
  "loan/updateLoan",
  async (loan: Loan) => {
    try {
      const { data, error } = await supabase
        .from("loan")
        .update(loan)
        .eq("id", loan.id);
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
