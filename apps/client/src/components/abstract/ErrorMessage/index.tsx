import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ErrorMessageProps extends Omit<ComponentProps<'p'>, 'children'> {
  message?: string;
}

export default function ErrorMessage({ message, className, ...props }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <p className={twMerge('animate-fadein text-red-600', className)} {...props}>
      {message}
    </p>
  );
}
