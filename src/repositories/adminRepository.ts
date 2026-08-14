import { supabase } from "../config/supabase";

export const adminRepository = {
  async findByUserId(userId: string) {
    return supabase
      .from("admins")
      .select("id, user_id")
      .eq("user_id", userId)
      .maybeSingle();
  },
};
