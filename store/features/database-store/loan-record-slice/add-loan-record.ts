import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoanRecord } from "./loan-record-slice";

export const addLoanRecord = createAsyncThunk(
  "loanRecord/addLoanRecord",
  async (loanRecord: LoanRecord) => {
    try {
      const { data, error } = await supabase
        .from("loan_record")
        .insert(loanRecord);
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
