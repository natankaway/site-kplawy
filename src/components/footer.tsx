import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const productLinks = [
    { href: `/${locale}#features`, label: t('nav.features') },
    { href: `/${locale}#how-it-works`, label: t('nav.howItWorks') },
    { href: `/${locale}/pricing`, label: t('nav.pricing') },
    { href: `/${locale}/download`, label: t('nav.download') },
  ];

  const companyLinks = [
    { href: `/${locale}/about`, label: t('nav.about') },
    { href: `/${locale}/faq`, label: t('nav.faq') },
    { href: `/${locale}/support`, label: t('nav.support') },
    { href: `/${locale}/contact`, label: t('nav.contact') },
  ];

  const legalLinks = [
    { href: `/${locale}/privacy`, label: t('nav.privacy') },
    { href: `/${locale}/terms`, label: t('nav.terms') },
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-black">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-4">
              <div className="relative w-7 h-7">
                <Image
                  src="/logo.png"
                  alt="KplaWY"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold tracking-tight">KplaWY</span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">
              {t('footer.product')}
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} KplaWY. {t('footer.rights')}
          </p>
          <p className="text-xs text-white/20">
            {t('footer.madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}
