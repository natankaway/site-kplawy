import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AlertTriangle } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'termsPage' });
  return buildPageMetadata({ locale, path: '/terms', title: t('title'), description: t('notice') });
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold tracking-tight mt-12 mb-4 first:mt-0">
      {children}
    </h2>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-white/50 leading-relaxed font-light mb-4">
      {children}
    </p>
  );
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'termsPage' });

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4">
              {t('title')}
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-sm text-white/30 font-light">
              {t('lastUpdated')}
            </p>
          </FadeIn>
        </div>

        {/* Draft Notice */}
        <FadeIn delay={0.15}>
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 mb-12">
            <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-400/80 leading-relaxed font-light">
              {t('notice')}
            </p>
          </div>
        </FadeIn>

        {/* Content */}
        <FadeIn delay={0.2}>
          <div className="prose-brand">
            <SectionTitle>{t('s1Title')}</SectionTitle>
            <Paragraph>{t('s1Text')}</Paragraph>

            <SectionTitle>{t('s2Title')}</SectionTitle>
            <Paragraph>{t('s2Text')}</Paragraph>

            <SectionTitle>{t('s3Title')}</SectionTitle>
            <Paragraph>{t('s3Text')}</Paragraph>

            <SectionTitle>{t('s4Title')}</SectionTitle>
            <Paragraph>{t('s4Text')}</Paragraph>

            <SectionTitle>{t('s5Title')}</SectionTitle>
            <Paragraph>{t('s5Text')}</Paragraph>

            <SectionTitle>{t('s6Title')}</SectionTitle>
            <Paragraph>{t('s6Text')}</Paragraph>

            <SectionTitle>{t('s7Title')}</SectionTitle>
            <Paragraph>{t('s7Text')}</Paragraph>

            <SectionTitle>{t('s8Title')}</SectionTitle>
            <Paragraph>{t('s8Text')}</Paragraph>

            <SectionTitle>{t('s9Title')}</SectionTitle>
            <Paragraph>{t('s9Text')}</Paragraph>
            <a
              href={`mailto:${t('s9Email')}`}
              className="text-sm text-brand-blue-dark hover:text-brand-blue-dark/80 transition-colors font-medium"
            >
              {t('s9Email')}
            </a>

            {/* Legal review note */}
            <div className="mt-16 pt-8 border-t border-white/[0.06]">
              <p className="text-xs text-amber-400/60 font-light italic">
                {t('reviewNote')}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
