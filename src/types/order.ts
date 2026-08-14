export type OrderStatus = "new" | "processing" | "completed" | "cancelled";

export interface CreateOrderItemInput {
  product_id: string;
  quantity: number;
}

export interface CreateOrderInput {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  company_name?: string;
  message?: string;
  items: CreateOrderItemInput[];
}
