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
          'flex w-max items-center gap-10 py-5 md:py-7 motion-reduce:animate-none',
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        )}
      >
        {reel.map((item, i) => (
          <span
            key={i}
            className={cn(
              'flex shrink-0 items-center gap-10 whitespace-nowrap text-xl font-semibold uppercase tracking-[0.18em] md:text-2xl lg:text-[26px]',
              textClass
            )}
          >
            {item}
            <Star className="h-4 w-4 shrink-0 md:h-5 md:w-5" fill="currentColor" strokeWidth={0} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative isolate my-10" aria-hidden>
      <div className="relative">
        {/* Top lime bar */}
        <div className="relative -rotate-[4deg] origin-center bg-accent text-bg-dark">
          <Track items={marqueeItems} direction="left" textClass="text-bg-dark" />
        </div>
        {/* Bottom dark bar */}
        <div className="relative -rotate-[4deg] origin-center bg-bg-dark text-white -mt-3">
          <Track items={marqueeItems} direction="right" textClass="text-white" />
        </div>
      </div>
    </div>
  );
}
