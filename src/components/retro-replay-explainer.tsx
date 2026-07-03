import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from './fade-in';

/**
 * Explicação do replay retroativo em linguagem de busca — responde
 * "como gravar o lance depois que aconteceu" na home e linka pro guia
 * completo em /guia. Server component, sem estado.
 */
export async function RetroReplayExplainer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'retroExplainer' });

  return (
    <section
      className="relative overflow-hidden px-6 py-24 md:py-28"
      aria-labelledby="retro-explainer-heading"
    >
      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="section-divider mb-20" aria-hidden="true" />

        <FadeIn>
          <h2
            id="retro-explainer-heading"
            className="font-display text-4xl font-bold uppercase tracking-tight text-white md:text-5xl"
          >
            {t('title')}
          </h2>
        </FadeIn>

        <div className="mt-8 space-y-5">
          <FadeIn delay={0.08}>
            <p className="text-base font-light leading-relaxed text-white/80 md:text-lg">
              {t('p1')}
            </p>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="text-base font-light leading-relaxed text-white/80 md:text-lg">
              {t('p2')}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base font-light leading-relaxed text-white/80 md:text-lg">
              {t('p3')}
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.26}>
          <Link
            href={`/${locale}/guia/como-gravar-lance-depois-que-aconteceu`}
            className="group mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full text-sm font-semibold text-brand-blue-bright transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-bright motion-reduce:transition-none"
          >
            {t('link')}
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
