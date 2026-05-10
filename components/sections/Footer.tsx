'use client';

import { ArrowRight, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { footer } from '@/content/footer';
import { BRAND_NAME, BRAND_EMAIL, BRAND_ADDRESS } from '@/content/brand';

const iconMap = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source: 'newsletter' }),
      });
      setStatus(r.ok ? 'ok' : 'err');
      if (r.ok) setEmail('');
    } catch {
      setStatus('err');
    }
  }

  return (
    <footer className="relative bg-bg-dark text-white">
      <Container className="py-20 md:py-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          <div className="md:col-span-5 space-y-6">
            <h3 className="text-display text-2xl text-white md:text-3xl">
              {footer.newsletterHeading}
            </h3>
            <form onSubmit={onSubmit} className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] p-1.5">
              <input
                type="email"
                required
                placeholder={footer.newsletterPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold uppercase tracking-wide text-bg-dark transition-colors hover:bg-accent-deep disabled:opacity-60"
              >
                {footer.newsletterCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
            {status === 'ok' && (
              <p className="text-xs text-accent">Thanks — you&apos;re on the list.</p>
            )}
            {status === 'err' && (
              <p className="text-xs text-red-300">Something went wrong. Try again.</p>
            )}
          </div>

          {footer.menus.map((m) => (
            <div key={m.title} className="md:col-span-3 space-y-5">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">
                {m.title}
              </h4>
              <ul className="space-y-3">
                {m.items.map((it) => (
                  <li key={it.label}>
                    <Link
                      href={it.href}
                      className="text-sm text-white/85 transition-colors hover:text-accent"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1 flex md:justify-end">
            <ul className="flex gap-3 md:flex-col">
              {footer.socials.map((s) => {
                const Icon = iconMap[s.icon];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/85 transition-colors hover:bg-accent hover:text-bg-dark"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <span>{BRAND_ADDRESS}</span>
          <a href={`mailto:${BRAND_EMAIL}`} className="hover:text-accent">
            {BRAND_EMAIL}
          </a>
          <span>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</span>
        </div>
      </Container>

      {/* Oversized ghosted brand wordmark */}
      <div
        aria-hidden
        className="select-none overflow-hidden border-t border-white/5 px-4 pb-4"
      >
        <div className="text-display whitespace-nowrap text-center text-[22vw] leading-none text-white/[0.07] md:text-[18vw]">
          {BRAND_NAME}
        </div>
      </div>
    </footer>
  );
}
