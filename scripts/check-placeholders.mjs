// Guard anti-vazamento: falha o build se algum placeholder [[PREENCHER: …]]
// ainda existir no conteúdo. Garante que nenhuma página com dado pendente do
// MEI (CNPJ, razão social, data) chegue ao ar. Roda no `prebuild`.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'src';
const TOKEN = '[[PREENCHER';
const hits = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) {
      walk(p);
    } else if (/\.(md|mdx|tsx?|jsx?|json)$/.test(entry)) {
      readFileSync(p, 'utf-8').split('\n').forEach((line, i) => {
        if (line.includes(TOKEN)) hits.push(`${p}:${i + 1}: ${line.trim()}`);
      });
    }
  }
}

walk(ROOT);

if (hits.length > 0) {
  console.error(
    `\n❌ Build bloqueado: ${hits.length} placeholder(s) [[PREENCHER]] não preenchido(s).`,
  );
  console.error('   Preencha os dados do MEI antes de publicar (ver PLACEHOLDERS.md):\n');
  for (const h of hits) console.error('   ' + h);
  console.error('');
  process.exit(1);
}

console.log('✓ check:placeholders — nenhum [[PREENCHER]] pendente.');
