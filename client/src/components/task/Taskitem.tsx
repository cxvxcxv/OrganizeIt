import clsx from 'clsx';
import { CircleCheck } from 'lucide-react';

import { COLORS } from '@/constants/color.constants';
import { taskLabels } from '@/constants/task.constants';

import { TTaskItemProps } from '@/types/task.types';

import { useTaskCompletionMutation } from '@/hooks/useTaskCompletionMutation';

import { formatDate } from '@/utils/formatDate';

export function TaskItem({ task, index }: TTaskItemProps) {
  const { mutate, isCompletedOptimistic } = useTaskCompletionMutation(task);
  return (
    <div
      className={clsx(
        'grid items-center justify-items-center border-t border-background py-3 md:grid-cols-4',
        { 'line-through opacity-70': isCompletedOptimistic },
      )}
    >
      <div className="flex max-w-full items-center gap-2 justify-self-start overflow-hidden">
        <CircleCheck
          strokeWidth={1}
          fill={isCompletedOptimistic ? COLORS.primary : COLORS.transparent}
          className="min-h-6 min-w-6 cursor-pointer transition-colors"
          onClick={() => mutate()}
        />
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {task.title}
        </p>
      </div>
      <p
        className={clsx('hidden md:block', {
          'text-important font-semibold': index <= 1 && !task.isCompleted,
        })}
      >
        {index <= 1 ? taskLabels[index] : formatDate(task.deadline)}
      </p>
      <p
        className={clsx(
          'hidden rounded-xl px-2 py-1 transition-colors md:block lg:rounded-full lg:px-8',
          {
            'bg-priority-low':
              task.priority === 'low' && !isCompletedOptimistic,
          },
          {
            'bg-priority-medium':
              task.priority === 'medium' && !isCompletedOptimistic,
          },
          {
            'bg-priority-high':
              task.priority === 'high' && !isCompletedOptimistic,
          },
        )}
      >
        {task.priority}
      </p>
      <p className="hidden md:block">{task.category?.name || 'None'}</p>
    </div>
  );
}
