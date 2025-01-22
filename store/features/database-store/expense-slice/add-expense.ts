import { Database } from "@/database.types";
import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expense: Database["public"]["Tables"]["expense"]["Row"]) => {
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
