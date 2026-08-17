import { productService } from "../services/productService";
import type {
  CreateProductRequest,
  IdParams,
  SlugParams,
  UpdateProductRequest,
} from "../types/api";
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

  getProductById: asyncHandler<IdParams>(async (req, res) => {
    const product = await productService.getProductById(req.params.id);

    res.json(product);
  }),

  createProduct: asyncHandler<{}, unknown, CreateProductRequest>(
    async (req, res) => {
      const product = await productService.createProduct(req.body);

      res.status(201).json({
        message: "Product created successfully",
        data: product,
      });
    },
  ),

  updateProduct: asyncHandler<IdParams, unknown, UpdateProductRequest>(
    async (req, res) => {
      const product = await productService.updateProduct(
        req.params.id,
        req.body,
      );

      res.json({
        message: "Product updated successfully",
        data: product,
      });
    },
  ),
};
