import apiClient from '../client';
import { User, UserStatistics, UserProgress, LeaderboardEntry, ApiResponse } from '../../types';

// User API endpoints
export const userApi = {
  // Get user profile
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/users/profile');
    return response.data.data!;
  },

  // Get user statistics
  getStatistics: async (): Promise<UserStatistics> => {
    const response = await apiClient.get<ApiResponse<UserStatistics>>('/users/statistics');
    return response.data.data!;
  },

  // Get user progress by category
  getProgress: async (): Promise<UserProgress[]> => {
    const response = await apiClient.get<ApiResponse<UserProgress[]>>('/users/progress');
    return response.data.data!;
  },

  // Get user progress by category ID
  getProgressByCategory: async (categoryId: number): Promise<UserProgress> => {
    const response = await apiClient.get<ApiResponse<UserProgress>>(
      `/users/progress/${categoryId}`
    );
    return response.data.data!;
  },

  // Get global leaderboard
  getLeaderboard: async (page = 0, size = 20): Promise<LeaderboardEntry[]> => {
    const response = await apiClient.get<ApiResponse<LeaderboardEntry[]>>('/users/leaderboard', {
      params: { page, size },
    });
    return response.data.data!;
  },

  // Get category leaderboard
  getCategoryLeaderboard: async (
    categoryId: number,
    page = 0,
    size = 20
  ): Promise<LeaderboardEntry[]> => {
    const response = await apiClient.get<ApiResponse<LeaderboardEntry[]>>(
      `/users/leaderboard/${categoryId}`,
      { params: { page, size } }
    );
    return response.data.data!;
  },

  // Get all users (admin)
  getAll: async (page = 0, size = 20): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<User[]>>('/users', {
      params: { page, size },
    });
    return response.data.data!;
  },

  // Update user (admin)
  updateUser: async (id: number, data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data.data!;
  },

  // Delete user (admin)
  deleteUser: async (id: number): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>(`/users/${id}`);
  },
};
