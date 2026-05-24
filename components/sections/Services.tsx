'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { services, servicesMeta } from '@/content/services';
import { cn } from '@/lib/cn';

const ICON_VARIANTS: Record<string, { animate: object }> = {
  '01': {
    animate: {
      rotate: [0, -12, 12, -8, 8, -4, 0],
      transition: { duration: 1.2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' },
    },
  },
  '02': {
    animate: {
      scale: [1, 1.15, 1, 1.1, 1],
      y: [0, -3, 0, -2, 0],
      transition: { duration: 1.4, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' },
    },
  },
  '03': {
    animate: {
      x: [0, 6, 0],
      y: [0, -6, 0],
      transition: { duration: 1.6, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' },
    },
  },
  '04': {
    animate: {
      scale: [1, 1.08, 1],
      opacity: [1, 0.7, 1],
      transition: { duration: 1.8, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' },
    },
  },
};

export function Services() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="services" className="bg-bg-soft py-24 md:py-32">
      <Container>
        <SectionHeading
          heading={servicesMeta.heading}
          subhead={servicesMeta.subhead}
        />

        <div
          className="mt-20 border-t border-line"
          onMouseLeave={() => setOpenId(null)}
        >
          {services.map((s) => {
            const open = openId === s.id;
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="group/row border-b border-line"
                onMouseEnter={() => setOpenId(s.id)}
                onClick={() => setOpenId(open ? null : s.id)}
              >
                <div className="flex w-full cursor-pointer items-center justify-between gap-6 py-8 md:py-10">
                  <div className="flex min-w-0 items-center gap-6 md:gap-10">
                    <span className="text-sm font-medium text-ink-faint md:text-base">
                      ({s.id})
                    </span>
                    <h3 className="text-xl font-bold uppercase tracking-wider text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:text-2xl group-hover/row:translate-x-2">
                      {s.title}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-11 md:w-11',
                      open
                        ? 'bg-bg-dark text-accent scale-110'
                        : 'bg-accent text-bg-dark group-hover/row:bg-bg-dark group-hover/row:text-accent group-hover/row:scale-110'
                    )}
                  >
                    <ArrowRight
                      className={cn(
                        'h-6 w-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                        open ? 'rotate-90 text-white' : 'group-hover/row:rotate-90'
                      )}
                    />
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`service-panel-${s.id}`}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-12 md:gap-10">
                        <div className="md:col-span-7">
                          <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className="max-w-xl text-base leading-relaxed text-ink-muted md:text-lg"
                          >
                            {s.description}
                          </motion.p>
                          <motion.ul
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
                          >
                            {s.bullets.map((b) => (
                              <li
                                key={b}
                                className="flex items-center gap-2 rounded-full border border-line bg-bg px-4 py-2 text-sm text-ink"
                              >
                                <Check className="h-3.5 w-3.5 text-accent-deep" strokeWidth={3} />
                                {b}
                              </li>
                            ))}
                          </motion.ul>
                        </div>
                        <div className="md:col-span-5">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-3xl border border-line bg-bg md:h-full md:min-h-[180px]"
                          >
                            <div className="absolute inset-0 grid-bg opacity-60" />
                            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-accent text-bg-dark">
                              <motion.div
                                animate={ICON_VARIANTS[s.id]?.animate}
                              >
                                <Icon className="h-9 w-9" strokeWidth={1.75} />
                              </motion.div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
