import { pricingFor } from '@/lib/pricing';

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
  pauseVideo: string;
  playVideo: string;
  footer: [string, string, string];
};

const APP_STORE = 'https://apps.apple.com/app/id6761232468';
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.kplawy.instantreplay';

const COPY: Record<Locale, Copy> = {
  pt: {
    lang: 'pt-BR',
    other: 'en',
    title: 'KplaWY — Seu App de Replay para Qualquer Esporte',
    description: 'Transforme seu celular em um sistema pessoal de replay instantâneo. Salve só os segundos que importam.',
    nav: ['Como funciona', 'Controle', 'O app', 'KplaWY Pro', 'FAQ'],
    download: 'Baixar grátis',
    heroBadge: 'SISTEMA DE REPLAY PESSOAL',
    hero1: 'Seu próprio replay.',
    hero2: 'Em qualquer esporte.',
    heroText: 'O KplaWY transforma seu celular em uma câmera inteligente de replay. Grave de qualquer lugar, salve só os segundos importantes e pare de encher o celular com horas de vídeo.',
    see: 'Ver como funciona',
    micro: ['iOS e Android', 'Sem anúncios', 'Vídeos no dispositivo', 'Grava offline'],
    demoEyebrow: 'Replay real',
    demoTitle: 'Aperte depois. O KplaWY volta no tempo.',
    demoText: 'O vídeo abaixo foi capturado no app. Escolha a duração e simule o momento em que você apertaria REPLAY depois do lance.',
    demoQuestion: 'Jogue primeiro. Aperte depois.',
    demoHint: 'O KplaWY mantém um buffer vivo: quando você toca no relógio, os segundos anteriores viram replay salvo.',
    savedPrefix: 'Últimos',
    savedSuffix: 'salvos.',
    howEyebrow: 'Como funciona',
    howTitle: 'Três passos. Sem gravar horas para aproveitar segundos.',
    howText: 'A lógica inteira do KplaWY cabe em uma partida.',
    steps: [
      ['01', 'Posicione', 'Deixe o celular enquadrando a quadra, campo, praia ou treino.'],
      ['02', 'Jogue', 'O buffer fica pronto sem transformar a partida inteira em um arquivo gigante.'],
      ['03', 'Aperte depois', 'Quando o lance terminar, toque em REPLAY e salve os segundos anteriores.'],
    ],
    remoteEyebrow: 'Controle remoto',
    remoteTitle: 'Dispare o replay de onde você estiver.',
    remoteText: 'O celular pode continuar no tripé. Você salva o lance pelo dispositivo que já está com você.',
    triggers: [
      ['Apple Watch', 'Toque no pulso e salve o replay.'],
      ['Wear OS / Galaxy Watch', 'Controle rápido no Android.'],
      ['Botão Bluetooth', 'Use um gatilho físico compatível.'],
      ['Outro celular', 'Controle pela rede local.'],
    ],
    watchTitle: 'Um botão grande para o meio do jogo.',
    watchText: 'A tela do relógio segue a identidade KplaWY e deixa a ação principal impossível de confundir.',
    screensEyebrow: 'Produto real',
    screensTitle: 'Estas são as telas atuais do KplaWY.',
    screensText: 'A landing agora usa a interface atual do app no mesmo idioma do site.',
    screens: [
      ['home.webp', 'Início', 'Escolha Câmera, Controle Remoto ou Multi-Câmera.', 'Tela inicial atual do KplaWY em português'],
      ['camera.webp', 'Câmera', 'Buffer ativo e botão REPLAY sempre ao alcance.', 'Tela atual da câmera do KplaWY em português'],
      ['player.webp', 'Player', 'Assista, controle velocidade e compartilhe o replay salvo.', 'Tela atual do player de clipes do KplaWY em português'],
    ],
    plansEyebrow: 'Comece grátis',
    plansTitle: 'O essencial é Free. O sistema completo é Pro.',
    plansText: 'Teste a lógica de replay sem pagar e evolua quando precisar dos recursos avançados.',
    freePrice: 'R$ 0',
    freeSub: 'para começar',
    freeItems: ['Replay de 10 segundos', 'Clipes ilimitados', 'Câmera frontal e traseira', 'Compartilhamento rápido', 'Captura e salvamento offline'],
    proPrice: 'R$ 29,90/mês',
    proAnnual: 'ou R$ 249,90/ano',
    proBadge: '7 DIAS GRÁTIS',
    proItems: ['Replays de 22s, 30s e 50s', 'Multi-câmera sincronizada', 'Controle remoto avançado', 'Backup em nuvem', 'Marca d’água e molduras personalizadas'],
    tryPro: 'Testar o Pro',
    priceNote: 'A contratação acontece dentro do app. Preços podem variar conforme loja ou região.',
    privacyEyebrow: 'Privacidade clara',
    privacyTitle: 'Seu vídeo é seu.',
    privacyText: 'Os clipes permanecem no seu dispositivo, salvo quando você escolhe usar backup. Conta, compras, diagnóstico e melhoria do produto podem exigir dados mínimos.',
    privacyItems: [
      ['Sem rastreamento publicitário', 'O KplaWY não precisa seguir você entre apps para entregar o replay.'],
      ['Clipes no dispositivo', 'Os replays locais ficam na sua biblioteca até você compartilhar ou fazer backup.'],
      ['Backup opcional', 'A nuvem entra quando você escolhe proteger seus arquivos.'],
    ],
    storyEyebrow: 'Por que ele existe',
    storyQuote: '“Eu não queria gravar uma hora para aproveitar dez segundos.”',
    storyText: 'O KplaWY nasceu de um problema de quem joga e grava esporte: o melhor lance costuma acontecer antes de você pensar em apertar REC. A solução foi inverter a lógica.',
    faqEyebrow: 'Dúvidas rápidas',
    faqTitle: 'Antes de baixar.',
    faqs: [
      ['O KplaWY grava horas de vídeo escondido?', 'Não. O app mantém apenas uma janela recente de buffer para que você salve os últimos segundos quando decidir apertar REPLAY.'],
      ['Preciso de internet para gravar?', 'Não para capturar e salvar localmente. Conta, compras e backup podem exigir conexão.'],
      ['Posso salvar sem tocar no celular que filma?', 'Sim. Você pode usar smartwatch, botão Bluetooth ou outro celular, dependendo do modo e do dispositivo.'],
      ['O que é Multi-Câmera?', 'É o modo Pro em que vários celulares registram o mesmo lance de ângulos diferentes e respondem ao mesmo comando.'],
      ['Funciona em quais esportes?', 'Em qualquer situação em que o celular consiga enquadrar a ação: futevôlei, futebol, vôlei, beach tennis, tênis, skate, treino técnico e outros.'],
      ['Tem para iPhone e Android?', 'Sim. O KplaWY está disponível na App Store e no Google Play.'],
    ],
    finalTitle: 'Jogue primeiro. Salve depois.',
    finalText: 'O próximo grande lance não precisa avisar que vai acontecer.',
    appStore: 'Baixar na App Store',
    playStore: 'Baixar no Google Play',
    pauseVideo: 'Pausar vídeo',
    playVideo: 'Reproduzir vídeo',
    footer: ['Privacidade', 'Termos', 'Excluir conta'],
  },
  en: {
    lang: 'en',
    other: 'pt',
    title: 'KplaWY — Your Replay App for Any Sport',
    description: 'Turn your phone into a personal instant replay system. Save only the seconds that matter.',
    nav: ['How it works', 'Remote control', 'The app', 'KplaWY Pro', 'FAQ'],
    download: 'Download free',
    heroBadge: 'PERSONAL REPLAY SYSTEM',
    hero1: 'Your own replay.',
    hero2: 'For any sport.',
    heroText: 'KplaWY turns your phone into a smart replay camera. Record anywhere, save only the seconds that matter, and stop filling your phone with hours of video.',
    see: 'See how it works',
    micro: ['iOS & Android', 'No ads', 'Videos stay on device', 'Records offline'],
    demoEyebrow: 'Real replay',
    demoTitle: 'Tap afterwards. KplaWY goes back in time.',
    demoText: 'The video below was captured in the app. Pick a duration and simulate the moment you would tap REPLAY after the play.',
    demoQuestion: 'Play first. Tap after.',
    demoHint: 'KplaWY keeps a live buffer: when you tap the watch, the previous seconds become a saved replay.',
    savedPrefix: 'Last',
    savedSuffix: 'saved.',
    howEyebrow: 'How it works',
    howTitle: 'Three steps. No hours of footage for a few seconds.',
    howText: 'The entire KplaWY workflow fits inside one game.',
    steps: [
      ['01', 'Position', 'Point your phone at the court, field, beach or training area.'],
      ['02', 'Play', 'The buffer stays ready without turning the whole match into one giant file.'],
      ['03', 'Tap afterwards', 'When the play ends, hit REPLAY and save the seconds that came before.'],
    ],
    remoteEyebrow: 'Remote control',
    remoteTitle: 'Trigger replay from wherever you are.',
    remoteText: 'The camera phone can stay on the tripod. Save the play from the device already with you.',
    triggers: [
      ['Apple Watch', 'Tap your wrist and save the replay.'],
      ['Wear OS / Galaxy Watch', 'Fast control on Android.'],
      ['Bluetooth button', 'Use a compatible physical trigger.'],
      ['Another phone', 'Control it over the local network.'],
    ],
    watchTitle: 'One big button for the middle of the game.',
    watchText: 'The watch screen follows the KplaWY identity and keeps the main action impossible to miss.',
    screensEyebrow: 'Real product',
    screensTitle: 'These are the current KplaWY screens.',
    screensText: 'The landing now uses the current app interface in the same language as the site.',
    screens: [
      ['home.webp', 'Home', 'Choose Camera, Remote Control or Multi-Camera.', 'Current KplaWY home screen in English'],
      ['camera.webp', 'Camera', 'Active buffer and REPLAY always within reach.', 'Current KplaWY camera screen in English'],
      ['player.webp', 'Player', 'Watch, control speed and share the saved replay.', 'Current KplaWY clip player screen in English'],
    ],
    plansEyebrow: 'Start free',
    plansTitle: 'The essentials are Free. The complete system is Pro.',
    plansText: 'Try the replay workflow without paying, then upgrade when you need advanced features.',
    freePrice: '$0',
    freeSub: 'to get started',
    freeItems: ['10-second replay', 'Unlimited clips', 'Front and rear cameras', 'Fast sharing', 'Offline capture and saving'],
    proPrice: '$5.99/month',
    proAnnual: 'or $39.99/year',
    proBadge: '7 DAYS FREE',
    proItems: ['22s, 30s and 50s replays', 'Synchronized multi-camera', 'Advanced remote control', 'Cloud backup', 'Custom watermark and frames'],
    tryPro: 'Try Pro',
    priceNote: 'Subscription is purchased in the app. Prices may vary by storefront or region.',
    privacyEyebrow: 'Clear privacy',
    privacyTitle: 'Your video is yours.',
    privacyText: 'Clips stay on your device unless you choose backup. Account, purchase, diagnostics and product improvement can require minimal data.',
    privacyItems: [
      ['No advertising tracking', 'KplaWY does not need to follow you across apps to deliver replay.'],
      ['Clips on your device', 'Local replays remain in your library until you share or back them up.'],
      ['Optional backup', 'Cloud services are used when you choose to protect your files.'],
    ],
    storyEyebrow: 'Why it exists',
    storyQuote: '“I did not want to record an hour to use ten seconds.”',
    storyText: 'KplaWY came from a simple sports problem: the best play often happens before you think about pressing REC. The solution was to reverse the logic.',
    faqEyebrow: 'Quick questions',
    faqTitle: 'Before you download.',
    faqs: [
      ['Does KplaWY secretly record hours of video?', 'No. The app only keeps a recent buffer window so you can save the last seconds when you decide to tap REPLAY.'],
      ['Do I need internet to record?', 'Not for local capture and saving. Account, purchases and backup can require a connection.'],
      ['Can I save without touching the camera phone?', 'Yes. You can use a smartwatch, Bluetooth button or another phone, depending on the mode and device.'],
      ['What is Multi-Camera?', 'It is the Pro mode where multiple phones capture the same play from different angles and respond to the same replay command.'],
      ['Which sports work?', 'Any setup where a phone can frame the action: footvolley, soccer, volleyball, beach tennis, tennis, skate, drills and more.'],
      ['Is it available for iPhone and Android?', 'Yes. KplaWY is available on the App Store and Google Play.'],
    ],
    finalTitle: 'Play first. Save afterwards.',
    finalText: 'The next great play does not need to warn you first.',
    appStore: 'Download on the App Store',
    playStore: 'Get it on Google Play',
    pauseVideo: 'Pause video',
    playVideo: 'Play video',
    footer: ['Privacy', 'Terms', 'Delete account'],
  },
};

