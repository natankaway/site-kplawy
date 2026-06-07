# Política de Privacidade — KplaWY Instant Replay 22s

**Última atualização:** [[PREENCHER: DATA PUBLICAÇÃO]]
**Versão:** 1.0
**Aplica-se a:** aplicativo KplaWY Instant Replay 22s (iOS, Android, Apple Watch, Wear OS) e ao site `kplawy.app`.

---

## Resumo rápido (em linguagem simples)

> Esta caixa é um resumo. O texto completo abaixo é o que vale juridicamente.

**O que coletamos:** seu e-mail e nome (para você ter uma conta), o estado da
sua assinatura, e identificadores técnicos do seu dispositivo (para
diagnóstico). Quando você usa Sign in with Apple, guardamos um token para
poder revogar seu acesso se você apagar a conta.

**O que NÃO coletamos:** seus vídeos não vão para nossos servidores — ficam no
seu celular. Se você ligar o backup, eles vão para o **seu próprio** Google
Drive, não para nós. Não vemos dados do seu cartão (a cobrança é feita pela
Apple/Google). Não coletamos localização, contatos, nem usamos rastreamento
para publicidade.

**Seus direitos:** você pode acessar, corrigir, exportar e **apagar** sua
conta e seus dados a qualquer momento, direto no app.

---

## 1. Quem é o responsável pelos seus dados

O responsável (controlador) pelo tratamento dos seus dados pessoais é:

- **Razão social:** [[PREENCHER: RAZÃO SOCIAL]]
- **CNPJ:** [[PREENCHER: CNPJ]]
- **Contato:** kplawyapp@gmail.com (ver seção "Como falar conosco")

---

## 2. Quais dados coletamos

| Categoria | O que é | De onde vem |
|---|---|---|
| **Identificação** | E-mail, nome de exibição, identificador interno da conta | Quando você cria conta com Google, Apple ou e-mail |
| **Credencial Apple** | Um token de atualização (*refresh token*) do Sign in with Apple | Apenas se você entra com Apple — usado para revogar seu acesso na exclusão da conta |
| **Dispositivo** | Um identificador aleatório gerado pelo app (não é número de série do aparelho), o modelo e o nome do aparelho, a versão do app | Gerado na instalação; enviado ao nosso servidor para diagnóstico de uso |
| **Assinatura** | Estado da sua assinatura (gratuito/Pro), histórico de compra, estado do período de teste | Pela RevenueCat e pelas lojas (App Store/Google Play) |
| **Backup (opcional)** | Status e contagem de backups, identificador da pasta no seu Drive | Apenas se você ativa o backup; ficam no seu aparelho |
| **Diagnóstico** | Relatórios de falha (*crash*) + informações do aparelho (Firebase Crashlytics) | Quando o app trava, para corrigir erros — você pode **desligar** em Conta → "Enviar relatórios de falha" |

> **Dado coletado pela infraestrutura (não pelo aplicativo) — Endereço IP:**
> o Google Firebase registra automaticamente o endereço IP de cada conexão como
> parte do funcionamento da plataforma. Nós **não acessamos nem usamos** esse
> dado — ele fica nos *logs* operacionais do Google Cloud, conforme a política
> de retenção deles. Mencionamos aqui por transparência, já que IP é
> considerado dado pessoal pela LGPD e pelo GDPR.

**Importante sobre seus vídeos:** os clipes (replays) gravados **NÃO** são
enviados para nossos servidores. Eles ficam **no seu aparelho** (na sua
biblioteca de fotos). Se você ativar o backup, eles vão para o **seu próprio
Google Drive** — nunca para nós. Nós não temos cópia dos seus vídeos.

**O que NÃO coletamos:** dados de cartão ou pagamento (são processados 100%
pela Apple e pelo Google), localização (GPS), contatos, agenda, dados de
saúde, identificadores permanentes de hardware, nem qualquer dado para
rastreamento publicitário (no iOS, declaramos `NSPrivacyTracking = false`).

---

## 3. Para que usamos seus dados (finalidades e base legal)

| Dado | Finalidade | Base legal (LGPD Art. 7º) |
|---|---|---|
| E-mail, nome, identificador da conta | Criar e manter sua conta; autenticar você | Execução de contrato (Art. 7º, V) |
| Token Apple (*refresh token*) | Revogar seu acesso junto à Apple quando você exclui a conta (exigência da Apple) | Cumprimento de obrigação (Art. 7º, II) + execução de contrato (V) |
| Identificador + modelo + nome do dispositivo | **Diagnóstico e melhoria** — entender padrões de uso em múltiplos aparelhos | Legítimo interesse (Art. 7º, IX) |
| Relatórios de falha + info do aparelho (Crashlytics) | Corrigir erros e travamentos; estabilidade do app | Legítimo interesse (Art. 7º, IX) — **desligável** em Conta |
| Estado de assinatura e teste | Liberar recursos Pro; controlar o período de teste único | Execução de contrato (Art. 7º, V) |
| Metadados de backup | Gerenciar a fila de backup que você ativou | Execução de contrato (Art. 7º, V) |
| Endereço IP | Segurança e prevenção a fraudes da plataforma | Legítimo interesse (Art. 7º, IX) |
| Consentimento (onboarding) | Registrar seu aceite desta Política e dos Termos | Consentimento (Art. 7º, I) |

