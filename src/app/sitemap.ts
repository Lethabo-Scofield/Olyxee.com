import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://olyxee.com'

  const pages: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/products', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/research', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/careers', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/docs', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/lab', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/developers', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/community', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/safety', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/technology', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/use-cases', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/edgeai', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/support', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/signup', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'monthly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'monthly' },
  ]

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    changeFrequency,
    priority,
  }))
}
