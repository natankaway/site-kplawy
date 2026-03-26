import { getTranslations } from 'next-intl/server';
import { FadeIn, StaggerContainer, StaggerItem } from './fade-in';

export async function HowItWorks({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'howItWorks' });

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
    <section id="how-it-works" className="relative px-6 py-28 md:py-32">
      <div className="section-divider mx-auto mb-24 max-w-7xl" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div>
            <FadeIn>
              <p className="section-kicker mb-5">{t('badge')}</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="max-w-2xl text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl lg:text-[3.35rem] lg:leading-[1.02]">
                {t('title')}
              </h2>
            </FadeIn>
          </div>

          <FadeIn delay={0.16}>
            <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl">
              <p className="text-base font-light leading-relaxed text-white/52 md:text-lg">
                {t('subtitle')}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/40">{t('note')}</p>
            </div>
          </FadeIn>
        </div>

        <StaggerContainer className="grid gap-5 lg:grid-cols-3" staggerDelay={0.08}>
          {steps.map((step, index) => (
            <StaggerItem key={index}>
              <article className="premium-shell relative h-full overflow-hidden p-6 md:p-7">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue-dark/60 to-transparent" />

                <div className="flex h-full flex-col gap-10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
                        {step.overline}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-[1.75rem]">
                        {step.title}
                      </h3>
                    </div>
                    <span className="text-6xl font-bold tracking-[-0.06em] text-white/[0.08]">{step.number}</span>
                  </div>

                  <p className="max-w-sm text-sm font-light leading-relaxed text-white/50 md:text-base">
                    {step.desc}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
