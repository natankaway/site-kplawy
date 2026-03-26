import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KplaWY',
    short_name: 'KplaWY',
    description: 'Premium instant replay app for the real world.',
    start_url: '/pt',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/logo-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
