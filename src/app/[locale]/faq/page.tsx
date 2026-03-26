import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { FaqContent } from '@/components/faq-content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faqPage' });
  return buildPageMetadata({ locale, path: '/faq', title: t('headline'), description: t('a1') });
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'faqPage' });

  const faqs = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5') },
    { q: t('q6'), a: t('a6') },
    { q: t('q7'), a: t('a7') },
    { q: t('q8'), a: t('a8') },
  ];

  return <FaqContent headline={t('headline')} faqs={faqs} />;
}
