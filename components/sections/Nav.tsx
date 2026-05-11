'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { navLinks } from '@/content/nav';
import { BRAND_NAME } from '@/content/brand';
import { cn } from '@/lib/cn';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bg/85 backdrop-blur-md border-b border-line/70'
          : 'bg-transparent'
      )}
    >
      <Container className="flex items-center justify-between py-5 md:py-6">
        {/* Logo */}
        <Link
          href="#top"
          className="group/logo flex items-center gap-3 text-display text-2xl tracking-wider text-ink md:text-[30px]"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent transition-transform duration-300 group-hover/logo:rotate-12 md:h-11 md:w-11">
            <span className="block h-3.5 w-3.5 rounded-[3px] bg-bg-dark" />
          </span>
          <span className="font-bold">{BRAND_NAME}</span>
        </Link>

        {/* Pill nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-bg/70 p-2 backdrop-blur">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group/link relative inline-flex items-center rounded-full px-6 py-3 text-[15px] font-semibold text-ink-muted transition-colors duration-200 hover:text-bg-dark"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 scale-90 rounded-full bg-accent opacity-0 transition-all duration-300 ease-out group-hover/link:scale-100 group-hover/link:opacity-100"
                  />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Contact CTA + hamburger */}
        <div className="flex items-center gap-3">
          {/* Lime "3D" pill: a flat-coloured shadow underneath gives the button
              physical thickness; on hover it lifts to expose more of the edge,
              on click it presses down into it. */}
          <Link
            href="#contact"
            className="group/cta hidden items-center rounded-full bg-accent px-6 py-3 text-[13px] font-bold uppercase tracking-[0.14em] text-bg-dark shadow-[0_4px_0_0_#1A1A1A] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_6px_0_0_#1A1A1A] active:translate-y-1 active:shadow-[0_1px_0_0_#1A1A1A] motion-reduce:transition-none sm:inline-flex"
          >
            Contact Us
          </Link>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-bg text-ink transition-all duration-200 hover:bg-bg-dark hover:text-accent md:h-14 md:w-14"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" strokeWidth={2.25} />}
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-line bg-bg">
          <Container className="py-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-bg-soft"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-[13px] font-bold uppercase tracking-[0.14em] text-bg-dark shadow-[0_4px_0_0_#1A1A1A] transition-all duration-200 ease-out active:translate-y-1 active:shadow-[0_1px_0_0_#1A1A1A]"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}
