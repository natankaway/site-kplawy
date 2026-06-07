import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ShieldCheck, Zap, Cpu, Heart } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/fade-in';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  return buildPageMetadata({ locale, path: '/about', title: t('title'), description: t('story1') });
}

function ValueCard({ icon: Icon, title, text }: { icon: React.ElementType; title: string; text: string }) {
  return (
    <StaggerItem>
      <div className="p-6 rounded-2xl bg-surface-1/30 border border-white/[0.04]">
        <div className="w-10 h-10 bg-brand-blue-dark/10 text-brand-blue-dark rounded-xl flex items-center justify-center mb-4">
          <Icon size={20} strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-semibold tracking-tight mb-2">{title}</h3>
        <p className="text-sm text-white/65 leading-relaxed font-light">{text}</p>
      </div>
    </StaggerItem>
  );
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'aboutPage' });

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-5">
              {t('headline')}
            </h1>
          </FadeIn>
        </div>

        {/* Story */}
        <div className="space-y-6 mb-20">
          <FadeIn delay={0.1}>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              {t('story1')}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              {t('story2')}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              {t('story3')}
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              {t('story4')}
            </p>
          </FadeIn>
        </div>

        <div className="section-divider mb-20" />

        {/* Mission */}
        <FadeIn>
          <div className="relative text-center mb-20 overflow-hidden">
            <div className="ambient-glow-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10">
              <h2 className="text-xs font-semibold text-white/65 uppercase tracking-[0.2em] mb-6">
                {t('missionTitle')}
              </h2>
              <p className="text-2xl md:text-3xl font-bold tracking-tight">
                {t('missionText')}
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="section-divider mb-20" />

        {/* Values */}
        <FadeIn>
          <h2 className="text-xs font-semibold text-white/65 uppercase tracking-[0.2em] mb-8 text-center">
            {t('valuesTitle')}
          </h2>
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-3 gap-4 mb-20" staggerDelay={0.08}>
          <ValueCard icon={ShieldCheck} title={t('val1Title')} text={t('val1Text')} />
          <ValueCard icon={Zap} title={t('val2Title')} text={t('val2Text')} />
          <ValueCard icon={Cpu} title={t('val3Title')} text={t('val3Text')} />
        </StaggerContainer>

        <div className="section-divider mb-20" />

        {/* Developer */}
        <FadeIn>
          <div className="text-center">
            <p className="text-xs font-semibold text-white/65 uppercase tracking-[0.2em] mb-4">
              {t('developer')}
            </p>
            <p className="text-2xl font-bold tracking-tight mb-2">
              {t('developerName')}
            </p>
            <p className="text-sm text-white/65 font-light flex items-center justify-center gap-2">
              <Heart size={14} aria-hidden="true" className="text-brand-blue-dark" />
              {t('since')}
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
