import type { ShippingMethod } from "../config/shipping";

export type OrderStatus = "new" | "processing" | "completed" | "cancelled";

export interface CreateOrderItemInput {
  product_id: string;
  quantity: number;
}

export interface CreateOrderInput {
  customer_name: string;
  customer_email: string;
  customer_phone: string;

  postal_code: string;
  city: string;
  street_address: string;

  company_name?: string;
  message?: string;

  shipping_method: ShippingMethod;
  terms_accepted: boolean;

  items: CreateOrderItemInput[];
}
