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
  'group inline-flex items-center gap-3 rounded-full font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none';

const sizes: Record<Size, string> = {
  md: 'pl-5 pr-2 py-2 text-sm',
  lg: 'pl-7 pr-3 py-3 text-base',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-bg-dark text-white hover:bg-ink',
  ghost:
    'border border-line bg-transparent text-ink hover:bg-bg-soft',
  accent:
    'bg-accent text-bg-dark hover:bg-accent-deep',
};

const arrowWrap: Record<Variant, string> = {
  primary: 'bg-accent text-bg-dark group-hover:bg-white',
  ghost: 'bg-bg-dark text-white group-hover:bg-accent group-hover:text-bg-dark',
  accent: 'bg-bg-dark text-accent group-hover:bg-white group-hover:text-bg-dark',
};

const arrowSize: Record<Size, string> = {
  md: 'h-7 w-7',
  lg: 'h-9 w-9',
};

const iconSize: Record<Size, string> = {
  md: 'h-3.5 w-3.5',
  lg: 'h-4 w-4',
};

function ArrowChip({ variant, size }: { variant: Variant; size: Size }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-colors duration-200',
        arrowSize[size],
        arrowWrap[variant]
      )}
    >
      <ArrowUpRight className={iconSize[size]} strokeWidth={2.25} />
    </span>
  );
}

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
  const cls = cn(base, sizes[size], variants[variant], className);
  const inner = (
    <>
      <span className="uppercase">{children}</span>
      {withArrow && <ArrowChip variant={variant} size={size} />}
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
