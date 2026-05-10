import { cn } from '@/lib/cn';

export function PillStep({
  label,
  active,
  className,
}: {
  label: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-full border px-6 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition-colors',
        active
          ? 'border-transparent bg-accent text-bg-dark'
          : 'border-line bg-transparent text-ink',
        className
      )}
    >
      {label}
    </span>
  );
}
