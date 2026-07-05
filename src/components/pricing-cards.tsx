import { getTranslations, getFormatter } from 'next-intl/server';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from './fade-in';
import { TrustBadges } from './section-cta';
import { pricingFor, annualSavingsFor } from '@/lib/pricing';

export async function PricingCards({
  locale,
  showDivider = true,
  isPageHeading = false,
}: {
  locale: string;
  showDivider?: boolean;
  isPageHeading?: boolean;
}) {
  const t = await getTranslations({ locale, namespace: 'pricing' });
  const format = await getFormatter({ locale });
  const pricing = pricingFor(locale);
  const money = (value: number) =>
    format.number(value, { style: 'currency', currency: pricing.currency });

  // h1 when this is the pricing route's main heading; h2 on the home page.
  const TitleTag = isPageHeading ? 'h1' : 'h2';

  const freeFeatures = [
    t('freeF1'), t('freeF2'), t('freeF3'), t('freeF4'), t('freeF5'), t('freeF6'),
  ];

  const premiumFeatures = [
    t('premiumF1'), t('premiumF2'), t('premiumF3'), t('premiumF4'),
    t('premiumF5'), t('premiumF6'), t('premiumF7'), t('premiumF8'),
    t('premiumF9'),
  ];

  const billingOptions = [
    {
      name: t('monthlyName'),
      price: money(pricing.premiumMonthly),
      period: t('monthlyPeriod'),
      note: t('monthlyNote'),
      badge: null as string | null,
      featured: false,
      emphasis: 'border-white/[0.08] bg-white/[0.03]',
    },
    {
      name: t('upfrontName'),
      price: money(pricing.premiumAnnual),
      period: t('upfrontPeriod'),
      note: t('upfrontNote'),
      badge: t('upfrontBadge'),
      featured: true,
      emphasis:
        'border-brand-blue/45 bg-brand-blue/[0.1] shadow-[0_0_0_1px_rgba(46,123,255,0.25),0_20px_50px_rgba(46,123,255,0.18)]',
    },
  ];

  return (
    <section
      id="pricing"
      className="relative overflow-hidden px-6 py-28 md:py-32"
      aria-labelledby="pricing-heading"
    >
      {showDivider ? (
        <div className="section-divider mx-auto mb-24 max-w-7xl" aria-hidden="true" />
      ) : null}
      <div className="hero-orb bottom-8 right-0 h-72 w-72 opacity-70 md:h-[28rem] md:w-[28rem]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <FadeIn>
            <p className="section-kicker mb-5 justify-center">{t('badge')}</p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <TitleTag
              id="pricing-heading"
              className="mx-auto max-w-4xl font-display text-4xl font-bold uppercase tracking-[-0.02em] text-white md:text-5xl lg:text-[3.75rem] lg:leading-[0.95]"
            >
              {t('titleLine1')}{' '}
              <span className="title-accent">{t('titleLine2')}</span>
            </TitleTag>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mx-auto mt-6 max-w-3xl text-base font-light leading-relaxed text-white/80 md:text-lg">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
          {/* Free */}
          <FadeIn delay={0.12}>
            <article className="card-electric hover-lift h-full rounded-3xl p-6 md:p-7">
              <div className="flex h-full flex-col">
                <div className="mb-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">{t('freeLabel')}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight text-white">{t('freeName')}</h3>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="tabular font-display text-5xl font-bold tracking-tight text-white">{t('freePrice')}</span>
                    <span className="pb-1.5 text-sm text-white/70">{t('freePeriod')}</span>
                  </div>
                  <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-white/80">{t('freeDesc')}</p>
                </div>

                <ul className="mb-8 space-y-3">
                  {freeFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-white/70" strokeWidth={2.5} />
                      <span className="text-sm text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto space-y-4">
                  <div className="rounded-2xl border border-white/[0.08] bg-black/30 p-4 text-sm leading-relaxed text-white/80">
                    {t('freeNote')}
                  </div>
                  <Link
                    href={`/${locale}/download`}
                    className="button-sheen inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1A]"
                  >
                    {t('freeCta')}
                  </Link>
                </div>
              </div>
            </article>
          </FadeIn>

          {/* Premium */}
          <FadeIn delay={0.2}>
            <article className="card-electric hover-lift relative overflow-hidden rounded-3xl border-brand-blue/40 p-6 shadow-[0_0_0_1px_rgba(46,123,255,0.2),0_30px_80px_rgba(46,123,255,0.12)] md:p-7 xl:p-8">
              <div className="grid-texture absolute inset-0" aria-hidden="true" />
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(46,123,255,0.16),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(227,169,44,0.08),transparent_38%)]"
                aria-hidden="true"
              />
              <div className="streak absolute inset-x-0 top-0" aria-hidden="true" />

              <div className="relative z-10">
                {/* Header + billing choice */}
                <div className="grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-start">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-gold">
                      <Sparkles size={13} aria-hidden="true" />
                      {t('premiumLabel')}
                    </div>
                    <h3 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-white md:text-[2.5rem]">
                      {t('premiumName')}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-white/80 md:text-base">
                      {t('premiumDesc')}
                    </p>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{t('pricingFootnote')}</p>
                  </div>

                  {/* Billing tiles: the one place a card earns its place — a real choice */}
                  <ul className="grid list-none gap-3 sm:grid-cols-2">
                    {billingOptions.map((option) => (
                      <li
                        key={option.name}
                        className={`rounded-2xl border p-5 ${option.emphasis}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-semibold tracking-tight text-white">{option.name}</p>
                          {option.badge ? (
                            <span className="rounded-full border border-brand-blue/30 bg-brand-blue/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue-bright">
                              {option.badge}
                            </span>
                          ) : null}
                        </div>
                        <div className="mt-5 flex items-end gap-2">
                          <span className="tabular font-display text-4xl font-bold tracking-tight text-white">{option.price}</span>
                          <span className="pb-1 text-sm font-medium text-white/70">{option.period}</span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-white/80">{option.note}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="my-8 h-px bg-white/[0.08]" aria-hidden="true" />

                {/* Includes + value — plain sections, no nested boxes */}
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-gold">{t('premiumIncludes')}</p>
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {premiumFeatures.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-gold" strokeWidth={2.5} />
                          <span className="text-sm text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-end gap-5">
                    <div>
                      <p className="section-kicker">{t('valueTitle')}</p>
                      <p className="mt-3 font-display text-2xl font-bold uppercase tracking-tight text-white">{t('valueHeadline')}</p>
                      <p className="mt-3 text-sm text-white/80">{t('saveVsMonthly', { savings: money(annualSavingsFor(locale)) })}</p>
                    </div>
                    <div className="grid gap-2 text-sm text-white/70 sm:grid-cols-2">
                      <p>{t('premiumMeta1')}</p>
                      <p>{t('premiumMeta2')}</p>
                    </div>
                    <Link
                      href={`/${locale}/download`}
                      className="btn-electric button-sheen inline-flex min-h-[48px] w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1A]"
                    >
                      {t('premiumCta')}
                    </Link>
                  </div>
                </div>

                <FadeIn delay={0.1}>
                  <TrustBadges locale={locale} className="mt-8" />
                </FadeIn>
              </div>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
