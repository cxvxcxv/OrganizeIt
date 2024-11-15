import { ICategory } from './category.types';

export interface ITask {
  [key: string]: any; //allows indexing dynamically with string keys

  id: number;
  title: string;
  description: string | null;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  category: ICategory;
}

export type TTaskInput = {
  [key: string]: any; //allows indexing dynamically with string keys

  title: string;
  description?: string | null;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  categoryId: number | null;
};

export enum ETaskInputKeys {
  CATEGORY_ID = 'categoryId',
  DEADLINE = 'deadline',
  PRIORITY = 'priority',
  IS_COMPLETED = 'isCompleted',
  TITLE = 'title',
  DESCRIPTION = 'description',
}

export type TTaskItemProps = {
  task: ITask;
  index: number;
};
