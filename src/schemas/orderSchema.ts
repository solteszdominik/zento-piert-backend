import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    customer_name: z
      .string()
      .min(2, "Customer name must be at least 2 characters"),

    customer_email: z.string().email("Invalid email address"),

    customer_phone: z.string().min(7, "Invalid phone number"),

    postal_code: z.string().min(4, "Postal code is required"),

    city: z.string().min(2, "City is required"),

    street_address: z.string().min(5, "Street address is required"),

    company_name: z.string().max(200, "Company name is too long").optional(),

    message: z.string().max(1000, "Message is too long").optional(),

    shipping_method: z.string().min(1, "Shipping method is required"),

    terms_accepted: z.literal(true, {
      message: "Terms must be accepted",
    }),

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
