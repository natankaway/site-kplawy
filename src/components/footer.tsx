import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';

export async function Footer({ locale }: { locale: string }) {
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const footer = await getTranslations({ locale, namespace: 'footer' });

  const productLinks = [
    { href: `/${locale}#features`, label: nav('features') },
    { href: `/${locale}#how-it-works`, label: nav('howItWorks') },
    { href: `/${locale}/pricing`, label: nav('pricing') },
    { href: `/${locale}/download`, label: nav('download') },
  ];

  const companyLinks = [
    { href: `/${locale}/about`, label: nav('about') },
    { href: `/${locale}/faq`, label: nav('faq') },
    { href: `/${locale}/support`, label: nav('support') },
    { href: `/${locale}/contact`, label: nav('contact') },
  ];

  const legalLinks = [
    { href: `/${locale}/privacy`, label: nav('privacy') },
    { href: `/${locale}/terms`, label: nav('terms') },
  ];

  return (
    <footer className="bg-black px-6 pb-8 pt-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/[0.06] bg-white/[0.02] px-6 pt-12 backdrop-blur-xl md:px-8 lg:px-10">
        <div className="mb-14 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="mb-4 flex items-center gap-3">
              <div className="relative h-8 w-8 rounded-full bg-white/[0.03]">
                <Image
                  src="/logo.png"
                  alt="KplaWY"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">KplaWY</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/44">
              {footer('description')}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/28">
              {footer('product')}
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/28">
              {footer('company')}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/28">
              {footer('legal')}
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mb-6" />
        <div className="flex flex-col items-start justify-between gap-4 pb-8 md:flex-row md:items-center">
          <div className="space-y-1">
            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} KplaWY. {footer('rights')}
            </p>
            <p className="text-xs text-white/22">
              {footer('developerCredit')}
            </p>
          </div>
          <p className="text-xs text-white/22">
            {footer('madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}
