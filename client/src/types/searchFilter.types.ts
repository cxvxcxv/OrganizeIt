export type TSearchFilters = {
  categoryId?: number | null;
  deadline?: string;
  priority?: 'low' | 'medium' | 'high';
  isCompleted?: boolean;
};

export enum ESearchFilterKeys {
  CATEGORY_ID = 'categoryId',
  DEADLINE = 'deadline',
  PRIORITY = 'priority',
  IS_COMPLETED = 'isCompleted',
}
