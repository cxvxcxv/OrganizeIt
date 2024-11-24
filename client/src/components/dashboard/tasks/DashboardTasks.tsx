import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { ITask } from '@/types/task.types';

import { useProfile } from '@/hooks/useProfile';

import { filterTasksByDeadline } from '@/utils/filterTasksByDeadline';

import { DashboardTaskItem } from './DashboardTaskItem';
import { TaskService } from '@/services/task.service';

export function DashboardTasks() {
  const { data: { tasks = [] } = {} } = useProfile();
  const queryClient = useQueryClient();
  const [sortedTasks, setSortedTasks] = useState<ITask[]>([]);

  const { mutate } = useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: (taskId: number) => TaskService.delete(taskId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
  });

  useEffect(() => {
    setSortedTasks(filterTasksByDeadline(tasks).flat());
  }, [JSON.stringify(tasks)]);

  return (
    <section className="rounded-xl border-b border-background bg-white p-4">
      <h3 className="pb-4">My tasks ({tasks.length})</h3>
      <div className="max-h-96 overflow-y-auto">
        {sortedTasks.map(task => (
          <DashboardTaskItem
            key={task.id}
            task={task}
            onDelete={() => mutate(task.id)}
          />
        ))}
      </div>
    </section>
  );
}
