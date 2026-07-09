import { categoryRepository } from "../repositories/categoryRepository";

export const categoryService = {
  async getCategories() {
    const { data, error } = await categoryRepository.findAll();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
};
