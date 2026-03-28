import apiClient from '../client';
import { User, RegisterData, Category, CreateCategoryRequest, UpdateCategoryRequest, Question, ApiResponse } from '../../types';

export interface AdminStatistics {
  totalUsers: number;
  totalCategories: number;
  totalQuestions: number;
  totalQuizzesTaken: number;
  totalActiveUsers: number;
  averageScore: number;
}

// Admin API endpoints
export const adminApi = {
  // Get admin statistics
  getStatistics: async (): Promise<AdminStatistics> => {
    const response = await apiClient.get<ApiResponse<AdminStatistics>>('/admin/stats');
    return response.data.data!;
  },

  // User management
  getAllUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<User[]>>('/admin/users');
    return response.data.data!;
  },

  createUser: async (data: RegisterData): Promise<User> => {
    const response = await apiClient.post<ApiResponse<User>>('/admin/users', data);
    return response.data.data!;
  },

  updateUser: async (id: number, data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<ApiResponse<User>>(`/admin/users/${id}`, data);
    return response.data.data!;
  },

  deleteUser: async (id: number): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>(`/admin/users/${id}`);
  },

  // Category management
  getAllCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<ApiResponse<Category[]>>('/categories');
    return response.data.data!;
  },

  createCategory: async (data: CreateCategoryRequest): Promise<Category> => {
    const response = await apiClient.post<ApiResponse<Category>>('/categories', data);
    return response.data.data!;
  },

  updateCategory: async (id: number, data: UpdateCategoryRequest): Promise<Category> => {
    const response = await apiClient.put<ApiResponse<Category>>(`/categories/${id}`, data);
    return response.data.data!;
  },

  deleteCategory: async (id: number): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>(`/categories/${id}`);
  },

  // Question management
  getAllQuestions: async (): Promise<Question[]> => {
    const response = await apiClient.get<ApiResponse<Question[]>>('/questions');
    return response.data.data!;
  },

  getQuestionsByCategory: async (categoryId: number): Promise<Question[]> => {
    const response = await apiClient.get<ApiResponse<Question[]>>(`/questions/category/${categoryId}`);
    return response.data.data!;
  },

  createQuestion: async (data: Omit<Question, 'id' | 'createdAt' | 'updatedAt' | 'timesAnswered' | 'timesCorrect'>): Promise<Question> => {
    const response = await apiClient.post<ApiResponse<Question>>('/questions', data);
    return response.data.data!;
  },

  updateQuestion: async (id: number, data: Partial<Question>): Promise<Question> => {
    const response = await apiClient.put<ApiResponse<Question>>(`/questions/${id}`, data);
    return response.data.data!;
  },

  deleteQuestion: async (id: number): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>(`/questions/${id}`);
  },
};