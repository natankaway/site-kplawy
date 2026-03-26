import type { Metadata } from 'next';

export const SITE_URL = 'https://kplawy.app';

type SeoInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
};

export function buildPageMetadata({ locale, path, title, description }: SeoInput): Metadata {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const canonical = `${SITE_URL}/${locale}${normalizedPath === '/' ? '' : normalizedPath}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        pt: `${SITE_URL}/pt${normalizedPath === '/' ? '' : normalizedPath}`,
        en: `${SITE_URL}/en${normalizedPath === '/' ? '' : normalizedPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'KplaWY',
      images: [`${SITE_URL}/opengraph-image`],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/twitter-image`],
    },
  };
}

export function buildSoftwareApplicationJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'KplaWY',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'iOS, Android',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'BRL',
      lowPrice: '0',
      highPrice: '299.90',
      offerCount: 4,
    },
    description:
      locale === 'pt'
        ? 'App de instant replay com buffer configurável, controle por smartwatch e botão Bluetooth, multi-câmera e privacidade total.'
        : 'Instant replay app with configurable buffer duration, smartwatch and Bluetooth trigger control, multi-camera, and total privacy.',
    creator: {
      '@type': 'Organization',
      name: 'Kaway Developer',
    },
    url: `${SITE_URL}/${locale}`,
  };
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KplaWY',
    url: SITE_URL,
    logo: `${SITE_URL}/logo-icon.png`,
    founder: 'Kaway Developer',
  };
}
