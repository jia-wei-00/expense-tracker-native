import { Database } from "@/database.types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory } from "./fetch-category";

interface CategoryState {
  category: Database["public"]["Tables"]["expense_category"]["Row"][];
  isExpense: boolean;
  loading: boolean;
}

const initialState: CategoryState = {
  category: [],
  isExpense: true,
  loading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.category = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategory.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
