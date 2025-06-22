// DUCKS PATTERN
import { Database } from "@/database.types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchExpense, fetchExpenseStats, ExpenseStats } from "./fetch-expense";
import { addExpense } from "./add-expense";
import { deleteExpense } from "./delete-expense";
import { updateExpense } from "./update-expense";
import dayjs from "dayjs";

export type Expense = Database["public"]["Tables"]["expense"]["Row"];

interface ExpenseState {
  expense: Expense[];
  totalCount: number;
  isFetching: boolean;
  isSubmitting: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  balance: number;
  stats: ExpenseStats;
  isFetchingStats: boolean;
}

const initialState: ExpenseState = {
  expense: [],
  totalCount: 0,
  isFetching: false,
  isSubmitting: false,
  isDeleting: false,
  isUpdating: false,
  balance: 0,
  stats: {
    balance: 0,
    totalIncome: 0,
    totalExpenses: 0,
  },
  isFetchingStats: false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpense: (state, action) => {
      state.expense = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    addExpenseSubscription: (state, action) => {
      if (action.payload.spend_date.startsWith(dayjs().format("YYYY-MM"))) {
        state.expense.push(action.payload);
        state.stats.balance += action.payload.is_expense
          ? -(action.payload.amount ?? 0)
          : action.payload.amount ?? 0;
        state.stats.totalExpenses += action.payload.is_expense
          ? action.payload.amount ?? 0
          : 0;
        state.stats.totalIncome += action.payload.is_expense
          ? 0
          : action.payload.amount ?? 0;
      }
    },
    updateExpenseSubscription: (state, action) => {
      const index = state.expense.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.expense[index] = action.payload;
        state.stats.balance += action.payload.is_expense
          ? -(action.payload.amount ?? 0)
          : action.payload.amount ?? 0;
        state.stats.totalExpenses += action.payload.is_expense
          ? action.payload.amount ?? 0
          : 0;
        state.stats.totalIncome += action.payload.is_expense
          ? 0
          : action.payload.amount ?? 0;
      }
    },
    deleteExpenseSubscription: (state, action) => {
      const index = state.expense.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        const expense = state.expense[index];
        state.expense.splice(index, 1);
        state.stats.balance += expense.is_expense
          ? expense.amount ?? 0
          : -(expense.amount ?? 0);
        state.stats.totalExpenses -= expense.is_expense
          ? expense.amount ?? 0
          : 0;
        state.stats.totalIncome -= expense.is_expense ? 0 : expense.amount ?? 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExpense.fulfilled, (state, { payload }) => {
      const { data, count } = payload as {
        data: Expense[];
        count: number;
      };
      state.expense = data;
      state.totalCount = count;
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
    builder.addCase(updateExpense.fulfilled, (state) => {
      state.isUpdating = false;
    });
    builder.addCase(updateExpense.pending, (state) => {
      state.isUpdating = true;
    });
    builder.addCase(updateExpense.rejected, (state) => {
      state.isUpdating = false;
    });
    builder.addCase(fetchExpenseStats.fulfilled, (state, { payload }) => {
      state.stats = payload;
      state.isFetchingStats = false;
    });
    builder.addCase(fetchExpenseStats.pending, (state) => {
      state.isFetchingStats = true;
    });
    builder.addCase(fetchExpenseStats.rejected, (state) => {
      state.isFetchingStats = false;
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
