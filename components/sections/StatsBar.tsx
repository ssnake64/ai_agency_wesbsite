'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Marquee } from '@/components/sections/Marquee';
import { stats, type Stat } from '@/content/stats';

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? stat.value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(stat.value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, stat.value]);

  const formatted =
    stat.decimals && stat.decimals > 0
      ? v.toFixed(stat.decimals)
      : Math.round(v).toLocaleString();

  return (
    <span ref={ref} className="text-display text-6xl text-ink md:text-7xl lg:text-8xl">
      {stat.prefix ?? ''}
      {formatted}
      {stat.suffix ?? ''}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="relative isolate py-16 md:py-20" data-placeholder="true">
      {/* Top marquee strip */}
      <Marquee />

      <Container className="relative mt-12 md:mt-16">
        <div className="grid grid-cols-1 gap-10 rounded-3xl border border-line bg-bg-soft p-8 md:grid-cols-3 md:p-12">
          {stats.map((s) => (
            <div key={s.label} className="space-y-3 md:space-y-4">
              <Counter stat={s} />
              <div className="text-sm uppercase tracking-[0.18em] text-ink-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
