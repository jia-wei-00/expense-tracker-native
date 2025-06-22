import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface FetchExpenseProps {
  userId: string;
  page?: number;
  pageSize?: number;
}

interface FetchExpenseStatsProps {
  userId: string;
  year?: number;
  month?: number;
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
        .order("spend_date", { ascending: false })
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

export interface ExpenseStats {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
}

export const fetchExpenseStats = createAsyncThunk(
  "expense/fetchExpenseStats",
  async ({
    userId,
    year,
    month,
  }: FetchExpenseStatsProps): Promise<ExpenseStats> => {
    try {
      const { data, error } = await supabase.rpc("get_expense_stats", {
        p_user_id: userId,
        p_year: year || 0,
        p_month: month || -1,
      });

      if (error) throw error;

      return {
        balance: data?.[0]?.balance || 0,
        totalIncome: data?.[0]?.total_income || 0,
        totalExpenses: data?.[0]?.total_expenses || 0,
      };
    } catch (error) {
      console.error(error);
      return { balance: 0, totalIncome: 0, totalExpenses: 0 };
    }
  }
);
