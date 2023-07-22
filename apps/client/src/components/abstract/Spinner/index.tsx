import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Spinner({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={twMerge(
        'aspect-square h-12 animate-spin rounded-full border-4 border-blue-600/50 border-t-blue-200',
        className,
      )}
      {...props}
    />
  );
}
