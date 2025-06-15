import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/supabase";

export const deleteLoan = createAsyncThunk(
  "loan/deleteLoan",
  async (id: string) => {
    try {
      const { data, error } = await supabase.from("loan").delete().eq("id", id);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);
