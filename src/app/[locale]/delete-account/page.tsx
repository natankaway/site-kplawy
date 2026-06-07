import { setRequestLocale } from 'next-intl/server';
import { FadeIn } from '@/components/fade-in';
import { LegalMarkdown } from '@/components/legal-markdown';
import { loadLegalDoc } from '@/lib/legal';
import { buildPageMetadata } from '@/lib/seo';

const META: Record<string, { title: string; description: string }> = {
  pt: {
    title: 'Exclusão de conta',
    description: 'Como excluir sua conta KplaWY e os dados associados.',
  },
  en: {
    title: 'Account deletion',
    description: 'How to delete your KplaWY account and associated data.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const meta = META[locale] ?? META.pt;
  return buildPageMetadata({
    locale,
    path: '/delete-account',
    title: meta.title,
    description: meta.description,
  });
}

export default async function DeleteAccountPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await loadLegalDoc('delete-account', locale);

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
