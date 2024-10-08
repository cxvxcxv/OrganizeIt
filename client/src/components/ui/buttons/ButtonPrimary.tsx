import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type TButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonPrimary = ({
  children,
  className,
  ...rest
}: PropsWithChildren<TButtonProps>) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-full border bg-primary px-6 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
