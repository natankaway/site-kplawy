import { getTranslations } from 'next-intl/server';
import { ArrowUpRight, Cloud, Eye, Radio, ShieldCheck } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './fade-in';

export async function FeaturesGrid({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'features' });

  const cards = [
    {
      kicker: t('card1Kicker'),
      title: t('card1Title'),
      desc: t('card1Desc'),
      points: [t('card1Point1'), t('card1Point2'), t('card1Point3')],
      accent: <Radio size={18} strokeWidth={1.8} />,
      className: 'lg:col-span-7',
    },
    {
      kicker: t('card2Kicker'),
      title: t('card2Title'),
      desc: t('card2Desc'),
      points: [t('card2Point1'), t('card2Point2')],
      accent: <Eye size={18} strokeWidth={1.8} />,
      className: 'lg:col-span-5',
    },
    {
      kicker: t('card3Kicker'),
      title: t('card3Title'),
      desc: t('card3Desc'),
      points: [t('card3Point1'), t('card3Point2'), t('card3Point3')],
      accent: <ArrowUpRight size={18} strokeWidth={1.8} />,
      className: 'lg:col-span-5',
    },
    {
      kicker: t('card4Kicker'),
      title: t('card4Title'),
      desc: t('card4Desc'),
      points: [t('card4Point1'), t('card4Point2'), t('card4Point3')],
      accent: <ShieldCheck size={18} strokeWidth={1.8} />,
      className: 'lg:col-span-7',
    },
  ];

  return (
    <section id="features" className="relative px-6 py-28 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-12">
          <div className="lg:sticky lg:top-28">
            <FadeIn>
              <p className="section-kicker mb-5">{t('badge')}</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="max-w-xl text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl lg:text-[3.5rem] lg:leading-[1.02]">
                {t('title')}
              </h2>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-white/52 md:text-lg">
                {t('subtitle')}
              </p>
            </FadeIn>

            <FadeIn delay={0.22}>
              <div className="mt-8 rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue-dark/10 text-brand-blue-dark">
                    <Cloud size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t('asideTitle')}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/44">{t('asideText')}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <StaggerContainer className="grid gap-5 lg:grid-cols-12" staggerDelay={0.08}>
            {cards.map((card, index) => (
              <StaggerItem key={index} className={card.className}>
                <article className="premium-shell h-full p-6 md:p-7">
                  <div className="flex h-full flex-col justify-between gap-8">
                    <div>
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue-dark/10 text-brand-blue-dark">
                        {card.accent}
                      </div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/32">
                        {card.kicker}
                      </p>
                      <h3 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-white md:text-[2rem] md:leading-tight">
                        {card.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-white/48 md:text-base">
                        {card.desc}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {card.points.map((point, pointIndex) => (
                        <div
                          key={pointIndex}
                          className="rounded-2xl border border-white/[0.06] bg-black/30 px-4 py-4 text-sm leading-relaxed text-white/62"
                        >
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
