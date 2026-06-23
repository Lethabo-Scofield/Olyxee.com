import { MetadataRoute } from 'next'

const baseUrl = 'https://olyxee.com'

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

type Entry = { path: string; priority: number; changeFrequency: ChangeFreq }

const pages: Entry[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/products/ordo', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/solutions/logistics', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/document-integrity', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/research', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/enterprise', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/enterprise/robotics', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/docs', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/lab', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/technology', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/use-cases', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/safety', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/edgeai', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/developers', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/community', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/brand', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/support', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/signup', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/stories', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/stories/accounting', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/stories/automation', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/stories/freightshift', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/case-studies', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/status', priority: 0.4, changeFrequency: 'daily' },
  { path: '/security', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/compliance', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/cookie-policy', priority: 0.3, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
