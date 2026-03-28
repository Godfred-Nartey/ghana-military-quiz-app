import apiClient from '../client';
import {
  Question,
  QuizAttempt,
  QuizResult,
  StartQuizRequest,
  SubmitAnswerRequest,
  ApiResponse,
} from '../../types';

// Quiz API endpoints
export const quizApi = {
  // Start a new quiz
  startQuiz: async (data: StartQuizRequest): Promise<QuizAttempt> => {
    const response = await apiClient.post<ApiResponse<QuizAttempt>>('/quiz/start', data);
    return response.data.data!;
  },

  // Get quiz questions
  getQuestions: async (attemptId: number): Promise<Question[]> => {
    const response = await apiClient.get<ApiResponse<Question[]>>(
      `/quiz/${attemptId}/questions`
    );
    return response.data.data!;
  },

  // Submit an answer
  submitAnswer: async (attemptId: number, data: SubmitAnswerRequest): Promise<void> => {
    await apiClient.post<ApiResponse<void>>(`/quiz/${attemptId}/answers`, data);
  },

  completeQuiz: async (attemptId: number): Promise<QuizAttempt> => {
  const response = await apiClient.post<ApiResponse<QuizAttempt>>(
    `/quiz/${attemptId}/complete`
  );
  return response.data.data!;
},

  // Get quiz result
  getResult: async (attemptId: number): Promise<QuizResult> => {
    const response = await apiClient.get<ApiResponse<QuizResult>>(
      `/quiz/${attemptId}/result`
    );
    return response.data.data!;
  },

  // Get user's quiz history
  getHistory: async (page = 0, size = 10): Promise<QuizAttempt[]> => {
    const response = await apiClient.get<ApiResponse<QuizAttempt[]>>('/quiz/history', {
      params: { page, size },
    });
    return response.data.data!;
  },

  // Get user's quiz attempts by category
  getByCategory: async (
    categoryId: number,
    page = 0,
    size = 10
  ): Promise<QuizAttempt[]> => {
    const response = await apiClient.get<ApiResponse<QuizAttempt[]>>(
      `/quiz/category/${categoryId}/history`,
      { params: { page, size } }
    );
    return response.data.data!;
  },
};
