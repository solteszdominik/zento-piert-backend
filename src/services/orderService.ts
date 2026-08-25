import { env } from "../config/env";
import { shippingMethods } from "../config/shipping";
import { orderRepository } from "../repositories/orderRepository";
import { productRepository } from "../repositories/productRepository";
import type { CreateOrderInput, OrderStatus } from "../types/order";
import { AppError } from "../utils/AppError";
import { emailService } from "./emailService";

export const orderService = {
  async createOrder(input: CreateOrderInput) {
    if (
      !input.customer_name ||
      !input.customer_email ||
      !input.customer_phone ||
      !input.street_address ||
      !input.postal_code ||
      !input.city
    ) {
      throw new AppError("Missing customer data", 400);
    }

    if (!input.terms_accepted) {
      throw new AppError("Terms must be accepted", 400);
    }

    if (!input.items || input.items.length === 0) {
      throw new AppError("Order must contain at least one item", 400);
    }

    const shippingMethod = shippingMethods[input.shipping_method];

    if (!shippingMethod) {
      throw new AppError("Invalid shipping method", 400);
    }

    const shippingPrice = shippingMethod.price;

    const verifiedItems = await Promise.all(
      input.items.map(async (item) => {
        const { data: product, error } = await productRepository.findById(
          item.product_id,
        );

        if (error || !product) {
          throw new AppError("Product not found", 400);
        }

        if (!product.is_available) {
          throw new AppError(`Product is not available: ${product.name}`, 400);
        }

        return {
          product_id: product.id,
          product_name: product.name,
          unit_price: Number(product.price),
          unit: product.unit,
          quantity: item.quantity,
        };
      }),
    );

    const productsTotal = verifiedItems.reduce(
      (total, item) => total + item.unit_price * item.quantity,
      0,
    );

    const totalPrice = productsTotal + shippingPrice;

    const { data: order, error } = await orderRepository.createOrderWithItems(
      input,
      verifiedItems,
      totalPrice,
      shippingPrice,
    );

    if (error || !order) {
      throw new AppError(error?.message ?? "Failed to create order", 500);
    }

    const emailEnabled = env.EMAIL_ENABLED === "true";

    if (emailEnabled) {
      const emailData = {
        order_number: order.order_number,
        customer_name: input.customer_name,
        customer_email: input.customer_email,
        customer_phone: input.customer_phone,
        customer_address: `${input.postal_code} ${input.city}, ${input.street_address}`,
        message: input.message,
        items: verifiedItems,
      };

      Promise.all([
        emailService.sendOrderConfirmation(emailData),
        emailService.sendAdminOrderNotification(emailData),
      ]).catch((emailError) => {
        console.error(
          `Email sending failed for order ${order.order_number}:`,
          emailError,
        );
      });
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