> **Sobre o "legítimo interesse" para dados de dispositivo:** coletamos o
> mínimo necessário (um identificador aleatório, modelo, nome e versão) para
> fins de diagnóstico e melhoria do produto. **Não** usamos esses dados para
> bloquear o uso em múltiplos aparelhos, nem para criar perfil seu, nem para
> publicidade.

---

## 4. Com quem compartilhamos

Não vendemos seus dados. Compartilhamos apenas com os parceiros técnicos
estritamente necessários para o app funcionar.

Os parceiros abaixo atuam como **operadores** (na LGPD) / **processadores** (no
GDPR) — processam dados **sob nossas instruções**, não para fins próprios. Não
há controladores conjuntos.

| Parceiro | Empresa | Para quê |
|---|---|---|
| **Firebase** (Autenticação, Functions, Firestore) | Google LLC | Login, servidor, armazenamento dos dados da sua conta |
| **Google Sign-In** | Google LLC | Login com conta Google |
| **Google Drive** | Google LLC | Backup opcional dos seus clipes **na sua própria conta** Drive |
| **Sign in with Apple** | Apple Inc. | Login com conta Apple |
| **RevenueCat** | RevenueCat Inc. | Gestão da sua assinatura |
| **App Store / Google Play** | Apple Inc. / Google LLC | Processamento do pagamento da assinatura |

Cada parceiro tem sua própria política de privacidade, com os links na seção
"Links úteis" ao final.

**Acesso ao seu Google Drive:** quando você ativa o backup, o app pede acesso
**restrito** (escopo `drive.file`) — ou seja, ele só consegue ver e gerenciar
**os arquivos que ele mesmo criou** no seu Drive. Não temos acesso ao resto
do seu Drive nem aos seus outros arquivos.

---

## 5. Transferência internacional de dados

Os parceiros acima processam dados em servidores nos **Estados Unidos**.
Isso significa que seus dados podem ser transferidos para fora do Brasil e da
União Europeia.

Essa transferência é amparada por:
- **No Brasil (LGPD Art. 33):** execução do contrato com você (inciso IX) e
  cláusulas-padrão contratuais (*Standard Contractual Clauses* — SCCs) que
  Google, Apple e RevenueCat firmam em seus contratos de processamento de
  dados (inciso II).
- **Na União Europeia (GDPR):** SCCs da Comissão Europeia e adesão ao
  *EU-US Data Privacy Framework* pelos parceiros.

---

## 6. Onde ficam seus vídeos (conteúdo que você cria)

Reforçando, por ser o ponto mais importante:

- Seus clipes ficam **localmente no seu aparelho**.
- **Nada** vai para nossos servidores.
- O backup é **opcional** e, quando ligado, envia para o **seu próprio**
  Google Drive.
- A função de múltiplas câmeras conecta seus aparelhos **diretamente pela
  rede local** (Wi-Fi), com a transmissão **criptografada**. Nada passa por
  nossos servidores.

Você controla seus vídeos: pode apagá-los do aparelho e do seu Drive quando
quiser.

---

## 7. Crianças e adolescentes

- O KplaWY é destinado a pessoas com **13 anos ou mais**.
- **Menores de 13 anos não devem usar o app.** O app não solicita data de
  nascimento, mas se tomarmos conhecimento (por contato direto, denúncia ou
  outra forma) de que uma conta pertence a menor de 13 anos, ela será excluída
  e os dados associados serão eliminados, exceto quando a retenção for exigida
  por lei.
- **Adolescentes de 13 a 17 anos** devem usar o app com o **consentimento e
  supervisão dos pais ou responsáveis**, conforme a legislação local (no
  Brasil, LGPD Art. 14; na União Europeia, GDPR Art. 8; nos Estados Unidos,
  COPPA para menores de 13).
- **Pessoas filmadas:** o app permite gravar outras pessoas (por exemplo,
  atletas em treinos). É **responsabilidade de quem usa o app** obter o
  consentimento das pessoas filmadas — e, se forem menores de idade, dos seus
  pais ou responsáveis. Os detalhes dessa responsabilidade estão nos Termos
  de Uso.

---

## 8. Por quanto tempo guardamos

- **Dados da conta** (e-mail, nome, identificadores, assinatura, dispositivo):
  enquanto sua conta existir. Ao excluir a conta, eles são apagados.
- **Token Apple:** apagado junto com a conta.
- **Endereço IP nos logs:** conforme a política de retenção do Google Cloud.
- **Dados que a lei obriga a reter:** por exemplo, registros fiscais de
  transações (cobranças feitas via App Store / Google Play) podem ser retidos
  por até **5 anos** (prazo de prescrição tributária no Brasil), mesmo após a
  exclusão da sua conta. Esses registros podem ser anonimizados quando possível.

Você pode excluir sua conta a qualquer momento no próprio app
(Conta → Excluir conta). A exclusão remove sua conta da autenticação, apaga
seus documentos de dados e **tenta revogar** sua credencial Apple (quando
aplicável).

