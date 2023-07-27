import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TooltipProps extends ComponentProps<'div'> {
  disabled?: boolean;
  title?: string;
}

export default function Tooltip({ title, disabled, children, className, ...props }: TooltipProps) {
  return (
    <div className={twMerge('group relative', className)} {...props}>
      {!disabled && title && (
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-sm bg-zinc-700/50 p-2 opacity-0 transition-opacity group-hover:opacity-100">
          {title}
        </span>
      )}
      {children}
    </div>
  );
}
