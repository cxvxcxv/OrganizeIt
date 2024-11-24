import { SERVER_ENDPOINTS } from '@/constants/server-endpoint.constants';

import { ICategory, TCategoryInput } from '@/types/category.types';

import { axiosAuth } from '@/api/interceptors';

export const CategoryService = {
  async create(data: TCategoryInput) {
    try {
      const response = await axiosAuth.post<ICategory>(
        SERVER_ENDPOINTS.CATEGORIES.BASE,
        data,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  async update(categoryId: number, data: TCategoryInput) {
    try {
      const response = await axiosAuth.put<ICategory>(
        `${SERVER_ENDPOINTS.CATEGORIES.BASE}/${categoryId}`,
        data,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  async delete(categoryId: number) {
    const response = await axiosAuth.delete<boolean>(
      `${SERVER_ENDPOINTS.CATEGORIES.BASE}/${categoryId}`,
    );

    return response?.data;
  },
};
