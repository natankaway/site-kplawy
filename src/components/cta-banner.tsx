import { getTranslations } from 'next-intl/server';
import { Apple, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from './fade-in';

export async function CtaBanner({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'cta' });
  const trust = [t('trust1'), t('trust2'), t('trust3')];

  return (
    <section className="relative overflow-hidden px-6 py-28 md:py-32">
      <div className="section-divider mx-auto mb-24 max-w-7xl" />
      <div className="hero-orb left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 opacity-80" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn>
          <div className="premium-shell hover-lift overflow-hidden px-6 py-12 text-center md:px-10 md:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(10,132,255,0.13),transparent_45%)]" />
            <div className="relative z-10 mx-auto max-w-4xl">
              <p className="section-kicker mb-5">{t('badge')}</p>
              <h2 className="mx-auto max-w-4xl text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                {t('title')}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-white/52 md:text-lg">
                {t('subtitle')}
              </p>

              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href={`/${locale}/download`}
                  className="button-sheen group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-white/94 active:scale-[0.98] md:px-8 md:text-base"
                >
                  <Apple size={18} />
                  {t('ctaApple')}
                </Link>
                <Link
                  href={`/${locale}/pricing`}
                  className="button-sheen group inline-flex items-center justify-center gap-3 rounded-full border border-white/[0.1] bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.08] active:scale-[0.98] md:px-8 md:text-base"
                >
                  {t('ctaGoogle')}
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {trust.map((item, index) => (
                  <span
                    key={index}
                    className="hover-lift rounded-full border border-white/[0.08] bg-black/30 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-white/44"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
