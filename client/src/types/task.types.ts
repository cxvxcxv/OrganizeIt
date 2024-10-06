export interface ITask {
  id: number;
  title: string;
  description: string | null;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  categoryId: number;
  // userId: number;
}

export type TTaskInput = {
  title: string;
  description?: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  categoryId: number;
};
