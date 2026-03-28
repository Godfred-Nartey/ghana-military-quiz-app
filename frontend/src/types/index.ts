// Export all types
export * from './user';
export * from './quiz';
export * from './category';
export * from './achievement';
export * from './admin';

// User statistics and progress types
export interface UserStatistics {
  id: number;
  userId: number;
  totalQuizzes: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  totalPoints: number;
  totalTimeSpent: number;
  currentStreak: number;
  longestStreak: number;
  lastQuizDate?: string;
}

export interface UserProgress {
  id: number;
  userId: number;
  categoryId: number;
  totalAttempts: number;
  bestScore: number;
  averageScore: number;
  totalTimeSpent: number;
  totalPoints: number;
  lastAttemptAt?: string;
  category?: {
    id: number;
    name: string;
    icon?: string;
  };
}

export interface LeaderboardEntry {
  rank: number;
  userId: number;
  username: string;
  fullName: string;
  totalPoints: number;
  totalQuizzes: number;
  averageScore: number;
  currentStreak: number;
}
