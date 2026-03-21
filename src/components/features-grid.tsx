'use client';

import { useTranslations } from 'next-intl';
import { PlayCircle, Watch, Camera, Cloud, Shield, SlidersHorizontal } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './fade-in';

const featureIcons = [PlayCircle, Watch, Camera, Cloud, Shield, SlidersHorizontal];

export function FeaturesGrid() {
  const t = useTranslations('features');

  const features = [
    { title: t('f1Title'), desc: t('f1Desc'), Icon: featureIcons[0] },
    { title: t('f2Title'), desc: t('f2Desc'), Icon: featureIcons[1] },
    { title: t('f3Title'), desc: t('f3Desc'), Icon: featureIcons[2] },
    { title: t('f4Title'), desc: t('f4Desc'), Icon: featureIcons[3] },
    { title: t('f5Title'), desc: t('f5Desc'), Icon: featureIcons[4] },
    { title: t('f6Title'), desc: t('f6Desc'), Icon: featureIcons[5] },
  ];

  return (
    <section id="features" className="relative py-32 px-6">
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
            <p className="text-lg text-white/40 max-w-2xl mx-auto font-light">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>

        {/* Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
          {features.map((feature, i) => (
            <StaggerItem key={i}>
              <div className="feature-card bg-surface-1/50 p-8 rounded-2xl border border-white/[0.04] group hover:bg-surface-1/80 transition-all duration-500">
                <div className="w-12 h-12 bg-brand-blue-dark/10 text-brand-blue-dark rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-blue-dark group-hover:text-white transition-all duration-500">
                  <feature.Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed font-light">
                  {feature.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
