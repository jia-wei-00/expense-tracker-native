import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (expenseId: number) => {
    try {
      const { data, error } = await supabase
        .from("expense")
        .delete()
        .eq("id", expenseId);

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
