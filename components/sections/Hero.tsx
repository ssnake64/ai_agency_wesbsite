'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { StampBadge } from '@/components/ui/StampBadge';
import { hero } from '@/content/hero';

function Typewriter({ lines }: { lines: string[] }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState<string[]>(reduce ? lines : []);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    if (lineIdx >= lines.length) return;
    const current = lines[lineIdx];
    if (charIdx <= current.length) {
      const t = setTimeout(() => {
        setShown((prev) => {
          const next = [...prev];
          next[lineIdx] = current.slice(0, charIdx);
          return next;
        });
        setCharIdx((c) => c + 1);
      }, 28);
      return () => clearTimeout(t);
    }
    const pause = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, 320);
    return () => clearTimeout(pause);
  }, [lineIdx, charIdx, lines, reduce]);

  return (
    <pre className="m-0 whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-accent md:text-sm">
      {(reduce ? lines : shown).map((l, i) => (
        <div key={i} className="block">
          {l || ' '}
          {!reduce && i === lineIdx && i < lines.length && (
            <span className="ml-0.5 inline-block h-[1em] w-[7px] -mb-[2px] animate-pulse bg-accent align-middle" />
          )}
        </div>
      ))}
    </pre>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24"
    >
      {/* Faint grid background */}
      <div
        aria-hidden
        className="absolute inset-0 grid-bg [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      {/* Soft accent bleed */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-accent/40 blur-3xl"
      />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-full border border-line bg-bg/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-muted"
            >
              {hero.eyebrow}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-display mt-6 text-6xl text-ink sm:text-7xl md:text-8xl lg:text-[112px] lg:leading-[0.92]"
            >
              {hero.headline.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg"
            >
              {hero.subhead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button href={hero.cta.href} size="lg">
                {hero.cta.label}
              </Button>
              <span className="text-xs uppercase tracking-[0.22em] text-ink-faint">
                30-min · no commitment
              </span>
            </motion.div>
          </div>

          <div className="relative lg:col-span-5">
            {/* Lime backdrop bleed */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[40px] bg-accent/70 -rotate-2 hidden md:block"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-[28px] border border-line bg-bg-dark p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.04)]"
            >
              {/* Window chrome */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                  agent.live
                </span>
                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-accent">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  live
                </span>
              </div>
              <div className="pt-4 min-h-[180px]">
                <Typewriter lines={hero.terminalLines} />
              </div>
            </motion.div>

            {/* Stamp */}
            <div className="absolute -top-8 -right-4 md:-top-10 md:-right-6">
              <StampBadge text={hero.stamp + ' '} size={132} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
