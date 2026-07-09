import type { Request, Response } from "express";
import { productService } from "../services/productService";

export const productController = {
  async getAllProducts(_req: Request, res: Response) {
    try {
      const products = await productService.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : "Server error",
      });
    }
  },

  async getProductBySlug(req: Request, res: Response) {
    try {
      const slug = req.params.slug;

      if (typeof slug !== "string") {
        return res.status(400).json({ message: "Invalid product slug" });
      }

      const product = await productService.getProductBySlug(slug);
      res.json(product);
    } catch (error) {
      res.status(404).json({
        message: error instanceof Error ? error.message : "Product not found",
      });
    }
  },
};
