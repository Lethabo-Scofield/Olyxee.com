import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin', '/admin/', '/verify', '/verify/'],
      },
    ],
    sitemap: 'https://olyxee.com/sitemap.xml',
  }
}
