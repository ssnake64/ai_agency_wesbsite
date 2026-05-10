import { CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { finalCta } from '@/content/finalCta';

export function FinalCTA() {
  return (
    <section id="contact" className="bg-bg-soft py-24 md:py-32">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-display text-5xl text-ink md:text-7xl lg:text-[110px] lg:leading-[0.95]">
            {finalCta.heading}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
            {finalCta.subhead}
          </p>
          <div className="mt-10">
            <Button href={finalCta.cta.href} size="lg">
              {finalCta.cta.label}
            </Button>
          </div>
        </div>

        {/* Cal.com / Calendly embed lives here in V2 */}
        {/* PLACEHOLDER: drop the scheduler embed script here once available */}
        <div
          id="scheduler"
          data-placeholder="true"
          className="mx-auto mt-14 flex max-w-3xl items-center justify-center rounded-3xl border border-dashed border-line bg-bg p-10 text-center"
        >
          <div className="flex flex-col items-center gap-3 text-ink-muted">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-bg-dark">
              <CalendarCheck className="h-6 w-6" />
            </span>
            <p className="text-sm uppercase tracking-[0.22em]">
              Scheduler embed placeholder
            </p>
            <p className="max-w-xs text-xs text-ink-faint">
              Drop a Cal.com or Calendly inline embed into the
              <code className="mx-1 rounded bg-bg-soft px-1 font-mono">#scheduler</code>
              container.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
