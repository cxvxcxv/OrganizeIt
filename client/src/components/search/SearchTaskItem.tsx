'use client';

import { CircleCheck } from 'lucide-react';

import { COLORS } from '@/constants/color.constants';

import { ITask } from '@/types/task.types';

import { useTaskCompletionMutation } from '@/hooks/useTaskCompletionMutation';

import { formatDate } from '@/utils/formatDate';

type TSearchTaskItemProps = {
  task: ITask;
};

export function SearchTaskItem({ task }: TSearchTaskItemProps) {
  const { mutate, isCompletedOptimistic } = useTaskCompletionMutation(task);
  const formattedDeadline = formatDate(task.deadline);

  return (
    <div className="mb-2 flex items-center gap-4">
      <CircleCheck
        strokeWidth={1}
        fill={isCompletedOptimistic ? COLORS.primary : COLORS.transparent}
        className="cursor-pointer transition-colors"
        onClick={() => mutate()}
      />
      <div>
        <h6 className="font-medium">{task.title}</h6>
        <p className="text-sm opacity-70">
          {formattedDeadline} - {task.priority}
        </p>
      </div>
    </div>
  );
}
