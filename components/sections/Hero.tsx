'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { StampBadge } from '@/components/ui/StampBadge';
import { AgentTerminal } from '@/components/sections/AgentTerminal';
import { hero } from '@/content/hero';

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-24 pb-10 md:pt-28 md:pb-32 lg:pt-44"
    >
      {/* Wider grid background — fades out so it doesn't compete with the marquee below */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 grid-bg [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
      />

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* LEFT — heading + subhead + CTA */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-full border border-line bg-bg/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-muted backdrop-blur"
            >
              {hero.eyebrow}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-display mt-6 text-ink leading-[0.95]
                         text-[clamp(2.75rem,7.5vw,7.25rem)]"
            >
              <span className="block whitespace-nowrap">{hero.headlineLine1}</span>
              <span className="block whitespace-nowrap">{hero.headlineLine2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-6 max-w-md text-base leading-relaxed text-ink-muted md:text-[17px]"
            >
              {hero.subhead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <Button href={hero.cta.href} size="lg">
                {hero.cta.label}
              </Button>
              <span className="text-[11px] uppercase tracking-[0.22em] text-ink-faint">
                30-min · no commitment
              </span>
            </motion.div>
          </div>

          {/* RIGHT — terminal card with rotated lime backdrop and overlapping stamp */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[460px]">
              {/* Soft accent bleed behind the terminal — gives the card a 'photo in a coloured mat' feel */}
              <div
                aria-hidden
                className="absolute -inset-4 -rotate-3 rounded-[32px] bg-accent/85 hidden md:block"
              />

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <AgentTerminal />
              </motion.div>

              {/* Stamp anchored to the top-left corner of the terminal so it OVERLAPS the dark panel
                  while remaining readable thanks to its white background. */}
              {/* <div className="pointer-events-none absolute -left-8 -top-8 z-10 hidden md:block lg:-left-12 lg:-top-10">
                <StampBadge text={hero.stamp + ' '} size={120} />
              </div> */}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
