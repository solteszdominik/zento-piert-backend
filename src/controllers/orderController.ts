import type { Request, Response } from "express";
import { orderService } from "../services/orderService";
import {
  CreateOrderRequest,
  IdParams,
  UpdateOrderStatusRequest,
} from "../types/api";
import { asyncHandler } from "../utils/asyncHandler";

export const orderController = {
  createOrder: asyncHandler<{}, unknown, CreateOrderRequest>(
    async (req, res) => {
      const result = await orderService.createOrder(req.body);

      res.status(201).json({
        message: "Order created successfully",
        data: result,
      });
    },
  ),

  getAllOrders: asyncHandler(async (_req, res) => {
    const order = await orderService.getOrders();
    res.json(order);
  }),

  getOrderById: asyncHandler<IdParams>(async (req, res) => {
    const order = await orderService.getOrderById(req.params.id);

    res.json(order);
  }),
  updateOrderStatus: asyncHandler<IdParams, unknown, UpdateOrderStatusRequest>(
    async (req, res) => {
      const order = await orderService.updateOrderStatus(
        req.params.id,
        req.body.status,
      );

      res.json({
        message: "Order status updated successfully",
        data: order,
      });
    },
  ),
};
