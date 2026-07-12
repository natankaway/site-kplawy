import { redirect } from 'next/navigation';
import { landingRedirectUrl } from '@/lib/legacy-landing-routes';

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(landingRedirectUrl(locale, 'support'));
}
