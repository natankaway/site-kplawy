import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { OLD_LANDING_ROUTES, isOldLandingRoute } from './lib/legacy-landing-routes';

const intlProxy = createMiddleware(routing);

function legacyLandingRedirect(request: NextRequest) {
  const parts = request.nextUrl.pathname.split('/').filter(Boolean);
  const [locale, ...restParts] = parts;

  if ((locale !== 'pt' && locale !== 'en') || restParts.length === 0) {
    return null;
  }

  const route = restParts[0] === 'guia' ? 'guia' : restParts.join('/');
  if (!isOldLandingRoute(route)) {
    return null;
  }

  const target = request.nextUrl.clone();
  target.pathname = `/${locale}`;
  target.search = '';
  target.hash = OLD_LANDING_ROUTES[route][locale];

  return NextResponse.redirect(target, 308);
}

export default function proxy(request: NextRequest) {
  const redirect = legacyLandingRedirect(request);
  if (redirect) return redirect;

  return intlProxy(request);
}

export const config = {
  matcher: ['/', '/(pt|en)/:path*'],
};
