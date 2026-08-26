import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

type AssetConfig = { type: string; files: string[] };

const ASSETS: Record<string, AssetConfig> = {
  'logo.webp': { type: 'image/webp', files: ['logo.txt'] },
  'watch.webp': { type: 'image/webp', files: ['watch.txt'] },
  'pt-home.webp': { type: 'image/webp', files: ['pt-home.txt'] },
  'pt-camera.webp': { type: 'image/webp', files: ['pt-camera.txt'] },
  'en-home.webp': { type: 'image/webp', files: ['en-home.txt'] },
  'en-camera.webp': { type: 'image/webp', files: ['en-camera.txt'] },
  'pt-clips.webp': { type: 'image/webp', files: ['chunks/pt-clips.00.txt', 'chunks/pt-clips.01.txt'] },
  'en-clips.webp': { type: 'image/webp', files: ['chunks/en-clips.00.txt', 'chunks/en-clips.01.txt'] },
  'pt-multicam.webp': { type: 'image/webp', files: ['chunks/pt-multicam.00.txt'] },
  'en-multicam.webp': { type: 'image/webp', files: ['chunks/en-multicam.00.txt'] },
  'demo-poster.webp': { type: 'image/webp', files: ['chunks/demo-poster.00.txt', 'chunks/demo-poster.01.txt', 'chunks/demo-poster.02.txt'] },
  'demo.mp4': { type: 'video/mp4', files: ['chunks/demo-video.00.txt', 'chunks/demo-video.01.txt', 'chunks/demo-video.02.txt', 'chunks/demo-video.03.txt', 'chunks/demo-video.04.txt'] },
};

export function generateStaticParams() {
  return Object.keys(ASSETS).map((asset) => ({ asset }));
}

async function readBase64(files: string[]) {
  const parts = await Promise.all(files.map((file) => readFile(path.join(process.cwd(), 'public/media/v3', file), 'utf8')));
  const joined = parts.join('').trim();
  const comma = joined.indexOf(',');
  return joined.startsWith('data:') && comma >= 0 ? joined.slice(comma + 1) : joined;
}

export async function GET(_request: Request, { params }: { params: Promise<{ asset: string }> }) {
  const { asset } = await params;
  const config = ASSETS[asset];
  if (!config) notFound();

  try {
    const base64 = await readBase64(config.files);
    return new Response(Buffer.from(base64, 'base64'), {
      headers: {
        'content-type': config.type,
        'cache-control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    notFound();
  }
}
