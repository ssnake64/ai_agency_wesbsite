'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { NumberBadge } from '@/components/ui/NumberBadge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { projects, projectsMeta } from '@/content/projects';
import { cn } from '@/lib/cn';
import { Phone, MessagesSquare, Send } from 'lucide-react';

const previewIcons = [Phone, MessagesSquare, Send];

export function Projects() {
  const [hovered, setHovered] = useState<string | null>(projects[1]?.id ?? null);

  return (
    <section id="projects" className="bg-bg-soft py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={projectsMeta.eyebrow}
          heading={projectsMeta.heading}
          subhead={projectsMeta.subhead}
        />

        <div
          className="mt-14 flex flex-col gap-5 md:flex-row md:gap-5"
          data-placeholder="true"
        >
          {/* PLACEHOLDER: swap with real case studies once available */}
          {projects.map((p, i) => {
            const isOpen = hovered === p.id;
            const Icon = previewIcons[i] ?? Phone;
            return (
              <motion.article
                key={p.id}
                onMouseEnter={() => setHovered(p.id)}
                onFocus={() => setHovered(p.id)}
                tabIndex={0}
                animate={{ flex: isOpen ? 2.4 : 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'group relative flex min-h-[360px] cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-line bg-bg p-6 md:min-h-[420px] md:p-8',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
                )}
                data-placeholder="true"
              >
                <div className="space-y-5">
                  <NumberBadge n={p.id} size="md" />
                  <h3 className="text-display max-w-[8ch] text-2xl text-ink md:text-3xl">
                    {p.title}
                  </h3>
                </div>

                <p className="mt-6 max-w-[24ch] text-sm leading-relaxed text-ink-muted">
                  {p.blurb}
                </p>

                {/* Image preview slot — appears on hover */}
                <motion.div
                  aria-hidden
                  initial={false}
                  animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.96 }}
                  transition={{ duration: 0.4 }}
                  className={cn(
                    'pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 hidden h-44 w-56 items-center justify-center overflow-hidden rounded-2xl bg-bg-dark text-accent',
                    isOpen && 'md:flex'
                  )}
                >
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  <Icon className="relative h-16 w-16" strokeWidth={1.5} />
                </motion.div>

                <span className="mt-6 inline-block text-[10px] uppercase tracking-[0.28em] text-ink-faint">
                  {p.tag}
                </span>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
