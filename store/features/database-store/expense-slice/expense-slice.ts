// DUCKS PATTERN
import { Database } from "@/database.types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchExpense } from "./fetch-expense";
import { addExpense } from "./add-expense";
import { deleteExpense } from "./delete-expense";

export type Expense = Database["public"]["Tables"]["expense"]["Row"];

interface ExpenseState {
  expense: Expense[];
  isFetching: boolean;
  isSubmitting: boolean;
  isDeleting: boolean;
}

const initialState: ExpenseState = {
  expense: [],
  isFetching: false,
  isSubmitting: false,
  isDeleting: false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpense: (state, action) => {
      state.expense = action.payload;
    },
    addExpenseSubscription: (state, action) => {
      state.expense.push(action.payload);
    },
    updateExpenseSubscription: (state, action) => {
      const index = state.expense.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.expense[index] = action.payload;
      }
    },
    deleteExpenseSubscription: (state, action) => {
      state.expense = state.expense.filter(
        (expense) => expense.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExpense.fulfilled, (state, action) => {
      state.expense = action.payload;
      state.isFetching = false;
    });
    builder.addCase(fetchExpense.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchExpense.rejected, (state) => {
      state.isFetching = false;
    });
    builder.addCase(addExpense.fulfilled, (state) => {
      state.isSubmitting = false;
    });
    builder.addCase(addExpense.pending, (state) => {
      state.isSubmitting = true;
    });
    builder.addCase(addExpense.rejected, (state) => {
      state.isSubmitting = false;
    });
    builder.addCase(deleteExpense.fulfilled, (state) => {
      state.isDeleting = false;
    });
    builder.addCase(deleteExpense.pending, (state) => {
      state.isDeleting = true;
    });
    builder.addCase(deleteExpense.rejected, (state) => {
      state.isDeleting = false;
    });
  },
});

export const {
  setExpense,
  addExpenseSubscription,
  updateExpenseSubscription,
  deleteExpenseSubscription,
} = expenseSlice.actions;
export const expenseReducer = expenseSlice.reducer;
