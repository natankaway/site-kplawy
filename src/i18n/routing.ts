import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // To add Spanish later: append 'es' here AND ship messages/es.json + the three
  // src/content/legal/*.es.md, or the legal loader (src/lib/legal.ts) will throw
  // on the missing markdown. Everything downstream derives from routing.locales.
  locales: ['pt', 'en'],
  defaultLocale: 'pt',
});

export type Locale = (typeof routing.locales)[number];

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}
