import { supabase } from "../config/supabase";

export const categoryRepository = {
  async findAll() {
    return supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });
  },
};
