import { getTranslations } from 'next-intl/server';
import { FadeIn, StaggerContainer, StaggerItem } from './fade-in';

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  /** Semantic accent: green = remote, gold = Pro/multicam, else blue. */
  accent?: 'blue' | 'green' | 'gold';
};

const ACCENT: Record<string, string> = {
  blue: 'text-brand-blue-bright',
  green: 'text-brand-green',
  gold: 'text-brand-gold',
};

/**
 * Social-proof strip. HONESTY CONSTRAINT: ships empty (returns null) until real,
 * attributable quotes exist — never invents reviews or ratings. To populate,
 * fill the `testimonials.items` array in the message catalogs with real quotes.
 */
export async function Testimonials({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'testimonials' });
  const items = (t.raw('items') as Testimonial[] | undefined) ?? [];

  // No real proof yet → render nothing rather than fake cards.
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden px-6 py-24 md:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <FadeIn>
            <p className="section-kicker mb-5 justify-center">{t('badge')}</p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2
              id="testimonials-heading"
              className="mx-auto max-w-3xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white md:text-5xl"
            >
              {t('titleLine1')}{' '}
              <span className="title-accent">{t('titleLine2')}</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-relaxed text-white/80">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>

        <StaggerContainer
          as="ul"
          className="grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {items.map((item, i) => (
            <StaggerItem as="li" key={`${item.name}-${i}`}>
              <figure className="card-electric flex h-full flex-col gap-5 rounded-[1.75rem] p-6 md:p-7">
                <blockquote className="text-base leading-relaxed text-white/90">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-auto">
                  <span
                    className={`block font-display text-sm font-bold uppercase tracking-tight ${
                      ACCENT[item.accent ?? 'blue']
                    }`}
                  >
                    {item.name}
                  </span>
                  {item.role ? (
                    <span className="text-xs text-white/70">{item.role}</span>
                  ) : null}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
