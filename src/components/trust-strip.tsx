import { getTranslations } from 'next-intl/server';
import { ShieldCheck, Watch, Radio, Cloud, Camera, Smartphone } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './fade-in';

const icons = [Radio, Watch, ShieldCheck, Cloud, Camera, Smartphone];

export async function TrustStrip({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'trust' });

  const items = [
    { title: t('item1Title'), desc: t('item1Desc'), Icon: icons[0] },
    { title: t('item2Title'), desc: t('item2Desc'), Icon: icons[1] },
    { title: t('item3Title'), desc: t('item3Desc'), Icon: icons[2] },
    { title: t('item4Title'), desc: t('item4Desc'), Icon: icons[3] },
    { title: t('item5Title'), desc: t('item5Desc'), Icon: icons[4] },
    { title: t('item6Title'), desc: t('item6Desc'), Icon: icons[5] },
  ];

  return (
    <section className="px-6 pb-6 md:pb-10">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="card-electric relative overflow-hidden rounded-[2rem] px-5 py-6 md:px-8 md:py-7">
            {/* Electric motion streak along the top edge */}
            <div className="streak absolute inset-x-8 top-0 opacity-60" />

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
              <div className="max-w-sm shrink-0">
                <p className="section-kicker mb-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-[0_0_12px_rgba(55,213,255,0.8)]" />
                  {t('badge')}
                </p>
                <p className="text-sm leading-relaxed text-white/70 md:text-base">
                  {t('intro')}
                </p>
              </div>

              <StaggerContainer
                className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3"
                staggerDelay={0.05}
              >
                {items.map((item, index) => (
                  <StaggerItem key={index}>
                    <div className="hover-lift group flex h-full items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 backdrop-blur-xl">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-blue/25 bg-brand-blue/10 text-brand-blue-bright transition-colors duration-300 group-hover:border-brand-blue/45 group-hover:text-brand-cyan">
                        <item.Icon size={18} strokeWidth={2} aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="tabular truncate text-sm font-semibold uppercase tracking-[0.04em] text-white">
                          {item.title}
                        </p>
                        <p className="mt-0.5 truncate text-xs leading-relaxed text-white/65">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
