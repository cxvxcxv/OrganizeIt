import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export const ButtonActive = ({
  children,
  className,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-full border bg-primary px-6 py-2 font-semibold ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
