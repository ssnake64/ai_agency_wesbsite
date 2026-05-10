import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type Align = 'left' | 'center';

type Props = {
  eyebrow?: string;
  heading: ReactNode;
  subhead?: ReactNode;
  align?: Align;
  className?: string;
  headingClassName?: string;
};

export function SectionHeading({
  eyebrow,
  heading,
  subhead,
  align = 'center',
  className,
  headingClassName,
}: Props) {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <div className={cn('flex flex-col gap-4', alignCls, className)}>
      {eyebrow && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-muted">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'text-display text-5xl md:text-6xl text-ink',
          headingClassName
        )}
      >
        {heading}
      </h2>
      {subhead && (
        <p className={cn('max-w-xl text-base md:text-lg text-ink-muted leading-relaxed')}>
          {subhead}
        </p>
      )}
    </div>
  );
}
