import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface FetchExpenseProps {
  userId: string;
  page?: number;
  pageSize?: number;
}

export const fetchExpense = createAsyncThunk(
  "expense/fetchExpense",
  async ({ userId, page = 1, pageSize = 10 }: FetchExpenseProps) => {
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

      const offset = (page - 1) * pageSize;

      const { data, count, error } = await supabase
        .from("expense")
        .select("*", { count: "exact" })
        .eq("user_id", userId)
        .gte("spend_date", startOfMonth.toISOString())
        .lt("spend_date", endOfMonth.toISOString())
        .range(offset, offset + pageSize - 1);
      // .range(0, -1);

      if (error) {
        console.log(error);
        throw error;
      }

      return { data, count };
    } catch (error) {
      console.log(error);
      return { data: [], count: 0 };
    }
  }
);
