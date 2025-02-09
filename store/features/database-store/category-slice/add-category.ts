import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "./category-slice";

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (category: Category) => {
    try {
      const { data, error } = await supabase
        .from("expense_category")
        .insert(category);
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
