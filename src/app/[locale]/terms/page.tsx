import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FadeIn } from '@/components/fade-in';
import { LegalMarkdown } from '@/components/legal-markdown';
import { loadLegalDoc } from '@/lib/legal';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'termsPage' });
  return buildPageMetadata({ locale, path: '/terms', title: t('title'), description: t('metaDescription') });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await loadLegalDoc('terms', locale);

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <article className="legal-doc">
            <LegalMarkdown content={content} />
          </article>
        </FadeIn>
      </div>
    </div>
  );
}
