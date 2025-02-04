import { Database } from "@/database.types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory } from "./fetch-category";

export type Category = Database["public"]["Tables"]["expense_category"]["Row"];

interface CategoryState {
  category: Category[];
  isExpense: boolean;
  isFetching: boolean;
}

const initialState: CategoryState = {
  category: [],
  isExpense: true,
  isFetching: false,
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
      state.isFetching = false;
    });
    builder.addCase(fetchCategory.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchCategory.rejected, (state) => {
      state.isFetching = false;
    });
  },
});

export const { setCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
