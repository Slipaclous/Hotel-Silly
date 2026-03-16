import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Villa Dolce',
    short_name: 'Villa Dolce',
    description: 'Hôtel d\'Exception à Silly',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/images/logo-simple.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/logo-simple.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
