import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Waitlist capture — STUB.
 *
 * TODO(launch): wire a real email provider before promoting the waitlist.
 * Recommended: a managed list that fits the "no tracking" brand promise, e.g.
 * Resend Audiences or Buttondown. Add the API key as a SERVER-ONLY env var
 * (e.g. WAITLIST_API_KEY) — never expose it to the client — and POST the email
 * to the provider here, returning their result.
 *
 * Until then this validates the email and records it to the server log (Vercel
 * function logs) so sign-ups are NOT silently dropped, then returns success.
 * It deliberately stores nothing in a database and sets no tracking cookies.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const { email, locale, source } =
    (body as { email?: string; locale?: string; source?: string }) ?? {};

  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 422 });
  }

  // STUB SINK — replace with a provider call. Logged so nothing is lost.
  console.info('[waitlist] signup', {
    email,
    locale: typeof locale === 'string' ? locale : null,
    source: typeof source === 'string' ? source : null,
  });

  return NextResponse.json({ ok: true });
}
