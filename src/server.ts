import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";

import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { AppError } from "./utils/AppError";

const app = express();

const allowedOrigins = [
  env.FRONTEND_URL,
  env.FRONTEND_URL_WWW,
  "http://localhost:3000",
].filter((origin): origin is string => Boolean(origin));

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new AppError("Origin not allowed", 403));
    },
    credentials: true,
  }),
);

app.use(
  express.json({
    limit: "100kb",
  }),
);

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use(errorHandler);

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
