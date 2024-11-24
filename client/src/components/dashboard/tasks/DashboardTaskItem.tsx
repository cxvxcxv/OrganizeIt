import { CircleCheck, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { COLORS } from '@/constants/color.constants';

import { ITask } from '@/types/task.types';

import { PAGES } from '@/config/urls.config';

import { useTaskCompletionMutation } from '@/hooks/useTaskCompletionMutation';

export function DashboardTaskItem({
  task,
  onDelete,
}: {
  task: ITask;
  onDelete: () => void;
}) {
  const { mutate, isCompletedOptimistic } = useTaskCompletionMutation(task);
  return (
    <div className="flex items-center justify-between border-t border-background p-3 hover:shadow-sm">
      <div className="flex flex-grow gap-2 overflow-hidden">
        <button onClick={() => mutate()}>
          <CircleCheck
            strokeWidth={1}
            fill={isCompletedOptimistic ? COLORS.primary : COLORS.transparent}
            className="transition-colors"
          />
        </button>
        <Link
          href={`${PAGES.TASKS}/${task.id}`}
          className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {task.title}
        </Link>
      </div>
      <button
        aria-label="delete task"
        title="delete task"
        className="justify-self-end"
        onClick={onDelete}
      >
        <Trash2 className="h-5 w-5 cursor-pointer transition-colors hover:text-error" />
      </button>
    </div>
  );
}
