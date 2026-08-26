import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-static';

const root = process.cwd();

const direct: Record<string, string> = {
  'logo-symbol-white.webp': 'public/media/v3/logo.txt',
  'logo-app.webp': 'public/media/v3/logo.txt',
  'watch.webp': 'public/media/v3/watch.txt',
  'pt/home.webp': 'public/media/v3/pt-home.txt',
  'pt/camera.webp': 'public/media/v3/pt-camera.txt',
  'en/home.webp': 'public/media/v3/en-home.txt',
  'en/camera.webp': 'public/media/v3/en-camera.txt',
};

const chunkCounts: Record<string, number> = {
  'pt/clips.webp': 2,
  'pt/player.webp': 3,
  'pt/remote.webp': 3,
  'pt/multicam.webp': 1,
  'en/clips.webp': 2,
  'en/player.webp': 3,
  'en/remote.webp': 3,
  'en/multicam.webp': 1,
  'demo.mp4': 5,
};

function chunkStem(asset: string) {
  if (asset === 'demo.mp4') return 'demo-video';
  const [locale, file] = asset.split('/');
  return `${locale}-${file.replace(/\.webp$/, '')}`;
}

async function readAsset(asset: string) {
  const directFile = direct[asset];
  if (directFile) {
    const text = (await readFile(path.join(root, directFile), 'utf8')).trim();
    const comma = text.indexOf(',');
    return Buffer.from(comma >= 0 ? text.slice(comma + 1) : text, 'base64');
  }

  const count = chunkCounts[asset];
  if (!count) return null;
  const stem = chunkStem(asset);
  const pieces = await Promise.all(Array.from({ length: count }, (_, index) => {
    const suffix = String(index).padStart(2, '0');
    return readFile(path.join(root, 'public/media/v3/chunks', `${stem}.${suffix}.txt`), 'utf8');
  }));
  return Buffer.from(pieces.join('').replace(/\s+/g, ''), 'base64');
}

export async function GET(_request: Request, { params }: { params: Promise<{ asset: string[] }> }) {
  const { asset } = await params;
  const key = asset.join('/');
  try {
    const body = await readAsset(key);
    if (!body) return new Response('Not found', { status: 404 });
    const isVideo = key.endsWith('.mp4');
    return new Response(body, {
      headers: {
        'content-type': isVideo ? 'video/mp4' : 'image/webp',
        'cache-control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
