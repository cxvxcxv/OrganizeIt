'use client';

import { CircleCheck } from 'lucide-react';
import Link from 'next/link';

import { COLORS } from '@/constants/color.constants';

import { ITask } from '@/types/task.types';

import { PAGES } from '@/config/urls.config';

import { useTaskCompletionMutation } from '@/hooks/useTaskCompletionMutation';

import { formatDate } from '@/utils/formatDate';

type TSearchTaskItemProps = {
  task: ITask;
  toggleSearchDialog: () => void;
};

export function SearchTaskItem({
  task,
  toggleSearchDialog,
}: TSearchTaskItemProps) {
  const { mutate, isCompletedOptimistic } = useTaskCompletionMutation(task);
  const formattedDeadline = formatDate(task.deadline);

  return (
    <div className="mb-2 flex items-center gap-4">
      <button onClick={() => mutate()}>
        <CircleCheck
          strokeWidth={1}
          fill={isCompletedOptimistic ? COLORS.primary : COLORS.transparent}
          className="transition-colors"
        />
      </button>
      <Link
        href={`${PAGES.TASKS}/${task.id}`}
        onClick={toggleSearchDialog}
        className="w-full"
      >
        <h6 className="font-medium">{task.title}</h6>
        <p className="text-sm opacity-70">
          {formattedDeadline} - {task.priority}
        </p>
      </Link>
    </div>
  );
}
