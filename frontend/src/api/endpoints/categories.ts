import apiClient from '../client';
import { Category, CreateCategoryRequest, UpdateCategoryRequest, ApiResponse } from '../../types';

// Category API endpoints
export const categoryApi = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<ApiResponse<Category[]>>('/categories');
    return response.data.data!;
  },

  // Get active categories
  getActive: async (): Promise<Category[]> => {
    const response = await apiClient.get<ApiResponse<Category[]>>('/categories/active');
    return response.data.data!;
  },

  // Get category by ID
  getById: async (id: number): Promise<Category> => {
    const response = await apiClient.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data.data!;
  },

  // Create category (admin)
  create: async (data: CreateCategoryRequest): Promise<Category> => {
    const response = await apiClient.post<ApiResponse<Category>>('/categories', data);
    return response.data.data!;
  },

  // Update category (admin)
  update: async (id: number, data: UpdateCategoryRequest): Promise<Category> => {
    const response = await apiClient.put<ApiResponse<Category>>(`/categories/${id}`, data);
    return response.data.data!;
  },

  // Delete category (admin)
  delete: async (id: number): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>(`/categories/${id}`);
  },
};
