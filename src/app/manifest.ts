import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KplaWY',
    short_name: 'KplaWY',
    description: 'Instant replay app for the real world.',
    start_url: '/pt',
    display: 'standalone',
    background_color: '#0A0F1A',
    theme_color: '#0A0F1A',
    icons: [
      {
        src: '/logo-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
