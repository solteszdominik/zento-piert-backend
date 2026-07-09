import { orderRepository } from "../repositories/orderRepository";
import type { CreateOrderInput } from "../types/order";
import { AppError } from "../utils/AppError";

export const orderService = {
  async createOrder(input: CreateOrderInput) {
    if (
      !input.customer_name ||
      !input.customer_email ||
      !input.customer_phone ||
      !input.customer_address
    ) {
      throw new AppError("Missing customer data", 400);
    }

    if (!input.items || input.items.length === 0) {
      throw new AppError("Order must contain at least one item", 400);
    }

    const { data: order, error: orderError } =
      await orderRepository.createOrder(input);

    if (orderError || !order) {
      throw new AppError(orderError?.message ?? "Failed to create order", 500);
    }

    const { data: items, error: itemsError } =
      await orderRepository.createOrderItems(order.id, input.items);

    if (itemsError) {
      throw new AppError(itemsError.message, 500);
    }

    return {
      order,
      items,
    };
  },
  async getOrders() {
    const { data, error } = await orderRepository.findAll();

    if (error) {
      throw new AppError("Failed to fetch orders", 500);
    }

    return data;
  },

  async getOrderById(id: string) {
    const { data, error } = await orderRepository.findById(id);

    if (error) {
      throw new AppError("Failed to fetch order", 500);
    }

    return data;
  },
};
