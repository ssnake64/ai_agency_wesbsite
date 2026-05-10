'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import {
  liveEvents,
  liveStats,
  liveSystemsMeta,
  type LiveEvent,
} from '@/content/liveSystems';
import { cn } from '@/lib/cn';

function makeEvent(seed: number): LiveEvent {
  const base = liveEvents[seed % liveEvents.length];
  // generate a fresh-looking timestamp
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return { ...base, ts: `${hh}:${mm}:${ss}` };
}

export function LiveSystems() {
  const reduce = useReducedMotion();
  const [feed, setFeed] = useState<LiveEvent[]>(liveEvents.slice(0, 6));
  const [seed, setSeed] = useState(7);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setFeed((prev) => {
        const next = [makeEvent(seed), ...prev].slice(0, 6);
        return next;
      });
      setSeed((s) => s + 1);
    }, 2500);
    return () => clearInterval(t);
  }, [seed, reduce]);

  return (
    <section
      id="live"
      className="py-24 md:py-32"
      data-placeholder="true"
    >
      {/* PLACEHOLDER: in V2 this connects to a real backend feed (Supabase) */}
      <Container>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-muted">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {liveSystemsMeta.eyebrow}
            </span>
            <h2 className="text-display text-4xl text-ink md:text-5xl lg:text-6xl">
              {liveSystemsMeta.heading}
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-muted md:text-lg">
            {liveSystemsMeta.subhead}
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-line bg-bg-dark p-6 md:p-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            {/* Left: feed */}
            <div className="md:col-span-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">
                  agent_events.stream
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
                  ▸ tail -f
                </span>
              </div>
              <div className="mt-4 space-y-2">
                <AnimatePresence initial={false}>
                  {feed.map((e, i) => (
                    <motion.div
                      key={e.ts + e.channel + i}
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: i === 0 ? 1 : 0.65 - i * 0.07, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.4 }}
                      className="grid grid-cols-[auto_auto_1fr] items-center gap-3 font-mono text-xs leading-relaxed text-white/80 md:text-sm"
                    >
                      <span
                        className={cn(
                          'inline-block h-1.5 w-1.5 rounded-full',
                          e.active ? 'bg-accent' : 'bg-white/20'
                        )}
                      />
                      <span className="text-white/40">{e.ts}</span>
                      <span className="truncate">
                        <span className="text-white/60">▸ </span>
                        <span className="text-accent">{e.channel}</span>
                        <span className="text-white/50"> → </span>
                        <span>{e.message}</span>
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Right: stats */}
            <div className="md:col-span-5 space-y-3">
              {liveStats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                    {s.label}
                  </div>
                  <div className="text-display mt-2 text-4xl text-accent md:text-5xl">
                    {s.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-ink-faint">{liveSystemsMeta.disclaimer}</p>
      </Container>
    </section>
  );
}
