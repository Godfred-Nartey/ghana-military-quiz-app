import apiClient from '../client';
import { User, LoginCredentials, RegisterData, AuthResponse, ApiResponse } from '../../types';

// Auth API endpoints
export const authApi = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    console.log('Making login request to:', '/auth/login', credentials);
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    console.log('Login response:', response);
    return response.data.data!;
  },

  // Register
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data.data!;
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data.data!;
  },

  // Update profile
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<ApiResponse<User>>('/auth/profile', data);
    return response.data.data!;
  },

  // Change password
  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    await apiClient.post<ApiResponse<void>>('/auth/change-password', {
      oldPassword,
      newPassword,
    });
  },

  // Logout (client-side)
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
