'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Check } from 'lucide-react';
import { FadeIn } from './fade-in';
import Link from 'next/link';

export function PricingCards() {
  const t = useTranslations('pricing');
  const locale = useLocale();

  const freeFeatures = [
    t('freeF1'), t('freeF2'), t('freeF3'),
    t('freeF4'), t('freeF5'), t('freeF6'),
  ];

  const proFeatures = [
    t('proF1'), t('proF2'), t('proF3'), t('proF4'),
    t('proF5'), t('proF6'), t('proF7'), t('proF8'),
  ];

  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="section-divider max-w-7xl mx-auto mb-32" />

      {/* Ambient glow behind Pro card */}
      <div className="ambient-glow-sm absolute top-1/2 right-1/3 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <span className="inline-flex items-center py-1.5 px-4 rounded-full bg-surface-1/80 border border-white/[0.08] text-brand-blue-dark text-xs font-semibold tracking-wide uppercase mb-6">
              {t('badge')}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-5">
              {t('title')}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-white/40 max-w-xl mx-auto font-light">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          {/* Free Plan */}
          <FadeIn delay={0.2}>
            <div className="bg-surface-1/40 rounded-2xl border border-white/[0.06] p-8 h-full flex flex-col">
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white/70 mb-2">
                  {t('freeName')}
                </h3>
                <div className="text-4xl font-bold tracking-tight mb-3">
                  {t('freePrice')}
                </div>
                <p className="text-sm text-white/40 font-light">
                  {t('freeDesc')}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {freeFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={16} className="text-white/30 mt-0.5 shrink-0" />
                    <span className="text-sm text-white/50">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/${locale}/download`}
                className="flex items-center justify-center w-full py-3.5 rounded-full border border-white/[0.1] text-white/70 text-sm font-semibold hover:bg-surface-2 hover:text-white transition-all duration-300"
              >
                {t('freeCta')}
              </Link>
            </div>
          </FadeIn>

          {/* Pro Plan */}
          <FadeIn delay={0.3}>
            <div className="relative bg-surface-1/60 rounded-2xl border border-brand-blue-dark/20 p-8 h-full flex flex-col">
              {/* Recommended badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center py-1 px-4 rounded-full bg-brand-blue-dark text-white text-xs font-semibold tracking-wide">
                  {t('proBadge')}
                </span>
              </div>

              <div className="mb-8 mt-2">
                <h3 className="text-lg font-semibold text-brand-blue-dark mb-2">
                  {t('proName')}
                </h3>
                <div className="text-4xl font-bold tracking-tight mb-3">
                  {t('proPrice')}
                </div>
                <p className="text-sm text-white/40 font-light">
                  {t('proDesc')}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {proFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={16} className="text-brand-blue-dark mt-0.5 shrink-0" />
                    <span className="text-sm text-white/60">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/${locale}/download`}
                className="flex items-center justify-center w-full py-3.5 rounded-full bg-brand-blue-dark text-white text-sm font-semibold hover:bg-brand-blue transition-all duration-300"
              >
                {t('proCta')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
