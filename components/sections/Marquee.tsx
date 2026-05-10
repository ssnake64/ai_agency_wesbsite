import { Star } from 'lucide-react';
import { cn } from '@/lib/cn';
import { marqueeItems } from '@/content/marquee';

function Track({
  items,
  direction,
  textClass,
}: {
  items: string[];
  direction: 'left' | 'right';
  textClass: string;
}) {
  // Repeat enough times to fill 200% so the loop is seamless.
  const reel = [...items, ...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div
        className={cn(
          'flex w-max items-center gap-8 py-3 motion-reduce:animate-none',
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        )}
      >
        {reel.map((item, i) => (
          <span
            key={i}
            className={cn(
              'flex shrink-0 items-center gap-8 whitespace-nowrap text-base font-semibold uppercase tracking-[0.18em] md:text-lg',
              textClass
            )}
          >
            {item}
            <Star className="h-3.5 w-3.5 shrink-0" fill="currentColor" strokeWidth={0} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative isolate -my-3" aria-hidden>
      <div className="relative">
        {/* Top lime bar */}
        <div className="relative -rotate-[4deg] origin-center bg-accent text-bg-dark">
          <Track items={marqueeItems} direction="left" textClass="text-bg-dark" />
        </div>
        {/* Bottom dark bar */}
        <div className="relative -rotate-[4deg] origin-center bg-bg-dark text-white -mt-2">
          <Track items={marqueeItems} direction="right" textClass="text-white" />
        </div>
      </div>
    </div>
  );
}
