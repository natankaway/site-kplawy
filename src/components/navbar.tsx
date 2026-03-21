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
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-2xl border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 overflow-hidden">
              <Image
                src="/logo.png"
                alt="KplaWY"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold tracking-tight group-hover:text-brand-blue-dark transition-colors duration-300">
              KplaWY
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300"
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
              className="text-xs font-semibold text-white/50 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-full transition-all duration-300 uppercase tracking-wider"
            >
              {locale === 'pt' ? 'EN' : 'PT'}
            </button>

            {/* CTA */}
            <Link
              href={`/${locale}/download`}
              className="hidden md:flex items-center gap-2 bg-brand-blue-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-blue transition-colors duration-300"
            >
              {t('getApp')}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
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
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-24 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-2xl font-semibold text-white/70 hover:text-white py-4 border-b border-white/[0.06] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/about`}
                onClick={() => setIsMobileOpen(false)}
                className="text-2xl font-semibold text-white/70 hover:text-white py-4 border-b border-white/[0.06] transition-colors"
              >
                {t('about')}
              </Link>
              <Link
                href={`/${locale}/faq`}
                onClick={() => setIsMobileOpen(false)}
                className="text-2xl font-semibold text-white/70 hover:text-white py-4 border-b border-white/[0.06] transition-colors"
              >
                {t('faq')}
              </Link>
              <Link
                href={`/${locale}/support`}
                onClick={() => setIsMobileOpen(false)}
                className="text-2xl font-semibold text-white/70 hover:text-white py-4 border-b border-white/[0.06] transition-colors"
              >
                {t('support')}
              </Link>
              <div className="pt-8">
                <Link
                  href={`/${locale}/download`}
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-center bg-brand-blue-dark text-white px-8 py-4 rounded-full text-lg font-semibold w-full"
                >
                  {t('getApp')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
