'use client';

import { DialogHTMLAttributes, forwardRef } from 'react';

type TDialogProps = {
  toggleDialog: () => void;
} & DialogHTMLAttributes<HTMLDialogElement>;

export const Dialog = forwardRef<HTMLDialogElement, TDialogProps>(
  ({ children, className, toggleDialog }, ref) => {
    return (
      <dialog
        ref={ref}
        onClick={e => e.currentTarget === e.target && toggleDialog()} //closes the dialog on empty space click outside the dialog
        className={`rounded-3xl ${className}`}
      >
        <div
          onClick={e => e.stopPropagation()} //prevents closing the dialog on empty space click inside the dialog
          className="p-8"
        >
          {children}
        </div>
      </dialog>
    );
  },
);

Dialog.displayName = 'Dialog';
