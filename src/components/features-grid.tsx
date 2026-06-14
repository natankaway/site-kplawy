import { getTranslations } from 'next-intl/server';
import { ArrowUpRight, Check, Cloud, Eye, Radio, ShieldCheck } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './fade-in';
import { ConversionBlock } from './section-cta';

const CHIP: Record<string, string> = {
  blue: 'border-brand-blue/25 bg-brand-blue/10 text-brand-blue-bright group-hover:border-brand-blue/45',
  green: 'border-brand-green/25 bg-brand-green/10 text-brand-green group-hover:border-brand-green/45',
  gold: 'border-brand-gold/25 bg-brand-gold/10 text-brand-gold group-hover:border-brand-gold/45',
};
const CHECK: Record<string, string> = {
  blue: 'text-brand-blue-bright',
  green: 'text-brand-green',
  gold: 'text-brand-gold',
};

export async function FeaturesGrid({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'features' });
  const cta = await getTranslations({ locale, namespace: 'cta' });

  const cards = [
    {
      kicker: t('card1Kicker'),
      title: t('card1Title'),
      desc: t('card1Desc'),
      points: [t('card1Point1'), t('card1Point2'), t('card1Point3')],
      accent: 'blue',
      Icon: Eye,
      index: '01',
      className: 'lg:col-span-7',
    },
    {
      kicker: t('card2Kicker'),
      title: t('card2Title'),
      desc: t('card2Desc'),
      points: [t('card2Point1'), t('card2Point2')],
      accent: 'blue',
      Icon: ShieldCheck,
      index: '02',
      className: 'lg:col-span-5',
    },
    {
      kicker: t('card3Kicker'),
      title: t('card3Title'),
      desc: t('card3Desc'),
      points: [t('card3Point1'), t('card3Point2'), t('card3Point3')],
      accent: 'green', // controle remoto
      Icon: Radio,
      index: '03',
      className: 'lg:col-span-5',
    },
    {
      kicker: t('card4Kicker'),
      title: t('card4Title'),
      desc: t('card4Desc'),
      points: [t('card4Point1'), t('card4Point2'), t('card4Point3')],
      accent: 'gold', // Pro / multi-camera
      Icon: ArrowUpRight,
      index: '04',
      className: 'lg:col-span-7',
    },
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden px-6 py-28 md:py-32"
      aria-labelledby="features-heading"
    >
      {/* Atmosphere — decorative only */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="grid-texture absolute inset-0" />
        <div className="hero-orb left-[-4%] top-[12%] h-80 w-80 opacity-70 md:h-[30rem] md:w-[30rem]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-12">
          <div className="lg:sticky lg:top-28">
            <FadeIn>
              <p className="section-kicker mb-5">
                <span
                  className="glow-pulse-soft h-1.5 w-1.5 rounded-full bg-brand-blue-bright shadow-[0_0_12px_rgba(77,151,255,0.8)]"
                  aria-hidden="true"
                />
                {t('badge')}
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2
                id="features-heading"
                className="max-w-xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white md:text-5xl lg:text-[3.6rem]"
              >
                {t('titleLine1')}{' '}
                <span className="title-accent">{t('titleLine2')}</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                {t('subtitle')}
              </p>
            </FadeIn>

            <FadeIn delay={0.22}>
              <div className="card-electric mt-8 rounded-[2rem] p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-blue/25 bg-brand-blue/10 text-brand-blue-bright">
                    <Cloud size={20} strokeWidth={2} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
                      {t('asideTitle')}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">
                      {t('asideText')}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <StaggerContainer
            as="ul"
            className="grid list-none gap-5 lg:grid-cols-12"
            staggerDelay={0.08}
          >
            {cards.map((card) => (
              <StaggerItem as="li" key={card.index} className={card.className}>
                <article className="card-electric group relative h-full overflow-hidden rounded-[1.75rem] p-6 md:p-8">
                  {/* Oversized scoreboard index — atmospheric */}
                  <span
                    className="tabular pointer-events-none absolute -right-3 -top-5 select-none font-display text-8xl font-bold leading-none text-white/[0.04] transition-colors duration-300 group-hover:text-brand-blue/10 md:text-9xl"
                    aria-hidden="true"
                  >
                    {card.index}
                  </span>

                  <div className="relative flex h-full flex-col justify-between gap-8">
                    <div>
                      <div
                        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-[0_0_24px_rgba(46,123,255,0.18)] transition-colors duration-300 ${CHIP[card.accent]}`}
                      >
                        <card.Icon size={22} strokeWidth={2} aria-hidden="true" />
                      </div>
                      <p
                        className={`section-kicker text-[11px] tracking-[0.2em] ${
                          card.accent === 'green'
                            ? 'section-kicker--green'
                            : card.accent === 'gold'
                              ? 'section-kicker--gold'
                              : ''
                        }`}
                      >
                        {card.kicker}
                      </p>
                      <h3 className="mt-3 max-w-xl font-display text-2xl font-bold uppercase leading-[1.02] tracking-[-0.01em] text-white md:text-[2rem]">
                        {card.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
                        {card.desc}
                      </p>
                    </div>

                    <ul className="grid gap-2.5">
                      {card.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 rounded-2xl border border-white/[0.07] bg-black/40 px-4 py-3 text-sm leading-snug text-white/80"
                        >
                          <Check
                            size={16}
                            strokeWidth={2.5}
                            aria-hidden="true"
                            className={`mt-0.5 shrink-0 ${CHECK[card.accent]}`}
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <FadeIn delay={0.1}>
          <ConversionBlock
            locale={locale}
            primaryLabel={cta('ctaApple')}
            className="mt-16"
          />
        </FadeIn>
      </div>
    </section>
  );
}
