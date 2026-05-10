import { cn } from '@/lib/cn';

type Size = 'sm' | 'md' | 'lg';

const sizes: Record<Size, string> = {
  sm: 'h-7 w-7 text-[11px]',
  md: 'h-9 w-9 text-xs',
  lg: 'h-12 w-12 text-sm',
};

export function NumberBadge({
  n,
  size = 'md',
  className,
}: {
  n: string | number;
  size?: Size;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-accent font-semibold text-bg-dark',
        sizes[size],
        className
      )}
    >
      {n}
    </span>
  );
}
