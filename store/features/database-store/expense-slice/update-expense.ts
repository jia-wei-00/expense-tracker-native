import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Expense } from "./expense-slice";

export const updateExpense = createAsyncThunk(
  "expense/updateExpense",
  async (expense: Expense) => {
    try {
      const { data, error } = await supabase
        .from("expense")
        .update(expense)
        .eq("id", expense.id!);
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
