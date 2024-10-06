import { IUser } from './user.types';

export enum EnumTokens {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export type TAuthForm = {
  email: string;
  password: string;
};

export type TAuthResponse = {
  user: IUser;
  accessToken: string;
};

export type TAuthMethod = 'signIn' | 'signUp';
