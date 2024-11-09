'use client';

import { useMutation } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Loader } from '@/components/Loader';
import { Field } from '@/components/ui/Field';
import { ButtonActive } from '@/components/ui/buttons/ButtonActive';
import { ButtonInactive } from '@/components/ui/buttons/ButtonInactive';

import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from '@/constants/user.constants';

import { IUser } from '@/types/user.types';

import { useProfile } from '@/hooks/useProfile';

import { errorCatch } from '@/api/error';

import { UserService } from '@/services/user.service';

export function Profile() {
  const { data } = useProfile();
  const [isEmailDisabled, setIsEmailDisabled] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Partial<IUser>>({ mode: 'onBlur' });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: (data: Partial<IUser>) => UserService.updateProfile(data),
    onError: err => setServerErrorMessage(errorCatch(err)),
    onSuccess: () => setIsEmailDisabled(true),
  });

  const onSubmit: SubmitHandler<Partial<IUser>> = data => {
    mutate(data);
  };

  useEffect(() => {
    if (data) setValue('username', data.username);
  }, [data]);

  return (
    <section className="rounded-xl bg-secondary p-8">
      <h1>Profile</h1>

      <div className="-mx-8 my-4 border border-background" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_2fr_1fr]">
          <h3>Username</h3>
          <div>
            <Field
              id="usernameUpdate"
              label=""
              defaultValue={data?.username}
              placeholder="Username"
              {...register('username', {
                minLength: {
                  value: MIN_USERNAME_LENGTH,
                  message: `Username must be at least ${MIN_USERNAME_LENGTH} characters`,
                },
                maxLength: {
                  value: MAX_USERNAME_LENGTH,
                  message: `Username cannot exceed ${MAX_USERNAME_LENGTH} characters`,
                },
              })}
            />
            {errors?.username && (
              <p className="text-xs text-error">{errors.username.message}</p>
            )}
          </div>
        </div>
        <div className="-mx-8 my-4 border border-background" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_2fr_1fr]">
          <h3>Email</h3>
          <div>
            <Field
              id="emailUpdate"
              label=""
              defaultValue={data?.email}
              placeholder="Email"
              type="email"
              disabled={isEmailDisabled}
              inputExtra={isEmailDisabled ? 'bg-transparent underline' : ''}
              {...register('email', {
                //email validation
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors?.email?.type === 'pattern' && (
              <p className="text-xs text-error">Please provide a valid email</p>
            )}
          </div>
          <ButtonInactive
            onClick={e => {
              e.preventDefault();
              setIsEmailDisabled(false);
            }}
            className="h-min w-max lg:justify-self-center"
            disabled={!isEmailDisabled}
          >
            Change email
          </ButtonInactive>
        </div>
        <div className="-mx-8 my-4 border border-background" />

        {serverErrorMessage && !isSuccess && (
          <p className="text-xs text-error">{serverErrorMessage}</p>
        )}
        {isSuccess && (
          <p className="text-xs text-success">Successfully updated</p>
        )}

        <ButtonActive
          className="m-auto mt-16"
          disabled={!!Object.keys(errors).length || isPending}
        >
          {isPending ? <Loader /> : <Check />}
          Save changes
        </ButtonActive>
      </form>
    </section>
  );
}
