import { getTranslations } from 'next-intl/server';
import { Apple, ArrowRight, Check } from 'lucide-react';
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
          <div className="card-electric hover-lift relative overflow-hidden rounded-3xl border-brand-blue/30 px-6 py-16 text-center shadow-[0_0_0_1px_rgba(46,123,255,0.18),0_40px_120px_rgba(46,123,255,0.14)] md:px-10 md:py-24">
            <div className="grid-texture absolute inset-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(46,123,255,0.22),transparent_50%),radial-gradient(circle_at_bottom,rgba(55,213,255,0.12),transparent_55%)]" />
            <div className="streak absolute inset-x-0 top-0" />
            <div className="relative z-10 mx-auto max-w-4xl">
              <p className="section-kicker mb-6">{t('badge')}</p>
              <h2 className="mx-auto max-w-4xl font-display text-5xl font-bold uppercase tracking-[-0.02em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[0.9]">
                {t('title')}
              </h2>
              <p className="mx-auto mt-7 max-w-2xl text-lg font-light leading-relaxed text-white/70 md:text-xl">
                {t('subtitle')}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href={`/${locale}/download`}
                  className="btn-electric button-sheen group inline-flex items-center justify-center gap-3 rounded-full px-10 py-5 text-base font-semibold tracking-wide md:text-lg"
                >
                  <Apple size={22} aria-hidden="true" />
                  {t('ctaApple')}
                </Link>
                <Link
                  href={`/${locale}/pricing`}
                  className="button-sheen group inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-10 py-5 text-base font-semibold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] active:scale-[0.98] md:text-lg"
                >
                  {t('ctaGoogle')}
                  <ArrowRight size={20} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {trust.map((item, index) => (
                  <span
                    key={index}
                    className="hover-lift inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70 backdrop-blur-xl"
                  >
                    <Check size={14} aria-hidden="true" className="text-brand-cyan" strokeWidth={2.5} />
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
