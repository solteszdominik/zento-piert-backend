import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    customer_name: z
      .string()
      .min(2, "Customer name must be at least 2 characters"),

    customer_email: z.string().email("Invalid email address"),

    customer_phone: z.string().min(7, "Invalid phone number"),

    customer_address: z.string().min(5, "Customer address is required"),

    message: z.string().max(1000, "Message is too long").optional(),

    items: z
      .array(
        z.object({
          product_id: z.string().uuid("Invalid product ID"),

          quantity: z
            .number()
            .int()
            .positive("Quantity must be greater than 0"),
        }),
      )
      .min(1, "Order must contain at least one item"),
  }),
});

export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(["new", "processing", "completed", "cancelled"]),
  }),
});
