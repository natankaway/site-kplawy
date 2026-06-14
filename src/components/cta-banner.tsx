import { getTranslations } from 'next-intl/server';
import { Check } from 'lucide-react';
import { FadeIn } from './fade-in';
import { DownloadButton, SecondaryLink } from './section-cta';

export async function CtaBanner({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'cta' });
  const trust = [t('trust1'), t('trust2'), t('trust3')];

  return (
    <section
      className="relative overflow-hidden px-6 py-24 md:py-32"
      aria-labelledby="cta-heading"
    >
      <div className="section-divider mx-auto mb-20 max-w-7xl" aria-hidden="true" />
      <div
        className="hero-orb left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 opacity-80"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn>
          <div className="card-electric hover-lift relative overflow-hidden rounded-3xl border-brand-blue/30 px-6 py-16 text-center shadow-[0_0_0_1px_rgba(46,123,255,0.18),0_40px_120px_rgba(46,123,255,0.14)] md:px-10 md:py-24">
            <div className="grid-texture absolute inset-0" aria-hidden="true" />
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(46,123,255,0.22),transparent_50%),radial-gradient(circle_at_bottom,rgba(77,151,255,0.12),transparent_55%)]"
              aria-hidden="true"
            />
            <div className="streak absolute inset-x-0 top-0" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-4xl">
              <p className="section-kicker mb-6 justify-center">{t('badge')}</p>
              <h2
                id="cta-heading"
                className="mx-auto max-w-4xl font-display text-5xl font-bold uppercase tracking-[-0.02em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[0.9]"
              >
                {t('titleLine1')}{' '}
                <span className="title-accent">{t('titleLine2')}</span>
              </h2>
              <p className="mx-auto mt-7 max-w-2xl text-lg font-light leading-relaxed text-white/80 md:text-xl">
                {t('subtitle')}
              </p>

              <div className="mx-auto mt-10 flex w-full max-w-md flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row">
                <DownloadButton
                  href={`/${locale}/download`}
                  label={t('ctaApple')}
                  className="button-sheen md:text-lg"
                />
                <SecondaryLink
                  href={`/${locale}/pricing`}
                  label={t('ctaGoogle')}
                  className="border-transparent bg-transparent text-white/80 hover:bg-white/[0.06] hover:text-white"
                />
              </div>

              <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {trust.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-xl"
                  >
                    <Check
                      size={14}
                      aria-hidden="true"
                      className="text-brand-green"
                      strokeWidth={2.5}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
