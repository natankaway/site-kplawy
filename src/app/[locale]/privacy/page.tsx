import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { FadeIn } from '@/components/fade-in';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacyPage' });
  return { title: t('title') };
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold tracking-tight mt-12 mb-4 first:mt-0">
      {children}
    </h2>
  );
}

function SubSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold tracking-tight mt-8 mb-3">
      {children}
    </h3>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-white/50 leading-relaxed font-light mb-4">
      {children}
    </p>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="text-sm text-white/50 leading-relaxed font-light pl-1">
      {children}
    </li>
  );
}

export default function PrivacyPage() {
  const t = useTranslations('privacyPage');

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4">
              {t('title')}
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-sm text-white/30 font-light">
              {t('lastUpdated')}
            </p>
          </FadeIn>
        </div>

        {/* Content */}
        <FadeIn delay={0.15}>
          <div className="prose-brand">
            {/* Section 1 */}
            <SectionTitle>{t('s1Title')}</SectionTitle>
            <Paragraph>{t('s1Text')}</Paragraph>

            {/* Section 2 */}
            <SectionTitle>{t('s2Title')}</SectionTitle>

            <SubSectionTitle>{t('s2aTitle')}</SubSectionTitle>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
              <ListItem>{t('s2aItem1')}</ListItem>
              <ListItem>{t('s2aItem2')}</ListItem>
            </ul>

            <SubSectionTitle>{t('s2bTitle')}</SubSectionTitle>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
              <ListItem>{t('s2bItem1')}</ListItem>
              <ListItem>{t('s2bItem2')}</ListItem>
            </ul>

            {/* Section 3 */}
            <SectionTitle>{t('s3Title')}</SectionTitle>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
              <ListItem>{t('s3Item1')}</ListItem>
              <ListItem>{t('s3Item2')}</ListItem>
              <ListItem>{t('s3Item3')}</ListItem>
              <ListItem>{t('s3Item4')}</ListItem>
              <ListItem>{t('s3Item5')}</ListItem>
            </ul>

            {/* Section 4 */}
            <SectionTitle>{t('s4Title')}</SectionTitle>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
              <ListItem>{t('s4Item1')}</ListItem>
              <ListItem>{t('s4Item2')}</ListItem>
              <ListItem>{t('s4Item3')}</ListItem>
              <ListItem>{t('s4Item4')}</ListItem>
              <ListItem>{t('s4Item5')}</ListItem>
            </ul>

            {/* Section 5 */}
            <SectionTitle>{t('s5Title')}</SectionTitle>
            <Paragraph>{t('s5Text')}</Paragraph>

            {/* Section 6 */}
            <SectionTitle>{t('s6Title')}</SectionTitle>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
              <ListItem>{t('s6Item1')}</ListItem>
              <ListItem>{t('s6Item2')}</ListItem>
              <ListItem>{t('s6Item3')}</ListItem>
              <ListItem>{t('s6Item4')}</ListItem>
            </ul>

            {/* Section 7 */}
            <SectionTitle>{t('s7Title')}</SectionTitle>
            <Paragraph>{t('s7Text')}</Paragraph>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
              <ListItem>{t('s7Item1')}</ListItem>
              <ListItem>{t('s7Item2')}</ListItem>
              <ListItem>{t('s7Item3')}</ListItem>
            </ul>

            {/* Section 8 */}
            <SectionTitle>{t('s8Title')}</SectionTitle>
            <Paragraph>{t('s8Text')}</Paragraph>

            {/* Section 9 */}
            <SectionTitle>{t('s9Title')}</SectionTitle>
            <Paragraph>{t('s9Text')}</Paragraph>
            <a
              href={`mailto:${t('s9Email')}`}
              className="text-sm text-brand-blue-dark hover:text-brand-blue-dark/80 transition-colors font-medium"
            >
              {t('s9Email')}
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
