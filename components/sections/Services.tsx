'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { services, servicesMeta } from '@/content/services';
import { cn } from '@/lib/cn';

export function Services() {
  const [openId, setOpenId] = useState<string | null>(services[0]?.id ?? null);

  return (
    <section id="services" className="bg-bg-soft py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={servicesMeta.eyebrow}
          heading={servicesMeta.heading}
          subhead={servicesMeta.subhead}
        />

        <div className="mt-16 border-t border-line">
          {services.map((s) => {
            const open = openId === s.id;
            const Icon = s.icon;
            return (
              <div key={s.id} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : s.id)}
                  className="group flex w-full items-center justify-between gap-6 py-7 text-left md:py-8"
                  aria-expanded={open}
                  aria-controls={`service-panel-${s.id}`}
                >
                  <div className="flex min-w-0 items-center gap-6 md:gap-10">
                    <span className="text-sm font-medium text-ink-faint md:text-base">
                      ({s.id})
                    </span>
                    <h3 className="text-display text-xl text-ink md:text-3xl">
                      {s.title}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      'inline-flex h-10 w-10 items-center justify-center rounded-full transition-all md:h-11 md:w-11',
                      open ? 'bg-bg-dark text-accent' : 'bg-accent text-bg-dark group-hover:bg-accent-deep'
                    )}
                  >
                    {open ? <ArrowDown className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`service-panel-${s.id}`}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-12 md:gap-10">
                        <div className="md:col-span-7">
                          <p className="max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
                            {s.description}
                          </p>
                          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {s.bullets.map((b) => (
                              <li
                                key={b}
                                className="flex items-center gap-2 rounded-full border border-line bg-bg px-4 py-2 text-sm text-ink"
                              >
                                <Check className="h-3.5 w-3.5 text-accent-deep" strokeWidth={3} />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:col-span-5">
                          <div className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-3xl border border-line bg-bg md:h-full md:min-h-[180px]">
                            <div className="absolute inset-0 grid-bg opacity-60" />
                            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-accent text-bg-dark">
                              <Icon className="h-9 w-9" strokeWidth={1.75} />
                            </div>
                          </div>
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
