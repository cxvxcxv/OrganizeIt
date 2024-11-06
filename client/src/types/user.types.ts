import { ICategory } from './category.types';
import { ITask } from './task.types';

export interface IUser {
  id: number;
  username: string;
  email: string;
}

export interface IProfile extends IUser {
  tasks: ITask[];
  categories: ICategory[];
}
