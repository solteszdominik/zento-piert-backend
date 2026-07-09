import { supabase } from "../config/supabase";
import type { CreateOrderInput } from "../types/order";

export const orderRepository = {
  async createOrder(order: CreateOrderInput) {
    return supabase
      .from("orders")
      .insert({
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        customer_phone: order.customer_phone,
        customer_address: order.customer_address,
        message: order.message ?? null,
        status: "new",
      })
      .select("*")
      .single();
  },

  async createOrderItems(orderId: string, items: CreateOrderInput["items"]) {
    const orderItems = items.map((item) => ({
      order_id: orderId,
      product_id: item.product_id,
      product_name: item.product_name,
      quantity: item.quantity,
    }));

    return supabase.from("order_items").insert(orderItems).select("*");
  },

  async findAll() {
    return supabase
      .from("orders")
      .select(
        `
      *,
      order_items (
        id,
        product_id,
        product_name,
        quantity
      )
    `,
      )
      .order("created_at", { ascending: false });
  },

  async findById(id: string) {
    return supabase
      .from("orders")
      .select(
        `
      *,
      order_items (
        id,
        product_id,
        product_name,
        quantity
      )
    `,
      )
      .eq("id", id)
      .single();
  },
};
