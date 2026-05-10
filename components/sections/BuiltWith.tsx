import { Container } from '@/components/ui/Container';
import { tools, builtWithMeta } from '@/content/builtWith';

export function BuiltWith() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end">
          <div className="space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-muted">
              {builtWithMeta.eyebrow}
            </span>
            <h2 className="text-display text-4xl text-ink md:text-5xl lg:text-6xl">
              {builtWithMeta.heading}
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-muted md:text-lg md:justify-self-end">
            {builtWithMeta.subhead}
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {tools.map((t) => (
            <li key={t.name}>
              <div className="flex h-20 items-center justify-center rounded-full border border-line bg-bg transition-colors hover:bg-accent-soft md:h-24">
                <span className="text-base font-semibold tracking-tight text-ink md:text-lg">
                  {t.wordmark}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
