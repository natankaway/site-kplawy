'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelId = 'mobile-nav-panel';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus management + Escape handling for the mobile dialog.
  useEffect(() => {
    if (!isMobileOpen) return;

    const previouslyFocused = menuButtonRef.current;
    // Move focus into the panel (first focusable element, else the panel).
    const panel = panelRef.current;
    if (panel) {
      const focusable = panel.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      (focusable ?? panel).focus();
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
      // Restore focus to the hamburger on close.
      previouslyFocused?.focus();
    };
  }, [isMobileOpen]);

  const switchLocale = () => {
    const newLocale = locale === 'pt' ? 'en' : 'pt';
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  // Locale switch is bidirectional; label describes the destination language.
  const localeSwitchLabel =
    locale === 'pt' ? 'Mudar idioma para inglês' : 'Switch language to Portuguese';

  const navLinks = [
    { href: `/${locale}#features`, label: t('features') },
    { href: `/${locale}#how-it-works`, label: t('howItWorks') },
    { href: `/${locale}/pricing`, label: t('pricing') },
    { href: `/${locale}/download`, label: t('download') },
  ];

  const isActive = (href: string) => {
    const target = href.split('#')[0];
    if (target === `/${locale}` || target === `/${locale}/`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname === target || pathname.startsWith(`${target}/`);
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full px-3 pt-3 transition-all duration-500 md:px-6">
        <div
          className={`mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between rounded-full border px-5 transition-all duration-500 md:px-6 ${
            isScrolled
              ? 'border-white/[0.08] bg-black/78 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-2xl'
              : 'border-white/[0.04] bg-black/40 backdrop-blur-xl'
          }`}
        >
          {/* Logo */}
          <Link href={`/${locale}`} className="group flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white/[0.03] ring-1 ring-white/[0.06] transition-all duration-300 group-hover:ring-brand-blue/40">
              <Image
                src="/logo-icon.png"
                alt="KplaWY"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="font-display text-xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-brand-blue-bright md:text-2xl">
              KplaWY
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative text-sm font-medium transition-colors duration-300 ${
                    active ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gradient-to-r from-brand-blue-bright to-brand-cyan transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Language Switch */}
            <button
              onClick={switchLocale}
              aria-label={localeSwitchLabel}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/70 transition-all duration-300 hover:border-brand-blue/40 hover:text-white"
            >
              {locale === 'pt' ? 'EN' : 'PT'}
            </button>

            {/* CTA */}
            <Link
              href={`/${locale}/download`}
              className="btn-electric hidden rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide md:flex"
            >
              {t('getApp')}
            </Link>

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              onClick={() => setIsMobileOpen((open) => !open)}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/10 p-2 text-white/70 transition-all duration-300 hover:border-brand-blue/40 hover:text-white lg:hidden"
              aria-label={t('menu')}
              aria-expanded={isMobileOpen}
              aria-controls={mobilePanelId}
            >
              {isMobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — CSS-transitioned, no framer-motion */}
      {isMobileOpen && (
        <div
          id={mobilePanelId}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t('menu')}
          tabIndex={-1}
          className="mobile-nav-overlay fixed inset-0 z-40 bg-black/96 px-6 pt-28 backdrop-blur-2xl lg:hidden"
        >
          <div className="mx-auto max-w-xl rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`group flex items-center justify-between border-b border-white/[0.06] py-4 font-display text-2xl font-bold uppercase tracking-tight transition-colors ${
                      active ? 'text-brand-blue-bright' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`h-1.5 w-1.5 rounded-full bg-brand-cyan transition-opacity duration-300 ${
                        active ? 'opacity-100 shadow-[0_0_10px_rgba(55,213,255,0.8)]' : 'opacity-0 group-hover:opacity-60'
                      }`}
                    />
                  </Link>
                );
              })}
              <Link
                href={`/${locale}/about`}
                onClick={() => setIsMobileOpen(false)}
                className="border-b border-white/[0.06] py-4 font-display text-2xl font-bold uppercase tracking-tight text-white/70 transition-colors hover:text-white"
              >
                {t('about')}
              </Link>
              <Link
                href={`/${locale}/faq`}
                onClick={() => setIsMobileOpen(false)}
                className="border-b border-white/[0.06] py-4 font-display text-2xl font-bold uppercase tracking-tight text-white/70 transition-colors hover:text-white"
              >
                {t('faq')}
              </Link>
              <Link
                href={`/${locale}/support`}
                onClick={() => setIsMobileOpen(false)}
                className="border-b border-white/[0.06] py-4 font-display text-2xl font-bold uppercase tracking-tight text-white/70 transition-colors hover:text-white"
              >
                {t('support')}
              </Link>
              <div className="pt-8">
                <Link
                  href={`/${locale}/download`}
                  onClick={() => setIsMobileOpen(false)}
                  className="btn-electric flex w-full items-center justify-center rounded-full px-8 py-4 text-lg font-semibold tracking-wide"
                >
                  {t('getApp')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
