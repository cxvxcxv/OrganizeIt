import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export const ButtonActive = ({
  children,
  className,
  disabled,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      className={clsx(
        `flex items-center justify-center gap-2 rounded-full border bg-primary px-6 py-2 font-semibold ${className}`,
        { 'cursor-not-allowed opacity-70': disabled },
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
