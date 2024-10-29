export interface ITask {
  [key: string]: any; //allow indexing dynamically with string keys

  id: number;
  title: string;
  description: string | null;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  categoryId: number;
  userId: number;
}

export type TTaskInput = {
  title: string;
  description?: string | null;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  categoryId: number | null;
};
