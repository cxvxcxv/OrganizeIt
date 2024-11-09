export type TSearchFilters = {
  categoryId?: number | null;
  deadline?: string;
  priority?: 'low' | 'medium' | 'high';
  isCompleted?: boolean;
};
