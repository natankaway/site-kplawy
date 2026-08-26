type Locale = 'pt' | 'en';

type Copy = {
  lang: string;
  other: Locale;
  title: string;
  description: string;
  nav: string[];
  download: string;
  heroBadge: string;
  hero1: string;
  hero2: string;
  heroText: string;
  see: string;
  micro: string[];
  demoEyebrow: string;
  demoTitle: string;
  demoText: string;
  demoQuestion: string;
  demoHint: string;
  savedPrefix: string;
  savedSuffix: string;
  howEyebrow: string;
  howTitle: string;
  howText: string;
  steps: [string, string, string][];
  remoteEyebrow: string;
  remoteTitle: string;
  remoteText: string;
  triggers: [string, string][];
  watchTitle: string;
  watchText: string;
  screensEyebrow: string;
  screensTitle: string;
  screensText: string;
  screens: [string, string, string, string][];
  plansEyebrow: string;
  plansTitle: string;
  plansText: string;
  freePrice: string;
  freeSub: string;
  freeItems: string[];
  proPrice: string;
  proAnnual: string;
  proBadge: string;
  proItems: string[];
  tryPro: string;
  priceNote: string;
  privacyEyebrow: string;
  privacyTitle: string;
  privacyText: string;
  privacyItems: [string, string][];
  storyEyebrow: string;
  storyQuote: string;
  storyText: string;
  faqEyebrow: string;
  faqTitle: string;
  faqs: [string, string][];
  finalTitle: string;
  finalText: string;
  appStore: string;
  playStore: string;
  footer: [string, string, string];
};

const APP_STORE = 'https://apps.apple.com/app/id6761232468';
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.kplawy.instantreplay';

