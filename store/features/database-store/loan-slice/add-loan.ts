import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/supabase";
import { Loan } from "./loan-slice";

export const addLoan = createAsyncThunk("loan/addLoan", async (loan: Loan) => {
  try {
    const { data, error } = await supabase.from("loan").insert(loan);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
});
