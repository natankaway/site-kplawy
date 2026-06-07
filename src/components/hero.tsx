import { getTranslations } from 'next-intl/server';
import { Apple, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FadeIn } from './fade-in';

export async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'hero' });
  const proofPoints = [t('proof1'), t('proof2'), t('proof3'), t('proof4')];

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-40">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="grid-texture absolute inset-0" />
        <div className="hero-orb left-[6%] top-20 h-72 w-72 md:h-[28rem] md:w-[28rem]" />
        <div className="hero-orb right-[2%] top-[24%] h-80 w-80 opacity-80 md:h-[34rem] md:w-[34rem]" />
        <div className="noise-overlay absolute inset-0" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-20">
          {/* Left — copy */}
          <div>
            <FadeIn>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-blue/25 bg-brand-blue/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-blue-bright">
                <span className="glow-pulse-soft h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-[0_0_12px_rgba(55,213,255,0.8)]" />
                {t('badge')}
              </span>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h1 className="mt-7 max-w-[15ch] text-balance font-display text-[3.4rem] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-white sm:text-7xl md:text-[5.5rem] lg:text-[6rem]">
                {t('headline')}
              </h1>
            </FadeIn>

            <FadeIn delay={0.16}>
              <p className="mt-7 max-w-xl text-lg font-light leading-relaxed text-white/75 md:text-xl">
                {t('subheadline')}
              </p>
            </FadeIn>

            <FadeIn delay={0.24}>
              <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <Link
                  href={`/${locale}/download`}
                  className="btn-electric group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-base font-semibold tracking-wide"
                >
                  <Apple size={20} aria-hidden="true" />
                  {t('ctaPrimary')}
                </Link>
                <Link
                  href={`/${locale}/pricing`}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] active:scale-[0.98]"
                >
                  {t('ctaSecondary')}
                  <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeIn>

            {/* Honest proof — real product facts, no fabricated ratings */}
            <FadeIn delay={0.32}>
              <ul className="mt-10 grid max-w-xl gap-x-6 gap-y-3 sm:grid-cols-2">
                {proofPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[15px] leading-snug text-white/70">
                    <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-cyan" strokeWidth={2.5} />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-xl">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{t('priceKicker')}</span>
                <span className="tabular text-2xl font-bold tracking-tight text-white">{t('priceValue')}</span>
                <span className="text-sm font-medium text-white/60">{t('priceSuffix')}</span>
              </div>
            </FadeIn>
          </div>

          {/* Right — single bold device showcase */}
          <FadeIn delay={0.18} className="relative mx-auto w-full max-w-[26rem] lg:max-w-[30rem]">
            <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-[radial-gradient(circle,rgba(46,123,255,0.28),transparent_62%)] blur-2xl" />
            <div className="floating-soft relative">
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
              {/* Live badge */}
              <div className="absolute left-2 top-5 inline-flex items-center gap-2 rounded-full border border-brand-green/25 bg-black/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-green backdrop-blur-xl lg:-left-4">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green shadow-[0_0_10px_#34D27B]" />
                {t('visualReady')}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
