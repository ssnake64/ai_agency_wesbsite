import { Container } from '@/components/ui/Container';
import { PillStep } from '@/components/ui/PillStep';
import { processMeta, processSteps } from '@/content/howItWorks';

export function HowItWorks() {
  return (
    <section id="process" className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end">
          <div className="space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-muted">
              {processMeta.eyebrow}
            </span>
            <h2 className="text-display text-4xl text-ink md:text-5xl lg:text-6xl">
              {processMeta.heading}
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-muted md:text-lg md:justify-self-end">
            {processMeta.subhead}
          </p>
        </div>

        {/* Pill timeline */}
        <div className="mt-14 hidden items-center md:flex">
          {processSteps.map((s, i) => (
            <div
              key={s.step}
              className={i === 0 ? 'flex items-center' : 'flex flex-1 items-center'}
            >
              {i !== 0 && (
                <div className="mx-3 h-[2px] flex-1 dotted-line" aria-hidden />
              )}
              <PillStep label={s.step} active />
            </div>
          ))}
        </div>
        {/* Mobile pills */}
        <div className="mt-12 flex flex-wrap gap-3 md:hidden">
          {processSteps.map((s) => (
            <PillStep key={s.step} label={s.step} active />
          ))}
        </div>

        {/* Detail cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {processSteps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="rounded-3xl border border-line bg-bg-soft p-7"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-bg-dark">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="text-display mt-6 text-2xl text-ink md:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
                  {s.long}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
