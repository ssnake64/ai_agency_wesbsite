import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

type Tone = 'lime' | 'outline' | 'soft';

const tones: Record<Tone, string> = {
  lime: 'bg-accent text-bg-dark',
  outline: 'border border-line text-ink bg-transparent',
  soft: 'bg-accent-soft text-bg-dark',
};

export function Badge({
  tone = 'lime',
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]',
        tones[tone],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
