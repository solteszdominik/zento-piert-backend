import { supabase } from "../config/supabase";

export const productRepository = {
  async findAll() {
    return supabase
      .from("products")
      .select(
        `
        *,
        categories (
          id,
          name,
          slug
        )
      `,
      )
      .order("name", { ascending: true });
  },

  async findBySlug(slug: string) {
    return supabase
      .from("products")
      .select(
        `
        *,
        categories (
          id,
          name,
          slug
        )
      `,
      )
      .eq("slug", slug)
      .single();
  },
};
