import apiClient from '../client';
import {
  Achievement,
  UserAchievement,
  CreateAchievementRequest,
  UpdateAchievementRequest,
  ApiResponse,
} from '../../types';

// Achievement API endpoints
export const achievementApi = {
  // Get all achievements
  getAll: async (): Promise<Achievement[]> => {
    const response = await apiClient.get<ApiResponse<Achievement[]>>('/achievements');
    return response.data.data!;
  },

  // Get active achievements
  getActive: async (): Promise<Achievement[]> => {
    const response = await apiClient.get<ApiResponse<Achievement[]>>('/achievements/active');
    return response.data.data!;
  },

  // Get achievement by ID
  getById: async (id: number): Promise<Achievement> => {
    const response = await apiClient.get<ApiResponse<Achievement>>(`/achievements/${id}`);
    return response.data.data!;
  },

  // Get user's achievements
  getUserAchievements: async (): Promise<UserAchievement[]> => {
    const response = await apiClient.get<ApiResponse<UserAchievement[]>>(
      '/achievements/user'
    );
    return response.data.data!;
  },

  // Create achievement (admin)
  create: async (data: CreateAchievementRequest): Promise<Achievement> => {
    const response = await apiClient.post<ApiResponse<Achievement>>('/achievements', data);
    return response.data.data!;
  },

  // Update achievement (admin)
  update: async (id: number, data: UpdateAchievementRequest): Promise<Achievement> => {
    const response = await apiClient.put<ApiResponse<Achievement>>(
      `/achievements/${id}`,
      data
    );
    return response.data.data!;
  },

  // Delete achievement (admin)
  delete: async (id: number): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>(`/achievements/${id}`);
  },
};
