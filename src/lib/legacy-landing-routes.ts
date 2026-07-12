import { isLocale, routing, type Locale } from '@/i18n/routing';

export const OLD_LANDING_ROUTES = {
  about: { pt: 'historia', en: 'story-sec' },
  contact: { pt: 'faq', en: 'faq' },
  download: { pt: 'download', en: 'download' },
  faq: { pt: 'faq', en: 'faq' },
  features: { pt: 'produto', en: 'features' },
  pricing: { pt: 'planos', en: 'pricing' },
  support: { pt: 'faq', en: 'faq' },
  guia: { pt: 'como-funciona', en: 'how-it-works' },
} as const;

export type OldLandingRoute = keyof typeof OLD_LANDING_ROUTES;

export function isOldLandingRoute(route: string): route is OldLandingRoute {
  return route in OLD_LANDING_ROUTES;
}

export function landingRedirectUrl(locale: string, route: OldLandingRoute) {
  const currentLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  return `/${currentLocale}#${OLD_LANDING_ROUTES[route][currentLocale]}`;
}
