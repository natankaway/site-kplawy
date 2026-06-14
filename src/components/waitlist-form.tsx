'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { FadeIn } from './fade-in';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm({
  variant = 'section',
  source = 'site',
  className = '',
}: {
  locale?: string;
  variant?: 'inline' | 'section';
  source?: string;
  className?: string;
}) {
  const t = useTranslations('waitlist');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;

    if (!EMAIL_RE.test(email)) {
      setStatus('error');
      setMessage(t('invalidEmail'));
      return;
    }

    setStatus('submitting');
    setMessage('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale, source }),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('success');
      setMessage(t('successText'));
    } catch {
      setStatus('error');
      setMessage(t('errorText'));
    }
  }

  const card =
    variant === 'section'
      ? 'card-electric rounded-[2rem] p-8 md:p-10'
      : 'rounded-2xl';

  return (
    <section
      className={`relative px-6 ${variant === 'section' ? 'py-20 md:py-24' : ''} ${className}`}
      aria-labelledby="waitlist-heading"
    >
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <div className={card}>
            <div className="text-center">
              <p className="section-kicker mb-4 justify-center">{t('badge')}</p>
              <h2
                id="waitlist-heading"
                className="font-display text-3xl font-bold uppercase tracking-tight text-white md:text-4xl"
              >
                {t('titleLine1')}{' '}
                <span className="title-accent">{t('titleLine2')}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base font-light leading-relaxed text-white/80">
                {t('subtitle')}
              </p>
            </div>

            {status === 'success' ? (
              <div
                className="mt-8 flex flex-col items-center gap-3 text-center"
                role="status"
                aria-live="polite"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-green/30 bg-brand-green/15 text-brand-green">
                  <Check size={22} aria-hidden="true" strokeWidth={2.5} />
                </span>
                <p className="font-display text-xl font-bold uppercase tracking-tight text-white">
                  {t('successTitle')}
                </p>
                <p className="max-w-sm text-sm text-white/80">{t('successText')}</p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3"
              >
                <label htmlFor="waitlist-email" className="sr-only">
                  {t('emailLabel')}
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="waitlist-email"
                    type="email"
                    name="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    placeholder={t('emailPlaceholder')}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    aria-invalid={status === 'error'}
                    aria-describedby="waitlist-note"
                    className="min-h-[48px] w-full flex-1 rounded-full border border-white/15 bg-white/[0.04] px-5 text-base text-white placeholder:text-white/45 focus-visible:border-brand-blue-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-bright"
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-electric inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full px-7 text-base font-semibold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={18} aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
                        {t('submitting')}
                      </>
                    ) : (
                      <>
                        {t('submit')}
                        <ArrowRight size={18} aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>

                <p
                  id="waitlist-note"
                  className="text-center text-xs text-white/65"
                  aria-live="polite"
                >
                  {status === 'error' ? (
                    <span className="text-brand-red">{message}</span>
                  ) : (
                    t('privacyNote')
                  )}
                </p>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
