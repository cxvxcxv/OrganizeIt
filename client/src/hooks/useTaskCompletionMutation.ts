import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { ITask } from '@/types/task.types';

import { formatDate } from '@/utils/formatDate';

import { TaskService } from '@/services/task.service';

export function useTaskCompletionMutation(task: ITask) {
  const queryClient = useQueryClient();
  const [isCompletedOptimistic, setIsCompletedOptimistic] = useState(
    task.isCompleted,
  );

  const mutation = useMutation({
    mutationKey: ['changeIsCompleted', task.id],
    mutationFn: () => {
      return TaskService.update(task.id, {
        ...task,
        deadline: formatDate(task.deadline),
        categoryId: task?.category?.id || null,
        isCompleted: isCompletedOptimistic,
      });
    },
    onMutate: () => {
      setIsCompletedOptimistic(prev => !prev);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: () => setIsCompletedOptimistic(task.isCompleted),
  });

  return { ...mutation, isCompletedOptimistic };
}
