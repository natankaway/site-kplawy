'use client';

import { useTranslations } from 'next-intl';
import { FadeIn, StaggerContainer, StaggerItem } from './fade-in';

export function HowItWorks() {
  const t = useTranslations('howItWorks');

  const steps = [
    {
      number: t('step1Number'),
      title: t('step1Title'),
      desc: t('step1Desc'),
    },
    {
      number: t('step2Number'),
      title: t('step2Title'),
      desc: t('step2Desc'),
    },
    {
      number: t('step3Number'),
      title: t('step3Title'),
      desc: t('step3Desc'),
    },
  ];

  return (
    <section id="how-it-works" className="relative py-32 px-6">
      {/* Subtle divider */}
      <div className="section-divider max-w-7xl mx-auto mb-32" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
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

        {/* Steps */}
        <StaggerContainer className="grid md:grid-cols-3 gap-8 lg:gap-12" staggerDelay={0.15}>
          {steps.map((step, i) => (
            <StaggerItem key={i}>
              <div className="relative group">
                {/* Connector line (hidden on mobile, shown between cards on desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-white/[0.08] to-transparent z-0" />
                )}

                <div className="relative">
                  {/* Step number */}
                  <div className="text-6xl md:text-7xl font-black text-white/[0.04] tracking-tighter mb-4 select-none">
                    {step.number}
                  </div>

                  {/* Blue dot accent */}
                  <div className="w-2 h-2 rounded-full bg-brand-blue-dark mb-5 group-hover:shadow-[0_0_12px_rgba(10,132,255,0.5)] transition-shadow duration-500" />

                  <h3 className="text-2xl font-semibold tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed font-light max-w-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
