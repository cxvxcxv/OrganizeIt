import { SERVER_ENDPOINTS } from '@/constants/server-endpoint.constants';

import { axiosPublic } from '@/api/interceptors';

import type {
  TAuthForm,
  TAuthMethod,
  TAuthResponse,
} from './../../types/auth.types';
import { removeTokenFromStorage, saveTokenToStorage } from './auth.helper';

export const AuthService = {
  async auth(method: TAuthMethod, data: TAuthForm) {
    try {
      const response = await axiosPublic.post<TAuthResponse>(
        `${SERVER_ENDPOINTS.AUTH.BASE}/${method}`,
        data,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  async refreshTokens() {
    try {
      const response = await axiosPublic.post<TAuthResponse>(
        SERVER_ENDPOINTS.AUTH.SIGN_IN.REFRESH_TOKENS,
      );

      if (response.data.accessToken)
        saveTokenToStorage(response.data.accessToken);

      return response.data;
    } catch (err) {
      throw err;
    }
  },

  async signOut() {
    try {
      const response = await axiosPublic.post<boolean>(
        SERVER_ENDPOINTS.AUTH.SIGN_OUT,
      );
      if (response.data) removeTokenFromStorage();
      return response.data;
    } catch (err) {
      throw err;
    }
  },
};
