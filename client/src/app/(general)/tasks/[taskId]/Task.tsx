'use client';

import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Field } from '@/components/ui/Field';
import { ButtonActive } from '@/components/ui/buttons/ButtonActive';

import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
} from '@/constants/task.constants';

import { TTaskInput } from '@/types/task.types';

import { useProfile } from '@/hooks/useProfile';
import { useTask } from '@/hooks/useTask';

import { formatDate } from '@/utils/formatDate';
import { identifyTaskCategoryId } from '@/utils/identifyProperty';

import { errorCatch } from '@/api/error';

import { TaskService } from '@/services/task.service';

export function Task() {
  const { data: task, isLoading, error } = useTask();
  const { data: { categories = [] } = {} } = useProfile();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TTaskInput>({
    mode: 'onBlur',
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['updateTask'],
    mutationFn: ({ taskId, data }: { taskId: number; data: TTaskInput }) =>
      TaskService.update(taskId, data),
    onSuccess: () => console.log('success'),
    onError: err => console.log(err),
  });

  const onSubmit: SubmitHandler<TTaskInput> = data => {
    data.categoryId = identifyTaskCategoryId(data.categoryId?.toString() || '');
    if (task?.id) mutate({ taskId: task?.id, data });
  };

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        categoryId: task.category?.id,
        deadline: formatDate(task.deadline),
        priority: task.priority,
        description: task.description,
      });
    }
  }, [!!task]);

  return (
    <section className="rounded-xl bg-white p-4">
      {isLoading && <p>Loading...</p>}
      {error && <p>{errorCatch(error)}</p>}

      {task && (
        <form id="taskForm" onSubmit={handleSubmit(onSubmit)}>
          <section className="grid items-center gap-2 md:grid-cols-[10rem_1fr] md:gap-4">
            <p>Title</p>
            <div>
              <Field
                id="taskTitle"
                label=""
                defaultValue={task.title}
                placeholder="Title"
                maxLength={MAX_TITLE_LENGTH}
                {...register('title', { required: 'Title must not be empty' })}
              />
              {errors?.title && (
                <p className="text-xs text-error">{errors.title.message}</p>
              )}
            </div>

            <p>Category</p>
            <select
              id="taskCategory"
              defaultValue={task.category?.id}
              className="rounded-md bg-background p-2"
              {...register('categoryId')}
            >
              <option value="null">None</option>
              {categories?.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <p>Deadline</p>
            <div>
              <Field
                label=""
                id="taskDeadline"
                type="date"
                defaultValue={formatDate(task.deadline)}
                {...register('deadline', { required: 'Deadline is required' })}
              />
              {errors.deadline && (
                <p className="text-xs text-error">{errors.deadline.message}</p>
              )}
            </div>

            <p>Priority</p>
            <select
              id="taskPriority"
              className="rounded-md bg-background p-2"
              defaultValue={task.priority}
              {...register('priority')}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <p className="place-self-start">Description</p>
            <textarea
              id="taskDescription"
              className="h-24 w-full resize-none rounded-md bg-background p-2"
              placeholder="Description (optional)"
              maxLength={MAX_DESCRIPTION_LENGTH}
              defaultValue={task.description || ''}
              {...register('description')}
            />
          </section>
          <ButtonActive
            className="m-auto mt-8 w-full md:w-1/2"
            disabled={isPending || !task}
          >
            Save
          </ButtonActive>
          {isSuccess && (
            <p className="text-xs text-success">Successfully edited</p>
          )}
        </form>
      )}
    </section>
  );
}
