import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

type TInputFieldProps = {
  id: string;
  label: string;
  autoComplete?: 'on' | 'off';
  extra?: string;
  inputExtra?: string;
  state?: 'error' | 'success';
} & InputHTMLAttributes<HTMLInputElement>;

export const Field = forwardRef<HTMLInputElement, TInputFieldProps>(
  (
    {
      label,
      id,
      className,
      inputExtra,
      type,
      placeholder,
      state,
      disabled,
      autoComplete,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={className}>
        <label htmlFor={id} className="block">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete || 'off'}
          className={clsx(
            `w-full rounded-md bg-background p-2 outline-none ${inputExtra}`,
            { 'cursor-not-allowed opacity-70': disabled },
          )}
          {...rest}
        />
      </div>
    );
  },
);
