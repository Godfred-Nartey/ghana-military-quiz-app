import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiResponse } from '../types';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<unknown>>) => {
    console.error('API Error:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
      // Handle unauthorized - redirect to login
      if (error.response.status === 401) {
        console.error('401 Unauthorized - redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Use React Router navigation instead of full page reload
        window.location.href = '/login';
      }

      if (error.response.status === 403) {
        const requestUrl = error.config?.url || '';
        const isAdminRequest = requestUrl.startsWith('/admin') || requestUrl.startsWith('/questions');
        const apiError = error.response.data as ApiResponse<unknown> | undefined;
        const forbiddenMessage = apiError?.error || apiError?.message;

        if (isAdminRequest && !forbiddenMessage) {
          return Promise.reject(new Error('You do not have permission to access admin resources. Please sign in with an admin account.'));
        }
      }
      
      // Return the error response - check for both 'error' and 'message' fields
      const apiError = error.response.data as ApiResponse<unknown> | undefined;
      const errorMessage = apiError?.error || apiError?.message || `Error: ${error.response.status} - ${error.response.statusText}`;
      console.error('Extracted error message:', errorMessage);
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      console.error('No response received, request:', error.request);
      // Network error - don't redirect to login for network errors
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      console.error('Error message:', error.message);
      return Promise.reject(new Error(error.message || 'An error occurred'));
    }
  }
);

export default apiClient;
