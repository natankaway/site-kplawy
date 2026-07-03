import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { PRICE_HIGH, PRICE_LOW, OFFER_COUNT } from '@/lib/pricing';

export const SITE_URL = 'https://kplawy.app';

type SeoInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
};

/** Build per-locale hreflang map (+ x-default) from routing.locales. */
function alternateLanguages(path: string) {
  const suffix = path === '/' ? '' : path;
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}/${locale}${suffix}`;
  }
  languages['x-default'] = `${SITE_URL}/${routing.defaultLocale}${suffix}`;
  return languages;
}

export function buildPageMetadata({ locale, path, title, description }: SeoInput): Metadata {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const canonical = `${SITE_URL}/${locale}${normalizedPath === '/' ? '' : normalizedPath}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical,
      languages: alternateLanguages(normalizedPath),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'KplaWY',
      locale,
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

const APP_DESCRIPTION: Record<string, string> = {
  pt: 'App de instant replay com buffer configurável, controle por smartwatch e botão Bluetooth, multi-câmera e privacidade total.',
  en: 'Instant replay app with configurable buffer duration, smartwatch and Bluetooth trigger control, multi-camera, and total privacy.',
  es: 'App de instant replay con búfer configurable, control por smartwatch y botón Bluetooth, multicámara y privacidad total.',
};

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
      lowPrice: PRICE_LOW,
      highPrice: PRICE_HIGH,
      offerCount: OFFER_COUNT,
    },
    description: APP_DESCRIPTION[locale] ?? APP_DESCRIPTION[routing.defaultLocale],
    creator: {
      '@type': 'Person',
      name: 'Natan Kaway',
    },
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}/logo.png`,
    screenshot: `${SITE_URL}/opengraph-image`,
    downloadUrl: `${SITE_URL}/download`,
    installUrl: `${SITE_URL}/download`,
  };
}

/** WebSite — dá nome/idiomas do site pros mecanismos e assistentes de IA. */
export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'KplaWY',
    url: SITE_URL,
    inLanguage: routing.locales,
  };
}

/** VideoObject do demo real da home (clipe de futevôlei com replay salvo). */
export function buildVideoObjectJsonLd(locale: string) {
  const names: Record<string, string> = {
    pt: 'KplaWY — replay salvo depois do lance',
    en: 'KplaWY — replay saved after the play',
    es: 'KplaWY — replay guardado después de la jugada',
  };
  const descriptions: Record<string, string> = {
    pt: 'Demonstração real: o buffer contínuo captura o lance e o replay é salvo com um toque, depois que o ponto aconteceu.',
    en: 'Real demo: the continuous buffer captures the play and the replay is saved with one tap, after the point happened.',
    es: 'Demostración real: el búfer continuo captura la jugada y el replay se guarda con un toque, después del punto.',
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: names[locale] ?? names[routing.defaultLocale],
    description: descriptions[locale] ?? descriptions[routing.defaultLocale],
    thumbnailUrl: `${SITE_URL}/media/video/replay-demo-poster.jpg`,
    contentUrl: `${SITE_URL}/media/video/replay-demo-720.mp4`,
    uploadDate: '2026-06-24',
    inLanguage: locale,
  };
}

/** BreadcrumbList — páginas internas (Home → Página). */
export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KplaWY',
    url: SITE_URL,
    logo: `${SITE_URL}/logo-icon.png`,
    founder: 'Natan Kaway',
  };
}
