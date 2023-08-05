import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Tag({ children, className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={twMerge(
        'rounded-md border border-gray-400/20 bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
