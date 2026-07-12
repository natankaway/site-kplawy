import type { Locale } from '@/i18n/routing';

/**
 * Guias de conteúdo (hub /guia) — corpo dos textos vive aqui, não em
 * messages/*.json: são documentos longos por locale, não strings de chrome.
 * Cada guia rende uma rota estática em /[locale]/guia/[slug].
 */

export type GuideSection = {
  heading: string;
  paragraphs: string[];
};

export type Guide = {
  slug: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  body: Record<Locale, GuideSection[]>;
};

export const guides: Guide[] = [
  {
    slug: 'como-gravar-lance-depois-que-aconteceu',
    title: {
      pt: 'Como gravar o lance DEPOIS que ele aconteceu (replay retroativo)',
      en: 'How to record the play AFTER it happened (retroactive replay)',
    },
    description: {
      pt: 'Entenda o buffer contínuo: por que dá pra salvar um lance que já passou sem apertar gravar antes, e o passo a passo no KplaWY.',
      en: 'Understand the continuous buffer: why you can save a play that already happened without pressing record first, and the step-by-step in KplaWY.',
    },
    body: {
      pt: [
        {
          heading: 'O lance nunca avisa quando vai acontecer',
          paragraphs: [
            'Quem joga vôlei, futevôlei ou beach tennis conhece a cena: o ponto mais bonito do dia acontece exatamente quando ninguém estava filmando. Você lembra do lance, o grupo comenta o lance no intervalo, mas o vídeo simplesmente não existe.',
            'A solução tradicional é deixar o celular gravando o jogo inteiro. Funciona, mas gera um arquivo gigante que ninguém vai assistir, esquenta o aparelho e ainda te obriga a garimpar duas horas de vídeo atrás dos dez segundos que interessam.',
            'Existe um caminho melhor: o replay retroativo. Em vez de gravar tudo, o app guarda continuamente só os últimos segundos — e você decide salvar depois que o lance acontece.',
          ],
        },
        {
          heading: 'Como é possível gravar algo que já passou?',
          paragraphs: [
            'O truque se chama buffer contínuo (ou buffer circular). Pense numa esteira de vídeo que nunca para: a câmera grava o tempo todo, mas só mantém os últimos segundos na memória. O que passa disso é descartado automaticamente.',
            'Quando você toca no botão de replay, o app pega exatamente o trecho que está nessa esteira — os últimos 5, 10, 22, 30 ou 50 segundos, dependendo da sua configuração — e salva como um clipe permanente.',
            'Ou seja: você não precisa prever o lance nem apertar gravar antes. A câmera já viu tudo; o seu toque só diz "isso aqui vale guardar". É o mesmo princípio do replay da transmissão de TV, rodando no seu celular.',
          ],
        },
        {
          heading: 'RAM vs armazenamento: por que o buffer não lota o celular',
          paragraphs: [
            'Uma dúvida comum: se o app grava o tempo todo, ele não enche o armazenamento? Não — e a razão é onde o buffer vive. O KplaWY mantém o buffer na memória RAM do aparelho, não no armazenamento.',
            'A RAM é a memória de trabalho do celular: rápida e volátil. O vídeo circula por ela e é sobrescrito continuamente, sem gravar nada no disco. Só quando você salva um replay é que aquele trecho vira um arquivo de verdade na sua galeria.',
            'Na prática, duas horas de jogo podem terminar com meia dúzia de clipes de alguns segundos cada — alguns megabytes — em vez de um vídeo único de vários gigabytes.',
          ],
        },
        {
          heading: 'Passo a passo: salvando um replay no KplaWY',
          paragraphs: [
            'Primeiro, posicione o celular com a quadra inteira no enquadramento — um tripé ou um suporte na grade resolve. Depois, escolha a duração do buffer nas configurações: no plano gratuito, até 10 segundos; no KplaWY Pro, também 22, 30 ou 50 segundos.',
            'Toque para iniciar a captura e volte pro jogo. O app fica gravando continuamente, descartando o que não interessa. Aconteceu o lance? Toque em REPLAY — na tela do celular, no smartwatch ou num botão Bluetooth — e os últimos segundos são salvos na hora.',
            'No intervalo, revise os clipes na galeria do app e compartilhe com o grupo. Tudo fica no seu aparelho: nada sobe pra nuvem sem você mandar.',
          ],
        },
        {
          heading: 'O buffer gasta meu armazenamento ou minha internet?',
          paragraphs: [
            'Não. O buffer roda na RAM e é descartado continuamente; só os replays que você salvar ocupam espaço. E a captura funciona 100% offline — internet só é necessária pra login, assinatura e backup opcional.',
          ],
        },
        {
          heading: 'Quantos segundos consigo salvar depois do lance?',
          paragraphs: [
            'Depende da duração configurada: o buffer guarda entre 5 e 50 segundos. No plano gratuito, até 10 segundos — suficiente pra maioria dos pontos de vôlei e futevôlei. O KplaWY Pro destrava 22, 30 e 50 segundos, útil pra rallys longos ou jogadas armadas desde o saque.',
          ],
        },
        {
          heading: 'E se eu demorar pra apertar o botão?',
          paragraphs: [
            'O toque salva o que está no buffer naquele instante. Se o buffer é de 22 segundos e você toca 5 segundos depois do ponto, o clipe cobre os 22 segundos anteriores ao toque — o lance está lá dentro. A dica é configurar um buffer com folga em relação ao seu tempo de reação.',
          ],
        },
      ],
      en: [
        {
          heading: 'The play never warns you before it happens',
          paragraphs: [
            "Anyone who plays volleyball, footvolley or beach tennis knows the scene: the best point of the day happens exactly when nobody was filming. You remember the play, the group talks about it during the break, but the video simply doesn't exist.",
            'The traditional fix is leaving your phone recording the entire game. It works, but it produces a huge file nobody will ever watch, heats up the device, and forces you to dig through two hours of footage for the ten seconds that matter.',
            'There is a better way: retroactive replay. Instead of recording everything, the app continuously keeps only the last few seconds — and you decide to save after the play happens.',
          ],
        },
        {
          heading: 'How can you record something that already happened?',
          paragraphs: [
            'The trick is called a continuous buffer (or circular buffer). Picture a video conveyor belt that never stops: the camera records all the time, but only keeps the last few seconds in memory. Anything older is discarded automatically.',
            'When you tap the replay button, the app grabs exactly what is on that belt — the last 5, 10, 22, 30 or 50 seconds, depending on your settings — and saves it as a permanent clip.',
            'In other words: you don\'t need to predict the play or press record beforehand. The camera already saw everything; your tap just says "this one is worth keeping". It\'s the same principle as a TV broadcast replay, running on your phone.',
          ],
        },
        {
          heading: "RAM vs storage: why the buffer doesn't fill up your phone",
          paragraphs: [
            "A common question: if the app records all the time, doesn't it fill up my storage? No — and the reason is where the buffer lives. KplaWY keeps the buffer in the device's RAM, not in storage.",
            'RAM is the phone\'s working memory: fast and volatile. Video cycles through it and is continuously overwritten, without writing anything to disk. Only when you save a replay does that segment become a real file in your gallery.',
            'In practice, two hours of play can end with half a dozen clips of a few seconds each — a few megabytes — instead of a single multi-gigabyte video.',
          ],
        },
        {
          heading: 'Step by step: saving a replay in KplaWY',
          paragraphs: [
            'First, position your phone with the whole court in frame — a tripod or a fence mount does the job. Then pick the buffer duration in settings: up to 10 seconds on the free plan; 22, 30 or 50 seconds as well on KplaWY Pro.',
            "Tap to start capturing and go back to the game. The app keeps recording continuously, discarding what doesn't matter. Did the play just happen? Tap REPLAY — on the phone screen, on your smartwatch, or on a Bluetooth button — and the last seconds are saved instantly.",
            'During the break, review the clips in the app gallery and share them with the group. Everything stays on your device: nothing goes to the cloud unless you send it.',
          ],
        },
        {
          heading: 'Does the buffer use my storage or my data plan?',
          paragraphs: [
            'No. The buffer runs in RAM and is continuously discarded; only the replays you save take up space. Capture works 100% offline — internet is only needed for login, subscription, and optional backup.',
          ],
        },
        {
          heading: 'How many seconds can I save after the play?',
          paragraphs: [
            'It depends on the configured duration: the buffer holds between 5 and 50 seconds. Up to 10 seconds on the free plan — enough for most volleyball and footvolley points. KplaWY Pro unlocks 22, 30 and 50 seconds, useful for long rallies or plays built from the serve.',
          ],
        },
        {
          heading: 'What if I take too long to press the button?',
          paragraphs: [
            "The tap saves whatever is in the buffer at that instant. If the buffer is 22 seconds and you tap 5 seconds after the point, the clip covers the 22 seconds before the tap — the play is in there. The tip is to set a buffer with headroom over your reaction time.",
          ],
        },
      ],
    },
  },
  {
    slug: 'como-gravar-lances-de-volei-sem-camera',
    title: {
      pt: 'Como gravar lances de vôlei e futevôlei sem operar a câmera',
      en: 'How to record volleyball and footvolley plays without operating the camera',
    },
    description: {
      pt: 'Setup do celular na quadra, enquadramento certo, quem salva o replay e como usar smartwatch ou botão Bluetooth pra não parar o jogo.',
      en: 'Phone setup at the court, the right framing, who saves the replay, and how to use a smartwatch or Bluetooth button without stopping the game.',
    },
    body: {
      pt: [
        {
          heading: 'Ninguém vai pra quadra pra ser cinegrafista',
          paragraphs: [
            'O maior problema de filmar o próprio jogo é simples: você está jogando. Pedir pra alguém segurar o celular funciona por dez minutos — depois a pessoa quer jogar também, e a câmera volta pra mochila.',
            'A boa notícia é que, com replay retroativo, ninguém precisa operar a câmera. O celular fica parado num ponto fixo, gravando em buffer contínuo, e o replay é salvo com um toque à distância. Este guia mostra como montar esse setup do zero.',
          ],
        },
        {
          heading: 'Onde apoiar o celular na quadra?',
          paragraphs: [
            'O ideal é um tripé simples de celular, posicionado atrás da linha de fundo ou na lateral, fora da zona de bolada. Se a quadra tem grade ou alambrado, um suporte de garra (aqueles de bicicleta ou tripé flexível) prende o celular na altura que você quiser — é o setup mais comum em arenas de beach tennis e futevôlei.',
            'Altura faz diferença: entre 1,5 e 2 metros o enquadramento pega a quadra com pouca distorção e sem que a rede esconda o fundo. Evite deixar o aparelho no chão — além do ângulo ruim, é convite pra areia e bolada.',
            'Se o sol estiver forte, procure posicionar o celular com o sol atrás dele (nunca de frente pra lente) e, se possível, numa sombra — isso ajuda a imagem e a temperatura do aparelho.',
          ],
        },
        {
          heading: 'Qual enquadramento pega o lance inteiro?',
          paragraphs: [
            'Grave na horizontal e enquadre a quadra inteira, com uma margem de folga nas laterais pra não cortar o jogador que sai da quadra pra buscar a bola. Nos apps de replay, o que importa é o contexto do lance — o saque, a defesa, o ataque — e não um zoom fechado.',
            'Um teste rápido antes de começar: salve um replay de teste, assista e confira se as duas metades da quadra aparecem por completo. Ajustar 10 centímetros de inclinação agora evita descobrir depois que metade dos pontos ficou fora do quadro.',
          ],
        },
        {
          heading: 'Quem salva o replay durante o jogo?',
          paragraphs: [
            'Em roda de amigos, o mais prático é quem está de fora esperando pra jogar: a pessoa fica com o celular de controle ou simplesmente toca na tela do aparelho que está gravando. Como salvar é um toque único — não é preciso "operar" nada — qualquer um faz.',
            'Jogando 2x2 sem ninguém de fora? Aí entra o controle no pulso: o próprio jogador salva o lance segundos depois do ponto, sem sair da quadra. Como o buffer é retroativo, dá tempo de comemorar primeiro e salvar depois.',
          ],
        },
        {
          heading: 'Smartwatch e botão Bluetooth: replay sem tocar no celular',
          paragraphs: [
            'O KplaWY conecta com Apple Watch e Galaxy Watch: um toque no pulso salva o replay instantaneamente. É a opção mais confortável pra quem joga, porque o relógio já está no braço e não atrapalha o movimento.',
            'Outra opção barata é um botão Bluetooth (aqueles disparadores de selfie), que pode ficar preso no poste da rede ou no bolso de quem está de fora. No KplaWY Pro, há ainda o controle remoto com live preview: um segundo celular mostra o que a câmera está vendo e salva o replay à distância.',
          ],
        },
        {
          heading: 'Dicas de bateria pra aguentar a manhã inteira',
          paragraphs: [
            'Gravação contínua consome bateria como qualquer app de câmera. Pra esticar a autonomia: reduza o brilho da tela ao mínimo, ative o modo de economia de bateria do KplaWY, use um buffer menor se não precisar de clipes longos e feche os outros apps antes de começar.',
            'Pra jogos longos, um power bank pendurado junto ao tripé resolve de vez. E lembre do calor: celular no sol direto esquenta e reduz o desempenho — sombra ou uma cobertura simples fazem diferença real na praia.',
          ],
        },
      ],
      en: [
        {
          heading: 'Nobody goes to the court to be a camera operator',
          paragraphs: [
            "The biggest problem with filming your own game is simple: you are playing. Asking someone to hold the phone works for ten minutes — then they want to play too, and the camera goes back into the bag.",
            'The good news is that with retroactive replay, nobody needs to operate the camera. The phone sits at a fixed spot, recording into a continuous buffer, and the replay is saved with one remote tap. This guide shows how to build that setup from scratch.',
          ],
        },
        {
          heading: 'Where should the phone go at the court?',
          paragraphs: [
            'Ideally, a simple phone tripod placed behind the baseline or on the sideline, out of the ball-strike zone. If the court has a fence, a clamp mount (bike-style or flexible tripod) holds the phone at any height you want — the most common setup at beach tennis and footvolley arenas.',
            "Height matters: between 1.5 and 2 meters, the framing captures the court with little distortion and without the net hiding the back. Avoid leaving the device on the ground — besides the bad angle, it's an invitation for sand and stray balls.",
            'If the sun is strong, position the phone with the sun behind it (never facing the lens) and, if possible, in the shade — it helps both the image and the device temperature.',
          ],
        },
        {
          heading: 'Which framing captures the whole play?',
          paragraphs: [
            "Record in landscape and frame the entire court, with some margin on the sides so you don't cut off a player chasing the ball out of bounds. In replay apps, what matters is the context of the play — the serve, the dig, the attack — not a tight zoom.",
            'A quick test before starting: save a test replay, watch it, and check that both halves of the court appear in full. Adjusting a few degrees of tilt now beats discovering later that half the points were out of frame.',
          ],
        },
        {
          heading: 'Who saves the replay during the game?',
          paragraphs: [
            "With a group of friends, the most practical person is whoever is waiting to rotate in: they hold the control phone or simply tap the screen of the recording device. Since saving is a single tap — there's nothing to \"operate\" — anyone can do it.",
            'Playing 2v2 with nobody on the sideline? That\'s where wrist control comes in: the player saves the play seconds after the point, without leaving the court. Because the buffer is retroactive, there is time to celebrate first and save after.',
          ],
        },
        {
          heading: 'Smartwatch and Bluetooth button: replay without touching the phone',
          paragraphs: [
            'KplaWY connects to Apple Watch and Galaxy Watch: one tap on the wrist saves the replay instantly. It is the most comfortable option for players, since the watch is already on your arm and does not get in the way.',
            'Another cheap option is a Bluetooth button (the selfie-trigger kind), which can be strapped to the net post or kept in the pocket of whoever is sitting out. On KplaWY Pro, there is also remote control with live preview: a second phone shows what the camera sees and saves the replay from a distance.',
          ],
        },
        {
          heading: 'Battery tips to last the whole morning',
          paragraphs: [
            "Continuous recording drains the battery like any camera app. To stretch it: lower the screen brightness to the minimum, enable KplaWY's built-in battery saver mode, use a shorter buffer if you don't need long clips, and close other apps before starting.",
            'For long sessions, a power bank hanging next to the tripod solves it for good. And mind the heat: a phone in direct sunlight gets hot and throttles performance — shade or a simple cover makes a real difference at the beach.',
          ],
        },
      ],
    },
  },
  {
    slug: 'melhor-app-replay-esportivo',
    title: {
      pt: 'Melhor app de replay esportivo em 2026: o que comparar',
      en: 'Best sports replay app in 2026: what to compare',
    },
    description: {
      pt: 'Critérios honestos pra escolher um app de replay: retroativo vs gravar tudo, duração do buffer, multicâmera, privacidade e preço.',
      en: 'Honest criteria for choosing a replay app: retroactive vs record-everything, buffer duration, multi-camera, privacy, and price.',
    },
    body: {
      pt: [
        {
          heading: 'Não existe "melhor app" sem contexto',
          paragraphs: [
            'Buscar "melhor app de replay esportivo" devolve listas que raramente explicam pra quem cada app serve. Um app perfeito pra análise tática de um time federado é um exagero pra roda de futevôlei de sábado — e vice-versa.',
            'Em vez de um ranking, este guia lista os critérios que realmente separam os apps entre si. Compare qualquer opção (incluindo o KplaWY) contra esta lista e a escolha fica óbvia pro seu caso.',
          ],
        },
        {
          heading: 'Replay retroativo ou gravar tudo?',
          paragraphs: [
            'Essa é a divisão mais importante da categoria. Apps de gravação convencional registram o jogo inteiro e deixam o corte pra depois: bons pra scout e análise completa, ruins pra quem só quer os melhores lances sem passar horas editando.',
            'Apps de replay retroativo (com buffer contínuo) invertem a lógica: nada é salvo até você pedir, e o toque salva os últimos segundos. Se o seu objetivo é sair da quadra com os highlights prontos, esse é o modelo certo — e é o modelo do KplaWY.',
          ],
        },
        {
          heading: 'Qual duração de buffer o app oferece?',
          paragraphs: [
            'Buffer curto demais corta o lance; longo demais enche o clipe de sobra. O ideal é o app deixar você escolher. Ponto de vôlei costuma caber em 10 segundos; um rally longo ou uma jogada armada desde o saque pede 22 a 30; jogadas de contexto completo, até 50.',
            'Verifique também o que o plano gratuito inclui: no KplaWY, o buffer é configurável de 5 a 50 segundos, com até 10 segundos no plano gratuito e as durações maiores no Pro.',
          ],
        },
        {
          heading: 'Multicâmera: você precisa disso?',
          paragraphs: [
            'Um ângulo só já resolve a maioria dos jogos casuais. Multicâmera vale quando o grupo quer o mesmo lance de dois pontos de vista — fundo e lateral, por exemplo — ou quando a quadra é grande demais pra um enquadramento só.',
            'Se isso importa pra você, confira como o app conecta os aparelhos. No KplaWY, os celulares se conectam via rede local, sem depender de internet, e o mesmo toque salva o replay em todos os ângulos.',
          ],
        },
        {
          heading: 'Privacidade: pra onde vão os seus vídeos?',
          paragraphs: [
            'Critério frequentemente ignorado: muitos apps sobem os vídeos automaticamente pra nuvem deles — o que significa custo de servidor embutido no preço e imagens suas (e dos seus amigos) fora do seu controle.',
            'Prefira apps que armazenam localmente por padrão. No KplaWY, os vídeos ficam exclusivamente no seu aparelho; o único envio externo é o backup opcional pro seu próprio Google Drive. Pra quem filma outras pessoas na quadra, isso não é detalhe — é responsabilidade.',
          ],
        },
        {
          heading: 'Preço: assinatura x o que você usa de verdade',
          paragraphs: [
            'Compare o plano gratuito primeiro: dá pra jogar e salvar replays sem pagar? Depois avalie se os recursos pagos resolvem problemas que você tem de fato — buffer mais longo, multicâmera, controle remoto com preview — ou se são recursos de vitrine.',
            'O KplaWY Free cobre o essencial (buffer contínuo até 10 segundos, clipes ilimitados, controle por smartwatch e Bluetooth). O KplaWY Pro custa a partir de R$ 29,90/mês e adiciona buffers de 22, 30 e 50 segundos, multicâmera, controle remoto com live preview e backup automático.',
          ],
        },
        {
          heading: 'Onde o KplaWY se encaixa nessa comparação',
          paragraphs: [
            'Sendo transparente: o KplaWY foi feito pra um caso de uso específico — jogador amador de vôlei, futevôlei e beach tennis que quer sair da quadra com os melhores lances salvos, sem operar câmera e sem editar vídeo. Replay retroativo, armazenamento local e controle pelo pulso são o núcleo do produto.',
            'Se você precisa de análise tática quadro a quadro ou telestração pra treinador, um app de scout tradicional serve melhor. Pra todo o resto — o lance bonito de sábado que merecia ter sido filmado — é exatamente pra isso que o KplaWY existe. Disponível para iOS e Android.',
          ],
        },
      ],
      en: [
        {
          heading: 'There is no "best app" without context',
          paragraphs: [
            'Searching for "best sports replay app" returns lists that rarely explain who each app is for. An app that is perfect for tactical analysis of a competitive team is overkill for a Saturday footvolley group — and vice versa.',
            'Instead of a ranking, this guide lists the criteria that actually separate these apps. Compare any option (including KplaWY) against this list and the choice becomes obvious for your case.',
          ],
        },
        {
          heading: 'Retroactive replay or record everything?',
          paragraphs: [
            'This is the most important split in the category. Conventional recording apps capture the entire game and leave the cutting for later: great for scouting and full analysis, bad for anyone who just wants the best plays without hours of editing.',
            "Retroactive replay apps (with a continuous buffer) flip the logic: nothing is saved until you ask, and a tap saves the last few seconds. If your goal is to leave the court with highlights ready, this is the right model — and it's KplaWY's model.",
          ],
        },
        {
          heading: 'What buffer durations does the app offer?',
          paragraphs: [
            'A buffer that is too short cuts off the play; too long fills the clip with leftovers. Ideally the app lets you choose. A volleyball point usually fits in 10 seconds; a long rally or a play built from the serve needs 22 to 30; full-context plays, up to 50.',
            'Also check what the free plan includes: in KplaWY, the buffer is configurable from 5 to 50 seconds, with up to 10 seconds on the free plan and the longer durations on Pro.',
          ],
        },
        {
          heading: 'Multi-camera: do you actually need it?',
          paragraphs: [
            'A single angle already covers most casual games. Multi-camera is worth it when the group wants the same play from two viewpoints — baseline and sideline, for example — or when the court is too big for a single frame.',
            'If this matters to you, check how the app connects the devices. In KplaWY, phones connect over the local network, without depending on internet, and the same tap saves the replay on every angle.',
          ],
        },
        {
          heading: 'Privacy: where do your videos go?',
          paragraphs: [
            'A frequently ignored criterion: many apps automatically upload videos to their own cloud — which means server costs baked into the price, and footage of you (and your friends) outside your control.',
            "Prefer apps that store locally by default. In KplaWY, videos stay exclusively on your device; the only external upload is the optional backup to your own Google Drive. If you film other people at the court, this isn't a detail — it's a responsibility.",
          ],
        },
        {
          heading: 'Price: subscription vs what you actually use',
          paragraphs: [
            'Compare the free plan first: can you play and save replays without paying? Then evaluate whether the paid features solve problems you actually have — longer buffer, multi-camera, remote control with preview — or whether they are showcase features.',
            'KplaWY Free covers the essentials (continuous buffer up to 10 seconds, unlimited clips, smartwatch and Bluetooth control). KplaWY Pro starts at $5.99/month and adds 22, 30 and 50-second buffers, multi-camera, remote control with live preview, and automatic backup.',
          ],
        },
        {
          heading: 'Where KplaWY fits in this comparison',
          paragraphs: [
            'Being transparent: KplaWY was built for a specific use case — amateur volleyball, footvolley and beach tennis players who want to leave the court with their best plays saved, without operating a camera or editing video. Retroactive replay, local storage and wrist control are the core of the product.',
            "If you need frame-by-frame tactical analysis or coach telestration, a traditional scouting app serves you better. For everything else — that beautiful Saturday play that deserved to be filmed — that is exactly what KplaWY exists for. Available for iOS and Android.",
          ],
        },
      ],
    },
  },
  {
    slug: 'gravar-tudo-vs-replay-retroativo',
    title: {
      pt: 'Gravar o jogo inteiro vs replay retroativo: qual gasta menos espaço',
      en: 'Recording the whole game vs retroactive replay: which uses less space',
    },
    description: {
      pt: 'A matemática do armazenamento: quanto pesam 2 horas de jogo em 1080p, quanto pesam os clipes de replay e quando cada abordagem vale a pena.',
      en: 'The storage math: how much 2 hours of 1080p footage weighs, how much replay clips weigh, and when each approach makes sense.',
    },
    body: {
      pt: [
        {
          heading: 'A conta que ninguém faz antes de apertar gravar',
          paragraphs: [
            'Deixar o celular gravando o jogo inteiro parece a solução mais simples — até o aviso de "armazenamento cheio" aparecer no meio do segundo set. Vale fazer a conta antes: quanto espaço 2 horas de vídeo realmente ocupam, e quanto disso você vai usar?',
            'A resposta muda completamente a forma de filmar. Spoiler: dos 7.200 segundos de um jogo de 2 horas, os lances que o grupo quer rever normalmente somam menos de 5 minutos.',
          ],
        },
        {
          heading: 'Quanto pesam 2 horas de jogo em 1080p?',
          paragraphs: [
            'Em 1080p a 30 fps com codec eficiente (HEVC), um celular moderno grava por volta de 60 MB por minuto — cerca de 3,5 GB por hora. Um jogo de 2 horas: aproximadamente 7 GB. Com codec H.264 (padrão em aparelhos mais antigos), o número praticamente dobra: 12 a 16 GB.',
            'Se subir pra 4K, multiplique por três: uma manhã de sábado pode passar de 40 GB. Num celular de 128 GB já ocupado por fotos e apps, isso significa escolher entre filmar o jogo e o resto da sua vida digital.',
            'E tem o custo escondido: esse arquivão precisa ir pra algum lugar. Transferir 7 GB pro computador ou pra nuvem leva tempo, e assistir 2 horas de vídeo pra achar 10 lances é um trabalho que quase ninguém faz — o vídeo morre na galeria.',
          ],
        },
        {
          heading: 'E quanto pesam os replays retroativos?',
          paragraphs: [
            'Agora a mesma conta do outro lado. Num jogo animado, o grupo salva algo como 15 a 20 replays de 10 a 30 segundos. Somando tudo: 5 a 8 minutos de vídeo — na mesma qualidade 1080p, algo entre 300 e 500 MB.',
            'É uma diferença de mais de 90%: o jogo inteiro de highlights ocupa menos espaço que 10 minutos da gravação contínua. E porque o buffer contínuo do KplaWY roda na RAM, os segundos descartados nunca chegam a tocar o armazenamento — o que você não salva simplesmente não existe em disco.',
          ],
        },
        {
          heading: 'Bateria e aquecimento: o custo invisível',
          paragraphs: [
            'Armazenamento não é o único recurso em jogo. Gravar vídeo por 2 horas seguidas, muitas vezes no sol, é um dos usos mais pesados que existem pra um celular: a bateria despenca e o aparelho esquenta — e celular quente reduz a qualidade e pode até interromper a gravação.',
            'O replay retroativo não elimina esse custo (a câmera continua ativa o tempo todo), mas evita o trabalho extra de codificar e escrever vídeo em disco continuamente. Combinado com modo de economia de bateria, brilho baixo e uma sombra pro aparelho, a sessão inteira fica viável sem power bank — embora ele continue sendo um bom amigo.',
          ],
        },
        {
          heading: 'Quando gravar tudo ainda vale a pena',
          paragraphs: [
            'Sejamos justos com a abordagem tradicional: se você precisa de análise tática completa — estudar posicionamento, contar erros, revisar cada saque — o jogo inteiro é o dado bruto necessário, e nenhum clipe substitui isso. Times em treinamento sério e professores analisando alunos se beneficiam da gravação contínua.',
            'Nesse cenário, o ideal é um aparelho dedicado com armazenamento sobrando, tripé fixo e fonte de energia. É outra proposta, com outro custo de tempo e equipamento.',
          ],
        },
        {
          heading: 'Quando o replay retroativo ganha',
          paragraphs: [
            'Pra jogo casual, a conta fecha do outro lado: o que o grupo quer é rever o ponto bonito no intervalo e sair da quadra com os clipes prontos pra compartilhar. Sem editar, sem garimpar, sem lotar o celular.',
            'É exatamente o caso de uso do KplaWY: buffer contínuo configurável de 5 a 50 segundos, toque no celular, no smartwatch ou num botão Bluetooth depois do lance, e o clipe salvo na hora — ocupando só o espaço dos lances que valeram a pena.',
          ],
        },
      ],
      en: [
        {
          heading: 'The math nobody does before pressing record',
          paragraphs: [
            'Leaving the phone recording the entire game seems like the simplest solution — until the "storage full" warning appears in the middle of the second set. It is worth doing the math first: how much space do 2 hours of video actually take, and how much of it will you use?',
            'The answer completely changes how you film. Spoiler: of the 7,200 seconds in a 2-hour game, the plays the group wants to rewatch usually add up to less than 5 minutes.',
          ],
        },
        {
          heading: 'How much do 2 hours of 1080p footage weigh?',
          paragraphs: [
            'At 1080p 30 fps with an efficient codec (HEVC), a modern phone records around 60 MB per minute — roughly 3.5 GB per hour. A 2-hour game: about 7 GB. With H.264 (the default on older devices), the number nearly doubles: 12 to 16 GB.',
            'Go up to 4K and multiply by three: a Saturday morning can exceed 40 GB. On a 128 GB phone already loaded with photos and apps, that means choosing between filming the game and the rest of your digital life.',
            'And there is the hidden cost: that giant file needs to go somewhere. Transferring 7 GB to a computer or the cloud takes time, and watching 2 hours of footage to find 10 plays is a chore almost nobody does — the video dies in the gallery.',
          ],
        },
        {
          heading: 'And how much do retroactive replays weigh?',
          paragraphs: [
            'Now the same math on the other side. In a lively game, the group saves something like 15 to 20 replays of 10 to 30 seconds. Adding it all up: 5 to 8 minutes of video — at the same 1080p quality, somewhere between 300 and 500 MB.',
            "That is a difference of more than 90%: an entire game of highlights takes less space than 10 minutes of continuous recording. And because KplaWY's continuous buffer runs in RAM, the discarded seconds never touch storage at all — what you don't save simply never exists on disk.",
          ],
        },
        {
          heading: 'Battery and heat: the invisible cost',
          paragraphs: [
            'Storage is not the only resource at stake. Recording video for 2 straight hours, often in the sun, is one of the heaviest workloads for a phone: the battery plummets and the device heats up — and a hot phone lowers quality and can even stop the recording.',
            "Retroactive replay doesn't eliminate this cost (the camera stays active the whole time), but it avoids the extra work of continuously encoding and writing video to disk. Combined with battery saver mode, low brightness and some shade for the device, a full session becomes viable without a power bank — though one remains a good friend.",
          ],
        },
        {
          heading: 'When recording everything is still worth it',
          paragraphs: [
            'Let\'s be fair to the traditional approach: if you need full tactical analysis — studying positioning, counting errors, reviewing every serve — the whole game is the raw data you need, and no clip replaces that. Teams in serious training and coaches analyzing students benefit from continuous recording.',
            'In that scenario, the ideal is a dedicated device with plenty of storage, a fixed tripod and a power source. It is a different proposition, with a different cost in time and equipment.',
          ],
        },
        {
          heading: 'When retroactive replay wins',
          paragraphs: [
            'For casual games, the math closes on the other side: what the group wants is to rewatch the great point during the break and leave the court with clips ready to share. No editing, no digging, no filling up the phone.',
            "That is exactly KplaWY's use case: a continuous buffer configurable from 5 to 50 seconds, a tap on the phone, smartwatch or Bluetooth button after the play, and the clip saved on the spot — taking up only the space of the plays that were worth it.",
          ],
        },
      ],
    },
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}
