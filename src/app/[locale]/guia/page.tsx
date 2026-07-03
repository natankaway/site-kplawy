import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { routing, isLocale } from '@/i18n/routing';
import { guides } from '@/lib/guides';
import { buildPageMetadata, buildBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/fade-in';
import { CtaBanner } from '@/components/cta-banner';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guide' });
  return buildPageMetadata({
    locale,
    path: '/guia',
    title: t('indexTitle'),
    description: t('indexDescription'),
  });
}

export default async function GuideIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = isLocale(locale) ? locale : routing.defaultLocale;
  setRequestLocale(currentLocale);
  const t = await getTranslations({ locale: currentLocale, namespace: 'guide' });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: t('home'), url: `${SITE_URL}/${currentLocale}` },
    { name: t('indexTitle'), url: `${SITE_URL}/${currentLocale}/guia` },
  ]);

  return (
    <div className="pt-32 pb-8 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <span className="section-kicker justify-center">
              <BookOpen size={15} strokeWidth={2.5} aria-hidden="true" />
              {t('indexKicker')}
            </span>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h1 className="mt-5 font-display text-4xl font-bold uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
              {t('indexTitle')}
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/65 font-light leading-relaxed">
              {t('indexDescription')}
            </p>
          </FadeIn>
        </div>

        {/* Guide cards */}
        <StaggerContainer className="grid gap-4 md:grid-cols-2" staggerDelay={0.08}>
          {guides.map((guide) => (
            <StaggerItem key={guide.slug}>
              <Link
                href={`/${currentLocale}/guia/${guide.slug}`}
                className="card-electric group flex h-full flex-col rounded-2xl p-6 transition-colors hover:border-brand-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1A] md:p-7"
              >
                <h2 className="font-display text-xl font-bold uppercase tracking-tight text-white transition-colors group-hover:text-brand-blue-bright md:text-2xl">
                  {guide.title[currentLocale]}
                </h2>
                <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-white/70 md:text-[15px]">
                  {guide.description[currentLocale]}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-bright">
                  {t('readMore')}
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <CtaBanner locale={currentLocale} />
    </div>
  );
}
