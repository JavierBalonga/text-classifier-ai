import { ComponentProps, CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';

export interface SkeletonProps extends ComponentProps<'div'> {
  height?: CSSProperties['height'];
  width?: CSSProperties['width'];
}

export default function Skeleton({
  children,
  className,
  style,
  height,
  width,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={twMerge('animate-pulse rounded-md bg-gray-400/30', className)}
      style={{ ...style, height, width }}
      {...props}
    >
      {children}
    </div>
  );
}
