import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ComponentProps<'button'> {
  size?: 'sm' | 'md';
}

export default function Button({ children, className, size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        'flex justify-center rounded-lg bg-indigo-400 disabled:opacity-50',
        size === 'sm' ? 'px-4 py-1' : 'px-6 py-2',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
