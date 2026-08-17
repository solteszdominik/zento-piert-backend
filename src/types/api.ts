import type { ParamsDictionary } from "express-serve-static-core";
import type { CreateOrderInput, OrderStatus } from "./order";

export interface IdParams extends ParamsDictionary {
  id: string;
}

export interface SlugParams extends ParamsDictionary {
  slug: string;
}

export type CreateOrderRequest = CreateOrderInput;
export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}

export interface UpdateProductRequest {
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

export interface CreateProductRequest {
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  unit: "db" | "csomag" | "lap";
  image_url?: string | null;
  is_available: boolean;
  is_featured: boolean;
  category_id: string;
}
