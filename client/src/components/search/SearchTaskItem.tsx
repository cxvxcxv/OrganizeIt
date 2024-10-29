import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';

import { COLORS } from '@/constants/color.constants';

import { ITask } from '@/types/task.types';

import { TaskService } from '@/services/task.service';

type TSearchTaskItemProps = {
  task: ITask;
  handleUpdateTaskList: (updatedTask: ITask) => void;
};

// formats date into yyyy-mm-dd format
const formatDate = (date: string) => new Date(date).toISOString().split('T')[0];

function useTaskCompletionMutation(
  task: ITask,
  onSuccessCallback: (updatedTask: ITask) => void,
) {
  const queryClient = useQueryClient();
  const [isCompletedOptimistic, setIsCompletedOptimistic] = useState(
    task.isCompleted,
  );

  const mutation = useMutation({
    mutationKey: ['changeIsCompleted', task.id],
    mutationFn: () =>
      TaskService.update(task.id, {
        ...task,
        deadline: formatDate(task.deadline),
        isCompleted: isCompletedOptimistic,
      }),
    onMutate: () => setIsCompletedOptimistic(prev => !prev),
    onSuccess: () => {
      onSuccessCallback({ ...task, isCompleted: isCompletedOptimistic });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: () => setIsCompletedOptimistic(task.isCompleted),
  });

  return { ...mutation, isCompletedOptimistic };
}

export function SearchTaskItem({
  task,
  handleUpdateTaskList,
}: TSearchTaskItemProps) {
  const { mutate, isCompletedOptimistic } = useTaskCompletionMutation(
    task,
    handleUpdateTaskList,
  );
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
