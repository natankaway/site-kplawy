import type { NextRequest } from 'next/server';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/seo';
import {
  STORE_LINKS,
  appendQuery,
  classifyPlatform,
  isBot,
} from '@/lib/store-links';

/**
 * Smart download link — https://kplawy.app/download
 *
 * Server-side, reads the user-agent and 302-redirects to the right store, with a
 * web fallback on desktop. Social crawlers get a 200 + OG page (never redirected)
 * so link previews in WhatsApp/Instagram/etc. stay correct. Campaign query params
 * (`from`, `utm_*`) are preserved onto the destination.
 *
 * Lives at the route root (not under `[locale]`) so the bare `/download` path is
 * owned by this handler — the literal segment wins over the dynamic `[locale]`.
 */

// Read headers per-request; never statically cache this route.
export const dynamic = 'force-dynamic';

function pickLocale(acceptLanguage: string | null): string {
  const header = (acceptLanguage ?? '').toLowerCase();
  for (const locale of routing.locales) {
    if (header.includes(locale)) return locale;
  }
  return routing.defaultLocale;
}

function botHtml(): string {
  const title = 'KplaWY — Instant Replay para o Mundo Real';
  const description =
    'A câmera grava sempre os últimos segundos. Quando o momento vier, toque em Replay — e o que acabou de acontecer vira clipe.';
  const url = `${SITE_URL}/download`;
  const image = `${SITE_URL}/opengraph-image`;

  return `<!doctype html>
<html lang="pt">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<meta name="description" content="${description}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="KplaWY" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${image}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />
<link rel="canonical" href="${url}" />
</head>
<body>
<p>KplaWY — <a href="${url}">Baixar o app</a></p>
</body>
</html>`;
}

export function GET(request: NextRequest): Response {
  const userAgent = request.headers.get('user-agent') ?? '';
  const search = request.nextUrl.search;

  // 1) Social/link crawlers: serve OG HTML, do not redirect.
  if (isBot(userAgent)) {
    return new Response(botHtml(), {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=300',
      },
    });
  }

  // 2) Humans: resolve destination by platform.
  const locale = pickLocale(request.headers.get('accept-language'));
  const fallback = STORE_LINKS.desktopFallbackOverride || `/${locale}/download`;
  const platform = classifyPlatform(userAgent);

  let target: string;
  if (platform === 'ios') {
    target = STORE_LINKS.appStore;
  } else if (platform === 'android') {
    // Empty Play URL (app not published yet) => web fallback, no dead listing.
    target = STORE_LINKS.playStore || fallback;
  } else {
    // desktop, iPad-as-Macintosh, or missing user-agent.
    target = fallback;
  }

  const location = appendQuery(target, search);
  return new Response(null, {
    status: 302,
    headers: {
      location,
      'cache-control': 'no-store',
    },
  });
}
