import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface AlertProps extends Omit<ComponentProps<'p'>, 'children'> {
  error?: unknown;
  size?: 'sm' | 'md';
}

export default function Alert({ error, className, size = 'md', ...props }: AlertProps) {
  if (!error) return null;

  return (
    <p
      className={twMerge(
        'animate-fadein rounded-md border border-red-600 bg-red-600/25',
        size === 'sm' ? 'px-4 py-1 text-sm' : 'p-4 text-base',
        className,
      )}
      {...props}
    >
      {error instanceof Error
        ? error.message
        : typeof error === 'string'
        ? error
        : typeof error === 'object' &&
          hasOwnProperty(error, 'message') &&
          typeof error.message === 'string'
        ? error.message
        : JSON.stringify(error)}
    </p>
  );
}

function hasOwnProperty<O extends object = object, P extends string = string>(
  object: O,
  property: P,
): object is O & { [key in P]: unknown } {
  return Object.prototype.hasOwnProperty.call(object, property);
}
