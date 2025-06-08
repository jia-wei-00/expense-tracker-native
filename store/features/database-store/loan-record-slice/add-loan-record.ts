import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addLoanRecord = createAsyncThunk(
  "loanRecord/addLoanRecord",
  async (loanRecord: LoanRecord) => {}
);
