import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { FadeIn, StaggerContainer, StaggerItem } from './fade-in';

export async function ProductEvidence({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'evidence' });

  const cards = [
    {
      image: '/media/app/phone-control.png',
      title: t('card1Title'),
      text: t('card1Text'),
    },
    {
      image: '/media/app/phone-clips.png',
      title: t('card2Title'),
      text: t('card2Text'),
    },
    {
      image: '/media/wear/wear-ready.png',
      title: t('card3Title'),
      text: t('card3Text'),
    },
  ];

  return (
    <section className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
          <div>
            <FadeIn>
              <p className="section-kicker mb-5">{t('badge')}</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="max-w-xl text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.02]">
                {t('title')}
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.16}>
            <p className="max-w-2xl text-base font-light leading-relaxed text-white/52 md:text-lg">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <FadeIn>
            <article className="premium-shell hover-lift overflow-hidden p-4 md:p-5">
              <div className="media-frame relative overflow-hidden rounded-[1.75rem] border border-white/[0.06] bg-black/40">
                <video
                  className="floating-soft-slower aspect-[9/16] h-full w-full object-cover md:aspect-[16/10]"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/media/video/replay-demo-poster.jpg"
                >
                  <source src="/media/video/replay-demo-optimized.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5 md:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">{t('videoLabel')}</p>
                  <p className="mt-2 max-w-lg text-xl font-semibold tracking-tight text-white md:text-2xl">
                    {t('videoTitle')}
                  </p>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/58 md:text-base">
                    {t('videoText')}
                  </p>
                </div>
              </div>
            </article>
          </FadeIn>

          <StaggerContainer className="grid gap-4" staggerDelay={0.08}>
            {cards.map((card, index) => (
              <StaggerItem key={index}>
                <article className="premium-shell hover-lift grid gap-4 overflow-hidden p-4 sm:grid-cols-[132px_1fr] sm:items-center md:p-5">
                  <div className="media-frame relative mx-auto w-full max-w-[9rem] overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-black/40 sm:mx-0">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={360}
                      height={720}
                      className="h-auto w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.04]"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-semibold tracking-tight text-white">{card.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/50 md:text-base">{card.text}</p>
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
