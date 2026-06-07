import fs from 'node:fs/promises';
import path from 'node:path';
import { routing } from '@/i18n/routing';

// Loads a public legal document (markdown) for the given slug + locale from
// src/content/legal/. Falls back to the default locale if the requested one is
// missing. Read at build time (pages are statically rendered per locale).
export async function loadLegalDoc(slug: string, locale: string): Promise<string> {
  const safeLocale = (routing.locales as readonly string[]).includes(locale)
    ? locale
    : routing.defaultLocale;
  const file = path.join(
    process.cwd(),
    'src',
    'content',
    'legal',
    `${slug}.${safeLocale}.md`,
  );
  return fs.readFile(file, 'utf-8');
}
