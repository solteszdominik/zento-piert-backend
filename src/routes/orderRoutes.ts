import { Router } from "express";
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "../schemas/orderSchema";
import type { IdParams, UpdateOrderStatusRequest } from "../types/api";
import { orderController } from "../controllers/orderController";
import { validateRequest } from "../middleware/validateRequest";
import { requireAdmin } from "../middleware/authMiddleware";

const router = Router();

router.get("/", requireAdmin, orderController.getAllOrders);

router.get<IdParams>("/:id", requireAdmin, orderController.getOrderById);
router.post(
  "/",
  validateRequest(createOrderSchema),
  orderController.createOrder,
);

router.patch<IdParams, unknown, UpdateOrderStatusRequest>(
  "/:id/status",
  requireAdmin,
  validateRequest(updateOrderStatusSchema),
  orderController.updateOrderStatus,
);

export default router;
