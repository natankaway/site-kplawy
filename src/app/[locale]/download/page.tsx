import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Apple, ArrowRight, Smartphone, Monitor } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'downloadPage' });
  return { title: t('title') };
}

export default function DownloadPage() {
  const t = useTranslations('downloadPage');

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero area */}
        <div className="relative text-center mb-20 overflow-hidden">
          <div className="ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse" />

          <div className="relative z-10">
            <FadeIn>
              <div className="flex justify-center mb-8">
                <Image src="/logo.png" alt="KplaWY" width={80} height={80} className="drop-shadow-2xl" />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-5">
                {t('headline')}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg text-white/40 max-w-xl mx-auto font-light mb-12">
                {t('subtitle')}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="#"
                  className="group flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-full text-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-[1.02]"
                >
                  <Apple size={24} />
                  {t('ctaApple')}
                </a>
                <a
                  href="#"
                  className="group flex items-center justify-center gap-3 bg-surface-1 text-white border border-white/[0.08] px-10 py-5 rounded-full text-lg font-semibold hover:bg-surface-2 transition-all duration-300 hover:scale-[1.02]"
                >
                  {t('ctaGoogle')}
                  <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-sm text-white/30 font-light">
                {t('free')} &middot; {t('proAvailable')}
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Requirements */}
        <FadeIn>
          <div className="bg-surface-1/40 rounded-2xl border border-white/[0.06] p-8">
            <h2 className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-6">
              {t('requirementsTitle')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-surface-2 rounded-xl flex items-center justify-center shrink-0">
                  <Apple size={20} className="text-white/50" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">iOS</h3>
                  <p className="text-sm text-white/40 font-light">{t('ios')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-surface-2 rounded-xl flex items-center justify-center shrink-0">
                  <Smartphone size={20} className="text-white/50" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Android</h3>
                  <p className="text-sm text-white/40 font-light">{t('android')}</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
