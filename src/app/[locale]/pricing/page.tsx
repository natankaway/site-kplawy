import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { PricingCards } from '@/components/pricing-cards';
import { CtaBanner } from '@/components/cta-banner';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return { title: t('badge') };
}

export default function PricingPage() {
  return (
    <div className="pt-12">
      <PricingCards />
      <CtaBanner />
    </div>
  );
}
