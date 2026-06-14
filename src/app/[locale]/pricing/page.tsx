import { getTranslations } from 'next-intl/server';
import { routing, isLocale } from '@/i18n/routing';
import { PricingCards } from '@/components/pricing-cards';
import { CtaBanner } from '@/components/cta-banner';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return buildPageMetadata({
    locale,
    path: '/pricing',
    title: `${t('titleLine1')} ${t('titleLine2')}`,
    description: t('subtitle'),
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = isLocale(locale) ? locale : routing.defaultLocale;

  return (
    <div className="pt-24 md:pt-28">
      <PricingCards locale={currentLocale} showDivider={false} isPageHeading />
      <CtaBanner locale={currentLocale} />
    </div>
  );
}
