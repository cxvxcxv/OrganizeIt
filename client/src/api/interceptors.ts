import axios, { CreateAxiosDefaults } from 'axios';

import { errorCatch } from './error';
import {
  getAccessToken,
  removeTokenFromStorage,
} from '@/services/auth/auth.helper';
import { AuthService } from '@/services/auth/auth.service';

const options: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, //works with server cookies
};

export const axiosPublic = axios.create(options); //for public routes fetch
export const axiosAuth = axios.create(options); //for private routes fetch

axiosAuth.interceptors.request.use(config => {
  const accessToken = getAccessToken();

  if (config?.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosAuth.interceptors.response.use(
  config => config,
  async err => {
    const originalRequest = err.config;

    if (!err.response)
      return Promise.reject(
        new Error('Network error: server may be down or unreachable'),
      );

    if (
      (err?.response?.status === 401 ||
        errorCatch(err) === 'jwt expired' ||
        errorCatch(err) === 'jwt must be provided') &&
      err.config &&
      !err.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await AuthService.refreshTokens();
        return axiosAuth.request(originalRequest);
      } catch (refreshErr) {
        if (errorCatch(refreshErr) === 'jwt expired') removeTokenFromStorage();
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  },
);
