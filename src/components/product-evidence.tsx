import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { FadeIn, StaggerContainer, StaggerItem } from './fade-in';
import { ReplayVideo } from './replay-video';

export async function ProductEvidence({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'evidence' });
  const h = await getTranslations({ locale, namespace: 'hero' });

  const cards = [
    {
      image: '/media/app/phone-control-web.png',
      title: t('card1Title'),
      text: t('card1Text'),
      alt: h('controlShotAlt'),
      width: 647,
      height: 1400,
    },
    {
      image: '/media/app/phone-clips-web.png',
      title: t('card2Title'),
      text: t('card2Text'),
      alt: h('clipsShotAlt'),
      width: 647,
      height: 1400,
    },
    {
      image: '/media/wear/wear-ready.png',
      title: t('card3Title'),
      text: t('card3Text'),
      alt: h('watchShotAlt'),
      width: 432,
      height: 432,
    },
  ];

  const isPtLocale = locale === 'pt';
  const playLabel = isPtLocale ? 'Reproduzir vídeo de demonstração' : 'Play demo video';
  const pauseLabel = isPtLocale ? 'Pausar vídeo de demonstração' : 'Pause demo video';

  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-28">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
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
              <h2 className="max-w-xl font-display text-5xl font-bold uppercase leading-[0.92] tracking-[-0.02em] text-white md:text-6xl lg:text-[4rem]">
                {t('title')}
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.16}>
            <p className="max-w-2xl text-base font-light leading-relaxed text-white/70 md:text-lg">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>

        {/* Hero proof: real replay clip */}
        <FadeIn>
          <article className="card-electric group relative mb-6 overflow-hidden rounded-[2rem] p-4 md:p-5">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/40 shadow-[inset_0_0_0_1px_rgba(46,123,255,0.12)]">
              <ReplayVideo
                src="/media/video/replay-demo-optimized.mp4"
                poster="/media/video/replay-demo-poster.jpg"
                className="aspect-[9/16] h-full w-full object-cover md:aspect-[16/9]"
                toggleLabelPlay={playLabel}
                toggleLabelPause={pauseLabel}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent p-6 md:p-9">
                <p className="section-kicker mb-3">{t('videoLabel')}</p>
                <p className="max-w-lg font-display text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                  {t('videoTitle')}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
                  {t('videoText')}
                </p>
              </div>
            </div>
          </article>
        </FadeIn>

        {/* Real screenshots — large, legible, in electric device frames */}
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {cards.map((card, index) => (
            <StaggerItem key={index}>
              <article className="card-electric group flex h-full flex-col overflow-hidden rounded-[2rem] p-6 md:p-7">
                {/* Device frame */}
                <div className="relative mx-auto w-full max-w-[20rem]">
                  <div className="absolute inset-0 -z-10 scale-105 rounded-full bg-[radial-gradient(circle,rgba(46,123,255,0.3),transparent_62%)] blur-2xl opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-black shadow-[0_40px_100px_rgba(0,0,0,0.6),0_0_0_1px_rgba(46,123,255,0.18)] transition-transform duration-500 group-hover:-translate-y-1">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      width={card.width}
                      height={card.height}
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>

                <div className="mt-7">
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white md:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">{card.text}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
