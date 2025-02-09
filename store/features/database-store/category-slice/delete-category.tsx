import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId: number) => {
    try {
      const { data, error } = await supabase
        .from("expense_category")
        .delete()
        .eq("id", categoryId);

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
