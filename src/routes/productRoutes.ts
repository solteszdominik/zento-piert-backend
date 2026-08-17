import { Router } from "express";
import { productController } from "../controllers/productController";
import { requireAdmin } from "../middleware/authMiddleware";
import type {
  CreateProductRequest,
  IdParams,
  UpdateProductRequest,
} from "../types/api";
import { validateRequest } from "../middleware/validateRequest";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/productSchema";

const router = Router();

router.get("/", productController.getAllProducts);

router.get("/id/:id", requireAdmin, productController.getProductById);

router.patch<IdParams, unknown, UpdateProductRequest>(
  "/id/:id",
  requireAdmin,
  validateRequest(updateProductSchema),
  productController.updateProduct,
);

router.get("/:slug", productController.getProductBySlug);

router.post<{}, unknown, CreateProductRequest>(
  "/",
  requireAdmin,
  validateRequest(createProductSchema),
  productController.createProduct,
);

export default router;
