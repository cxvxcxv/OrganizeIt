import { SERVER_ENDPOINTS } from '@/constants/server-endpoint.constants';

import { IProfile, IUser } from '@/types/user.types';

import { axiosAuth } from '@/api/interceptors';

export const UserService = {
  async getProfile() {
    try {
      const response = await axiosAuth.get<IProfile>(
        `/${SERVER_ENDPOINTS.USERS.BASE}`,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  async updateProfile(data: Partial<IUser>) {
    try {
      const response = await axiosAuth.patch<IProfile>(
        `/${SERVER_ENDPOINTS.USERS.BASE}`,
        data,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },
};
