# PLACEHOLDERS — checklist do MEI (preencher antes de publicar)

As páginas legais (Política de Privacidade, Termos de Uso, Exclusão de conta)
contêm **placeholders rastreáveis** no padrão `[[PREENCHER: X]]` para os dados
que dependem da abertura do MEI.

> ⛔ **O build FALHA enquanto existir qualquer `[[PREENCHER: …]]`** (guard em
> `scripts/check-placeholders.mjs`, roda no `prebuild`). Logo, **é impossível
> publicar uma página com placeholder visível**. Só dá deploy depois que TODOS
> forem preenchidos.

## Como preencher

Edite os arquivos em `src/content/legal/` e substitua **cada** ocorrência do
placeholder pelo valor real. Depois rode `npm run check:placeholders` (ou
`npm run build`) — deve passar sem erro.

## Os 3 valores a preencher

| Placeholder | O que é | Ocorrências |
|---|---|---|
| `[[PREENCHER: RAZÃO SOCIAL]]` | Razão social / nome legal do MEI | 10 |
| `[[PREENCHER: CNPJ]]` | CNPJ do MEI (formato `00.000.000/0001-00`) | 10 |
| `[[PREENCHER: DATA PUBLICAÇÃO]]` | Data em que as páginas vão ao ar (ex.: `7 de junho de 2026` / `June 7, 2026`) | 4 |

## Onde cada um aparece (file:line)

**`[[PREENCHER: RAZÃO SOCIAL]]`** (10):
- `privacy.pt.md`: §1 (responsável) · §14 (como falar conosco)
- `privacy.en.md`: §1 · §14
- `terms.pt.md`: cláusula 1 · cláusula final (responsável)
- `terms.en.md`: clause 1 · final clause (controller)
- `delete-account.pt.md`: cabeçalho (responsável)
- `delete-account.en.md`: header (controller)

**`[[PREENCHER: CNPJ]]`** (10): mesmos locais da razão social (aparecem juntos).

**`[[PREENCHER: DATA PUBLICAÇÃO]]`** (4):
- `privacy.pt.md` · `privacy.en.md` · `terms.pt.md` · `terms.en.md` — linha
  "Última atualização / Last updated" no topo.
- *(a página de exclusão de conta não tem data — é instrucional.)*

## Já preenchido (não é placeholder)

- **E-mail de contato/DPO:** `kplawyapp@gmail.com` (padronizado em todo o site +
  docs, alinhado com o suporte do Play). Se mudar, troque também em
  `messages/pt.json` + `messages/en.json` e nos `.md`.

## Gate de publicação

1. Abrir o MEI → obter Razão social + CNPJ.
2. Definir a data de publicação.
3. Substituir os 3 placeholders nos 6 arquivos `src/content/legal/`.
4. `npm run build` (o guard tem que passar).
5. `git commit` + `git push` → Vercel publica.
