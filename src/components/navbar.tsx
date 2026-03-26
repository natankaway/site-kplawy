'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = () => {
    const newLocale = locale === 'pt' ? 'en' : 'pt';
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const navLinks = [
    { href: `/${locale}#features`, label: t('features') },
    { href: `/${locale}#how-it-works`, label: t('howItWorks') },
    { href: `/${locale}/pricing`, label: t('pricing') },
    { href: `/${locale}/download`, label: t('download') },
  ];

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
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 overflow-hidden rounded-full bg-white/[0.03]">
              <Image
                src="/logo.png"
                alt="KplaWY"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-brand-blue-dark md:text-xl">
              KplaWY
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/52 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Language Switch */}
            <button
              onClick={switchLocale}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/50 transition-all duration-300 hover:border-white/20 hover:text-white"
            >
              {locale === 'pt' ? 'EN' : 'PT'}
            </button>

            {/* CTA */}
            <Link
              href={`/${locale}/download`}
              className="hidden rounded-full bg-brand-blue-dark px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-blue md:flex"
            >
              {t('getApp')}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-white/70 transition-colors hover:text-white lg:hidden"
              aria-label={t('menu')}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/96 px-6 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <div className="mx-auto max-w-xl rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="border-b border-white/[0.06] py-4 text-2xl font-semibold text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={`/${locale}/about`}
                  onClick={() => setIsMobileOpen(false)}
                  className="border-b border-white/[0.06] py-4 text-2xl font-semibold text-white/70 transition-colors hover:text-white"
                >
                  {t('about')}
                </Link>
                <Link
                  href={`/${locale}/faq`}
                  onClick={() => setIsMobileOpen(false)}
                  className="border-b border-white/[0.06] py-4 text-2xl font-semibold text-white/70 transition-colors hover:text-white"
                >
                  {t('faq')}
                </Link>
                <Link
                  href={`/${locale}/support`}
                  onClick={() => setIsMobileOpen(false)}
                  className="border-b border-white/[0.06] py-4 text-2xl font-semibold text-white/70 transition-colors hover:text-white"
                >
                  {t('support')}
                </Link>
                <div className="pt-8">
                  <Link
                    href={`/${locale}/download`}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex w-full items-center justify-center rounded-full bg-brand-blue-dark px-8 py-4 text-lg font-semibold text-white"
                  >
                    {t('getApp')}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
