import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface AlertProps extends Omit<ComponentProps<'p'>, 'children'> {
  error?: unknown;
}

export default function Alert({ error, className, ...props }: AlertProps) {
  if (!error) return null;

  return (
    <p
      className={twMerge(
        'animate-fadein rounded-md border border-red-600 bg-red-600/25 p-4',
        className,
      )}
      {...props}
    >
      {error instanceof Error
        ? error.message
        : typeof error === 'string'
        ? error
        : JSON.stringify(error)}
    </p>
  );
}
