import { SERVER_ENDPOINTS } from '@/constants/server-endpoint.constants';

import { IProfile } from '@/types/user.types';

import { axiosAuth } from '@/api/interceptors';

export const UserService = {
  async getProfile() {
    console.log('fetching profile...');
    const response = await axiosAuth.get<IProfile>(
      `/${SERVER_ENDPOINTS.USERS.BASE}`,
    );

    return response?.data;
  },
};
