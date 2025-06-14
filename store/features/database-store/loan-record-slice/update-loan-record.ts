import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoanRecord } from "./loan-record-slice";

export const updateLoanRecord = createAsyncThunk(
  "loanRecord/updateLoanRecord",
  async (loanRecord: LoanRecord) => {
    try {
      const { data, error } = await supabase
        .from("loan_record")
        .update(loanRecord)
        .eq("id", loanRecord.id);

      if (error) {
        console.log(error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);
