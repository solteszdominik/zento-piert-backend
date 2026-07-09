export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_available: boolean;
  created_at?: string;
}
