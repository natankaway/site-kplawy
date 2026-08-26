import { redirect } from 'next/navigation';
import { isLocale, routing } from '@/i18n/routing';
import { renderLandingPage } from '@/lib/home-page-v2';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    redirect('/pt');
  }

  return new Response(renderLandingPage(locale), {
    headers: {
      'cache-control': 'public, max-age=0, must-revalidate',
      'content-type': 'text/html; charset=utf-8',
    },
  });
}
