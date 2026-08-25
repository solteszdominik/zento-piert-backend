import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z
  .object({
    PORT: z.string().optional(),

    FRONTEND_URL: z.string().url(),
    FRONTEND_URL_WWW: z.string().url().optional(),

    SUPABASE_URL: z.string().url(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

    EMAIL_ENABLED: z.enum(["true", "false"]).default("false"),

    RESEND_API_KEY: z.string().optional(),
    ADMIN_EMAIL: z.string().optional(),
    EMAIL_FROM: z.string().optional(),
  })
  .superRefine((env, ctx) => {
    if (env.EMAIL_ENABLED !== "true") {
      return;
    }

    if (!env.RESEND_API_KEY?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["RESEND_API_KEY"],
        message: "RESEND_API_KEY is required when email is enabled",
      });
    }

    if (!env.ADMIN_EMAIL?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["ADMIN_EMAIL"],
        message: "ADMIN_EMAIL is required when email is enabled",
      });
    } else if (!z.string().email().safeParse(env.ADMIN_EMAIL.trim()).success) {
      ctx.addIssue({
        code: "custom",
        path: ["ADMIN_EMAIL"],
        message: "ADMIN_EMAIL must be a valid email address",
      });
    }

    if (!env.EMAIL_FROM?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["EMAIL_FROM"],
        message: "EMAIL_FROM is required when email is enabled",
      });
    }
  });

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid environment variables:");
  console.error(result.error.flatten().fieldErrors);

  process.exit(1);
}

export const env = result.data;
