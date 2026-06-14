import { getTranslations } from 'next-intl/server';
import { FadeIn, StaggerContainer, StaggerItem } from './fade-in';
import { ConversionBlock } from './section-cta';

export async function HowItWorks({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'howItWorks' });
  const cta = await getTranslations({ locale, namespace: 'cta' });

  const steps = [
    {
      number: t('step1Number'),
      overline: t('step1Overline'),
      title: t('step1Title'),
      desc: t('step1Desc'),
    },
    {
      number: t('step2Number'),
      overline: t('step2Overline'),
      title: t('step2Title'),
      desc: t('step2Desc'),
    },
    {
      number: t('step3Number'),
      overline: t('step3Overline'),
      title: t('step3Title'),
      desc: t('step3Desc'),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden px-6 py-28 md:py-32"
      aria-labelledby="how-heading"
    >
      {/* Atmosphere — decorative only */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="grid-texture absolute inset-0" />
        <div className="hero-orb left-[10%] top-1/3 h-72 w-72 opacity-60 md:h-[26rem] md:w-[26rem]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="section-divider mb-24" aria-hidden="true" />

        <div className="mb-16 grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div>
            <FadeIn>
              <p className="section-kicker mb-5">{t('badge')}</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2
                id="how-heading"
                className="max-w-2xl font-display text-5xl font-bold uppercase leading-[0.92] tracking-[-0.02em] text-white md:text-6xl lg:text-[4rem]"
              >
                {t('titleLine1')}{' '}
                <span className="title-accent">{t('titleLine2')}</span>
              </h2>
            </FadeIn>
          </div>

          <FadeIn delay={0.16}>
            <div className="card-electric rounded-[2rem] p-6 backdrop-blur-xl">
              <p className="text-base font-light leading-relaxed text-white/80 md:text-lg">
                {t('subtitle')}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/75">{t('note')}</p>
            </div>
          </FadeIn>
        </div>

        <StaggerContainer
          as="ol"
          className="grid list-none gap-5 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {steps.map((step) => (
            <StaggerItem as="li" key={step.number}>
              <article className="card-electric group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-7 md:p-8">
                {/* Electric top edge */}
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />

                {/* Big scoreboard number + streak connector */}
                <div className="flex items-center gap-4">
                  <span
                    className="tabular font-display text-[4.5rem] font-bold leading-[0.8] tracking-[-0.04em] text-electric sm:text-[5.5rem] md:text-[6.5rem]"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <span className="streak mt-2 h-[2px] flex-1 opacity-70" aria-hidden="true" />
                </div>

                <div className="mt-8 flex flex-1 flex-col">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue-bright">
                    {step.overline}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight text-white md:text-[1.85rem]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-white/80 md:text-base">
                    {step.desc}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.1}>
          <ConversionBlock
            locale={locale}
            primaryLabel={cta('ctaApple')}
            secondaryHref={`/${locale}/pricing`}
            secondaryLabel={cta('ctaGoogle')}
            className="mt-16"
          />
        </FadeIn>
      </div>
    </section>
  );
}
