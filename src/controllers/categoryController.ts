import type { Request, Response } from "express";
import { categoryService } from "../services/categoryService";

export const categoryController = {
  async getAllCategories(_req: Request, res: Response) {
    try {
      const categories = await categoryService.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : "Server error",
      });
    }
  },
};
