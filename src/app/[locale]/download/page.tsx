import { getTranslations, getFormatter, setRequestLocale } from 'next-intl/server';
import { Apple, ArrowRight, Smartphone } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import Image from 'next/image';
import { buildPageMetadata } from '@/lib/seo';
import { PRICING } from '@/lib/pricing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'downloadPage' });
  return buildPageMetadata({ locale, path: '/download', title: t('title'), description: t('subtitle') });
}

export default async function DownloadPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'downloadPage' });
  const format = await getFormatter({ locale });
  const proAvailable = t('proAvailable', {
    price: format.number(PRICING.premiumMonthly, {
      style: 'currency',
      currency: PRICING.currency,
    }),
  });
  const comingSoon = locale === 'pt' ? 'Em breve' : 'Coming soon';

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero area */}
        <div className="relative text-center mb-20 overflow-hidden">
          <div className="ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse" />

          <div className="relative z-10">
            <FadeIn>
              <div className="flex justify-center mb-8">
                <Image src="/logo-icon.png" alt="KplaWY" width={80} height={80} className="drop-shadow-2xl" />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-5">
                {t('headline')}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg text-white/65 max-w-xl mx-auto font-light mb-12">
                {t('subtitle')}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="relative flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-full text-lg font-semibold opacity-50 cursor-not-allowed"
                >
                  <Apple size={24} aria-hidden="true" />
                  {t('ctaApple')}
                  <span className="absolute -top-2 -right-2 rounded-full border border-white/15 bg-surface-2 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70">
                    {comingSoon}
                  </span>
                </button>
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="relative flex items-center justify-center gap-3 bg-surface-1 text-white border border-white/[0.08] px-10 py-5 rounded-full text-lg font-semibold opacity-50 cursor-not-allowed"
                >
                  {t('ctaGoogle')}
                  <ArrowRight size={20} aria-hidden="true" />
                  <span className="absolute -top-2 -right-2 rounded-full border border-white/15 bg-surface-2 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70">
                    {comingSoon}
                  </span>
                </button>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-sm text-white/80 font-light">
                {t('free')} &middot; {proAvailable}
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Requirements */}
        <FadeIn>
          <div className="bg-surface-1/40 rounded-2xl border border-white/[0.06] p-8">
            <h2 className="text-xs font-semibold text-white/65 uppercase tracking-[0.2em] mb-6">
              {t('requirementsTitle')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-surface-2 rounded-xl flex items-center justify-center shrink-0">
                  <Apple size={20} aria-hidden="true" className="text-white/50" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">iOS</h3>
                  <p className="text-sm text-white/65 font-light">{t('ios')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-surface-2 rounded-xl flex items-center justify-center shrink-0">
                  <Smartphone size={20} aria-hidden="true" className="text-white/50" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Android</h3>
                  <p className="text-sm text-white/65 font-light">{t('android')}</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
