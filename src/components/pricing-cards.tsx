import { getTranslations } from 'next-intl/server';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from './fade-in';

export async function PricingCards({
  locale,
  showDivider = true,
}: {
  locale: string;
  showDivider?: boolean;
}) {
  const t = await getTranslations({ locale, namespace: 'pricing' });

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
      emphasis: 'border-white/[0.06] bg-white/[0.03]',
    },
    {
      name: t('installmentName'),
      price: t('installmentPrice'),
      period: t('installmentPeriod'),
      note: t('installmentNote'),
      badge: t('installmentBadge'),
      emphasis: 'border-white/[0.08] bg-white/[0.04]',
    },
    {
      name: t('upfrontName'),
      price: t('upfrontPrice'),
      period: t('upfrontPeriod'),
      note: t('upfrontNote'),
      badge: t('upfrontBadge'),
      emphasis: 'border-brand-amber/30 bg-brand-amber/8 shadow-[0_0_0_1px_rgba(255,200,87,0.08)]',
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
            <h2 className="mx-auto max-w-4xl text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl lg:text-[3.5rem] lg:leading-[1.02]">
              {t('title')}
            </h2>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mx-auto mt-6 max-w-3xl text-base font-light leading-relaxed text-white/52 md:text-lg">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
          <FadeIn delay={0.12}>
            <article className="premium-shell hover-lift h-full p-6 md:p-7">
              <div className="flex h-full flex-col">
                <div className="mb-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">{t('freeLabel')}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{t('freeName')}</h3>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-4xl font-bold tracking-tight text-white">{t('freePrice')}</span>
                    <span className="pb-1 text-sm text-white/35">{t('freePeriod')}</span>
                  </div>
                  <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-white/46">{t('freeDesc')}</p>
                </div>

                <ul className="mb-8 space-y-3">
                  {freeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check size={16} className="mt-0.5 shrink-0 text-white/36" />
                      <span className="text-sm text-white/60">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto space-y-4">
                  <div className="rounded-2xl border border-white/[0.06] bg-black/30 p-4 text-sm leading-relaxed text-white/44">
                    {t('freeNote')}
                  </div>
                  <Link
                    href={`/${locale}/download`}
                    className="button-sheen inline-flex w-full items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.08]"
                  >
                    {t('freeCta')}
                  </Link>
                </div>
              </div>
            </article>
          </FadeIn>

          <FadeIn delay={0.2}>
            <article className="premium-shell hover-lift relative overflow-hidden p-6 md:p-7 xl:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(10,132,255,0.12),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(255,200,87,0.08),transparent_35%)]" />

              <div className="relative z-10">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-dark/20 bg-brand-blue-dark/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-blue-dark">
                      <Sparkles size={13} />
                      {t('premiumLabel')}
                    </div>
                    <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-[2.25rem]">
                      {t('premiumName')}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-white/48 md:text-base">
                      {t('premiumDesc')}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.08] bg-black/30 px-4 py-4 text-sm text-white/48 backdrop-blur-xl md:max-w-[15rem]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/32">{t('billingTitle')}</p>
                    <p className="mt-2 leading-relaxed">{t('pricingFootnote')}</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {billingOptions.map((option) => (
                    <div
                      key={option.name}
                      className={`hover-lift rounded-[1.75rem] border p-5 backdrop-blur-xl ${option.emphasis}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold tracking-tight text-white">{option.name}</p>
                        {option.badge ? (
                          <span className="rounded-full border border-brand-amber/18 bg-brand-amber/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-amber">
                            {option.badge}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-5 flex items-end gap-2">
                        <span className="text-4xl font-bold tracking-[-0.04em] text-white">{option.price}</span>
                        <span className="pb-1 text-sm font-medium text-white/36">{option.period}</span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-white/48">{option.note}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-[1.75rem] border border-white/[0.06] bg-black/25 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">{t('premiumIncludes')}</p>
                    <ul className="mt-5 space-y-3">
                      {premiumFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check size={16} className="mt-0.5 shrink-0 text-brand-blue-dark" />
                          <span className="text-sm text-white/64">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="hover-lift rounded-[1.75rem] border border-brand-amber/18 bg-brand-amber/8 p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-amber">{t('valueTitle')}</p>
                      <p className="mt-3 text-2xl font-semibold tracking-tight text-white">{t('valueHeadline')}</p>
                      <div className="mt-5 space-y-3 text-sm text-white/68">
                        <p>{t('saveVsMonthly')}</p>
                        <p>{t('saveVsInstallment')}</p>
                      </div>
                    </div>

                    <div className="hover-lift rounded-[1.75rem] border border-white/[0.06] bg-white/[0.03] p-5">
                      <div className="grid gap-3 text-sm text-white/58 md:grid-cols-2">
                        <p>{t('premiumMeta1')}</p>
                        <p>{t('premiumMeta2')}</p>
                      </div>
                      <Link
                        href={`/${locale}/download`}
                        className="button-sheen mt-5 inline-flex w-full items-center justify-center rounded-full bg-brand-blue-dark px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-blue"
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
