import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  PlayCircle, Watch, Camera, Mic, Cloud, BarChart3,
  Sun, Monitor, ShieldCheck, Eye, Bluetooth, Smartphone,
  type LucideIcon,
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/fade-in';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'featuresPage' });
  return buildPageMetadata({ locale, path: '/features', title: t('title'), description: t('subtitle') });
}

function FeatureCard({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) {
  return (
    <StaggerItem>
      <div className="group p-6 rounded-2xl bg-surface-1/30 border border-white/[0.04] hover:border-brand-blue-dark/20 hover:bg-surface-1/50 transition-all duration-500">
        <div className="w-10 h-10 bg-brand-blue-dark/10 text-brand-blue-dark rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-blue-dark group-hover:text-white transition-all duration-500">
          <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight mb-2">{title}</h3>
        <p className="text-sm text-white/65 leading-relaxed font-light">{desc}</p>
      </div>
    </StaggerItem>
  );
}

export default async function FeaturesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'featuresPage' });

  const categories = [
    {
      title: t('recording'),
      features: [
        { icon: PlayCircle, title: t('recF1Title'), desc: t('recF1Desc') },
        { icon: Monitor, title: t('recF2Title'), desc: t('recF2Desc') },
        { icon: Camera, title: t('recF3Title'), desc: t('recF3Desc') },
        { icon: Mic, title: t('recF4Title'), desc: t('recF4Desc') },
      ],
    },
    {
      title: t('remote'),
      features: [
        { icon: Watch, title: t('remF1Title'), desc: t('remF1Desc') },
        { icon: Watch, title: t('remF2Title'), desc: t('remF2Desc') },
        { icon: Bluetooth, title: t('remF3Title'), desc: t('remF3Desc') },
        { icon: Smartphone, title: t('remF4Title'), desc: t('remF4Desc') },
      ],
    },
    {
      title: t('management'),
      features: [
        { icon: PlayCircle, title: t('manF1Title'), desc: t('manF1Desc') },
        { icon: PlayCircle, title: t('manF2Title'), desc: t('manF2Desc') },
        { icon: Cloud, title: t('manF3Title'), desc: t('manF3Desc') },
        { icon: BarChart3, title: t('manF4Title'), desc: t('manF4Desc') },
      ],
    },
    {
      title: t('experience'),
      features: [
        { icon: Sun, title: t('expF1Title'), desc: t('expF1Desc') },
        { icon: Eye, title: t('expF2Title'), desc: t('expF2Desc') },
        { icon: ShieldCheck, title: t('expF3Title'), desc: t('expF3Desc') },
        { icon: ShieldCheck, title: t('expF4Title'), desc: t('expF4Desc') },
      ],
    },
  ];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-5">
              {t('headline')}
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-white/65 max-w-2xl mx-auto font-light">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>

        {/* Categories */}
        {categories.map((category, catIndex) => (
          <div key={catIndex} className="mb-20 last:mb-0">
            <FadeIn>
              <h2 className="text-xs font-semibold text-white/65 uppercase tracking-[0.2em] mb-8">
                {category.title}
              </h2>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 gap-4" staggerDelay={0.08}>
              {category.features.map((feature, i) => (
                <FeatureCard key={i} icon={feature.icon} title={feature.title} desc={feature.desc} />
              ))}
            </StaggerContainer>
            {catIndex < categories.length - 1 && (
              <div className="section-divider mt-20" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
