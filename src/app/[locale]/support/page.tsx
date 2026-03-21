import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Camera, Watch, FolderOpen, Cloud, Mail, ArrowRight } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/fade-in';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'supportPage' });
  return { title: t('title') };
}

function IssueCard({
  icon: Icon,
  title,
  solution,
}: {
  icon: React.ElementType;
  title: string;
  solution: string;
}) {
  return (
    <StaggerItem>
      <div className="p-6 rounded-2xl bg-surface-1/30 border border-white/[0.04]">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-surface-2 rounded-xl flex items-center justify-center shrink-0">
            <Icon size={18} className="text-white/50" />
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight mb-2">{title}</h3>
            <p className="text-sm text-white/40 leading-relaxed font-light">{solution}</p>
          </div>
        </div>
      </div>
    </StaggerItem>
  );
}

export default function SupportPage() {
  const t = useTranslations('supportPage');

  const issues = [
    { icon: Camera, title: t('issue1Title'), solution: t('issue1Solution') },
    { icon: Watch, title: t('issue2Title'), solution: t('issue2Solution') },
    { icon: FolderOpen, title: t('issue3Title'), solution: t('issue3Solution') },
    { icon: Cloud, title: t('issue4Title'), solution: t('issue4Solution') },
  ];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-5">
              {t('headline')}
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-white/40 max-w-2xl mx-auto font-light">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>

        {/* Common Issues */}
        <FadeIn>
          <h2 className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-8">
            {t('commonIssues')}
          </h2>
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-2 gap-4 mb-20" staggerDelay={0.08}>
          {issues.map((issue, i) => (
            <IssueCard key={i} icon={issue.icon} title={issue.title} solution={issue.solution} />
          ))}
        </StaggerContainer>

        <div className="section-divider mb-20" />

        {/* Contact CTA */}
        <FadeIn>
          <div className="relative text-center overflow-hidden">
            <div className="ambient-glow-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                {t('contactTitle')}
              </h2>
              <p className="text-white/40 font-light mb-8 max-w-lg mx-auto">
                {t('contactText')}
              </p>
              <a
                href={`mailto:${t('contactEmail')}`}
                className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-base font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-[1.02]"
              >
                <Mail size={18} />
                {t('contactCta')}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <p className="text-sm text-white/30 font-light mt-4">
                {t('contactEmail')}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
