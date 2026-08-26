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

describe('production landing', () => {
  it('serves the refreshed bilingual landing from the locale route', () => {
    assert.equal(existsSync(join(root, 'src/app/[locale]/route.ts')), true);
    assert.equal(existsSync(join(root, 'src/lib/home-page-v2.ts')), true);
    assert.equal(existsSync(join(root, 'public/assets/css/site-v2.css')), true);
    assert.equal(existsSync(join(root, 'public/assets/js/site-v2.js')), true);
    assert.equal(existsSync(join(root, 'src/app/media/v2/[...asset]/route.ts')), true);

    const route = read('src/app/[locale]/route.ts');
    assertIncludes(route, "redirect('/pt')", 'locale route');
    assertIncludes(route, 'renderLandingPage', 'locale route');
    assertExcludes(route, 'src/static-site', 'locale route');
  });

  it('keeps language, SEO and default-locale semantics aligned', () => {
    const proxy = read('src/proxy.ts');
    const landing = read('src/lib/home-page-v2.ts');
    const routing = read('src/i18n/routing.ts');

    assertIncludes(proxy, "matcher: ['/', '/(pt|en)/:path*']", 'proxy');
    assertIncludes(routing, "defaultLocale: 'pt'", 'routing');
    assertIncludes(landing, 'https://kplawy.app/${locale}', 'canonical source');
    assertIncludes(landing, 'hreflang=\"pt-BR\"', 'landing');
    assertIncludes(landing, 'hreflang=\"en\"', 'landing');
    assertIncludes(landing, 'hreflang=\"x-default\"', 'landing');
    assertIncludes(landing, 'https://kplawy.app/pt', 'x-default target');
    assertIncludes(landing, 'SoftwareApplication', 'structured data');
    assertIncludes(landing, 'FAQPage', 'structured data');
  });

  it('uses the approved conversion-first message and refreshed media', () => {
    const landing = read('src/lib/home-page-v2.ts');
    assertIncludes(landing, 'O lance já aconteceu?', 'PT hero');
    assertIncludes(landing, 'Salve os últimos segundos.', 'PT hero');
    assertIncludes(landing, 'The play already happened?', 'EN hero');
    assertIncludes(landing, 'Save the last seconds.', 'EN hero');
    assertIncludes(landing, '/media/v2/demo.mp4', 'demo video');
    assertIncludes(landing, '/media/v2/watch.webp', 'watch image');
    assertIncludes(landing, '/media/v2/logo-symbol-white.webp', 'new logo');
    assertIncludes(landing, 'camera.webp', 'new app screenshots');
    assertIncludes(landing, 'clips.webp', 'new app screenshots');
    assertIncludes(landing, 'multicam.webp', 'new app screenshots');
  });

  it('uses the corrected English and Brazilian Pro pricing', () => {
    const landing = read('src/lib/home-page-v2.ts');
    assertIncludes(landing, '$4.99/month', 'English monthly price');
    assertIncludes(landing, '$39.99/year', 'English annual price');
    assertIncludes(landing, "price: '4.99'", 'English monthly JSON-LD price');
    assertIncludes(landing, "price: '39.99'", 'English annual JSON-LD price');
    assertIncludes(landing, 'R$ 29,90/mês', 'Brazilian monthly price');
    assertIncludes(landing, 'R$ 249,90/ano', 'Brazilian annual price');
    assertIncludes(landing, "price: '29.90'", 'Brazilian monthly JSON-LD price');
    assertIncludes(landing, "price: '249.90'", 'Brazilian annual JSON-LD price');
    assertExcludes(landing, '$5.99', 'refreshed landing');
  });

  it('uses precise privacy language rather than a blanket tracking claim', () => {
    const landing = read('src/lib/home-page-v2.ts');
    assertIncludes(landing, 'Sem rastreamento publicitário', 'PT privacy');
    assertIncludes(landing, 'No advertising tracking', 'EN privacy');
    assertIncludes(landing, 'Backup opcional', 'PT privacy');
    assertIncludes(landing, 'Optional backup', 'EN privacy');
  });

  it('serves legal pages through the static legal system', () => {
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
    assertIncludes(legalRenderer, 'loadLegalDoc', 'legal renderer');
    assertIncludes(legalRenderer, 'kplawyapp@gmail.com', 'legal renderer');
  });

  it('redirects legacy landing pages to sections of the refreshed homepage', () => {
    const proxy = read('src/proxy.ts');
    const routeMap = read('src/lib/legacy-landing-routes.ts');
    assertIncludes(proxy, 'OLD_LANDING_ROUTES', 'proxy');
    assertIncludes(proxy, 'NextResponse.redirect', 'proxy');
    assertIncludes(routeMap, 'OLD_LANDING_ROUTES', 'legacy route map');

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

  it('keeps the public sitemap scoped to the homepage and required legal pages', () => {
    const sitemap = read('src/app/sitemap.ts');
    for (const route of ["''", "'/privacy'", "'/terms'", "'/delete-account'"]) assertIncludes(sitemap, route, 'sitemap routes');
    for (const oldRoute of ["'/about'", "'/contact'", "'/download'", "'/faq'", "'/features'", "'/pricing'", "'/support'", "'/guia'", 'guides.map']) assertExcludes(sitemap, oldRoute, 'sitemap routes');
  });

  it('keeps live store links and Android availability', () => {
    const landing = read('src/lib/home-page-v2.ts');
    const storeLinks = read('src/lib/store-links.ts');
    assertIncludes(landing, 'apps.apple.com/app/id6761232468', 'landing App Store link');
    assertIncludes(landing, 'play.google.com/store/apps/details?id=com.kplawy.instantreplay', 'landing Play Store link');
    assertIncludes(storeLinks, 'play.google.com/store/apps/details?id=', 'store links');
    assertIncludes(storeLinks, 'com.kplawy.instantreplay', 'store links');
    for (const source of [landing, storeLinks, read('src/app/download/route.ts')]) {
      assertExcludes(source, 'Android soon', 'launch copy');
      assertExcludes(source, 'Android coming soon', 'launch copy');
      assertExcludes(source, 'Android em breve', 'launch copy');
    }
  });
});
