/**
 * Single source of truth for pricing.
 *
 * RAW NUMBERS ONLY — never format here. Components format with next-intl's
 * formatter so each locale renders its own currency/number style. Message
 * catalogs reference these via ICU args ({monthly}/{annual}/{savings}), not
 * hardcoded strings, so prices can never drift between hero / pricing / FAQ /
 * download / structured data.
 *
 * ⚠️ STORE RECONCILIATION: the BRL amounts below are set in App Store Connect /
 * Google Play and surfaced through RevenueCat (project proj7603053a, offering
 * "default"). They are NOT readable from the RevenueCat API (store-priced), so
 * verify them against the live store listings before launch. Mapping:
 *   premiumMonthly -> package $rc_monthly      (lookup_key "monthly")
 *   premiumAnnual  -> package annual_upfront    (lookup_key "annual_upfront")
 *   (auto-renew annual lives in package $rc_annual)
 *
 * ⚠️ TRIAL: RevenueCat product data reports trial_duration = null on every
 * product. The "7-day free trial" copy must be confirmed as a store-level
 * introductory offer before launch, or the copy is overstated. Keep TRIAL_DAYS
 * here as the single place to flip it.
 */
export const PRICING = {
  currency: 'BRL',
  premiumMonthly: 29.9,
  premiumAnnual: 249.9,
  trialDays: 7,
} as const;

/** Annual savings vs paying monthly for 12 months — derived, never hand-typed. */
export const ANNUAL_SAVINGS = Number(
  (PRICING.premiumMonthly * 12 - PRICING.premiumAnnual).toFixed(2)
);

/** schema.org AggregateOffer bounds (string, 2-decimal, dot-separated). */
export const PRICE_LOW = '0';
export const PRICE_HIGH = PRICING.premiumAnnual.toFixed(2);

/** Number of distinct offers (Free, Premium monthly, Premium annual). */
export const OFFER_COUNT = 3;
