import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/og'],
        disallow: ['/api/', '/admin', '/admin/', '/verify', '/verify/'],
      },
    ],
    sitemap: 'https://olyxee.com/sitemap.xml',
    host: 'https://olyxee.com',
  }
}
