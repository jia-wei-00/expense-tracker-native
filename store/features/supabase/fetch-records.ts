import { supabase } from "@/supabase";

export const useFetchRecords = async () => {
  let { data, error } = await supabase.from("expense").select("*").limit(10);

  return { data, error };
};
