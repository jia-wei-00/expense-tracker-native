import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "./category-slice";

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (category: Category) => {
    try {
      const { data, error } = await supabase
        .from("expense_category")
        .update(category)
        .eq("id", category.id!);
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
