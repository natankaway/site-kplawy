import { routing, isLocale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/hero';
import { ProductEvidence } from '@/components/product-evidence';
import { TrustStrip } from '@/components/trust-strip';
import { FeaturesGrid } from '@/components/features-grid';
import { HowItWorks } from '@/components/how-it-works';
import { Testimonials } from '@/components/testimonials';
import { PricingCards } from '@/components/pricing-cards';
import { FaqInline } from '@/components/faq-inline';
import { WaitlistForm } from '@/components/waitlist-form';
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
  const currentLocale = isLocale(locale) ? locale : routing.defaultLocale;
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
      <Testimonials locale={currentLocale} />
      <PricingCards locale={currentLocale} />
      <FaqInline locale={currentLocale} />
      <WaitlistForm locale={currentLocale} variant="section" />
      <CtaBanner locale={currentLocale} />
    </>
  );
}
