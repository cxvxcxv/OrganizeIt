'use client';

import { useEffect, useState } from 'react';

import { TaskItem } from '@/components/task/Taskitem';

import { taskLabels } from '@/constants/task.constants';

import { ITask } from '@/types/task.types';

import { useProfile } from '@/hooks/useProfile';

import { filterTasksByDeadline } from '@/utils/filterTasksByDeadline';

export function Tasks() {
  const { data: { tasks = [] } = {} } = useProfile();
  const [tasksByDeadline, setTasksByDeadline] = useState<ITask[][]>();
  useEffect(() => {
    setTasksByDeadline(filterTasksByDeadline(tasks));
  }, [JSON.stringify(tasks)]);

  return (
    <section className="px-2 md:px-0">
      {tasksByDeadline?.map((tasksPeriod, index) => (
        <section
          key={index}
          className="mb-8 rounded-xl bg-white px-2 py-4 md:px-4 lg:px-8"
        >
          <div className="grid items-center justify-items-center py-2 text-sm font-bold text-black text-opacity-50 md:grid-cols-4">
            <h3 className="justify-self-start text-black text-opacity-100">
              {taskLabels[index]}
            </h3>
            {['DUE DATE', 'PRIORITY', 'CATEGORY'].map((column, index) => (
              <p key={index} className="hidden md:block">
                {column}
              </p>
            ))}
          </div>
          {tasksPeriod.length ? (
            tasksPeriod.map(task => (
              <TaskItem key={task.id} task={task} index={index} />
            ))
          ) : (
            <p>No tasks</p>
          )}
        </section>
      ))}
    </section>
  );
}
