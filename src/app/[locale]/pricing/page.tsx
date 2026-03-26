import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { PricingCards } from '@/components/pricing-cards';
import { CtaBanner } from '@/components/cta-banner';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return buildPageMetadata({
    locale,
    path: '/pricing',
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = routing.locales.includes(locale as 'pt' | 'en') ? locale : routing.defaultLocale;

  return (
    <div className="pt-24 md:pt-28">
      <PricingCards locale={currentLocale} showDivider={false} />
      <CtaBanner locale={currentLocale} />
    </div>
  );
}
