import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteLoanRecord = createAsyncThunk(
  "loanRecord/deleteLoanRecord",
  async (loanRecordId: string) => {
    try {
      const { data, error } = await supabase
        .from("loan_record")
        .delete()
        .eq("id", loanRecordId);

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
