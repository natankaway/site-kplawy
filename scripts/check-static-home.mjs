import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

function assertIncludes(source, text, label) {
  assert.ok(source.includes(text), `${label} should include ${text}`);
}

function assertExcludes(source, text, label) {
  assert.ok(!source.includes(text), `${label} should not include ${text}`);
}

describe('static production home', () => {
  it('serves the new static landing from the locale route handler', () => {
    assert.equal(existsSync(join(root, 'src/static-site/pt/index.html')), true);
    assert.equal(existsSync(join(root, 'src/static-site/en/index.html')), true);
    assert.equal(existsSync(join(root, 'src/app/[locale]/route.ts')), true);
    assert.equal(existsSync(join(root, 'src/app/[locale]/page.tsx')), false);

    const route = read('src/app/[locale]/route.ts');
    assertIncludes(route, "redirect('/pt')", 'locale route');
    assertIncludes(route, 'src/static-site', 'locale route');
  });

  it('keeps root semantics aligned with the current site', () => {
    const proxy = read('src/proxy.ts');
    assertIncludes(proxy, "matcher: ['/', '/(pt|en)/:path*']", 'proxy');

    const pt = read('src/static-site/pt/index.html');
    assertIncludes(pt, '<link rel="canonical" href="https://kplawy.app/pt">', 'pt home');
    assertIncludes(pt, 'hreflang="pt-BR" href="https://kplawy.app/pt"', 'pt home');
    assertIncludes(pt, 'hreflang="en" href="https://kplawy.app/en"', 'pt home');
    assertIncludes(pt, 'hreflang="x-default" href="https://kplawy.app/pt"', 'pt home');
  });

  it('serves legal pages through the new static visual system', () => {
    const legalSlugs = ['privacy', 'terms', 'delete-account'];

    for (const slug of legalSlugs) {
      const routePath = `src/app/[locale]/${slug}/route.ts`;
      const pagePath = `src/app/[locale]/${slug}/page.tsx`;

      assert.equal(existsSync(join(root, routePath)), true, `${routePath} should exist`);
      assert.equal(existsSync(join(root, pagePath)), false, `${pagePath} should not render the old Next page`);

      const route = read(routePath);
      assertIncludes(route, 'renderLegalPage', routePath);
      assertIncludes(route, `'${slug}'`, routePath);
    }

    const legalRenderer = read('src/lib/static-legal-html.tsx');
    assertIncludes(legalRenderer, 'class="legal-page"', 'legal renderer');
    assertIncludes(legalRenderer, '/assets/css/site.css', 'legal renderer');
    assertIncludes(legalRenderer, 'loadLegalDoc', 'legal renderer');
    assertIncludes(legalRenderer, 'kplawyapp@gmail.com', 'legal renderer');
  });

  it('redirects legacy landing pages away from the old design', () => {
    const proxy = read('src/proxy.ts');
    const routeMap = read('src/lib/legacy-landing-routes.ts');

    assertIncludes(proxy, 'OLD_LANDING_ROUTES', 'proxy');
    assertIncludes(proxy, 'NextResponse.redirect', 'proxy');
    assertIncludes(routeMap, 'OLD_LANDING_ROUTES', 'legacy route map');

    for (const route of [
      'about',
      'contact',
      'download',
      'faq',
      'features',
      'pricing',
      'support',
      'guia',
    ]) {
      assertIncludes(routeMap, route, 'legacy route map');
    }

    for (const [route, file] of [
      ['about', 'src/app/[locale]/about/page.tsx'],
      ['contact', 'src/app/[locale]/contact/page.tsx'],
      ['download', 'src/app/[locale]/download/page.tsx'],
      ['faq', 'src/app/[locale]/faq/page.tsx'],
      ['features', 'src/app/[locale]/features/page.tsx'],
      ['pricing', 'src/app/[locale]/pricing/page.tsx'],
      ['support', 'src/app/[locale]/support/page.tsx'],
      ['guia', 'src/app/[locale]/guia/page.tsx'],
      ['guia', 'src/app/[locale]/guia/[slug]/page.tsx'],
    ]) {
      assertIncludes(read(file), `landingRedirectUrl(locale, '${route}')`, file);
    }
  });

  it('keeps the public sitemap scoped to the new landing and required legal pages', () => {
    const sitemap = read('src/app/sitemap.ts');

    for (const route of ["''", "'/privacy'", "'/terms'", "'/delete-account'"]) {
      assertIncludes(sitemap, route, 'sitemap routes');
    }

    for (const oldRoute of [
      "'/about'",
      "'/contact'",
      "'/download'",
      "'/faq'",
      "'/features'",
      "'/pricing'",
      "'/support'",
      "'/guia'",
      'guides.map',
    ]) {
      assertExcludes(sitemap, oldRoute, 'sitemap routes');
    }
  });

  it('uses confirmed support email and live Android store links', () => {
    for (const file of ['src/static-site/pt/index.html', 'src/static-site/en/index.html']) {
      const html = read(file);
      assertIncludes(html, 'mailto:kplawyapp@gmail.com', file);
      assertIncludes(html, 'https://play.google.com/store/apps/details?id=com.kplawy.instantreplay', file);
      assertExcludes(html, 'support@kplawy.app', file);
      assertExcludes(html, 'contact@kplawy.app', file);
      assertExcludes(html, 'Android soon', file);
      assertExcludes(html, 'coming soon', file);
      assertExcludes(html, 'fonts.googleapis.com', file);
      assertExcludes(html, 'fonts.gstatic.com', file);
    }
  });

  it('uses dollar pricing on the English landing', () => {
    const en = read('src/static-site/en/index.html');
    assertIncludes(en, '"priceCurrency":"USD"', 'en home JSON-LD');
    assertIncludes(en, '"price":"5.99"', 'en home JSON-LD');
    assertIncludes(en, '"price":"39.99"', 'en home JSON-LD');
    assertIncludes(en, '$5.99', 'en home visible pricing');
    assertIncludes(en, '$39.99/year', 'en home visible pricing');
    assertIncludes(en, 'save $31.89', 'en home visible pricing');
    assertExcludes(en, 'R$29.90', 'en home');
    assertExcludes(en, 'R$249.90', 'en home');
  });

  it('keeps internal launch copy aligned with Android availability', () => {
    const storeLinks = read('src/lib/store-links.ts');
    assertIncludes(storeLinks, 'play.google.com/store/apps/details?id=', 'store links');
    assertIncludes(storeLinks, 'com.kplawy.instantreplay', 'store links');

    const localizedDownloadPage = read('src/app/[locale]/download/page.tsx');
    assertIncludes(localizedDownloadPage, "landingRedirectUrl(locale, 'download')", 'localized download page');

    const smartDownloadRoute = read('src/app/download/route.ts');
    assertIncludes(smartDownloadRoute, 'STORE_LINKS.playStore', 'smart download route');

    for (const file of [
      'src/lib/store-links.ts',
      'src/app/download/route.ts',
      'src/app/[locale]/download/page.tsx',
      'src/lib/guides.ts',
      'messages/pt.json',
      'messages/en.json',
    ]) {
      const source = read(file);
      assertExcludes(source, 'Android soon', file);
      assertExcludes(source, 'Android coming soon', file);
      assertExcludes(source, 'Android em breve', file);
      assertExcludes(source, 'Android · coming soon', file);
      assertExcludes(source, 'Android · em breve', file);
    }

    const guides = read('src/lib/guides.ts');
    assertIncludes(guides, '$5.99/month', 'guides English pricing');
  });
});
