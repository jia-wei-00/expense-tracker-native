import { supabase } from "@/supabase";

export const fetchRecords = async () => {
  const { data, error } = await supabase.from("expense").select();
  return { data, error };
};
