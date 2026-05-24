'use client';

import {
  Activity,
  Bot,
  Globe2,
  Phone,
  Sparkle,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { about } from '@/content/about';

/** Tween a number from 0 → target once `start` flips true. */
function useCounter(target: number, decimals: number, duration: number, start: boolean) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? target : 0);

  useEffect(() => {
    if (reduce) {
      setV(target);
      return;
    }
    if (!start) return;
    const startTs = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTs) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, reduce]);

  return decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString();
}

const BARS = [40, 70, 55, 85, 60, 92, 75, 88, 50, 95, 80, 70];

const AGENT_STRIP = [
  { icon: Phone, label: 'voice', count: 3 },
  { icon: Bot, label: 'chat', count: 7 },
  { icon: TrendingUp, label: 'outreach', count: 2 },
] as const;

type AgentTileProps = {
  icon: (typeof AGENT_STRIP)[number]['icon'];
  label: string;
  count: number;
  inView: boolean;
};

function AgentTile({ icon: Icon, label, count, inView }: AgentTileProps) {
  const v = useCounter(count, 0, 1200, inView);
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-xl bg-bg py-3">
      <Icon className="h-4 w-4 text-accent-deep" strokeWidth={2.5} />
      <span className="text-[9px] font-bold uppercase tracking-wider text-ink-muted">
        {label}
      </span>
      <span className="text-sm font-bold text-ink">{v} active</span>
    </div>
  );
}

function MiniDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  const calls = useCounter(312, 0, 1600, inView);
  const leadsK = useCounter(1.8, 1, 1600, inView);
  const responseMs = useCounter(412, 0, 1600, inView);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-3xl border border-line bg-bg-soft p-6 md:p-7"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-ink-muted md:text-xs">
          live_dashboard
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          live
        </span>
      </div>

      {/* Top stats: Calls + Leads */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-bg p-4 md:p-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
            Calls
          </div>
          <div className="text-display mt-2 text-4xl text-ink md:text-[44px]">
            {calls}
          </div>
          <div className="mt-1 text-[11px] text-ink-faint">today</div>
        </div>
        <div className="rounded-2xl bg-accent p-4 md:p-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-bg-dark/70">
            Leads
          </div>
          <div className="text-display mt-2 text-4xl text-bg-dark md:text-[44px]">
            {leadsK}K
          </div>
          <div className="mt-1 text-[11px] text-bg-dark/70">this week</div>
        </div>
      </div>

      {/* Avg response time row */}
      <div className="mt-3 rounded-2xl bg-bg p-4 md:p-5">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
          <span className="flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-accent-deep" strokeWidth={2.5} />
            Avg response
          </span>
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[9px] font-bold text-bg-dark">
            ↓ 18% W/W
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-display text-3xl text-ink md:text-[34px]">
            {responseMs}
          </span>
          <span className="text-sm text-ink-muted">ms</span>
        </div>
      </div>

      {/* Uptime bars */}
      <div className="mt-3 rounded-2xl bg-bg p-4 md:p-5">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
          <span>uptime · 7d</span>
          <span className="font-bold text-ink">99.4%</span>
        </div>
        <div className="mt-3 flex h-16 items-end gap-1.5 md:h-20">
          {BARS.map((h, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { height: 0 }}
              animate={inView ? { height: `${h}%` } : { height: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.35 + i * 0.045,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex-1 rounded-sm bg-accent/65"
            />
          ))}
        </div>
      </div>

      {/* Active agents strip */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {AGENT_STRIP.map((a, i) => (
          <AgentTile key={i} {...a} inView={inView} />
        ))}
      </div>

      {/* Last event pill */}
      <div className="mt-3 flex items-center gap-2 rounded-full bg-bg-dark px-4 py-2.5 text-[11px] text-white">
        <Activity className="h-3.5 w-3.5 text-accent" />
        <span className="truncate font-mono uppercase tracking-wider">
          agent.voice → answered (12s)
        </span>
      </div>
    </div>
  );
}

export function AboutStudio() {
  return (
    <section id="about" className="py-24 md:py-32 lg:py-36">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start md:gap-10 lg:gap-14">
          {/* LEFT: eyebrow + globe card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3 space-y-6"
          >
            <span className="block text-xs font-bold uppercase tracking-[0.28em] text-ink-muted md:text-[13px]">
              {about.eyebrow}
            </span>
            <div className="rounded-3xl border border-line bg-bg-soft p-6 md:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg text-ink md:h-14 md:w-14">
                <Globe2 className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.75} />
              </div>
              <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
                {about.miniCard}
              </p>
              <div className="mt-5 flex -space-x-2">
                {['#C5F04E', '#1A1A1A', '#A8D63A'].map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-bg-soft md:h-10 md:w-10"
                    style={{ background: c }}
                  >
                    <Sparkle className="h-3.5 w-3.5 text-white/90" strokeWidth={2.5} />
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* MID: dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-4"
          >
            <MiniDashboard />
          </motion.div>

          {/* RIGHT: heading + body + CTA */}
          <div className="md:col-span-5 space-y-6 md:space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="text-display text-5xl text-ink md:text-6xl lg:text-[68px] lg:leading-[1.02]"
            >
              {about.heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="text-lg leading-relaxed text-ink-muted md:text-xl"
            >
              {about.body}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              <Button href={about.cta.href} size="md">
                {about.cta.label}
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
