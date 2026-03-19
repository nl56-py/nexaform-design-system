'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/blog', label: 'Insights' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activePath = useMemo(() => {
    if (pathname === '/') return '/';
    const found = navItems.find((item) => pathname?.startsWith(item.href) && item.href !== '/');
    return found?.href ?? '/';
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#E2F5FF]/95 shadow-panel backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accentPrimary via-accentSecondary to-accentHighlight font-display text-sm font-bold uppercase text-white shadow-glow">
            NX
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold tracking-tight">Nexaform</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-textSecondary">
              software and AI
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const isActive = activePath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive ? 'bg-accentSecondary/10 text-accentPrimary' : 'text-textSecondary hover:text-accentPrimary'
                }`}
              >
                {item.label}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-3 right-3 h-0.5 rounded-full bg-accentPrimary"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-gradient-to-r from-accentPrimary via-accentSecondary to-accentHighlight px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5 hover:shadow-lg lg:inline-flex"
          >
            Book a Consultation
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-textSecondary transition hover:border-accentPrimary/25 hover:text-accentPrimary lg:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden"
          >
            <div className="container flex flex-col gap-2 rounded-b-3xl border-t border-border bg-white p-4 shadow-panel">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-textSecondary transition hover:bg-backgroundSecondary hover:text-accentPrimary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accentPrimary via-accentSecondary to-accentHighlight px-4 py-3 text-sm font-semibold text-white shadow-glow"
                onClick={() => setIsOpen(false)}
              >
                Book a Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
