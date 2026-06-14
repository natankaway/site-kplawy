import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, Download, Check } from 'lucide-react';

/**
 * Neutral primary download CTA — the single blue/primary affordance.
 * Platform-neutral glyph (no Apple icon) since the app is iOS + Android.
 * Full-width on mobile, >=44px tap target, visible focus ring.
 */
export function DownloadButton({
  href,
  label,
  className = '',
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`btn-electric group inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-full px-8 py-3.5 text-base font-semibold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1A] sm:w-auto ${className}`}
    >
      <Download size={20} aria-hidden="true" />
      {label}
    </Link>
  );
}

/** Secondary, lower-weight link CTA. */
export function SecondaryLink({
  href,
  label,
  className = '',
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-8 py-3.5 text-base font-semibold text-white transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1A] active:scale-[0.98] sm:w-auto ${className}`}
    >
      {label}
      <ArrowRight
        size={18}
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
      />
    </Link>
  );
}

/** Differentiator trust badges (No ads · Videos on device · No tracking). */
export async function TrustBadges({
  locale,
  className = '',
}: {
  locale: string;
  className?: string;
}) {
  const t = await getTranslations({ locale, namespace: 'cta' });
  const badges = [t('trust1'), t('trust2'), t('trust3')];
  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 ${className}`}
    >
      {badges.map((badge) => (
        <li
          key={badge}
          className="inline-flex items-center gap-2 text-sm font-medium text-white/80"
        >
          <Check
            size={15}
            strokeWidth={2.5}
            aria-hidden="true"
            className="text-brand-green"
          />
          {badge}
        </li>
      ))}
    </ul>
  );
}

/**
 * Mid/end-of-section conversion block — primary CTA (+ optional secondary)
 * with the trust badges beneath. One primary per viewport.
 */
export async function ConversionBlock({
  locale,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  withBadges = true,
  className = '',
}: {
  locale: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  withBadges?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
        <DownloadButton href={`/${locale}/download`} label={primaryLabel} />
        {secondaryHref && secondaryLabel ? (
          <SecondaryLink href={secondaryHref} label={secondaryLabel} />
        ) : null}
      </div>
      {withBadges ? <TrustBadges locale={locale} /> : null}
    </div>
  );
}
