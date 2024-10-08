'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Field } from '@/components/ui/Field';
import { Loader } from '@/components/ui/Loader';
import { ButtonPrimary } from '@/components/ui/buttons/ButtonPrimary';

import { SITE_NAME } from '@/constants/seo.constants';

import { TAuthForm } from '@/types/auth.types';

import authWelcome from '@/assets/images/authWelcome.png';

import { PAGES } from '@/config/urls.config';

import { errorCatch } from '@/api/error';

import { AuthService } from '@/services/auth/auth.service';

export function Auth() {
  const [authMethod, setAuthMethod] = useState<'Sign In' | 'Sign Up'>(
    'Sign In',
  );
  const [errorMessage, setErrorMessage] = useState('');

  const { replace } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: TAuthForm) =>
      AuthService.auth(authMethod === 'Sign In' ? 'signIn' : 'signUp', data),
    onError: (err: AxiosError) => setErrorMessage(errorCatch(err)),
    onSuccess: () => {
      replace(PAGES.DASHBOARD);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthForm>({
    mode: 'onBlur',
  });

  const handleChangeAuthMethod = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAuthMethod(prev => (prev === 'Sign In' ? 'Sign Up' : 'Sign In'));
  };

  const onSubmit: SubmitHandler<TAuthForm> = data => {
    mutate(data);
  };

  return (
    <section className="flex h-screen items-center justify-center p-4 xl:p-48">
      <div className="relative hidden w-full p-8 xl:block">
        <Image src={authWelcome} alt="" className="w-full" priority />
        <div className="absolute left-0 top-0 -z-10 h-full w-3/4 rounded-[20%] bg-white" />
      </div>
      <div className="w-full sm:w-2/3">
        <h1 className="text-center text-5xl font-bold">{SITE_NAME}</h1>
        <h2 className="my-4 text-center text-3xl font-semibold">
          {authMethod}
        </h2>
        <form
          className="rounded-3xl bg-white p-8 pb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field
            label="Email"
            id="email"
            placeholder="email"
            {...register('email', {
              required: 'Email is a required field',
              //email validation
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors?.email?.type === 'required' && (
            <p className="text-error text-xs">{errors.email.message}</p>
          )}
          {errors?.email?.type === 'pattern' && (
            <p className="text-error text-xs">Please provide a valid email</p>
          )}
          <Field
            label="Password"
            id="password"
            placeholder="password"
            className="mt-2"
            type="password"
            {...register('password', {
              minLength: 6,
            })}
          />
          {errors?.password?.type === 'minLength' && (
            <p className="text-error text-xs">
              Password must be at least 6 characters long
            </p>
          )}
          <ButtonPrimary
            className="mt-8 w-full"
            //disables if there are errors or is fetching
            disabled={!!Object.keys(errors).length || isPending}
          >
            Continue {isPending ? <Loader /> : <ArrowRight />}
          </ButtonPrimary>
          {errorMessage && (
            <p className="text-error text-center text-xs">{errorMessage}</p>
          )}
          <p className="mt-4 text-center text-sm">
            {authMethod === 'Sign In'
              ? 'First time here?'
              : 'Already have an account?'}
            <button
              className="ml-1 underline"
              onClick={e => handleChangeAuthMethod(e)}
            >
              {authMethod === 'Sign In' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </form>
      </div>
    </section>
  );
}
