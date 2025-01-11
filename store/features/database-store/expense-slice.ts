// DUCKS PATTERN
import { Database } from "@/database.types";
import { supabase } from "@/supabase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ExpenseState {
  expense: Database["public"]["Tables"]["expense"]["Row"][];
  loading: boolean;
}

const initialState: ExpenseState = {
  expense: [],
  loading: false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpense: (state, action) => {
      state.expense = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExpense.fulfilled, (state, action) => {
      state.expense = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchExpense.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchExpense.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const fetchExpense = createAsyncThunk(
  "expense/fetchExpense",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    const { data, error } = await supabase
      .from("expense")
      .select("*")
      .limit(10);

    if (error) {
      console.log(error);
      return [];
    }

    return data;
  }
);

export const { setExpense } = expenseSlice.actions;
export const expenseReducer = expenseSlice.reducer;
