import { routing } from '@/i18n/routing';
import { renderLegalPage } from '@/lib/static-legal-html';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  return renderLegalPage('delete-account', locale);
}
