import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'ghost' | 'accent';
type Size = 'md' | 'lg';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
};

const base =
  'group/btn relative inline-flex items-center rounded-full font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none overflow-hidden';

const sizes: Record<
  Size,
  { container: string; text: string; chip: string; chipHover: string; icon: string }
> = {
  md: {
    container: 'h-12',
    // text padding: leave room for the chip on the right by default; on hover
    // mirror the padding so the chip can sit on the left.
    text:
      'block text-[13px] uppercase tracking-[0.12em] pl-7 pr-[3.25rem] transition-[padding] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none group-hover/btn:pl-[3.25rem] group-hover/btn:pr-7',
    chip:
      'absolute top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full transition-[right] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none h-9 w-9 right-1.5',
    chipHover: 'group-hover/btn:right-[calc(100%-2.625rem)]',
    icon: 'h-3.5 w-3.5',
  },
  lg: {
    container: 'h-[60px]',
    text:
      'block text-sm uppercase tracking-[0.14em] pl-8 pr-[4rem] transition-[padding] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none group-hover/btn:pl-[4rem] group-hover/btn:pr-8',
    chip:
      'absolute top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full transition-[right] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none h-12 w-12 right-1.5',
    chipHover: 'group-hover/btn:right-[calc(100%-3.375rem)]',
    icon: 'h-4 w-4',
  },
};

const variants: Record<Variant, string> = {
  primary: 'bg-bg-dark text-white hover:bg-ink',
  ghost: 'border border-line bg-transparent text-ink hover:bg-bg-soft',
  accent: 'bg-accent text-bg-dark hover:bg-accent-deep',
};

const chipColors: Record<Variant, string> = {
  primary: 'bg-accent text-bg-dark',
  ghost: 'bg-bg-dark text-white',
  accent: 'bg-bg-dark text-accent',
};

type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type BtnProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: LinkProps | BtnProps) {
  const {
    variant = 'primary',
    size = 'md',
    withArrow = true,
    children,
    className,
  } = props;
  const s = sizes[size];
  const cls = cn(base, s.container, variants[variant], className);
  const inner = (
    <>
      <span className={s.text}>{children}</span>
      {withArrow && (
        <span className={cn(s.chip, s.chipHover, chipColors[variant])} aria-hidden>
          <ArrowUpRight strokeWidth={2.25} className={s.icon} />
        </span>
      )}
    </>
  );
  if ('href' in props && props.href) {
    const { href, ...rest } = props as LinkProps;
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  const { variant: _v, size: _s, withArrow: _w, children: _c, className: _cn, ...rest } =
    props as BtnProps;
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}
