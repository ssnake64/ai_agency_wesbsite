'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
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
      <Container className="flex items-center justify-between py-4">
        <Link
          href="#top"
          className="flex items-center gap-2 text-display text-2xl tracking-wider text-ink"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent">
            <span className="block h-2.5 w-2.5 rounded-sm bg-bg-dark" />
          </span>
          {BRAND_NAME}
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-bg/60 px-2 py-1 backdrop-blur">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-bg-soft hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button href="#contact" size="md" className="hidden sm:inline-flex">
            Contact Us
          </Button>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg text-ink transition-colors hover:bg-bg-soft md:h-11 md:w-11"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="md:hidden border-t border-line bg-bg">
          <Container className="py-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-bg-soft"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button href="#contact" size="md" className="w-full justify-center">
                  Contact Us
                </Button>
              </li>
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}
