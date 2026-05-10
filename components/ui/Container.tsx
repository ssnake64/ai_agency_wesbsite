import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mx-auto w-full max-w-container px-6 md:px-8', className)}
      {...props}
    />
  );
}
