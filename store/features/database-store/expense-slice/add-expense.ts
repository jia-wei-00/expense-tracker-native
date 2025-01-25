import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Expense } from "./expense-slice";

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expense: Expense) => {
    try {
      const { data, error } = await supabase.from("expense").insert(expense);
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
