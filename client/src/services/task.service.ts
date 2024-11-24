import { SERVER_ENDPOINTS } from '@/constants/server-endpoint.constants';

import { ITask, TTaskInput } from '@/types/task.types';

import { axiosAuth } from '@/api/interceptors';

export const TaskService = {
  async getOne(taskId: number) {
    try {
      const response = await axiosAuth.get<ITask>(
        `${SERVER_ENDPOINTS.TASKS.BASE}/${taskId}`,
      );
      return response.data;
    } catch (err: unknown) {
      throw err;
    }
  },

  async create(data: TTaskInput) {
    try {
      const response = await axiosAuth.post<ITask>(
        SERVER_ENDPOINTS.TASKS.BASE,
        data,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  async update(taskId: number, data: TTaskInput) {
    try {
      const response = await axiosAuth.put<ITask>(
        `${SERVER_ENDPOINTS.TASKS.BASE}/${taskId}`,
        data,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async delete(taskId: number) {
    try {
      const response = await axiosAuth.delete<boolean>(
        `${SERVER_ENDPOINTS.TASKS.BASE}/${taskId}`,
      );

      return response.data;
    } catch (err) {
      throw err;
    }
  },
};