const COPY: Record<Locale, Copy> = {
  pt: {
    lang: 'pt-BR', other: 'en',
    title: 'KPLAWY — Replay instantâneo no celular para esportes',
    description: 'Transforme seu celular em um sistema de replay esportivo. O lance acontece, você aperta depois e o KPLAWY salva apenas os últimos segundos.',
    nav: ['Como funciona', 'Controle', 'O app', 'KPLAWY Pro', 'FAQ'], download: 'Baixar grátis',
    heroBadge: 'REPLAY INSTANTÂNEO NO SEU CELULAR', hero1: 'O lance já aconteceu?', hero2: 'Salve os últimos segundos.',
    heroText: 'O KPLAWY mantém os últimos segundos prontos em um buffer contínuo. Quando o ponto, gol ou manobra acontece, você aperta REPLAY depois — e salva somente o que importa.',
    see: 'Ver como funciona', micro: ['iOS + Android', 'Grava offline', 'Clipes no dispositivo', 'Sem anúncios'],
    demoEyebrow: 'EXPERIMENTE A IDEIA', demoTitle: 'Aperte depois. O KPLAWY volta no tempo.',
    demoText: 'Este é o novo vídeo gerado pelo próprio app. Escolha a duração e simule o momento em que você apertaria REPLAY depois do lance.',
    demoQuestion: 'Quanto do lance você quer salvar?', demoHint: 'O buffer continua rodando; somente a janela escolhida vira um clipe.', savedPrefix: 'Últimos', savedSuffix: 'salvos.',
    howEyebrow: 'SIMPLES DE PROPÓSITO', howTitle: 'Três passos. Sem gravar horas para aproveitar segundos.', howText: 'A lógica inteira do KPLAWY cabe em uma partida.',
    steps: [['01', 'Posicione', 'Deixe o celular enquadrando a quadra, campo, praia ou treino.'], ['02', 'Jogue', 'O buffer fica pronto sem transformar a partida inteira em um arquivo gigante.'], ['03', 'Aperte depois', 'Quando o lance terminar, toque em REPLAY e salve os segundos anteriores.']],
    remoteEyebrow: 'NÃO VOLTE ATÉ A CÂMERA', remoteTitle: 'Dispare o replay de onde você estiver.', remoteText: 'O celular pode continuar no tripé. Você salva o lance pelo dispositivo que já está com você.',
    triggers: [['Apple Watch', 'Toque no pulso e salve o replay.'], ['Wear OS / Galaxy Watch', 'Controle rápido no Android.'], ['Botão Bluetooth', 'Use um gatilho físico compatível.'], ['Outro celular', 'Controle pela rede local.']],
    watchTitle: 'Um botão grande para o meio do jogo.', watchText: 'A nova tela do relógio segue a identidade KPLAWY e deixa a ação principal impossível de confundir.',
    screensEyebrow: 'PRODUTO REAL', screensTitle: 'Estas são as telas atuais do KPLAWY.', screensText: 'A landing agora usa a interface atual do app no mesmo idioma do site.',
    screens: [['home.webp', 'Início', 'Escolha Câmera, Controle Remoto ou Multi-Câmera.', 'Tela inicial atual do KPLAWY em português'], ['camera.webp', 'Câmera', 'Buffer ativo e botão REPLAY sempre ao alcance.', 'Tela atual da câmera do KPLAWY em português'], ['clips.webp', 'Clipes', 'Biblioteca por data, filtros, favoritos e backup.', 'Tela atual de clipes do KPLAWY em português'], ['multicam.webp', 'Multi-câmera', 'Host principal e câmeras secundárias sincronizadas.', 'Tela atual de Multi-Câmera do KPLAWY em português']],
    plansEyebrow: 'COMECE GRÁTIS', plansTitle: 'O essencial é Free. O sistema completo é Pro.', plansText: 'Teste a lógica de replay sem pagar e evolua quando precisar dos recursos avançados.',
    freePrice: 'R$ 0', freeSub: 'para começar', freeItems: ['Replay de 10 segundos', 'Clipes ilimitados', 'Câmera frontal e traseira', 'Compartilhamento rápido', 'Captura e salvamento offline'],
    proPrice: 'R$ 29,90/mês', proAnnual: 'ou R$ 249,90/ano', proBadge: '7 DIAS GRÁTIS', proItems: ['Replays de 22s, 30s e 50s', 'Multi-câmera sincronizada', 'Controle remoto avançado', 'Backup em nuvem', 'Marca d’água e molduras personalizadas'], tryPro: 'Testar o Pro', priceNote: 'A contratação acontece dentro do app. Preços podem variar conforme loja ou região.',
    privacyEyebrow: 'PRIVACIDADE CLARA', privacyTitle: 'Seu vídeo é seu.', privacyText: 'Os clipes permanecem no seu dispositivo, salvo quando você escolhe usar backup. Conta, compras, diagnóstico e melhoria do produto podem exigir dados mínimos.',
    privacyItems: [['Sem rastreamento publicitário', 'O KPLAWY não precisa seguir você entre apps para entregar o replay.'], ['Clipes no dispositivo', 'Os replays locais ficam na sua biblioteca até você compartilhar ou fazer backup.'], ['Backup opcional', 'A nuvem entra quando você escolhe proteger seus arquivos.']],
    storyEyebrow: 'POR QUE ELE EXISTE', storyQuote: '“Eu não queria gravar uma hora para aproveitar dez segundos.”', storyText: 'O KPLAWY nasceu de um problema de quem joga e grava esporte: o melhor lance costuma acontecer antes de você pensar em apertar REC. A solução foi inverter a lógica.',
    faqEyebrow: 'DÚVIDAS RÁPIDAS', faqTitle: 'Antes de baixar.',
    faqs: [['O KPLAWY grava horas de vídeo escondido?', 'Não. O app mantém apenas uma janela recente de buffer para que você salve os últimos segundos quando decidir apertar REPLAY.'], ['Preciso de internet para gravar?', 'Não para capturar e salvar localmente. Conta, compras e backup podem exigir conexão.'], ['Posso salvar sem tocar no celular que filma?', 'Sim. Você pode usar smartwatch, botão Bluetooth ou outro celular, dependendo do modo e do dispositivo.'], ['O que é Multi-Câmera?', 'É o modo Pro em que vários celulares registram o mesmo lance de ângulos diferentes e respondem ao mesmo comando.'], ['Funciona em quais esportes?', 'Em qualquer situação em que o celular consiga enquadrar a ação: futevôlei, futebol, vôlei, beach tennis, tênis, skate, treino técnico e outros.'], ['Tem para iPhone e Android?', 'Sim. O KPLAWY está disponível na App Store e no Google Play.']],
    finalTitle: 'Jogue primeiro. Salve depois.', finalText: 'O próximo grande lance não precisa avisar que vai acontecer.', appStore: 'Baixar na App Store', playStore: 'Baixar no Google Play', footer: ['Privacidade', 'Termos', 'Excluir conta'],
  },
  en: {
    lang: 'en', other: 'pt',
    title: 'KPLAWY — Instant sports replay on your phone',
    description: 'Turn your phone into a sports replay system. The play happens, you tap afterwards, and KPLAWY saves only the last seconds.',
    nav: ['How it works', 'Remote control', 'The app', 'KPLAWY Pro', 'FAQ'], download: 'Download free',
    heroBadge: 'INSTANT REPLAY ON YOUR PHONE', hero1: 'The play already happened?', hero2: 'Save the last seconds.',
    heroText: 'KPLAWY keeps the last seconds ready in a continuous buffer. When the point, goal or trick happens, tap REPLAY afterwards — and save only what matters.',
    see: 'See how it works', micro: ['iOS + Android', 'Records offline', 'Clips on device', 'No ads'],
    demoEyebrow: 'TRY THE IDEA', demoTitle: 'Tap afterwards. KPLAWY goes back in time.',
    demoText: 'This is the new video generated by the app itself. Pick a duration and simulate the moment you would tap REPLAY after the play.',
    demoQuestion: 'How much of the play do you want to save?', demoHint: 'The buffer keeps moving; only the selected window becomes a clip.', savedPrefix: 'Last', savedSuffix: 'saved.',
    howEyebrow: 'SIMPLE ON PURPOSE', howTitle: 'Three steps. No hours of footage for a few seconds.', howText: 'The entire KPLAWY workflow fits inside one game.',
    steps: [['01', 'Position', 'Point your phone at the court, field, beach or training area.'], ['02', 'Play', 'The buffer stays ready without turning the whole match into one giant file.'], ['03', 'Tap afterwards', 'When the play ends, hit REPLAY and save the seconds that came before.']],
    remoteEyebrow: 'DO NOT WALK BACK TO THE CAMERA', remoteTitle: 'Trigger replay from wherever you are.', remoteText: 'The camera phone can stay on the tripod. Save the play from the device already with you.',
    triggers: [['Apple Watch', 'Tap your wrist and save the replay.'], ['Wear OS / Galaxy Watch', 'Fast control on Android.'], ['Bluetooth button', 'Use a compatible physical trigger.'], ['Another phone', 'Control it over the local network.']],
    watchTitle: 'One big button for the middle of the game.', watchText: 'The new watch screen follows the KPLAWY identity and keeps the main action impossible to miss.',
    screensEyebrow: 'REAL PRODUCT', screensTitle: 'These are the current KPLAWY screens.', screensText: 'The landing now uses the current app interface in the same language as the site.',
    screens: [['home.webp', 'Home', 'Choose Camera, Remote Control or Multi-Camera.', 'Current KPLAWY home screen in English'], ['camera.webp', 'Camera', 'Active buffer and REPLAY always within reach.', 'Current KPLAWY camera screen in English'], ['clips.webp', 'Clips', 'Library by date, filters, favorites and backup.', 'Current KPLAWY clips screen in English'], ['multicam.webp', 'Multi-Camera', 'Primary host and synchronized secondary cameras.', 'Current KPLAWY Multi-Camera screen in English']],
    plansEyebrow: 'START FREE', plansTitle: 'The essentials are Free. The complete system is Pro.', plansText: 'Try the replay workflow without paying, then upgrade when you need advanced features.',
    freePrice: '$0', freeSub: 'to get started', freeItems: ['10-second replay', 'Unlimited clips', 'Front and rear cameras', 'Fast sharing', 'Offline capture and saving'],
    proPrice: '$4.99/month', proAnnual: 'or $39.99/year', proBadge: '7 DAYS FREE', proItems: ['22s, 30s and 50s replays', 'Synchronized multi-camera', 'Advanced remote control', 'Cloud backup', 'Custom watermark and frames'], tryPro: 'Try Pro', priceNote: 'Subscription is purchased in the app. Prices may vary by storefront or region.',
    privacyEyebrow: 'CLEAR PRIVACY', privacyTitle: 'Your video is yours.', privacyText: 'Clips stay on your device unless you choose backup. Account, purchase, diagnostics and product improvement can require minimal data.',
    privacyItems: [['No advertising tracking', 'KPLAWY does not need to follow you across apps to deliver replay.'], ['Clips on your device', 'Local replays remain in your library until you share or back them up.'], ['Optional backup', 'Cloud services are used when you choose to protect your files.']],
    storyEyebrow: 'WHY IT EXISTS', storyQuote: '“I did not want to record an hour to use ten seconds.”', storyText: 'KPLAWY came from a simple sports problem: the best play often happens before you think about pressing REC. The solution was to reverse the logic.',
    faqEyebrow: 'QUICK QUESTIONS', faqTitle: 'Before you download.',
    faqs: [['Does KPLAWY secretly record hours of video?', 'No. The app only keeps a recent buffer window so you can save the last seconds when you decide to tap REPLAY.'], ['Do I need internet to record?', 'Not for local capture and saving. Account, purchases and backup can require a connection.'], ['Can I save without touching the camera phone?', 'Yes. You can use a smartwatch, Bluetooth button or another phone, depending on the mode and device.'], ['What is Multi-Camera?', 'It is the Pro mode where multiple phones capture the same play from different angles and respond to the same replay command.'], ['Which sports work?', 'Any setup where a phone can frame the action: footvolley, soccer, volleyball, beach tennis, tennis, skate, drills and more.'], ['Is it available for iPhone and Android?', 'Yes. KPLAWY is available on the App Store and Google Play.']],
    finalTitle: 'Play first. Save afterwards.', finalText: 'The next great play does not need to warn you first.', appStore: 'Download on the App Store', playStore: 'Get it on Google Play', footer: ['Privacy', 'Terms', 'Delete account'],
  },
};

