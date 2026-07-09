import type { Request, Response } from "express";
import { productService } from "../services/productService";
import { SlugParams } from "../types/api";
import { asyncHandler } from "../utils/asyncHandler";

export const productController = {
  getAllProducts: asyncHandler(async (_req, res) => {
    const products = await productService.getProducts();

    res.json(products);
  }),

  getProductBySlug: asyncHandler<SlugParams>(async (req, res) => {
    const product = await productService.getProductBySlug(req.params.slug);

    res.json(product);
  }),
};