const SCREEN_SIZES: Record<Locale, Record<string, [number, number]>> = {
  pt: { 'home.webp': [1080, 2260], 'camera.webp': [921, 2048], 'player.webp': [921, 2048] },
  en: { 'home.webp': [1080, 2272], 'camera.webp': [921, 2048], 'player.webp': [921, 2048] },
};

function esc(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function ul(items: string[]) {
  return items.map((item) => `<li>${esc(item)}</li>`).join('');
}

function aliasAnchors(...ids: string[]) {
  return ids.map((id) => `<span class="anchor-alias" id="${id}"></span>`).join('');
}

export function renderLandingPage(locale: Locale) {
  const c = COPY[locale];
  const media = `/media/v2/${locale}`;
  const pricing = pricingFor(locale);
  const price = (value: number) => value.toFixed(2);
  const proof = [
    ['iPhone + Android', locale === 'pt' ? 'um app, qualquer quadra' : 'one app, any court'],
    ['Apple Watch + Wear OS', locale === 'pt' ? 'dispare sem voltar até a câmera' : 'trigger without walking back'],
    ['Bluetooth + phone', locale === 'pt' ? 'controle à distância' : 'control at a distance'],
    ['Multi-Camera', locale === 'pt' ? 'mais ângulos do mesmo lance' : 'more angles of the same play'],
  ].map(([a, b]) => `<div class="proof-item"><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join('');
  const steps = c.steps.map(([n, t, d]) => `<article class="step reveal"><span>${esc(n)}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('');
  const triggers = c.triggers.map(([t, d]) => `<div class="trigger"><b>${esc(t)}</b><span>${esc(d)}</span></div>`).join('');
  const screens = c.screens.map(([file, title, description, alt], index) => {
    const [width, height] = SCREEN_SIZES[locale][file];
    const load = index === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
    return `<article class="screen-card reveal"><div class="screen-phone"><img ${load} decoding="async" src="${media}/${file}" width="${width}" height="${height}" alt="${esc(alt)}"></div><h3>${esc(title)}</h3><p>${esc(description)}</p></article>`;
  }).join('');
  const privacy = c.privacyItems.map(([t, d]) => `<div class="privacy-item"><i>✓</i><div><b>${esc(t)}</b><span>${esc(d)}</span></div></div>`).join('');
  const faq = c.faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'KplaWY',
    operatingSystem: 'iOS, Android, watchOS, Wear OS',
    applicationCategory: 'SportsApplication',
    description: c.description,
    url: `https://kplawy.app/${locale}`,
    installUrl: [APP_STORE, PLAY_STORE],
    offers: [
      { '@type': 'Offer', name: 'KplaWY Free', price: '0', priceCurrency: pricing.currency },
      { '@type': 'Offer', name: 'KplaWY Pro Monthly', price: price(pricing.premiumMonthly), priceCurrency: pricing.currency },
      { '@type': 'Offer', name: 'KplaWY Pro Annual', price: price(pricing.premiumAnnual), priceCurrency: pricing.currency },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>${esc(c.title)}</title><meta name="description" content="${esc(c.description)}"><meta name="robots" content="index,follow,max-image-preview:large,max-video-preview:-1"><meta name="theme-color" content="#020408"><link rel="canonical" href="https://kplawy.app/${locale}"><link rel="alternate" hreflang="pt-BR" href="https://kplawy.app/pt"><link rel="alternate" hreflang="en" href="https://kplawy.app/en"><link rel="alternate" hreflang="x-default" href="https://kplawy.app/pt"><meta property="og:type" content="website"><meta property="og:site_name" content="KplaWY"><meta property="og:title" content="${esc(`${c.hero1} ${c.hero2}`)}"><meta property="og:description" content="${esc(c.description)}"><meta property="og:url" content="https://kplawy.app/${locale}"><meta property="og:image" content="https://kplawy.app/assets/og/og-${locale}.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(`${c.hero1} ${c.hero2}`)}"><meta name="twitter:description" content="${esc(c.description)}"><meta name="twitter:image" content="https://kplawy.app/assets/og/og-${locale}.jpg"><link rel="icon" href="/media/v2/logo-symbol-white.webp" type="image/webp"><link rel="preload" as="image" href="${media}/camera.webp"><link rel="stylesheet" href="/assets/css/site-v2.css"><script type="application/ld+json">${JSON.stringify(appSchema)}</script><script type="application/ld+json">${JSON.stringify(faqSchema)}</script></head><body><header class="site-header"><div class="container nav"><a class="brand" href="#top" aria-label="KplaWY"><img src="/media/v2/logo-symbol-white.webp" width="34" height="34" alt=""><span>KplaWY</span></a><nav class="desktop-nav" aria-label="Principal"><a href="#como">${esc(c.nav[0])}</a><a href="#controle">${esc(c.nav[1])}</a><a href="#app">${esc(c.nav[2])}</a><a href="#pro">${esc(c.nav[3])}</a><a href="#faq">${esc(c.nav[4])}</a><a class="lang" href="/${c.other}">${c.other.toUpperCase()}</a><a class="btn" href="/download">${esc(c.download)}</a></nav><button class="menu-button" data-menu type="button" aria-label="Menu" aria-expanded="false"><span></span><span></span></button></div></header><nav class="mobile-nav" aria-label="Menu mobile"><a href="#como">${esc(c.nav[0])}</a><a href="#controle">${esc(c.nav[1])}</a><a href="#app">${esc(c.nav[2])}</a><a href="#pro">${esc(c.nav[3])}</a><a href="#faq">${esc(c.nav[4])}</a><a href="/${c.other}">${c.other.toUpperCase()}</a><a class="btn" href="/download">${esc(c.download)}</a></nav><main id="top"><section class="hero"><div class="container hero-grid"><div class="hero-copy"><div class="eyebrow">${esc(c.heroBadge)}</div><h1>${esc(c.hero1)}<br><span>${esc(c.hero2)}</span></h1><p class="hero-text">${esc(c.heroText)}</p><div class="actions"><a class="btn" href="${APP_STORE}" target="_blank" rel="noopener">App Store</a><a class="ghost" href="${PLAY_STORE}" target="_blank" rel="noopener">Google Play</a><a class="ghost" href="#como">${esc(c.see)} ↓</a></div><div class="micro">${c.micro.map((x) => `<span>${esc(x)}</span>`).join('')}</div></div><div class="hero-device"><div class="glow"></div><div class="phone"><img src="${media}/camera.webp" width="921" height="2048" alt="${locale === 'pt' ? 'Tela de câmera do KplaWY com botão REPLAY' : 'KplaWY camera screen with REPLAY button'}"></div><div class="float one"><b>${locale === 'pt' ? 'VOCÊ JOGA PRIMEIRO' : 'YOU PLAY FIRST'}</b><span>${locale === 'pt' ? 'o buffer continua pronto' : 'the buffer stays ready'}</span></div><div class="float two"><b>${locale === 'pt' ? 'REPLAY SALVO' : 'REPLAY SAVED'}</b><span>${locale === 'pt' ? 'últimos segundos prontos' : 'last seconds ready'}</span></div></div></div></section><section class="proof"><div class="container proof-grid">${proof}</div></section><section class="section" id="demo"><div class="container"><div class="section-head reveal"><div class="eyebrow">${esc(c.demoEyebrow)}</div><h2>${esc(c.demoTitle)}</h2><p>${esc(c.demoText)}</p></div><div class="demo-grid"><div class="video-card reveal"><div class="video-badge">KplaWY · REAL CLIP</div><video data-autoplay autoplay muted loop playsinline preload="metadata" poster="/media/v2/demo-poster.webp" width="1280" height="720" src="/media/v2/demo.mp4"></video><button class="video-control" data-video-toggle type="button" aria-label="${esc(c.pauseVideo)}" data-play-label="${esc(c.playVideo)}" data-pause-label="${esc(c.pauseVideo)}">${esc(c.pauseVideo)}</button><div class="watch-cue" data-watch-cue><img src="/media/v2/logo-symbol-white.webp" width="26" height="26" alt=""><span><b>${locale === "pt" ? "Apertou no relógio" : "Watch tapped"}</b><small>${locale === "pt" ? "os segundos anteriores viram replay" : "the previous seconds become replay"}</small></span></div></div><div class="demo-panel reveal"><h3>${esc(c.demoQuestion)}</h3><p>${esc(c.demoHint)}</p><div class="save-flow" data-save-flow><div class="save-step active" data-flow-step="play"><span>1</span><b>${locale === "pt" ? "Lance acontece" : "Play happens"}</b><small>${locale === "pt" ? "Você continua jogando." : "You keep playing."}</small></div><div class="save-step" data-flow-step="tap"><span>2</span><b>${locale === "pt" ? "Aperta depois" : "Tap afterwards"}</b><small>${locale === "pt" ? "No relógio, botão ou outro celular." : "On watch, button, or another phone."}</small></div><div class="save-step" data-flow-step="saved"><span>3</span><b>${locale === "pt" ? "Replay salvo" : "Replay saved"}</b><small>${locale === "pt" ? "O clipe nasce do buffer." : "The clip comes from the buffer."}</small></div></div><div class="duration-row"><button data-duration="10" class="active" type="button">10s</button><button data-duration="22" type="button">22s</button><button data-duration="30" type="button">30s</button><button data-duration="50" type="button">50s</button></div><div class="timeline"><div data-fill></div></div><div class="timeline-label"><span data-seconds>10s</span><span>${locale === 'pt' ? 'AGORA' : 'NOW'}</span></div><div class="auto-save-status" data-toast data-auto-save aria-live="polite"><img src="/media/v2/logo-symbol-white.webp" width="28" height="28" alt=""><span><b>${locale === "pt" ? "Replay salvo" : "Replay saved"}</b><small>${esc(c.savedPrefix)} <span data-toast-seconds>10</span>s ${esc(c.savedSuffix)}</small></span></div></div></div></div></section><section class="section compact" id="como">${aliasAnchors('como-funciona', 'how-it-works')}<div class="container"><div class="section-head reveal"><div class="eyebrow">${esc(c.howEyebrow)}</div><h2>${esc(c.howTitle)}</h2><p>${esc(c.howText)}</p></div><div class="steps">${steps}</div></div></section><section class="section" id="controle"><div class="container"><div class="section-head reveal"><div class="eyebrow">${esc(c.remoteEyebrow)}</div><h2>${esc(c.remoteTitle)}</h2><p>${esc(c.remoteText)}</p></div><div class="remote-grid"><article class="trigger-card reveal"><div class="trigger-list">${triggers}</div></article><article class="watch-card reveal"><div><div class="eyebrow">KplaWY Watch</div><h3>${esc(c.watchTitle)}</h3><p>${esc(c.watchText)}</p></div><img src="/media/v2/watch.webp" width="432" height="432" alt="KplaWY Watch"></article></div></div></section><section class="section" id="app">${aliasAnchors('produto', 'features')}<div class="container"><div class="section-head reveal"><div class="eyebrow">${esc(c.screensEyebrow)}</div><h2>${esc(c.screensTitle)}</h2><p>${esc(c.screensText)}</p></div><div class="screens">${screens}</div></div></section><section class="section" id="pro">${aliasAnchors('planos', 'pricing')}<div class="container"><div class="section-head reveal"><div class="eyebrow">${esc(c.plansEyebrow)}</div><h2>${esc(c.plansTitle)}</h2><p>${esc(c.plansText)}</p></div><div class="plans"><article class="plan reveal"><h3>Free</h3><div class="price">${esc(c.freePrice)}</div><div class="annual">${esc(c.freeSub)}</div><ul>${ul(c.freeItems)}</ul><a class="ghost" href="/download">${esc(c.download)}</a></article><article class="plan pro reveal"><div class="pro-badge">${esc(c.proBadge)}</div><h3>KplaWY Pro</h3><div class="price">${esc(c.proPrice)}</div><div class="annual">${esc(c.proAnnual)}</div><ul>${ul(c.proItems)}</ul><a class="btn" href="/download">${esc(c.tryPro)}</a></article></div><p class="price-note">${esc(c.priceNote)}</p></div></section><section class="section compact story-section">${aliasAnchors('historia', 'story-sec')}<div class="container trust-grid"><article class="trust-card reveal"><div class="eyebrow">${esc(c.privacyEyebrow)}</div><h2>${esc(c.privacyTitle)}</h2><p>${esc(c.privacyText)}</p><div class="privacy-list">${privacy}</div></article><article class="story-card reveal"><div class="eyebrow">${esc(c.storyEyebrow)}</div><blockquote>${esc(c.storyQuote)}</blockquote><p>${esc(c.storyText)}</p></article></div></section><section class="section" id="faq"><div class="container"><div class="section-head reveal"><div class="eyebrow">${esc(c.faqEyebrow)}</div><h2>${esc(c.faqTitle)}</h2></div><div class="faq">${faq}</div></div></section><section class="final-section" id="download"><div class="container"><div class="final-card reveal"><h2>${esc(c.finalTitle)}</h2><p>${esc(c.finalText)}</p><div class="actions"><a class="btn" href="${APP_STORE}" target="_blank" rel="noopener">${esc(c.appStore)}</a><a class="ghost" href="${PLAY_STORE}" target="_blank" rel="noopener">${esc(c.playStore)}</a></div></div></div></section></main><footer><div class="container footer-row"><div class="footer-brand"><img src="/media/v2/logo-symbol-white.webp" width="24" height="24" alt=""><b>KplaWY · 2026</b></div><div><a href="/${locale}/privacy">${esc(c.footer[0])}</a> · <a href="/${locale}/terms">${esc(c.footer[1])}</a> · <a href="/${locale}/delete-account">${esc(c.footer[2])}</a></div></div></footer><div class="mobile-download"><span><b>${locale === 'pt' ? 'Seu próprio replay' : 'Your own replay'}</b><small>${locale === 'pt' ? 'Grátis para começar' : 'Free to start'}</small></span><a class="btn" href="/download">${esc(c.download)}</a></div><script src="/assets/js/site-v2.js" defer></script></body></html>`;
}