function esc(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
const ul = (items: string[]) => items.map((x) => `<li>${esc(x)}</li>`).join('');

export function renderLandingPage(locale: Locale) {
  const c = COPY[locale];
  const media = `/media/v2/${locale}`;
  const proof = [
    ['iPhone + Android', locale === 'pt' ? 'um app, qualquer quadra' : 'one app, any court'],
    ['Apple Watch + Wear OS', locale === 'pt' ? 'dispare sem voltar até a câmera' : 'trigger without walking back'],
    ['Bluetooth + phone', locale === 'pt' ? 'controle à distância' : 'control at a distance'],
    ['Multi-Camera', locale === 'pt' ? 'mais ângulos do mesmo lance' : 'more angles of the same play'],
  ].map(([a, b]) => `<div class="proof-item"><b>${a}</b><span>${b}</span></div>`).join('');
  const steps = c.steps.map(([n, t, d]) => `<article class="step reveal"><span>${n}</span><h3>${t}</h3><p>${d}</p></article>`).join('');
  const triggers = c.triggers.map(([t, d]) => `<div class="trigger"><b>${t}</b><span>${d}</span></div>`).join('');
  const screens = c.screens.map(([file, title, description, alt]) => `<article class="screen-card reveal"><div class="screen-phone"><img loading="lazy" decoding="async" src="${media}/${file}" alt="${esc(alt)}"></div><h3>${title}</h3><p>${description}</p></article>`).join('');
  const privacy = c.privacyItems.map(([t, d]) => `<div class="privacy-item"><i>✓</i><div><b>${t}</b><span>${d}</span></div></div>`).join('');
  const faq = c.faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('');

  const appSchema = {
    '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'KPLAWY',
    operatingSystem: 'iOS, Android, watchOS, Wear OS', applicationCategory: 'SportsApplication',
    description: c.description, url: `https://kplawy.app/${locale}`, installUrl: [APP_STORE, PLAY_STORE],
    offers: locale === 'pt'
      ? [{ '@type': 'Offer', name: 'KPLAWY Free', price: '0', priceCurrency: 'BRL' }, { '@type': 'Offer', name: 'KPLAWY Pro Monthly', price: '29.90', priceCurrency: 'BRL' }, { '@type': 'Offer', name: 'KPLAWY Pro Annual', price: '249.90', priceCurrency: 'BRL' }]
      : [{ '@type': 'Offer', name: 'KPLAWY Free', price: '0', priceCurrency: 'USD' }, { '@type': 'Offer', name: 'KPLAWY Pro Monthly', price: '4.99', priceCurrency: 'USD' }, { '@type': 'Offer', name: 'KPLAWY Pro Annual', price: '39.99', priceCurrency: 'USD' }],
  };
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: c.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };

  return `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>${esc(c.title)}</title><meta name="description" content="${esc(c.description)}"><meta name="robots" content="index,follow,max-image-preview:large,max-video-preview:-1"><meta name="theme-color" content="#020408"><link rel="canonical" href="https://kplawy.app/${locale}"><link rel="alternate" hreflang="pt-BR" href="https://kplawy.app/pt"><link rel="alternate" hreflang="en" href="https://kplawy.app/en"><link rel="alternate" hreflang="x-default" href="https://kplawy.app/pt"><meta property="og:type" content="website"><meta property="og:site_name" content="KPLAWY"><meta property="og:title" content="${esc(`${c.hero1} ${c.hero2}`)}"><meta property="og:description" content="${esc(c.description)}"><meta property="og:url" content="https://kplawy.app/${locale}"><meta property="og:image" content="https://kplawy.app/assets/og/og-${locale}.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(`${c.hero1} ${c.hero2}`)}"><meta name="twitter:description" content="${esc(c.description)}"><meta name="twitter:image" content="https://kplawy.app/assets/og/og-${locale}.jpg"><link rel="icon" href="/media/v2/logo-symbol-white.webp" type="image/webp"><link rel="stylesheet" href="/assets/css/site-v2.css"><script type="application/ld+json">${JSON.stringify(appSchema)}</script><script type="application/ld+json">${JSON.stringify(faqSchema)}</script></head><body><header class="site-header"><div class="container nav"><a class="brand" href="#top"><img src="/media/v2/logo-symbol-white.webp" alt=""><span>KPLAWY</span></a><nav class="desktop-nav"><a href="#como">${c.nav[0]}</a><a href="#controle">${c.nav[1]}</a><a href="#app">${c.nav[2]}</a><a href="#pro">${c.nav[3]}</a><a href="#faq">${c.nav[4]}</a><a class="lang" href="/${c.other}">${c.other.toUpperCase()}</a><a class="btn" href="/download">${c.download}</a></nav><button class="menu-button" data-menu type="button" aria-label="Menu"><span></span><span></span></button></div></header><nav class="mobile-nav"><a href="#como">${c.nav[0]}</a><a href="#controle">${c.nav[1]}</a><a href="#app">${c.nav[2]}</a><a href="#pro">${c.nav[3]}</a><a href="#faq">${c.nav[4]}</a><a href="/${c.other}">${c.other.toUpperCase()}</a><a class="btn" href="/download">${c.download}</a></nav><main id="top"><section class="hero"><div class="container hero-grid"><div class="hero-copy"><div class="eyebrow">${c.heroBadge}</div><h1>${c.hero1}<br><span>${c.hero2}</span></h1><p class="hero-text">${c.heroText}</p><div class="actions"><a class="btn" href="${APP_STORE}" target="_blank" rel="noopener">App Store</a><a class="ghost" href="${PLAY_STORE}" target="_blank" rel="noopener">Google Play</a><a class="ghost" href="#demo">${c.see} ↓</a></div><div class="micro">${c.micro.map((x) => `<span>${x}</span>`).join('')}</div></div><div class="hero-device"><div class="glow"></div><div class="phone"><img src="${media}/camera.webp" alt="KPLAWY camera"></div><div class="float one"><b>${locale === 'pt' ? 'VOCÊ JOGA PRIMEIRO' : 'YOU PLAY FIRST'}</b><span>${locale === 'pt' ? 'o buffer continua pronto' : 'the buffer stays ready'}</span></div><div class="float two"><b>${locale === 'pt' ? 'REPLAY SALVO' : 'REPLAY SAVED'}</b><span>${locale === 'pt' ? 'últimos segundos · pronto' : 'last seconds · ready'}</span></div></div></div></section><section class="proof"><div class="container proof-grid">${proof}</div></section><section class="section" id="demo"><div class="container"><div class="section-head reveal"><div class="eyebrow">${c.demoEyebrow}</div><h2>${c.demoTitle}</h2><p>${c.demoText}</p></div><div class="demo-grid"><div class="video-card reveal"><div class="video-badge">KPLAWY · REAL CLIP</div><video data-autoplay autoplay muted loop playsinline preload="metadata" src="/media/v2/demo.mp4"></video></div><div class="demo-panel reveal"><h3>${c.demoQuestion}</h3><p>${c.demoHint}</p><div class="duration-row"><button data-duration="10" class="active">10s</button><button data-duration="22">22s</button><button data-duration="30">30s</button><button data-duration="50">50s</button></div><div class="timeline"><div data-fill></div></div><div class="timeline-label"><span data-seconds>10s</span><span>${locale === 'pt' ? 'AGORA' : 'NOW'}</span></div><button class="replay" data-replay><img src="/media/v2/logo-symbol-white.webp" alt="">REPLAY</button><div class="toast" data-toast>✓ ${c.savedPrefix} <b data-toast-seconds>10</b>s ${c.savedSuffix}</div></div></div></div></section><section class="section compact" id="como"><div class="container"><div class="section-head reveal"><div class="eyebrow">${c.howEyebrow}</div><h2>${c.howTitle}</h2><p>${c.howText}</p></div><div class="steps">${steps}</div></div></section><section class="section" id="controle"><div class="container"><div class="section-head reveal"><div class="eyebrow">${c.remoteEyebrow}</div><h2>${c.remoteTitle}</h2><p>${c.remoteText}</p></div><div class="remote-grid"><article class="trigger-card reveal"><div class="trigger-list">${triggers}</div></article><article class="watch-card reveal"><div><div class="eyebrow">KPLAWY WATCH</div><h3>${c.watchTitle}</h3><p>${c.watchText}</p></div><img src="/media/v2/watch.webp" alt="KPLAWY Watch"></article></div></div></section><section class="section" id="app"><div class="container"><div class="section-head reveal"><div class="eyebrow">${c.screensEyebrow}</div><h2>${c.screensTitle}</h2><p>${c.screensText}</p></div><div class="screens">${screens}</div></div></section><section class="section" id="pro"><div class="container"><div class="section-head reveal"><div class="eyebrow">${c.plansEyebrow}</div><h2>${c.plansTitle}</h2><p>${c.plansText}</p></div><div class="plans"><article class="plan reveal"><h3>Free</h3><div class="price">${c.freePrice}</div><div class="annual">${c.freeSub}</div><ul>${ul(c.freeItems)}</ul><a class="ghost" href="/download">${c.download}</a></article><article class="plan pro reveal"><div class="pro-badge">${c.proBadge}</div><h3>KPLAWY Pro</h3><div class="price">${c.proPrice}</div><div class="annual">${c.proAnnual}</div><ul>${ul(c.proItems)}</ul><a class="btn" href="/download">${c.tryPro}</a></article></div><p class="price-note">${c.priceNote}</p></div></section><section class="section compact"><div class="container trust-grid"><article class="trust-card reveal"><div class="eyebrow">${c.privacyEyebrow}</div><h2>${c.privacyTitle}</h2><p>${c.privacyText}</p><div class="privacy-list">${privacy}</div></article><article class="story-card reveal"><div class="eyebrow">${c.storyEyebrow}</div><blockquote>${c.storyQuote}</blockquote><p>${c.storyText}</p></article></div></section><section class="section" id="faq"><div class="container"><div class="section-head reveal"><div class="eyebrow">${c.faqEyebrow}</div><h2>${c.faqTitle}</h2></div><div class="faq">${faq}</div></div></section><section class="final-section"><div class="container"><div class="final-card reveal"><h2>${c.finalTitle}</h2><p>${c.finalText}</p><div class="actions"><a class="btn" href="${APP_STORE}" target="_blank" rel="noopener">${c.appStore}</a><a class="ghost" href="${PLAY_STORE}" target="_blank" rel="noopener">${c.playStore}</a></div></div></div></section></main><footer><div class="container footer-row"><div class="footer-brand"><img src="/media/v2/logo-symbol-white.webp" alt=""><b>KPLAWY · 2026</b></div><div><a href="/${locale}/privacy">${c.footer[0]}</a> · <a href="/${locale}/terms">${c.footer[1]}</a> · <a href="/${locale}/delete-account">${c.footer[2]}</a></div></div></footer><div class="mobile-download"><a class="btn" href="/download">${c.download}</a></div><script src="/assets/js/site-v2.js" defer></script></body></html>`;
}
