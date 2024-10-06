import { SERVER_ENDPOINTS } from '@/constants/server-endpoint.constants';

import { ITask, TTaskInput } from '@/types/task.types';

import { axiosAuth } from '@/api/interceptors';

export const TaskService = {
  async create(data: TTaskInput) {
    const response = await axiosAuth.post<ITask>(
      SERVER_ENDPOINTS.TASKS.BASE,
      data,
    );

    return response?.data;
  },

  async update(taskId: number, data: TTaskInput) {
    const response = await axiosAuth.put<ITask>(
      `${SERVER_ENDPOINTS.TASKS.BASE}/${taskId}`,
      data,
    );

    return response?.data;
  },

  async delete(taskId: number) {
    const response = await axiosAuth.delete<boolean>(
      `${SERVER_ENDPOINTS.TASKS.BASE}/${taskId}`,
    );

    return response?.data;
  },
};
