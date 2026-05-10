import { Globe2, Activity, Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { about } from '@/content/about';

function MiniDashboard() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-line bg-bg-soft p-5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-muted">
          live_dashboard
        </span>
        <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-ink-muted">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70 motion-reduce:hidden" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          on
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-bg p-4">
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">Calls</div>
          <div className="mt-2 text-display text-3xl text-ink">312</div>
          <div className="mt-1 text-[11px] text-ink-faint">today</div>
        </div>
        <div className="rounded-2xl bg-accent p-4">
          <div className="text-[10px] uppercase tracking-[0.22em] text-bg-dark/70">Leads</div>
          <div className="mt-2 text-display text-3xl text-bg-dark">1.8K</div>
          <div className="mt-1 text-[11px] text-bg-dark/70">this week</div>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-bg p-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-ink-muted">
          <span>uptime</span>
          <span className="text-ink">99.4%</span>
        </div>
        <div className="mt-3 flex items-end gap-1.5 h-16">
          {[40, 70, 55, 85, 60, 92, 75, 88, 50, 95, 80, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-accent/60"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-full bg-bg-dark px-3 py-2 text-[11px] text-white">
        <Activity className="h-3.5 w-3.5 text-accent" />
        <span className="font-mono uppercase tracking-wider">agent.voice → answered</span>
      </div>
    </div>
  );
}

export function AboutStudio() {
  return (
    <section id="about" className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-3 space-y-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-muted">
              {about.eyebrow}
            </span>
            <div className="rounded-3xl border border-line bg-bg-soft p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg text-ink">
                <Globe2 className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm text-ink-muted">
                {about.miniCard}
              </p>
              <div className="mt-3 flex -space-x-2">
                {['#C5F04E', '#1A1A1A', '#A8D63A'].map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-bg-soft"
                    style={{ background: c }}
                  >
                    <Sparkle className="h-3 w-3 text-white/90" strokeWidth={2.5} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <MiniDashboard />
          </div>

          <div className="md:col-span-5 space-y-6">
            <h2 className="text-display text-4xl text-ink md:text-5xl lg:text-[56px] lg:leading-[1.05]">
              {about.heading}
            </h2>
            <p className="text-base leading-relaxed text-ink-muted md:text-lg">
              {about.body}
            </p>
            <Button href={about.cta.href} size="md">
              {about.cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
