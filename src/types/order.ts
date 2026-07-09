export type OrderStatus = "new" | "processing" | "completed" | "cancelled";

export interface CreateOrderItemInput {
  product_id: string;
  product_name: string;
  quantity: number;
}

export interface CreateOrderInput {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  message?: string;
  items: CreateOrderItemInput[];
}
