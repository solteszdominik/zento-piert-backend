import { supabase } from "../config/supabase";
import type { CreateOrderInput } from "../types/order";

interface VerifiedOrderItem {
  product_id: string;
  product_name: string;
  unit_price: number;
  unit: string;
  quantity: number;
}

export const orderRepository = {
  async createOrderWithItems(
    order: CreateOrderInput,
    items: VerifiedOrderItem[],
    totalPrice: number,
    shippingPrice: number,
  ) {
    return supabase.rpc("create_order_with_items", {
      p_customer_name: order.customer_name,
      p_customer_email: order.customer_email,
      p_customer_phone: order.customer_phone,

      p_postal_code: order.postal_code,
      p_city: order.city,
      p_street_address: order.street_address,

      p_company_name: order.company_name ?? "",
      p_message: order.message ?? null,

      p_shipping_method: order.shipping_method,
      p_shipping_price: shippingPrice,
      p_terms_accepted: order.terms_accepted,

      p_items: items,
      p_total_price: totalPrice,
    });
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
          unit_price,
          unit,
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
          unit_price,
          unit,
          quantity
        )
      `,
      )
      .eq("id", id)
      .single();
  },

  async updateStatus(id: string, status: string) {
    return supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select("*")
      .single();
  },
};
