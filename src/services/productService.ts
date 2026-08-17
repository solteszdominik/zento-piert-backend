import { productRepository } from "../repositories/productRepository";
import type { UpdateProductInput } from "../repositories/productRepository";
import { AppError } from "../utils/AppError";

export const productService = {
  async getProducts() {
    const { data, error } = await productRepository.findAll();

    if (error) {
      throw new AppError(error.message, 500);
    }

    return data;
  },

  async getProductBySlug(slug: string) {
    const { data, error } = await productRepository.findBySlug(slug);

    if (error || !data) {
      throw new AppError("Product not found", 404);
    }

    return data;
  },

  async getProductById(id: string) {
    const { data, error } = await productRepository.findById(id);

    if (error || !data) {
      throw new AppError("Product not found", 404);
    }

    return data;
  },

  async updateProduct(id: string, input: UpdateProductInput) {
    if (input.price !== undefined && input.price < 0) {
      throw new AppError("Product price cannot be negative", 400);
    }

    const { data, error } = await productRepository.updateById(id, input);

    if (error || !data) {
      throw new AppError(error?.message ?? "Failed to update product", 500);
    }

    return data;
  },

  async createProduct(input: UpdateProductInput) {
    const { data, error } = await productRepository.create(input);

    if (error || !data) {
      throw new AppError(error?.message ?? "Failed to create product", 500);
    }

    return data;
  },
};
