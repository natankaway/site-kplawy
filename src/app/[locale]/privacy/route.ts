import { renderLegalPage } from '@/lib/static-legal-html';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  return renderLegalPage('privacy', locale);
}
