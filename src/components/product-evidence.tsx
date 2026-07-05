import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { FadeIn, StaggerContainer, StaggerItem } from './fade-in';
import { ReplayVideo } from './replay-video';
import { ConversionBlock } from './section-cta';

export async function ProductEvidence({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'evidence' });
  const h = await getTranslations({ locale, namespace: 'hero' });
  const cta = await getTranslations({ locale, namespace: 'cta' });

  const shotLocale = locale === 'en' ? 'en' : 'pt';
  const cards = [
    {
      image: `/media/store/${shotLocale}/remote-control.png`,
      title: t('card1Title'),
      text: t('card1Text'),
      alt: h('controlShotAlt'),
    },
    {
      image: `/media/store/${shotLocale}/sports-gym.png`,
      title: t('card2Title'),
      text: t('card2Text'),
      alt: h('clipsShotAlt'),
    },
    {
      image: `/media/store/${shotLocale}/watches.png`,
      title: t('card3Title'),
      text: t('card3Text'),
      alt: h('watchShotAlt'),
    },
  ];

  const isPtLocale = locale === 'pt';
  const playLabel = isPtLocale ? 'Reproduzir vídeo de demonstração' : 'Play demo video';
  const pauseLabel = isPtLocale ? 'Pausar vídeo de demonstração' : 'Pause demo video';

  return (
    <section
      className="relative overflow-hidden px-6 py-24 md:py-28"
      aria-labelledby="evidence-heading"
    >
      {/* Atmosphere — decorative only */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="grid-texture absolute inset-0" />
        <div className="hero-orb right-[6%] top-1/4 h-80 w-80 opacity-60 md:h-[30rem] md:w-[30rem]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
          <div>
            <FadeIn>
              <p className="section-kicker mb-5">{t('badge')}</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2
                id="evidence-heading"
                className="max-w-xl font-display text-5xl font-bold uppercase leading-[0.92] tracking-[-0.02em] text-white md:text-6xl lg:text-[4rem]"
              >
                {t('titleLine1')}{' '}
                <span className="title-accent">{t('titleLine2')}</span>
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.16}>
            <p className="max-w-2xl text-base font-light leading-relaxed text-white/80 md:text-lg">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>

        {/* Hero proof: real replay clip */}
        <FadeIn>
          <article className="card-electric group relative mb-6 overflow-hidden rounded-[2rem] p-4 md:p-5">
            <div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/40 shadow-[inset_0_0_0_1px_rgba(46,123,255,0.12)]">
              <ReplayVideo
                src="/media/video/replay-demo-optimized.mp4"
                poster="/media/video/replay-demo-poster.jpg"
                className="aspect-[9/16] h-full w-full object-cover md:aspect-[16/9]"
                label={t('videoTitle')}
                toggleLabelPlay={playLabel}
                toggleLabelPause={pauseLabel}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent p-6 md:p-9">
                <p className="section-kicker mb-3">{t('videoLabel')}</p>
                <p className="max-w-lg font-display text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                  {t('videoTitle')}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                  {t('videoText')}
                </p>
              </div>
            </div>
          </article>
        </FadeIn>

        {/* App story panels — self-contained brand art. Desktop: 3-up grid.
            Mobile: horizontal swipe so 3 tall phone shots don't bury the scroll. */}
        <StaggerContainer
          as="ul"
          className="-mx-6 flex snap-x snap-mandatory list-none gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
          staggerDelay={0.1}
        >
          {cards.map((card) => (
            <StaggerItem as="li" key={card.title} className="w-[78%] shrink-0 snap-center sm:w-auto sm:shrink">
              <figure className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 transition-transform duration-500 hover:-translate-y-1 motion-reduce:transition-none">
                <div
                  className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_25%,rgba(46,123,255,0.28),transparent_62%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={1284}
                  height={2778}
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  className="h-auto w-full"
                />
                <figcaption className="sr-only">
                  {card.title}. {card.text}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerContainer>

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
