import { notFound } from 'next/navigation';

// next-intl App Router pattern: a catch-all under [locale] that triggers the
// localized not-found boundary (src/app/[locale]/not-found.tsx) for any unknown
// path under a valid locale, instead of falling back to the framework default.
export default function CatchAllNotFound() {
  notFound();
}
