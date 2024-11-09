import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FileCheck, Loader, X } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
} from '@/constants/task.constants';

import { TTaskInput } from '@/types/task.types';

import { useProfile } from '@/hooks/useProfile';

import { identifyTaskCategoryId } from '@/utils/identifyProperty';

import { Field } from '../ui/Field';
import { ButtonActive } from '../ui/buttons/ButtonActive';

import { TaskService } from '@/services/task.service';

export function CreateTaskDialogContent({
  toggleCreateTaskDialog,
}: {
  toggleCreateTaskDialog: () => void;
}) {
  const { data: { categories = [] } = {} } = useProfile();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTaskInput>({
    mode: 'onBlur',
    defaultValues: { priority: 'low' },
  });

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: ['createTask'],
    mutationFn: (data: TTaskInput) => TaskService.create(data),
    onMutate: data => console.log(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
    onError: err => console.log(err),
  });

  const onSubmit: SubmitHandler<TTaskInput> = data => {
    if (typeof data.categoryId === 'string')
      data.categoryId = identifyTaskCategoryId(data.categoryId);
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex items-center gap-4">
        <FileCheck />
        <div className="relative w-full">
          <Field
            id="title"
            label=""
            placeholder="Title"
            maxLength={MAX_TITLE_LENGTH}
            {...register('title', { required: 'Title must not be empty' })}
          />
          {errors?.title && (
            <p className="absolute -bottom-4 text-xs text-error">
              {errors.title.message}
            </p>
          )}
        </div>
        <X
          onClick={() => toggleCreateTaskDialog()}
          className="cursor-pointer"
        />
      </div>
      <section className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div>
          <p>Category</p>
          <select
            id="categoryCreate"
            className="w-full rounded-md bg-background py-2"
            {...register('categoryId')}
          >
            <option value="null">None</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Deadline</p>
          <div className="relative">
            <Field
              id="deadlineCreate"
              label=""
              type="date"
              {...register('deadline', { required: 'Deadline is not set' })}
            />
            {errors?.deadline && (
              <p className="absolute -bottom-4 text-xs text-error">
                {errors.deadline.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <p>Priority</p>
          <select
            id="priorityCreate"
            className="w-full rounded-md bg-background py-2"
            {...register('priority')}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </section>
      <div>
        <h3>Description</h3>
        <textarea
          id="descriptionCreate"
          className="h-24 w-full resize-none rounded-md bg-background p-2 text-sm"
          placeholder="Short description about the task"
          {...register('description')}
          maxLength={MAX_DESCRIPTION_LENGTH}
        />
      </div>
      {isError && (
        <p className="text-xs text-error">Unexpected error occurred</p>
      )}
      {isSuccess && (
        <p className="text-xs text-success">Successfully created</p>
      )}
      <ButtonActive className="ml-auto mt-8" disabled={isPending}>
        {isPending ? <Loader /> : <p>Create Task</p>}
      </ButtonActive>
    </form>
  );
}
