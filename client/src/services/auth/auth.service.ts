import { axiosPublic } from '@/api/interceptors';

import type {
  TAuthForm,
  TAuthMethod,
  TAuthResponse,
} from './../../types/auth.types';
import { removeTokenFromStorage, saveTokenToStorage } from './auth.helper';

export const AuthService = {
  async auth(method: TAuthMethod, data: TAuthForm) {
    const response = await axiosPublic.post<TAuthResponse>(
      `auth/${method}`,
      data,
    );

    return response;
  },

  async refreshTokens() {
    const response = await axiosPublic.post<TAuthResponse>(
      `auth/signIn/refresh-tokens`,
    );

    if (response.data.accessToken)
      saveTokenToStorage(response.data.accessToken);

    return response.data;
  },

  async signOut() {
    const response = await axiosPublic.post<boolean>('auth/signOut');

    if (response.data) removeTokenFromStorage();
    return response.data;
  },
};
