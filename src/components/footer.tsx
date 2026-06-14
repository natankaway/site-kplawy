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
    { href: `/${locale}/delete-account`, label: nav('deleteAccount') },
  ];

  const linkGroups = [
    { heading: footer('product'), links: productLinks },
    { heading: footer('company'), links: companyLinks },
    { heading: footer('legal'), links: legalLinks },
  ];

  return (
    <footer className="px-6 pb-8 pt-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.02] px-6 pt-12 backdrop-blur-xl md:px-8 lg:px-10">
        {/* Electric edge accent */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent"
          aria-hidden="true"
        />

        <div className="mb-14 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              aria-label={nav('home')}
              className="group mb-4 flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1A]"
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white/[0.03] ring-1 ring-white/[0.06] transition-colors duration-300 group-hover:ring-brand-blue/40 motion-reduce:transition-none">
                <Image
                  src="/logo-icon.png"
                  alt=""
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <span className="font-display text-xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-brand-blue-bright motion-reduce:transition-none">
                KplaWY
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/80">
              {footer('description')}
            </p>
          </div>

          {/* Link columns */}
          {linkGroups.map((group) => (
            <div key={group.heading}>
              <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.2em] text-white/75">
                {group.heading}
              </h4>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group -mx-2 inline-flex min-h-[44px] items-center gap-2 rounded-lg px-2 text-sm text-white/80 transition-colors duration-300 hover:text-brand-blue-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1A] motion-reduce:transition-none"
                    >
                      <span
                        className="h-px w-0 bg-brand-blue-bright transition-all duration-300 group-hover:w-3 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="section-divider mb-6" aria-hidden="true" />
        <div className="flex flex-col items-start justify-between gap-4 pb-8 md:flex-row md:items-center">
          <div className="space-y-1">
            <p className="text-xs text-white/75">
              &copy; {new Date().getFullYear()} KplaWY. {footer('rights')}
            </p>
            <p className="text-xs text-white/75">{footer('developerCredit')}</p>
          </div>
          <p className="text-xs text-white/75">{footer('madeWith')}</p>
        </div>
      </div>
    </footer>
  );
}
