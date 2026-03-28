// Category types
export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  questionCount?: number;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  icon?: string;
  displayOrder?: number;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  isActive?: boolean;
}
