import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KPLAWY',
    short_name: 'KPLAWY',
    description: 'Save the play after it happens with instant sports replay.',
    start_url: '/pt',
    display: 'standalone',
    background_color: '#020408',
    theme_color: '#020408',
    icons: [
      {
        src: '/logo-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
