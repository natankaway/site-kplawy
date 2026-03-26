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
          <div className="premium-shell px-5 py-5 md:px-7 md:py-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
              <div className="max-w-sm">
                <p className="section-kicker mb-2">{t('badge')}</p>
                <p className="text-sm font-light leading-relaxed text-white/55 md:text-base">
                  {t('intro')}
                </p>
              </div>

              <StaggerContainer className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:justify-end md:gap-3" staggerDelay={0.05}>
                {items.map((item, index) => (
                  <StaggerItem key={index}>
                    <div className="hover-lift min-w-[152px] rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4 backdrop-blur-xl">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue-dark/10 text-brand-blue-dark">
                        <item.Icon size={18} strokeWidth={1.7} />
                      </div>
                      <p className="text-sm font-semibold tracking-tight text-white">{item.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-white/38">{item.desc}</p>
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
