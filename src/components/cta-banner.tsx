'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Apple, ArrowRight } from 'lucide-react';
import { FadeIn } from './fade-in';
import Link from 'next/link';

export function CtaBanner() {
  const t = useTranslations('cta');
  const locale = useLocale();

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="section-divider max-w-7xl mx-auto mb-32" />

      {/* Ambient glow */}
      <div className="ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-6 leading-tight">
            {t('title')}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-lg text-white/40 mb-12 max-w-xl mx-auto font-light">
            {t('subtitle')}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/download`}
              className="group flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full text-base font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Apple size={20} />
              {t('ctaApple')}
            </Link>
            <Link
              href={`/${locale}/download`}
              className="group flex items-center justify-center gap-3 bg-surface-1 text-white border border-white/[0.08] px-8 py-4 rounded-full text-base font-semibold hover:bg-surface-2 hover:border-white/[0.12] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {t('ctaGoogle')}
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
