import { isLocale, routing, type Locale } from '@/i18n/routing';
import { loadLegalDoc } from '@/lib/legal';
import { SITE_URL } from '@/lib/seo';

export const LEGAL_SLUGS = ['privacy', 'terms', 'delete-account'] as const;
export type LegalSlug = (typeof LEGAL_SLUGS)[number];

const SUPPORT_EMAIL = 'kplawyapp@gmail.com';

const LEGAL_META: Record<
  LegalSlug,
  Record<Locale, { title: string; description: string }>
> = {
  privacy: {
    pt: {
      title: 'Política de Privacidade — KplaWY Instant Replay 22s',
      description:
        'Como o KplaWY coleta, usa e protege seus dados: conta, assinatura, diagnósticos opcionais, vídeos locais e backup no seu próprio Google Drive.',
    },
    en: {
      title: 'Privacy Policy — KplaWY Instant Replay 22s',
      description:
        'How KplaWY collects, uses, and protects your data: account, subscription, optional diagnostics, local videos, and backup to your own Google Drive.',
    },
  },
  terms: {
    pt: {
      title: 'Termos de Uso — KplaWY Instant Replay 22s',
      description:
        'Termos de Uso do KplaWY: licença de uso, assinatura Pro, responsabilidades, conteúdo, privacidade e limitações.',
    },
    en: {
      title: 'Terms of Use — KplaWY Instant Replay 22s',
      description:
        'KplaWY Terms of Use: usage license, Pro subscription, responsibilities, content, privacy, and limitations.',
    },
  },
  'delete-account': {
    pt: {
      title: 'Exclusão de conta — KplaWY',
      description: 'Como excluir sua conta KplaWY e os dados associados a ela.',
    },
    en: {
      title: 'Account deletion — KplaWY',
      description: 'How to delete your KplaWY account and associated data.',
    },
  },
};

const UI: Record<
  Locale,
  {
    lang: string;
    ogLocale: string;
    homeLabel: string;
    downloadLabel: string;
    legalKicker: string;
    onThisPage: string;
    product: string;
    company: string;
    legal: string;
    how: string;
    features: string;
    pricing: string;
    faq: string;
    download: string;
    about: string;
    support: string;
    contact: string;
    privacy: string;
    terms: string;
    deleteAccount: string;
    footerCopy: string;
    copyright: string;
    languageLabel: string;
  }
> = {
  pt: {
    lang: 'pt-BR',
    ogLocale: 'pt_BR',
    homeLabel: 'Voltar ao site',
    downloadLabel: 'Baixar app',
    legalKicker: 'LEGAL',
    onThisPage: 'NESTA PÁGINA',
    product: 'PRODUTO',
    company: 'EMPRESA',
    legal: 'LEGAL',
    how: 'Como funciona',
    features: 'Recursos',
    pricing: 'Planos',
    faq: 'FAQ',
    download: 'Baixar app',
    about: 'Sobre',
    support: 'Suporte',
    contact: 'Contato',
    privacy: 'Privacidade',
    terms: 'Termos',
    deleteAccount: 'Excluir conta',
    footerCopy:
      'Seu próprio replay, em qualquer lugar. Captura contínua, privacidade total e controle no momento decisivo.',
    copyright: '© 2026 KplaWY · Feito por Kaway',
    languageLabel: 'EN',
  },
  en: {
    lang: 'en',
    ogLocale: 'en_US',
    homeLabel: 'Back to site',
    downloadLabel: 'Get the app',
    legalKicker: 'LEGAL',
    onThisPage: 'ON THIS PAGE',
    product: 'PRODUCT',
    company: 'COMPANY',
    legal: 'LEGAL',
    how: 'How it works',
    features: 'Features',
    pricing: 'Pricing',
    faq: 'FAQ',
    download: 'Get the app',
    about: 'About',
    support: 'Support',
    contact: 'Contact',
    privacy: 'Privacy',
    terms: 'Terms',
    deleteAccount: 'Delete account',
    footerCopy:
      'Your own replay, anywhere. Continuous capture, full privacy and control at the decisive moment.',
    copyright: '© 2026 KplaWY · Made by Kaway',
    languageLabel: 'PT',
  },
};

const ANCHORS: Record<
  Locale,
  { how: string; features: string; pricing: string; faq: string; download: string; about: string }
> = {
  pt: {
    how: 'como',
    features: 'app',
    pricing: 'pro',
    faq: 'faq',
    download: 'download',
    about: 'historia',
  },
  en: {
    how: 'como',
    features: 'app',
    pricing: 'pro',
    faq: 'faq',
    download: 'download',
    about: 'story-sec',
  },
};

