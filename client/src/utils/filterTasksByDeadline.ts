import { ITask } from '@/types/task.types';

import { formatDate } from './formatDate';

export function filterTasksByDeadline(tasks: ITask[]) {
  if (!tasks) return {} as ITask[][];

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const tomorrowDate = new Date(todayDate);
  tomorrowDate.setDate(todayDate.getDate() + 1);

  const today = formatDate(todayDate);
  const tomorrow = formatDate(tomorrowDate);

  const todayTasks = tasks.filter(
    task => formatDate(new Date(task.deadline)) === today,
  );
  const tomorrowTasks = tasks.filter(
    task => formatDate(new Date(task.deadline)) === tomorrow,
  );
  const laterTasks = tasks.filter(
    task =>
      new Date(task.deadline).setHours(0, 0, 0, 0) > tomorrowDate.getTime(),
  );
  const pastTasks = tasks.filter(
    task => new Date(task.deadline).setHours(0, 0, 0, 0) < todayDate.getTime(),
  );

  return [todayTasks, tomorrowTasks, laterTasks, pastTasks];
}
