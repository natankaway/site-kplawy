import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/hero';
import { ProductEvidence } from '@/components/product-evidence';
import { TrustStrip } from '@/components/trust-strip';
import { FeaturesGrid } from '@/components/features-grid';
import { HowItWorks } from '@/components/how-it-works';
import { PricingCards } from '@/components/pricing-cards';
import { CtaBanner } from '@/components/cta-banner';
import { buildOrganizationJsonLd, buildPageMetadata, buildSoftwareApplicationJsonLd } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return buildPageMetadata({
    locale,
    path: '/',
    title: t('title'),
    description: t('description'),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = routing.locales.includes(locale as 'pt' | 'en') ? locale : routing.defaultLocale;
  const softwareApplicationJsonLd = buildSoftwareApplicationJsonLd(currentLocale);
  const organizationJsonLd = buildOrganizationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero locale={currentLocale} />
      <TrustStrip locale={currentLocale} />
      <ProductEvidence locale={currentLocale} />
      <FeaturesGrid locale={currentLocale} />
      <HowItWorks locale={currentLocale} />
      <PricingCards locale={currentLocale} />
      <CtaBanner locale={currentLocale} />
    </>
  );
}
