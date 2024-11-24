'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { TaskService } from '@/services/task.service';

export function useTask() {
  const params = useParams();
  if (!params.taskId || isNaN(Number(params.taskId)))
    return { data: undefined, isLoading: false, error: 'Task not found' };

  const { data, isLoading, error } = useQuery({
    queryKey: ['task', params.taskId],
    queryFn: () => TaskService.getOne(Number(params.taskId)),
    retry: 0,
    staleTime: 0,
  });

  return { data, isLoading, error };
}
