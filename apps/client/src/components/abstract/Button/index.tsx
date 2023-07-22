import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ComponentProps<'button'> {}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge('flex justify-center rounded-lg bg-indigo-400 px-6 py-2', className)}
      {...props}
    >
      {children}
    </button>
  );
}
