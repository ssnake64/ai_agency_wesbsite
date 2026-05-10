import { Plus, Quote } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { testimonials, testimonialsMeta } from '@/content/testimonials';

export function Testimonials() {
  const t = testimonials[0];

  return (
    <section className="bg-bg-soft py-24 md:py-32" data-placeholder="true">
      {/* PLACEHOLDER: swap with real testimonial once available */}
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-4 space-y-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-muted">
              {testimonialsMeta.eyebrow}
            </span>
            <h2 className="text-display text-4xl text-ink md:text-5xl lg:text-6xl">
              {testimonialsMeta.heading}
            </h2>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {['#C5F04E', '#1A1A1A', '#A8D63A', '#E8FAB8'].map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-bg-soft text-xs font-semibold text-bg-dark"
                    style={{ background: c }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                ))}
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-bg-soft bg-bg text-ink-muted hover:bg-accent hover:text-bg-dark"
                  aria-label="Add yours"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div>
                <div className="text-display text-2xl text-ink">
                  {testimonialsMeta.satisfiedClients}
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-ink-muted">
                  {testimonialsMeta.satisfiedLabel}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-8">
            <blockquote className="relative rounded-3xl bg-accent-soft p-8 md:p-12">
              <Quote
                aria-hidden
                className="absolute right-6 top-6 h-10 w-10 text-bg-dark/10 md:h-14 md:w-14"
                strokeWidth={1.5}
              />
              <p className="text-display text-2xl leading-snug text-ink md:text-3xl lg:text-[34px] lg:leading-[1.2]">
                “{t.quote}”
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-bg-dark text-accent text-sm font-semibold">
                  {t.author.slice(0, 1)}
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">{t.author}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-ink-muted">
                    {t.role}
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </Container>
    </section>
  );
}
