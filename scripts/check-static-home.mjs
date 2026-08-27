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
    assert.equal(existsSync(join(root, 'src/app/media/v2/[...asset]/route.ts')), false);
    assert.equal(existsSync(join(root, 'public/media/v2/demo.mp4')), true);
    assert.equal(existsSync(join(root, 'public/media/v2/pt/camera.webp')), true);
    assert.equal(existsSync(join(root, 'public/media/v2/en/camera.webp')), true);

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
    assertIncludes(landing, 'Seu próprio replay.', 'PT hero');
    assertIncludes(landing, 'Em qualquer esporte.', 'PT hero');
    assertIncludes(landing, 'Your own replay.', 'EN hero');
    assertIncludes(landing, 'For any sport.', 'EN hero');
    assertIncludes(landing, 'pare de encher o celular com horas de vídeo', 'PT hero');
    assertIncludes(landing, 'stop filling your phone with hours of video', 'EN hero');
    assertIncludes(landing, '/media/v2/demo.mp4', 'demo video');
    assertIncludes(landing, '/media/v2/demo-poster.webp', 'demo poster');
    assertIncludes(landing, 'hero-replay-bg', 'signature hero replay background');
    assertIncludes(landing, '/media/v2/watch.webp', 'watch image');
    assertIncludes(landing, '/media/v2/logo-symbol-white.webp', 'new logo');
    assertIncludes(landing, 'O lance já passou. O KplaWY ainda pega.', 'PT demo marketing copy');
    assertIncludes(landing, 'The play is already over. KplaWY still catches it.', 'EN demo marketing copy');
    assertExcludes(landing, 'Escolha a duração', 'old demo controls copy');
    assertExcludes(landing, 'Pick a duration', 'old demo controls copy');
    assertIncludes(landing, 'watch-cue', 'watch tap explanation');
    assertIncludes(landing, 'data-flow-step="saved"', 'replay save flow');
    assertIncludes(landing, 'data-auto-save', 'automatic replay saved state');
    assertExcludes(landing, 'data-replay', 'manual replay button');
    assertExcludes(landing, 'class="replay"', 'manual replay button');
    assertExcludes(landing, 'data-duration', 'demo duration controls');
    assertExcludes(landing, 'class="duration-row"', 'demo duration controls');
    assertExcludes(landing, 'data-fill', 'demo duration timeline');
    assertExcludes(landing, 'data-seconds', 'demo duration timeline');
    assertIncludes(landing, 'Apertou no relógio', 'PT watch explanation');
    assertIncludes(landing, 'Watch tapped', 'EN watch explanation');
    assertIncludes(landing, 'app-camera.webp', 'new app screenshots');
    assertIncludes(landing, 'app-home.webp', 'new app screenshots');
    assertIncludes(landing, 'app-remote.webp', 'new app screenshots');
    assertIncludes(landing, 'app-player.webp', 'new app screenshots');
    assertIncludes(landing, 'app-multicam.webp', 'new app screenshots');
    assertIncludes(landing, "index === 3 ? 'result' : ''", 'saved replay product moment');
    assertIncludes(landing, 'Da câmera ao replay salvo.', 'PT product story');
    assertIncludes(landing, 'From camera to saved replay.', 'EN product story');
    assertIncludes(landing, 'data-video-toggle', 'video pause control');
  });

  it('sets root social image metadata without build-time metadataBase warnings', () => {
    const rootLayout = read('src/app/layout.tsx');
    assertIncludes(rootLayout, 'metadataBase', 'root layout metadata');
    assertIncludes(rootLayout, 'SITE_URL', 'root layout metadata');
    assertIncludes(rootLayout, '<html lang="pt-BR">', 'root layout language fallback');
    assertIncludes(read('src/app/twitter-image.tsx'), './opengraph-image', 'twitter image route');
  });

  it('uses the corrected English and Brazilian Pro pricing', () => {
    const landing = read('src/lib/home-page-v2.ts');
    assertIncludes(landing, '$5.99/month', 'English monthly price');
    assertIncludes(landing, '$39.99/year', 'English annual price');
    assertIncludes(landing, 'R$ 29,90/mês', 'Brazilian monthly price');
    assertIncludes(landing, 'R$ 249,90/ano', 'Brazilian annual price');
    assertIncludes(landing, 'pricingFor(locale)', 'structured pricing source');
    assertIncludes(landing, 'price(pricing.premiumMonthly)', 'monthly JSON-LD price');
    assertIncludes(landing, 'price(pricing.premiumAnnual)', 'annual JSON-LD price');
    assertExcludes(landing, '$4.99', 'refreshed landing');
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
    assertIncludes(legalRenderer, '/assets/css/site-v2.css', 'legal renderer');
    assertIncludes(legalRenderer, 'class="site-header"', 'legal renderer');
    assertIncludes(legalRenderer, '/media/v2/logo-symbol-white.webp', 'legal renderer');
    assertExcludes(legalRenderer, '/assets/css/site.css', 'legal renderer');
  });

  it('redirects legacy landing pages to sections of the refreshed homepage', () => {
    const proxy = read('src/proxy.ts');
    const routeMap = read('src/lib/legacy-landing-routes.ts');
    const landing = read('src/lib/home-page-v2.ts');
    assertIncludes(proxy, 'OLD_LANDING_ROUTES', 'proxy');
    assertIncludes(proxy, 'NextResponse.redirect', 'proxy');
    assertIncludes(routeMap, 'OLD_LANDING_ROUTES', 'legacy route map');
    assertIncludes(routeMap, "pricing: { pt: 'pro', en: 'pro' }", 'legacy route map');
    assertIncludes(routeMap, "features: { pt: 'app', en: 'app' }", 'legacy route map');
    assertIncludes(routeMap, "guia: { pt: 'como', en: 'como' }", 'legacy route map');
    for (const legacyAnchor of ['planos', 'pricing', 'produto', 'features', 'como-funciona', 'how-it-works', 'historia', 'story-sec']) {
      assertIncludes(landing, legacyAnchor, `legacy anchor ${legacyAnchor}`);
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
