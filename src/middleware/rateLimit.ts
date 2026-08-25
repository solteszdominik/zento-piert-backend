import { rateLimit } from "express-rate-limit";

export const orderRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many order requests. Please try again later.",
  },
});
