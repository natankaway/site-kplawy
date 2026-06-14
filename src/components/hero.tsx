import { getTranslations, getFormatter } from 'next-intl/server';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { FadeIn } from './fade-in';
import { DownloadButton, SecondaryLink, TrustBadges } from './section-cta';
import { HeroBufferRing } from './hero-buffer-ring';
import { PhoneParallax } from './phone-parallax';
import { PRICING } from '@/lib/pricing';

export async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'hero' });
  const format = await getFormatter({ locale });
  const proofPoints = [t('proof1'), t('proof2'), t('proof3'), t('proof4')];
  const monthly = format.number(PRICING.premiumMonthly, {
    style: 'currency',
    currency: PRICING.currency,
  });

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-28 md:pb-28 md:pt-40">
      {/* Atmosphere — decorative only */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="grid-texture absolute inset-0" />
        <div className="hero-orb left-[6%] top-20 h-72 w-72 md:h-[28rem] md:w-[28rem]" />
        <div className="hero-orb right-[2%] top-[24%] h-80 w-80 opacity-80 md:h-[34rem] md:w-[34rem]" />
        <div className="noise-overlay absolute inset-0" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0A0F1A] via-[#0A0F1A]/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-20">
          {/* Left — copy */}
          <div>
            <FadeIn>
              <span className="section-kicker rounded-full border border-brand-blue/25 bg-brand-blue/10 px-4 py-2">
                <span
                  className="glow-pulse-soft h-1.5 w-1.5 rounded-full bg-brand-blue-bright shadow-[0_0_12px_rgba(77,151,255,0.8)]"
                  aria-hidden="true"
                />
                {t('badge')}
              </span>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h1 className="mt-6 max-w-[15ch] text-balance font-display text-[2.85rem] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-white sm:text-7xl md:text-[5.5rem] lg:text-[6rem]">
                {t('headlineLine1')}{' '}
                <span className="title-accent">{t('headlineLine2')}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.16}>
              <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-white/85 sm:text-lg md:mt-7 md:text-xl">
                {t('subheadline')}
              </p>
            </FadeIn>

            <FadeIn delay={0.24}>
              <div className="mt-7 flex flex-col gap-3.5 sm:flex-row sm:items-center md:mt-9">
                <DownloadButton
                  href={`/${locale}/download`}
                  label={t('ctaPrimary')}
                />
                <SecondaryLink
                  href={`/${locale}/pricing`}
                  label={t('ctaSecondary')}
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <TrustBadges
                locale={locale}
                className="mt-6 justify-start"
              />
            </FadeIn>

            {/* Honest proof — real product facts, no fabricated ratings */}
            <FadeIn delay={0.36}>
              <ul className="mt-7 grid max-w-xl gap-x-6 gap-y-3 sm:grid-cols-2">
                {proofPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-[15px] leading-snug text-white/80"
                  >
                    <Check
                      size={18}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-brand-blue-bright"
                      strokeWidth={2.5}
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-xl">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  {t('priceKicker')}
                </span>
                <span className="tabular text-2xl font-bold tracking-tight text-white">
                  {monthly}
                </span>
                <span className="text-sm font-medium text-white/70">
                  {t('priceSuffix')}
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Right — device showcase with 3D buffer ring */}
          <FadeIn
            delay={0.18}
            className="relative mx-auto w-full max-w-[26rem] lg:max-w-[30rem]"
          >
            <div
              className="absolute inset-0 -z-10 scale-110 rounded-full bg-[radial-gradient(circle,rgba(46,123,255,0.16),transparent_64%)] blur-2xl"
              aria-hidden="true"
            />
            {/* Buffer ring — the rolling buffer, visualized. Static SVG always,
                upgraded to WebGL when motion is allowed; never the LCP. */}
            <HeroBufferRing />
            <PhoneParallax className="floating-soft relative">
              {/* Phone */}
              <div className="relative mx-auto w-[78%] overflow-hidden rounded-[2.6rem] border border-white/15 bg-black shadow-[0_50px_120px_rgba(0,0,0,0.6),0_0_0_1px_rgba(46,123,255,0.2)]">
                <Image
                  src="/media/app/phone-camera-ready-web.png"
                  alt={t('appShotAlt')}
                  width={647}
                  height={1400}
                  sizes="(max-width:768px) 78vw, 30vw"
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
              {/* Ready badge */}
              <div className="absolute left-2 top-5 inline-flex items-center gap-2 rounded-full border border-brand-green/25 bg-black/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-green backdrop-blur-xl lg:-left-4">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-brand-green shadow-[0_0_10px_#34D27B]"
                  aria-hidden="true"
                />
                {t('visualReady')}
              </div>
            </PhoneParallax>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
