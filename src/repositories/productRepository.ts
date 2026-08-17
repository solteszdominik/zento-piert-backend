import { supabase } from "../config/supabase";

export interface UpdateProductInput {
  name?: string;
  slug?: string;
  description?: string | null;
  price?: number;
  unit?: "db" | "csomag" | "lap";
  image_url?: string | null;
  is_available?: boolean;
  is_featured?: boolean;
  category_id?: string;
}

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

  async findById(id: string) {
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
      .eq("id", id)
      .single();
  },

  async updateById(id: string, input: UpdateProductInput) {
    return supabase
      .from("products")
      .update(input)
      .eq("id", id)
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
      .single();
  },

  async create(input: UpdateProductInput) {
    return supabase
      .from("products")
      .insert(input)
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
      .single();
  },
};
