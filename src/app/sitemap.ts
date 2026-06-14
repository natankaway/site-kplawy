import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { routing } from '@/i18n/routing';

const routes = ['', '/about', '/contact', '/download', '/faq', '/features', '/pricing', '/privacy', '/support', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Locales derive from routing.locales so adding 'es' auto-covers the sitemap.
  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: now,
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : route === '/pricing' || route === '/download' ? 0.9 : 0.7,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE_URL}/${l}${route}`])
          ),
          'x-default': `${SITE_URL}/${routing.defaultLocale}${route}`,
        },
      },
    }))
  );
}
