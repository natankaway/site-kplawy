import { getTranslations, getFormatter } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from './fade-in';
import { FaqAccordion, type Faq } from './faq-accordion';
import { PRICING } from '@/lib/pricing';

/**
 * Inline FAQ on the landing page — reuses the /faq content (faqPage namespace)
 * to break objections near the CTAs. Shows a curated subset; links to /faq for
 * the rest. Price-bearing answers are formatted from the single pricing source.
 */
export async function FaqInline({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'faqPage' });
  const ui = await getTranslations({ locale, namespace: 'faqInline' });
  const format = await getFormatter({ locale });
  const money = (value: number) =>
    format.number(value, { style: 'currency', currency: PRICING.currency });

  const items: Faq[] = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q5'), a: t('a5') },
    { q: t('q6'), a: t('a6') },
    { q: t('q7'), a: t('a7') },
    {
      q: t('q8'),
      a: t('a8', {
        monthly: money(PRICING.premiumMonthly),
        annual: money(PRICING.premiumAnnual),
      }),
    },
  ];

  return (
    <section
      className="relative overflow-hidden px-6 py-24 md:py-28"
      aria-labelledby="faq-inline-heading"
    >
      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <FadeIn>
            <p className="section-kicker mb-5 justify-center">{ui('badge')}</p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2
              id="faq-inline-heading"
              className="font-display text-4xl font-bold uppercase tracking-tight text-white md:text-5xl"
            >
              {ui('titleLine1')}{' '}
              <span className="title-accent">{ui('titleLine2')}</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mx-auto mt-4 max-w-xl text-base font-light leading-relaxed text-white/80">
              {ui('subtitle')}
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <FaqAccordion items={items} />
        </FadeIn>

        <FadeIn delay={0.16}>
          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/faq`}
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-semibold text-brand-blue-bright transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-bright motion-reduce:transition-none"
            >
              {ui('seeAll')}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
