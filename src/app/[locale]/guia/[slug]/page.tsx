import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { routing, isLocale } from '@/i18n/routing';
import { guides, getGuide } from '@/lib/guides';
import { buildPageMetadata, buildBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import { FadeIn } from '@/components/fade-in';
import { CtaBanner } from '@/components/cta-banner';

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    guides.map((guide) => ({ locale, slug: guide.slug }))
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const lang = isLocale(locale) ? locale : routing.defaultLocale;
  return buildPageMetadata({
    locale: lang,
    path: `/guia/${guide.slug}`,
    title: guide.title[lang],
    description: guide.description[lang],
  });
}

export default async function GuidePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const currentLocale = isLocale(locale) ? locale : routing.defaultLocale;
  setRequestLocale(currentLocale);
  const t = await getTranslations({ locale: currentLocale, namespace: 'guide' });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: t('home'), url: `${SITE_URL}/${currentLocale}` },
    { name: t('indexTitle'), url: `${SITE_URL}/${currentLocale}/guia` },
    { name: guide.title[currentLocale], url: `${SITE_URL}/${currentLocale}/guia/${guide.slug}` },
  ]);

  return (
    <div className="pt-32 pb-8 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="max-w-3xl mx-auto">
        {/* Back link */}
        <FadeIn>
          <Link
            href={`/${currentLocale}/guia`}
            className="group mb-8 inline-flex min-h-[44px] items-center gap-2 rounded-full text-sm font-semibold text-brand-blue-bright transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-bright motion-reduce:transition-none"
          >
            <ArrowLeft
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transition-none"
            />
            {t('backToIndex')}
          </Link>
        </FadeIn>

        {/* Header */}
        <FadeIn delay={0.06}>
          <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
            {guide.title[currentLocale]}
          </h1>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="mt-5 text-lg text-white/65 font-light leading-relaxed">
            {guide.description[currentLocale]}
          </p>
        </FadeIn>

        <div className="section-divider my-12" aria-hidden="true" />

        {/* Body */}
        <div className="space-y-12">
          {guide.body[currentLocale].map((section) => (
            <FadeIn key={section.heading}>
              <section>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-base text-white/70 leading-relaxed font-light md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </FadeIn>
          ))}
        </div>
      </article>

      <CtaBanner locale={currentLocale} />
    </div>
  );
}
