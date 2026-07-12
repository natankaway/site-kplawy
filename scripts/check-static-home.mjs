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

    const downloadPage = read('src/app/[locale]/download/page.tsx');
    assertIncludes(downloadPage, 'STORE_LINKS.playStore', 'download page');

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
