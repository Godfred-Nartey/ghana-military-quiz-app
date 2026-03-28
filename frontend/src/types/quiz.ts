// Quiz types
export type AnswerOption = 'A' | 'B' | 'C' | 'D';
export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

export interface Question {
  id: number;
  categoryId: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: AnswerOption;
  explanation?: string;
  difficultyLevel: DifficultyLevel;
  points: number;
  isActive: boolean;
  timesAnswered: number;
  timesCorrect: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuizAttempt {
  id: number;
  userId: number;
  categoryId: number;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  startedAt: string;
  completedAt?: string;
  isCompleted: boolean;
}

export interface QuizAnswer {
  id: number;
  quizAttemptId: number;
  questionId: number;
  userAnswer: AnswerOption;
  isCorrect: boolean;
  timeSpent: number;
  answeredAt: string;
}

export interface StartQuizRequest {
  categoryId: number;
  numberOfQuestions?: number;
  difficultyLevel?: DifficultyLevel;
}

export interface SubmitAnswerRequest {
  questionId: number;
  userAnswer: AnswerOption;
  timeSpent: number;
}

export interface QuizResult {
  attempt: QuizAttempt;
  answers: QuizAnswer[];
  questions: Question[];
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number;
  percentage: number;
}
