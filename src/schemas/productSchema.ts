import { z } from "zod";

export const updateProductSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(2, "Product name must be at least 2 characters")
        .optional(),

      slug: z
        .string()
        .min(2, "Slug must be at least 2 characters")
        .regex(
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
          "Slug may only contain lowercase letters, numbers and hyphens",
        )
        .optional(),

      description: z
        .string()
        .max(5000, "Description is too long")
        .nullable()
        .optional(),

      price: z.number().nonnegative("Price cannot be negative").optional(),

      unit: z.enum(["db", "csomag", "lap"]).optional(),

      image_url: z
        .string()
        .max(2000, "Image URL is too long")
        .nullable()
        .optional(),

      is_available: z.boolean().optional(),

      is_featured: z.boolean().optional(),

      category_id: z.string().uuid("Invalid category ID").optional(),

      brand: z.string().max(100, "Brand is too long").nullable().optional(),

      product_line: z
        .string()
        .max(100, "Product line is too long")
        .nullable()
        .optional(),
    })
    .refine(
      (body) => Object.keys(body).length > 0,
      "At least one product field must be provided",
    ),
});

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Product name must be at least 2 characters"),

    slug: z
      .string()
      .min(2, "Slug must be at least 2 characters")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug may only contain lowercase letters, numbers and hyphens",
      ),

    description: z
      .string()
      .max(5000, "Description is too long")
      .nullable()
      .optional(),

    price: z.number().nonnegative("Price cannot be negative"),

    unit: z.enum(["db", "csomag", "lap"]),

    image_url: z
      .string()
      .max(2000, "Image URL is too long")
      .nullable()
      .optional(),

    is_available: z.boolean().default(true),

    is_featured: z.boolean().default(false),

    category_id: z.string().uuid("Invalid category ID"),

    brand: z.string().max(100, "Brand is too long").nullable().optional(),

    product_line: z
      .string()
      .max(100, "Product line is too long")
      .nullable()
      .optional(),

    package_size: z
      .string()
      .max(50, "Package size is too long")
      .nullable()
      .optional(),
  }),
});
