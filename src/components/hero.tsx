import { getTranslations } from 'next-intl/server';
import { Apple, ArrowRight, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FadeIn } from './fade-in';

export async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'hero' });
  const proofPoints = [t('proof1'), t('proof2'), t('proof3'), t('proof4')];

  return (
    <section className="relative overflow-hidden px-6 pb-14 pt-32 md:pb-20 md:pt-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-orb left-[8%] top-24 h-64 w-64 md:h-96 md:w-96" />
        <div className="hero-orb right-[4%] top-[18%] h-72 w-72 opacity-70 md:h-[30rem] md:w-[30rem]" />
        <div className="noise-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:88px_88px] opacity-[0.04]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-black/90 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 xl:gap-16">
          <div className="max-w-3xl">
            <FadeIn className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue-dark/20 bg-brand-blue-dark/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue-dark">
                <span className="glow-pulse-soft h-1.5 w-1.5 rounded-full bg-brand-blue-dark shadow-[0_0_12px_rgba(10,132,255,0.75)]" />
                {t('badge')}
              </span>
            </FadeIn>

            <FadeIn delay={0.08}>
              <p className="mb-4 max-w-xl text-sm font-medium uppercase tracking-[0.22em] text-white/32">
                {t('eyebrow')}
              </p>
              <h1 className="max-w-4xl text-5xl font-bold tracking-[-0.05em] text-white sm:text-6xl md:text-7xl lg:text-[5.15rem] lg:leading-[0.92]">
                {t('headline')}
              </h1>
            </FadeIn>

            <FadeIn delay={0.16}>
              <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-white/58 md:text-xl">
                {t('subheadline')}
              </p>
            </FadeIn>

            <FadeIn delay={0.24}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href={`/${locale}/download`}
                  className="button-sheen group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-white/94 active:scale-[0.98] md:px-8 md:text-base"
                >
                  <Apple size={18} />
                  {t('ctaPrimary')}
                </Link>

                <Link
                  href={`/${locale}/pricing`}
                  className="button-sheen group inline-flex items-center justify-center gap-3 rounded-full border border-white/[0.1] bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.07] active:scale-[0.98] md:px-8 md:text-base"
                >
                  {t('ctaSecondary')}
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.32}>
              <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 backdrop-blur-xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">{t('priceKicker')}</p>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-3xl font-bold tracking-tight text-white md:text-4xl">{t('priceValue')}</span>
                    <span className="pb-1 text-sm font-medium text-white/38">{t('priceSuffix')}</span>
                  </div>
                  <p className="mt-2 text-sm text-white/42">{t('priceNote')}</p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2 lg:flex-1">
                  {proofPoints.map((point, index) => (
                    <div
                      key={index}
                      className="hover-lift rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white/55 backdrop-blur-xl"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.14} className="floating-soft relative mx-auto w-full max-w-[36rem]">
            <div className="premium-shell hover-lift relative overflow-hidden px-5 pb-5 pt-5 md:px-6 md:pb-6 md:pt-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(10,132,255,0.16),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_35%)]" />

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.06]">
                    <Image src="/logo.png" alt="KplaWY" width={28} height={28} className="object-contain" priority />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">KplaWY</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/35">{t('visualStatus')}</p>
                  </div>
                </div>
                <div className="rounded-full border border-brand-green/20 bg-brand-green/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-green">
                  {t('visualReady')}
                </div>
              </div>

              <div className="relative z-10 mt-6 grid gap-4 md:grid-cols-[1fr_0.84fr]">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-black/45 p-3 md:p-4">
                  <div className="media-frame overflow-hidden rounded-[1.7rem] border border-white/[0.06] bg-black/50">
                    <Image
                      src="/media/app/phone-camera-ready.png"
                      alt={t('appShotAlt')}
                      width={946}
                      height={2048}
                      className="floating-soft-slower h-auto w-full object-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.03]"
                    />
                  </div>

                  <div className="floating-soft-delayed absolute -right-2 bottom-8 w-[32%] max-w-[7.5rem] overflow-hidden rounded-[1.8rem] border border-white/[0.12] bg-black/80 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.45)] md:right-3 md:bottom-10 md:max-w-[8.5rem]">
                    <Image
                      src="/media/wear/wear-ready.png"
                      alt={t('watchShotAlt')}
                      width={430}
                      height={430}
                      className="h-auto w-full object-cover"
                    />
                  </div>

                  <div className="absolute left-3 top-3 rounded-full border border-white/[0.08] bg-black/60 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-xl md:left-5 md:top-5">
                    {t('visualMainBadge')}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="hover-lift overflow-hidden rounded-[1.8rem] border border-white/[0.08] bg-white/[0.03] p-3 backdrop-blur-xl">
                    <div className="mb-3 flex items-center gap-2 text-brand-blue-dark">
                      <PlayCircle size={18} />
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">{t('visualFeature1Label')}</p>
                    </div>
                    <div className="media-frame overflow-hidden rounded-[1.3rem] border border-white/[0.06] bg-black/45">
                      <Image
                        src="/media/app/phone-control.png"
                        alt={t('controlShotAlt')}
                        width={946}
                        height={2048}
                        className="h-[15rem] w-full object-cover object-top transition-transform duration-[1400ms] ease-out hover:scale-[1.04] md:h-[16.5rem]"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/54">{t('visualFeature1Text')}</p>
                  </div>

                  <div className="hover-lift overflow-hidden rounded-[1.8rem] border border-brand-amber/18 bg-brand-amber/8 p-3 backdrop-blur-xl">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-amber">{t('visualPricingLabel')}</p>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-white">{t('visualPricingValue')}</p>
                      </div>
                      <div className="rounded-full border border-brand-amber/18 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-amber">
                        {t('visualPricingBadge')}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-white/58">{t('visualPricingText')}</p>
                  </div>

                  <div className="hover-lift overflow-hidden rounded-[1.8rem] border border-white/[0.08] bg-white/[0.03] p-3 backdrop-blur-xl">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">{t('visualFeature2Label')}</p>
                    <div className="media-frame overflow-hidden rounded-[1.3rem] border border-white/[0.06] bg-black/45">
                      <Image
                        src="/media/app/phone-clips.png"
                        alt={t('clipsShotAlt')}
                        width={946}
                        height={2048}
                        className="h-[13rem] w-full object-cover object-top transition-transform duration-[1400ms] ease-out hover:scale-[1.04] md:h-[14rem]"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/54">{t('visualFeature2Text')}</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
