import { Router } from "express";
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "../schemas/orderSchema";
import type { IdParams, UpdateOrderStatusRequest } from "../types/api";
import { orderController } from "../controllers/orderController";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

router.get("/", orderController.getAllOrders);

router.get<IdParams>("/:id", orderController.getOrderById);

router.post(
  "/",
  validateRequest(createOrderSchema),
  orderController.createOrder,
);

router.patch<IdParams, unknown, UpdateOrderStatusRequest>(
  "/:id/status",
  validateRequest(updateOrderStatusSchema),
  orderController.updateOrderStatus,
);

export default router;
