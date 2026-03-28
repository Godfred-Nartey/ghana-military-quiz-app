// Achievement types
export interface Achievement {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  criteriaType: string;
  criteriaValue: number;
  points: number;
  badgeColor?: string;
  isActive: boolean;
  createdAt: string;
}

export interface UserAchievement {
  id: number;
  userId: number;
  achievementId: number;
  earnedAt: string;
  achievement?: Achievement;
}

export interface CreateAchievementRequest {
  name: string;
  description?: string;
  icon?: string;
  criteriaType: string;
  criteriaValue: number;
  points: number;
  badgeColor?: string;
}

export interface UpdateAchievementRequest extends Partial<CreateAchievementRequest> {
  isActive?: boolean;
}
