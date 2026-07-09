import { productRepository } from "../repositories/productRepository";

export const productService = {
  async getProducts() {
    const { data, error } = await productRepository.findAll();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  async getProductBySlug(slug: string) {
    const { data, error } = await productRepository.findBySlug(slug);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
};
