import type { Request, Response } from "express";
import { orderService } from "../services/orderService";

export const orderController = {
  async createOrder(req: Request, res: Response) {
    try {
      const result = await orderService.createOrder(req.body);

      res.status(201).json({
        message: "Order created successfully",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        message:
          error instanceof Error ? error.message : "Failed to create order",
      });
    }
  },
};
