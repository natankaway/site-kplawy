# PLACEHOLDERS — checklist do responsável (pessoa física)

As páginas legais (Política de Privacidade, Termos de Uso, Exclusão de conta)
contêm **placeholders rastreáveis** no padrão `[[PREENCHER: X]]`. Após a decisão
de usar **pessoa física** como controlador (o MEI não permite atividade de
software/app), resta **apenas um** valor a preencher antes de publicar: a data.

> ⛔ **O build FALHA enquanto existir qualquer `[[PREENCHER: …]]`** (guard em
> `scripts/check-placeholders.mjs`, roda no `prebuild`). Logo, **é impossível
> publicar uma página com placeholder visível**. Só dá deploy depois que TODOS
> forem preenchidos.

## Contexto (modelo legal atual)

- **Controlador = pessoa física:** Natan Kaway da Silva Pereira, identificado nos
  documentos por **nome completo + e-mail de contato** (LGPD Art. 5º, VI — o
  controlador pode ser pessoa natural).
- **Sem CPF e sem endereço** nos documentos públicos (dado sensível — fica fora).
- O **CPF** é usado **apenas na conta de desenvolvedor das lojas** (App Store /
  Google Play) como ponte para o lançamento — **nunca** no documento público.
- **Migração futura:** quando a receita justificar, migrar para **ME/SLU**
  (confirmando o lado fiscal com o SEBRAE) e, então, atualizar os documentos com
  razão social + CNPJ.

## Como preencher

Edite os arquivos em `src/content/legal/` e substitua **cada** ocorrência do
placeholder pelo valor real. Depois rode `npm run check:placeholders` (ou
`npm run build`) — deve passar sem erro.

## O único valor a preencher

| Placeholder | O que é | Ocorrências |
|---|---|---|
| `[[PREENCHER: DATA PUBLICAÇÃO]]` | Data em que as páginas vão ao ar (ex.: `7 de junho de 2026` / `June 7, 2026`) | 4 |

**Onde aparece** (linha "Última atualização / Last updated" no topo):
- `privacy.pt.md` · `privacy.en.md` · `terms.pt.md` · `terms.en.md`
- *(a página de exclusão de conta não tem data — é instrucional.)*

## Já resolvido (não é mais placeholder)

- **Responsável (controlador):** `Natan Kaway da Silva Pereira` — preenchido nos
  10 lugares (privacy / terms / delete-account, PT + EN). Pessoa física.
- **CNPJ / Razão social:** removidos (modelo pessoa física não tem CNPJ; o CPF
  não entra em documento público).
- **E-mail de contato/DPO:** `kplawyapp@gmail.com` (padronizado no site + docs).
  Se mudar, troque também em `messages/pt.json` + `messages/en.json` e nos `.md`.

## Gate de publicação

1. Definir a data de publicação.
2. Substituir `[[PREENCHER: DATA PUBLICAÇÃO]]` nos 4 arquivos.
3. `npm run build` (o guard tem que passar).
4. Revisão visual das páginas legais (PT + EN).
5. `git commit` + merge/push → Vercel publica.
