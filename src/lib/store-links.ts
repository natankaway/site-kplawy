/**
 * Centralized store + smart-download configuration for the `/download` route.
 *
 * Store URLs/IDs are public (not secrets) but live in env vars so they can change
 * per environment without code edits. The defaults below keep the route working
 * even with an empty environment.
 *
 * Android gating: an empty `ANDROID_STORE_URL` means the app is not published on
 * Google Play yet. The route then sends Android visitors to the web fallback
 * instead of a dead Play listing. Fill the env var when the listing goes live.
 */
import { SITE_URL } from '@/lib/seo';

/** iOS App Store numeric id (apps.apple.com/app/id<APP_STORE_ID>). */
export const APP_STORE_ID = '6761232468';

/** Android applicationId (play.google.com/store/apps/details?id=<ANDROID_PACKAGE>). */
export const ANDROID_PACKAGE = 'com.kplawy.instantreplay';

// Country-neutral App Store link — Apple routes to the visitor's local storefront.
const DEFAULT_APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`;

export const STORE_LINKS = {
  /** iOS App Store listing. */
  appStore: process.env.APP_STORE_URL?.trim() || DEFAULT_APP_STORE_URL,
  /**
   * Google Play listing. Empty string => Android not published yet, so the route
   * uses the web fallback for Android visitors instead of a 404 Play page.
   */
  playStore: process.env.ANDROID_STORE_URL?.trim() ?? '',
  /**
   * Override for the desktop / iPad / unknown fallback target. Empty string =>
   * the route builds a locale-aware `/<locale>/download` path at request time.
   */
  desktopFallbackOverride: process.env.SMART_DOWNLOAD_DESKTOP_FALLBACK?.trim() ?? '',
} as const;

export type Platform = 'ios' | 'android' | 'desktop';

// Known social/link crawlers. These must NOT be redirected — they need the OG
// HTML so the chat/post preview renders the KplaWY card, not a store page.
const BOT_PATTERN =
  /facebookexternalhit|whatsapp|twitterbot|slackbot|telegrambot|linkedinbot|discordbot|googlebot|bingbot|redditbot/i;

const IOS_PATTERN = /iphone|ipod/i;
const ANDROID_PATTERN = /android/i;

/** True when the user-agent is a known social/link crawler. */
export function isBot(userAgent: string): boolean {
  return BOT_PATTERN.test(userAgent);
}

/**
 * Classify the visitor's OS from the user-agent.
 *
 * NOTE — iPad limitation: modern iPadOS reports as `Macintosh`, indistinguishable
 * from a real Mac server-side. Such requests fall through to `desktop`, landing on
 * the fallback download page (which surfaces the App Store button). This avoids
 * misrouting real Macs to an iOS-only App Store link while iPad users still reach
 * the app in one tap. An empty/missing user-agent also resolves to `desktop`.
 */
export function classifyPlatform(userAgent: string): Platform {
  if (IOS_PATTERN.test(userAgent)) return 'ios';
  if (ANDROID_PATTERN.test(userAgent)) return 'android';
  return 'desktop';
}

/**
 * Merge an incoming query string (campaign params like `from`, `utm_*`) onto a
 * target URL, preserving any params the target already carries (e.g. Play's `id`).
 * Works for both absolute store URLs and relative fallback paths.
 */
export function appendQuery(targetUrl: string, search: string): string {
  const raw = search.startsWith('?') ? search.slice(1) : search;
  const incoming = new URLSearchParams(raw);
  if ([...incoming.keys()].length === 0) return targetUrl;

  const isRelative = !/^https?:\/\//i.test(targetUrl);
  const url = new URL(targetUrl, SITE_URL);
  for (const [key, value] of incoming) url.searchParams.set(key, value);

  return isRelative ? `${url.pathname}${url.search}` : url.toString();
}
