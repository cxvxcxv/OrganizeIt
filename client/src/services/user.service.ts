import { SERVER_ENDPOINTS } from '@/constants/server-endpoint.constants';

import { IProfile } from '@/types/user.types';

import { axiosAuth } from '@/api/interceptors';

export const UserService = {
  async getProfile() {
    const response = await axiosAuth.get<IProfile>(
      `/${SERVER_ENDPOINTS.USERS}`,
    );

    return response?.data;
  },
};
