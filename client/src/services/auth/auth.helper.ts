import Cookies from 'js-cookie';

import { EnumTokens } from '@/types/auth.types';

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
  return accessToken || null;
};

export const saveTokenToStorage = (accessToken: string) => {
  accessToken = accessToken.slice(7); //removing 'Bearer ' prefix

  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    sameSite: 'strict',
    expires: 1, //lives 1 day in storage
  });
};

export const removeTokenFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN);
};
