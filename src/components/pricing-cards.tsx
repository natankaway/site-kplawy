import { getTranslations } from 'next-intl/server';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from './fade-in';

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
  // h1 when this is the pricing route's main heading; h2 when used as a section on the home page.
  const TitleTag = isPageHeading ? 'h1' : 'h2';

  const freeFeatures = [
    t('freeF1'),
    t('freeF2'),
    t('freeF3'),
    t('freeF4'),
    t('freeF5'),
    t('freeF6'),
  ];

  const premiumFeatures = [
    t('premiumF1'),
    t('premiumF2'),
    t('premiumF3'),
    t('premiumF4'),
    t('premiumF5'),
    t('premiumF6'),
    t('premiumF7'),
    t('premiumF8'),
  ];

  const billingOptions = [
    {
      name: t('monthlyName'),
      price: t('monthlyPrice'),
      period: t('monthlyPeriod'),
      note: t('monthlyNote'),
      badge: null,
      featured: false,
      emphasis: 'border-white/[0.08] bg-white/[0.03]',
    },
    {
      name: t('upfrontName'),
      price: t('upfrontPrice'),
      period: t('upfrontPeriod'),
      note: t('upfrontNote'),
      badge: t('upfrontBadge'),
      featured: true,
      emphasis: 'border-brand-blue/45 bg-brand-blue/[0.1] shadow-[0_0_0_1px_rgba(46,123,255,0.25),0_20px_50px_rgba(46,123,255,0.18)]',
    },
  ];

  return (
    <section id="pricing" className="relative overflow-hidden px-6 py-28 md:py-32">
      {showDivider ? <div className="section-divider mx-auto mb-24 max-w-7xl" /> : null}
      <div className="hero-orb bottom-8 right-0 h-72 w-72 opacity-70 md:h-[28rem] md:w-[28rem]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <FadeIn>
            <p className="section-kicker mb-5">{t('badge')}</p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <TitleTag className="mx-auto max-w-4xl font-display text-4xl font-bold uppercase tracking-[-0.02em] text-white md:text-5xl lg:text-[3.75rem] lg:leading-[0.95]">
              {t('title')}
            </TitleTag>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mx-auto mt-6 max-w-3xl text-base font-light leading-relaxed text-white/70 md:text-lg">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
          <FadeIn delay={0.12}>
            <article className="card-electric hover-lift h-full rounded-3xl p-6 md:p-7">
              <div className="flex h-full flex-col">
                <div className="mb-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">{t('freeLabel')}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight text-white">{t('freeName')}</h3>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="tabular font-display text-5xl font-bold tracking-tight text-white">{t('freePrice')}</span>
                    <span className="pb-1.5 text-sm text-white/60">{t('freePeriod')}</span>
                  </div>
                  <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-white/70">{t('freeDesc')}</p>
                </div>

                <ul className="mb-8 space-y-3">
                  {freeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-white/60" strokeWidth={2.5} />
                      <span className="text-sm text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto space-y-4">
                  <div className="rounded-2xl border border-white/[0.08] bg-black/30 p-4 text-sm leading-relaxed text-white/70">
                    {t('freeNote')}
                  </div>
                  <Link
                    href={`/${locale}/download`}
                    className="button-sheen inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08]"
                  >
                    {t('freeCta')}
                  </Link>
                </div>
              </div>
            </article>
          </FadeIn>

          <FadeIn delay={0.2}>
            <article className="card-electric hover-lift relative overflow-hidden rounded-3xl border-brand-blue/40 p-6 shadow-[0_0_0_1px_rgba(46,123,255,0.2),0_30px_80px_rgba(46,123,255,0.12)] md:p-7 xl:p-8">
              <div className="grid-texture absolute inset-0" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(46,123,255,0.16),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(55,213,255,0.1),transparent_38%)]" />
              <div className="streak absolute inset-x-0 top-0" />

              <div className="relative z-10">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-blue-bright">
                      <Sparkles size={13} aria-hidden="true" />
                      {t('premiumLabel')}
                    </div>
                    <h3 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-white md:text-[2.5rem]">
                      {t('premiumName')}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-white/70 md:text-base">
                      {t('premiumDesc')}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.08] bg-black/30 px-4 py-4 text-sm text-white/70 backdrop-blur-xl md:max-w-[15rem]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">{t('billingTitle')}</p>
                    <p className="mt-2 leading-relaxed">{t('pricingFootnote')}</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {billingOptions.map((option) => (
                    <div
                      key={option.name}
                      className={`hover-lift rounded-[1.75rem] border p-5 backdrop-blur-xl ${option.emphasis}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold tracking-tight text-white">{option.name}</p>
                        {option.badge ? (
                          <span
                            className={
                              option.featured
                                ? 'rounded-full border border-brand-blue/30 bg-brand-blue/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue-bright'
                                : 'rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70'
                            }
                          >
                            {option.badge}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-5 flex items-end gap-2">
                        <span className="tabular font-display text-4xl font-bold tracking-tight text-white">{option.price}</span>
                        <span className="pb-1 text-sm font-medium text-white/60">{option.period}</span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-white/70">{option.note}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-[1.75rem] border border-white/[0.08] bg-black/25 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">{t('premiumIncludes')}</p>
                    <ul className="mt-5 space-y-3">
                      {premiumFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-cyan" strokeWidth={2.5} />
                          <span className="text-sm text-white/70">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="hover-lift rounded-[1.75rem] border border-brand-blue/25 bg-brand-blue/[0.08] p-5">
                      <p className="section-kicker">{t('valueTitle')}</p>
                      <p className="mt-3 font-display text-2xl font-bold uppercase tracking-tight text-white">{t('valueHeadline')}</p>
                      <div className="mt-5 space-y-3 text-sm text-white/70">
                        <p>{t('saveVsMonthly')}</p>
                      </div>
                    </div>

                    <div className="hover-lift rounded-[1.75rem] border border-white/[0.08] bg-white/[0.03] p-5">
                      <div className="grid gap-3 text-sm text-white/70 md:grid-cols-2">
                        <p>{t('premiumMeta1')}</p>
                        <p>{t('premiumMeta2')}</p>
                      </div>
                      <Link
                        href={`/${locale}/download`}
                        className="btn-electric button-sheen mt-5 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide"
                      >
                        {t('premiumCta')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
