import { getTranslations } from 'next-intl/server';
import {
  ShieldCheck,
  Watch,
  Timer,
  Cloud,
  Camera,
  Hammer,
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './fade-in';

// Semantic accent discipline: green = remote (watch/Bluetooth), gold = Pro
// (multi-camera). Everything else stays blue.
const CHIP: Record<string, string> = {
  blue: 'border-brand-blue/25 bg-brand-blue/10 text-brand-blue-bright group-hover:border-brand-blue/45',
  green: 'border-brand-green/25 bg-brand-green/10 text-brand-green group-hover:border-brand-green/45',
  gold: 'border-brand-gold/25 bg-brand-gold/10 text-brand-gold group-hover:border-brand-gold/45',
};

export async function TrustStrip({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'trust' });

  const items = [
    { title: t('item1Title'), desc: t('item1Desc'), Icon: Timer, accent: 'blue' },
    { title: t('item2Title'), desc: t('item2Desc'), Icon: Watch, accent: 'green' },
    { title: t('item3Title'), desc: t('item3Desc'), Icon: ShieldCheck, accent: 'blue' },
    { title: t('item4Title'), desc: t('item4Desc'), Icon: Cloud, accent: 'blue' },
    { title: t('item5Title'), desc: t('item5Desc'), Icon: Camera, accent: 'gold' },
    { title: t('item6Title'), desc: t('item6Desc'), Icon: Hammer, accent: 'blue' },
  ];

  return (
    <section
      className="px-6 pb-6 md:pb-10"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="card-electric relative overflow-hidden rounded-[2rem] px-5 py-6 md:px-8 md:py-7">
            {/* Electric motion streak along the top edge */}
            <div className="streak absolute inset-x-8 top-0 opacity-60" aria-hidden="true" />

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
              <div className="max-w-sm shrink-0">
                <p className="section-kicker mb-3">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-brand-blue-bright shadow-[0_0_12px_rgba(77,151,255,0.8)]"
                    aria-hidden="true"
                  />
                  {t('badge')}
                </p>
                <h2
                  id="trust-heading"
                  className="font-display text-2xl font-bold uppercase leading-[1.05] tracking-tight text-white md:text-3xl"
                >
                  {t('titleLine1')}{' '}
                  <span className="title-accent">{t('titleLine2')}</span>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">
                  {t('intro')}
                </p>
              </div>

              <StaggerContainer
                as="ul"
                className="grid flex-1 list-none grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
                staggerDelay={0.05}
              >
                {items.map((item) => (
                  <StaggerItem as="li" key={item.title}>
                    <div className="hover-lift group flex h-full items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 backdrop-blur-xl">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${CHIP[item.accent]}`}
                      >
                        <item.Icon size={18} strokeWidth={2} aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold uppercase tracking-[0.04em] text-white">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[13px] leading-relaxed text-white/75">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