> Em caso raro de falha na revogação junto à Apple, a **exclusão dos seus dados
> ocorre normalmente** — não bloqueamos a exclusão por causa disso. Nesses
> casos, você pode, adicionalmente, revogar o acesso do app diretamente em
> **Ajustes > [seu nome] (Apple ID) > Iniciar Sessão e Segurança > Apps que
> usam Sign in with Apple**.

---

## 9. Como protegemos seus dados

- Conexões com nossos servidores usam **HTTPS** (criptografia em trânsito).
- Os dados armazenados no Firebase têm **criptografia em repouso** (padrão do
  Google Cloud).
- A função de múltiplas câmeras usa **criptografia AES-GCM-256** na rede local.
- O acesso aos dados no nosso servidor é restrito ao funcionamento do app, com
  regras de segurança.
- Os registros operacionais (*logs*) são **sanitizados** — não incluem
  conteúdo pessoal nem caminhos de arquivo do seu aparelho.

Nenhum sistema é 100% seguro, mas adotamos medidas técnicas e organizacionais
razoáveis para proteger seus dados.

---

## 10. Para usuários no Brasil (LGPD)

Você tem os direitos do **Art. 18 da LGPD**:

- **Confirmação e acesso** — saber se tratamos seus dados e acessá-los.
- **Correção** — corrigir dados incompletos ou desatualizados.
- **Anonimização, bloqueio ou eliminação** de dados desnecessários ou tratados
  em desconformidade.
- **Portabilidade** — receber seus dados em formato estruturado (exportação).
- **Eliminação** dos dados tratados com base no seu consentimento.
- **Informação** sobre com quem compartilhamos.
- **Revogação do consentimento.**
- **Oposição** a tratamento feito sem consentimento, se houver
  descumprimento da LGPD.

A maioria desses direitos você exerce direto no app (acesso, correção,
exportação, exclusão). Para os demais, fale conosco (seção "Como falar
conosco").

**Encarregado (DPO):** kplawyapp@gmail.com.

---

## 11. Para usuários na União Europeia (GDPR)

Se você está na União Europeia, o tratamento dos seus dados se baseia nas
bases legais do **Art. 6 do GDPR**, equivalentes às da LGPD (execução de
contrato, obrigação legal, legítimo interesse e consentimento), conforme a
tabela da seção 3.

Você tem direito a: **acesso, retificação, apagamento ("direito ao
esquecimento"), limitação do tratamento, portabilidade, oposição** e a
**não se sujeitar a decisões automatizadas**. Você também pode **retirar o
consentimento** a qualquer momento e **apresentar reclamação** à autoridade de
proteção de dados do seu país.

Transferências internacionais são feitas com as salvaguardas da seção 5
(SCCs + Data Privacy Framework).

---

## 12. Para usuários na Califórnia, EUA (CCPA/CPRA)

- **Nós NÃO vendemos seus dados pessoais.** Nós **não compartilhamos** seus
  dados pessoais para publicidade comportamental entre contextos (*cross-context
  behavioral advertising*).
- Como não vendemos nem compartilhamos, não há um mecanismo de "Do Not Sell or
  Share My Personal Information" a acionar — mas, se você quiser confirmação,
  fale conosco.
- **Categorias de informação coletadas nos últimos 12 meses:**
  identificadores (e-mail, identificador da conta, identificador do
  dispositivo), informações comerciais (estado da assinatura) e informações de
  uso técnico (modelo do aparelho, IP). Não coletamos categorias sensíveis
  (geolocalização precisa, biometria, etc.).
- Você tem direito a **saber, acessar, corrigir e excluir** seus dados, e a
  **não ser discriminado** por exercer esses direitos.

---

## 13. O site kplawy.app

O site `kplawy.app` (onde esta política está publicada) usa **apenas um cookie
essencial**: `NEXT_LOCALE`, que lembra o idioma que você escolheu (português ou
inglês). Esse cookie é funcional — não rastreia você nem coleta dados.
**Duração: 1 ano** (ou conforme renovação da preferência).

Não há ferramentas de análise (*analytics*), rastreamento, pixels nem cookies
de terceiros. As fontes são servidas pelo próprio domínio (*self-hosted*), sem
chamadas a servidores de terceiros.

---

## 14. Como falar conosco

Para exercer seus direitos, tirar dúvidas ou fazer reclamações sobre
privacidade:

- **E-mail:** kplawyapp@gmail.com
- **Responsável:** [[PREENCHER: RAZÃO SOCIAL]], CNPJ [[PREENCHER: CNPJ]]

Responderemos no prazo legal aplicável.

---

## 15. Alterações nesta política

Podemos atualizar esta política. Quando a mudança for relevante, avisaremos no
app ou por e-mail. A data no topo indica a última atualização.

---

## 16. Links úteis (políticas dos parceiros)

- Google / Firebase: https://policies.google.com/privacy · https://firebase.google.com/support/privacy
- Apple: https://www.apple.com/legal/privacy/
- RevenueCat: https://www.revenuecat.com/privacy/
