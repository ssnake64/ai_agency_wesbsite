'use client';

import { cn } from '@/lib/cn';
import { Sparkles } from 'lucide-react';

type Props = {
  text: string;
  size?: number;
  className?: string;
};

// Renders text along a circular path on top of a solid white disk so the badge
// stays readable even when it overlaps a dark surface (e.g. the terminal card).
// The whole disk rotates slowly via CSS animation; the inner accent chip
// counter-rotates so the icon stays upright.
export function StampBadge({ text, size = 132, className }: Props) {
  const id = 'stamp-circle';
  const repeated = (text + text).slice(0, Math.max(60, text.length * 2));
  const radius = size / 2 - 14;

  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative inline-block animate-spin-slow motion-reduce:animate-none',
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="block">
        {/* Solid white disk for legibility on any background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 1}
          fill="#FFFFFF"
          stroke="rgba(26,26,26,0.1)"
          strokeWidth={1}
        />
        <defs>
          <path
            id={id}
            d={`M ${size / 2}, ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${
              radius * 2
            },0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            fill="none"
          />
        </defs>
        <text
          fontFamily="var(--font-inter)"
          fontSize="10"
          fontWeight={600}
          letterSpacing="2.4"
          fill="#1A1A1A"
        >
          <textPath href={`#${id}`} startOffset="0">
            {repeated}
          </textPath>
        </text>
      </svg>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-dark text-accent"
          // Counter-rotate so the icon stays upright while the disk spins
          style={{ animation: 'spinSlow 20s linear infinite reverse' }}
        >
          <Sparkles className="h-5 w-5" strokeWidth={2} />
        </span>
      </div>
    </div>
  );
}
