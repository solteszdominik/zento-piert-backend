import { orderRepository } from "../repositories/orderRepository";
import type { CreateOrderInput } from "../types/order";

export const orderService = {
  async createOrder(input: CreateOrderInput) {
    if (
      !input.customer_name ||
      !input.customer_email ||
      !input.customer_phone ||
      !input.customer_address
    ) {
      throw new Error("Missing customer data");
    }

    if (!input.items || input.items.length === 0) {
      throw new Error("Order must contain at least one item");
    }

    const { data: order, error: orderError } =
      await orderRepository.createOrder(input);

    if (orderError || !order) {
      throw new Error(orderError?.message ?? "Failed to create order");
    }

    const { data: items, error: itemsError } =
      await orderRepository.createOrderItems(order.id, input.items);

    if (itemsError) {
      throw new Error(itemsError.message);
    }

    return {
      order,
      items,
    };
  },
};
