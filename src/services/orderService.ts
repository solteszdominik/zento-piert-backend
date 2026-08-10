import { orderRepository } from "../repositories/orderRepository";
import type { CreateOrderInput, OrderStatus } from "../types/order";
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

    const { data: order, error } =
      await orderRepository.createOrderWithItems(input);

    if (error || !order) {
      throw new AppError(error?.message ?? "Failed to create order", 500);
    }

    return {
      order,
    };
  },
  async getOrders() {
    const { data, error } = await orderRepository.findAll();

    if (error) {
      throw new AppError(error.message, 500);
    }

    return data;
  },

  async getOrderById(id: string) {
    const { data, error } = await orderRepository.findById(id);

    if (error) {
      throw new AppError(error.message, 500);
    }

    return data;
  },
  async updateOrderStatus(id: string, status: OrderStatus) {
    const allowedStatuses: OrderStatus[] = [
      "new",
      "processing",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      throw new AppError("Invalid order status", 400);
    }

    const { data, error } = await orderRepository.updateStatus(id, status);

    if (error || !data) {
      throw new AppError(
        error?.message ?? "Failed to update order status",
        500,
      );
    }

    return data;
  },
};
