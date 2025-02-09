import { Database } from "@/database.types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory } from "./fetch-category";
import { addCategory } from "./add-category";
import { updateCategory } from "./update-category";
import { deleteCategory } from "./delete-category";

export type Category =
  Database["public"]["Tables"]["expense_category"]["Insert"];

interface CategoryState {
  category: Category[];
  isExpense: boolean;
  isFetching: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}

const initialState: CategoryState = {
  category: [],
  isExpense: true,
  isFetching: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    addCategorySubscription: (state, action) => {
      state.category.push(action.payload);
    },
    updateCategorySubscription: (state, action) => {
      const index = state.category.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.category[index] = action.payload;
      }
    },
    deleteCategorySubscription: (state, action) => {
      state.category = state.category.filter(
        (category) => category.id !== action.payload.id
      );
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
    builder.addCase(addCategory.fulfilled, (state) => {
      state.isAdding = false;
    });
    builder.addCase(addCategory.pending, (state) => {
      state.isAdding = true;
    });
    builder.addCase(addCategory.rejected, (state) => {
      state.isAdding = false;
    });
    builder.addCase(updateCategory.fulfilled, (state) => {
      state.isUpdating = false;
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.isUpdating = true;
    });
    builder.addCase(updateCategory.rejected, (state) => {
      state.isUpdating = false;
    });
    builder.addCase(deleteCategory.fulfilled, (state) => {
      state.isDeleting = false;
    });
    builder.addCase(deleteCategory.pending, (state) => {
      state.isDeleting = true;
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.isDeleting = false;
    });
  },
});

export const {
  setCategory,
  addCategorySubscription,
  updateCategorySubscription,
  deleteCategorySubscription,
} = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
