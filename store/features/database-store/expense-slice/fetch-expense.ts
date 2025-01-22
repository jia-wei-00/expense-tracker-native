import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchExpense = createAsyncThunk(
  "expense/fetchExpense",
  async (userId: string) => {
    try {
      const currentDate = new Date();
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      );

      const { data, error } = await supabase
        .from("expense")
        .select("*")
        .eq("user_id", userId)
        .gte("spend_date", startOfMonth.toISOString())
        .lt("spend_date", endOfMonth.toISOString());

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
