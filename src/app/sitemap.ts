import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const routes = ['', '/about', '/contact', '/download', '/faq', '/features', '/pricing', '/privacy', '/support', '/terms'];
const locales = ['pt', 'en'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: now,
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : route === '/pricing' || route === '/download' ? 0.9 : 0.7,
    }))
  );
}
