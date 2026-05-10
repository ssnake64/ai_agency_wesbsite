'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqs, faqMeta } from '@/content/faq';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={faqMeta.eyebrow}
          heading={faqMeta.heading}
          subhead={faqMeta.subhead}
        />

        <ul className="mx-auto mt-14 flex max-w-3xl flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 rounded-full bg-accent-soft px-6 py-5 text-left transition-colors hover:bg-accent/70 md:px-7"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.06em] text-ink md:text-base">
                    {f.q}
                  </span>
                  <span
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bg-dark text-accent transition-transform"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >
                    {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-2 pt-4 text-base leading-relaxed text-ink-muted md:px-7">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