type LegalHeading = {
  id: string;
  text: string;
};

function toLocale(value: string): Locale {
  return isLocale(value) ? value : routing.defaultLocale;
}

function oppositeLocale(locale: Locale): Locale {
  return locale === 'pt' ? 'en' : 'pt';
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(value: string) {
  return escapeHtml(value);
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cleanMarkdownText(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .trim();
}

function splitMarkdown(markdown: string, fallbackTitle: string) {
  const lines = markdown.trim().split(/\r?\n/);
  const firstLine = lines[0] ?? '';
  if (firstLine.startsWith('# ')) {
    return {
      title: cleanMarkdownText(firstLine.replace(/^#\s+/, '')),
      body: lines.slice(1).join('\n').trim(),
    };
  }

  return {
    title: fallbackTitle,
    body: markdown.trim(),
  };
}

function extractHeadings(markdown: string): LegalHeading[] {
  const seen = new Map<string, number>();

  return [...markdown.matchAll(/^##\s+(.+)$/gm)].map((match) => {
    const text = cleanMarkdownText(match[1] ?? '');
    const baseId = slugify(text) || 'section';
    const count = seen.get(baseId) ?? 0;
    seen.set(baseId, count + 1);

    return {
      text,
      id: count === 0 ? baseId : `${baseId}-${count + 1}`,
    };
  });
}

function isHorizontalRule(line: string) {
  return /^-{3,}\s*$/.test(line.trim());
}

function isTableSeparator(line: string) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function isTableStart(lines: string[], index: number) {
  return (lines[index] ?? '').trim().startsWith('|') && isTableSeparator(lines[index + 1] ?? '');
}

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function inlineMarkdown(input: string): string {
  const codeSpans: string[] = [];
  const withPlaceholders = input.replace(/`([^`]+)`/g, (_match, code: string) => {
    const index = codeSpans.push(`<code>${escapeHtml(code)}</code>`) - 1;
    return `@@CODE${index}@@`;
  });

  return escapeHtml(withPlaceholders)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label: string, href: string) => {
      return `<a href="${escapeAttr(href)}">${label}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(/@@CODE(\d+)@@/g, (_match, index: string) => codeSpans[Number(index)] ?? '');
}

function renderTable(lines: string[], start: number) {
  const header = splitTableRow(lines[start] ?? '');
  const rows: string[][] = [];
  let index = start + 2;

  while (index < lines.length && lines[index].trim().startsWith('|')) {
    rows.push(splitTableRow(lines[index]));
    index += 1;
  }

  const html = `<div class="legal-table-wrap"><table><thead><tr>${header
    .map((cell) => `<th>${inlineMarkdown(cell)}</th>`)
    .join('')}</tr></thead><tbody>${rows
    .map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join('')}</tr>`)
    .join('')}</tbody></table></div>`;

  return { html, nextIndex: index };
}

function renderList(lines: string[], start: number, ordered: boolean) {
  const items: string[] = [];
  const matcher = ordered ? /^(\d+)\.\s+(.+)$/ : /^[-*]\s+(.+)$/;
  let index = start;

  while (index < lines.length) {
    const match = lines[index].match(matcher);
    if (!match) break;

    const current = [match[ordered ? 2 : 1] ?? ''];
    index += 1;

    while (
      index < lines.length &&
      lines[index].trim() !== '' &&
      !lines[index].match(matcher) &&
      !/^#{2,3}\s+/.test(lines[index]) &&
      !isHorizontalRule(lines[index]) &&
      !isTableStart(lines, index)
    ) {
      current.push(lines[index].trim());
      index += 1;
    }

    items.push(current.join(' '));
  }

  const tag = ordered ? 'ol' : 'ul';
  const html = `<${tag}>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</${tag}>`;

  return { html, nextIndex: index };
}

function renderMarkdown(markdown: string, headings: LegalHeading[]) {
  const lines = markdown.split(/\r?\n/);
  const chunks: string[] = [];
  let index = 0;
  let headingIndex = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (isHorizontalRule(line)) {
      chunks.push('<hr>');
      index += 1;
      continue;
    }

    if (isTableStart(lines, index)) {
      const table = renderTable(lines, index);
      chunks.push(table.html);
      index = table.nextIndex;
      continue;
    }

    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      const text = cleanMarkdownText(h2[1] ?? '');
      const heading = headings[headingIndex] ?? {
        id: slugify(text) || `section-${headingIndex + 1}`,
        text,
      };
      chunks.push(`<h2 id="${heading.id}">${inlineMarkdown(text)}</h2>`);
      headingIndex += 1;
      index += 1;
      continue;
    }

    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      const text = cleanMarkdownText(h3[1] ?? '');
      chunks.push(`<h3 id="${slugify(text)}">${inlineMarkdown(text)}</h3>`);
      index += 1;
      continue;
    }

    if (trimmed.startsWith('>')) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('>')) {
        quote.push(lines[index].replace(/^\s*>\s?/, '').trim());
        index += 1;
      }
      chunks.push(`<blockquote><p>${inlineMarkdown(quote.join(' '))}</p></blockquote>`);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const list = renderList(lines, index, false);
      chunks.push(list.html);
      index = list.nextIndex;
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const list = renderList(lines, index, true);
      chunks.push(list.html);
      index = list.nextIndex;
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() !== '' &&
      !/^#{2,3}\s+/.test(lines[index]) &&
      !/^[-*]\s+/.test(lines[index]) &&
      !/^\d+\.\s+/.test(lines[index]) &&
      !lines[index].trim().startsWith('>') &&
      !isHorizontalRule(lines[index]) &&
      !isTableStart(lines, index)
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }

    chunks.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
  }

  return chunks.join('\n');
}

function navHref(locale: Locale, anchor: keyof typeof ANCHORS.pt) {
  return `/${locale}#${ANCHORS[locale][anchor]}`;
}

function legalHref(locale: Locale, slug: LegalSlug) {
  return `/${locale}/${slug}`;
}

function header(locale: Locale, slug: LegalSlug) {
  const ui = UI[locale];
  const other = oppositeLocale(locale);

  return `<header class="site-header">
  <div class="container nav">
    <a href="/${locale}" class="brand" aria-label="KplaWY">
      <img src="/media/v2/logo-symbol-white.webp" width="34" height="34" alt="">
      <span>KplaWY</span>
    </a>
    <nav class="desktop-nav" aria-label="Navigation">
      <a href="${navHref(locale, 'how')}">${escapeHtml(ui.how)}</a>
      <a href="${navHref(locale, 'features')}">${escapeHtml(ui.features)}</a>
      <a href="${navHref(locale, 'pricing')}">${escapeHtml(ui.pricing)}</a>
      <a href="${navHref(locale, 'faq')}">${escapeHtml(ui.faq)}</a>
      <a class="lang" href="${legalHref(other, slug)}">${escapeHtml(ui.languageLabel)}</a>
      <a class="btn" href="${navHref(locale, 'download')}">${escapeHtml(ui.downloadLabel)}</a>
    </nav>
    <button class="menu-button" data-menu type="button" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
  </div>
</header>
<nav class="mobile-nav" aria-label="Menu mobile">
  <a href="${navHref(locale, 'how')}">${escapeHtml(ui.how)}</a>
  <a href="${navHref(locale, 'features')}">${escapeHtml(ui.features)}</a>
  <a href="${navHref(locale, 'pricing')}">${escapeHtml(ui.pricing)}</a>
  <a href="${navHref(locale, 'faq')}">${escapeHtml(ui.faq)}</a>
  <a href="${legalHref(other, slug)}">${escapeHtml(ui.languageLabel)}</a>
  <a class="btn" href="${navHref(locale, 'download')}">${escapeHtml(ui.downloadLabel)}</a>
</nav>`;
}

function footer(locale: Locale) {
  const ui = UI[locale];

  return `<footer>
  <div class="container legal-footer-grid">
    <div>
      <div class="footer-brand">
        <img src="/media/v2/logo-symbol-white.webp" width="24" height="24" alt="">
        <b>KplaWY · 2026</b>
      </div>
      <p>${escapeHtml(ui.footerCopy)}</p>
    </div>
    <nav aria-label="${escapeHtml(ui.product)}">
      <b>${escapeHtml(ui.product)}</b>
      <a href="${navHref(locale, 'how')}">${escapeHtml(ui.how)}</a>
      <a href="${navHref(locale, 'features')}">${escapeHtml(ui.features)}</a>
      <a href="${navHref(locale, 'pricing')}">${escapeHtml(ui.pricing)}</a>
      <a href="${navHref(locale, 'download')}">${escapeHtml(ui.download)}</a>
    </nav>
    <nav aria-label="${escapeHtml(ui.company)}">
      <b>${escapeHtml(ui.company)}</b>
      <a href="${navHref(locale, 'about')}">${escapeHtml(ui.about)}</a>
      <a href="${navHref(locale, 'faq')}">${escapeHtml(ui.faq)}</a>
      <a href="mailto:${SUPPORT_EMAIL}">${escapeHtml(ui.support)}</a>
      <a href="mailto:${SUPPORT_EMAIL}">${escapeHtml(ui.contact)}</a>
    </nav>
    <nav aria-label="${escapeHtml(ui.legal)}">
      <b>${escapeHtml(ui.legal)}</b>
      <a href="${legalHref(locale, 'privacy')}">${escapeHtml(ui.privacy)}</a>
      <a href="${legalHref(locale, 'terms')}">${escapeHtml(ui.terms)}</a>
      <a href="${legalHref(locale, 'delete-account')}">${escapeHtml(ui.deleteAccount)}</a>
    </nav>
  </div>
  <div class="container legal-footer-bottom">
    <span>${escapeHtml(ui.copyright)}</span>
    <span>${locale === 'pt' ? '<span>PT-BR</span> · <a href="/en">EN</a>' : '<a href="/pt">PT-BR</a> · <span>EN</span>'}</span>
  </div>
</footer>`;
}

function legalSupport(locale: Locale) {
  const ui = UI[locale];

  return `<div class="legal-support">
    <strong>${escapeHtml(ui.legal)}</strong>
    <a href="${legalHref(locale, 'privacy')}">${escapeHtml(ui.privacy)}</a>
    <a href="${legalHref(locale, 'terms')}">${escapeHtml(ui.terms)}</a>
    <a href="${legalHref(locale, 'delete-account')}">${escapeHtml(ui.deleteAccount)}</a>
    <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>
  </div>`;
}

function pageHead(locale: Locale, slug: LegalSlug, title: string, description: string) {
  const ui = UI[locale];
  const canonical = `${SITE_URL}/${locale}/${slug}`;

  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${escapeHtml(title)} | KplaWY</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="pt-BR" href="${SITE_URL}/pt/${slug}">
<link rel="alternate" hreflang="en" href="${SITE_URL}/en/${slug}">
<link rel="alternate" hreflang="x-default" href="${SITE_URL}/pt/${slug}">
<meta name="robots" content="index,follow">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="${ui.ogLocale}">
<meta property="og:site_name" content="KplaWY">
<meta property="og:image" content="${SITE_URL}/assets/og/og-${locale}.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${SITE_URL}/assets/og/og-${locale}.jpg">
<meta name="theme-color" content="#020408">
<link rel="icon" href="/media/v2/logo-symbol-white.webp" type="image/webp">
<link rel="apple-touch-icon" href="/logo-icon.png">
<link rel="stylesheet" href="/assets/css/site-v2.css">
</head>`;
}

export async function renderLegalPage(slug: LegalSlug, requestedLocale: string) {
  if (!isLocale(requestedLocale)) {
    return new Response(null, {
      status: 308,
      headers: { Location: `/${routing.defaultLocale}/${slug}` },
    });
  }

  const locale = toLocale(requestedLocale);
  const meta = LEGAL_META[slug][locale];
  const markdown = await loadLegalDoc(slug, locale);
  const doc = splitMarkdown(markdown, meta.title);
  const headings = extractHeadings(doc.body);
  const html = renderMarkdown(doc.body, headings);
  const ui = UI[locale];
  const other = oppositeLocale(locale);
  const canonical = `${SITE_URL}/${locale}/${slug}`;
  const alternate = `${SITE_URL}/${other}/${slug}`;

  const page = `<!DOCTYPE html>
<html lang="${ui.lang}">
${pageHead(locale, slug, doc.title, meta.description)}
<body class="legal-body">
${header(locale, slug)}
<main class="legal-page">
  <section class="legal-hero">
    <div class="container">
      <a class="legal-back" href="/${locale}">${escapeHtml(ui.homeLabel)}</a>
      <div class="kicker">${escapeHtml(ui.legalKicker)}</div>
      <h1>${escapeHtml(doc.title)}</h1>
      <p>${escapeHtml(meta.description)}</p>
      <div class="legal-meta"><span>${canonical}</span><span>${oppositeLocale(locale).toUpperCase()}: ${alternate}</span></div>
    </div>
  </section>

  <section class="legal-shell">
    <aside class="legal-aside">
      <div class="label">${escapeHtml(ui.onThisPage)}</div>
      <nav aria-label="${escapeHtml(ui.onThisPage)}">
        ${headings.map((heading) => `<a href="#${heading.id}">${escapeHtml(heading.text)}</a>`).join('\n        ')}
      </nav>
      ${legalSupport(locale)}
    </aside>

    <article class="legal-card">
${html}
    </article>
  </section>
</main>
${footer(locale)}
<script src="/assets/js/site-v2.js" defer></script>
</body>
</html>`;

  return new Response(page, {
    headers: {
      'cache-control': 'public, max-age=0, must-revalidate',
      'content-type': 'text/html; charset=utf-8',
    },
  });
}
