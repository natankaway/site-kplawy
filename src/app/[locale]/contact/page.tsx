import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { ContactContent } from '@/components/contact-content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactPage' });
  return buildPageMetadata({ locale, path: '/contact', title: t('headline'), description: t('subtitle') });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return <ContactContent t={messages.contactPage as Record<string, string>} />;
}
