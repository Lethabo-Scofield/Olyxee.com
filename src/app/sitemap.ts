import { MetadataRoute } from 'next'
import { paidRoles } from '../lib/careers-roles'

const baseUrl = 'https://olyxee.com'

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

type Entry = { path: string; priority: number; changeFrequency: ChangeFreq; lastModified: string }

// Keep lastModified honest: bump a page's date only when its content actually
// changes. A sitemap where every URL claims to change on every build teaches
// crawlers to ignore the lastmod signal entirely.
const REBRAND_DATE = '2026-08-12' // Order Loop → Olyxee Logistics rename
const CONTENT_DATE = '2026-05-13' // last general content pass
const LEGAL_DATE = '2026-05-01'

const pages: Entry[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly', lastModified: REBRAND_DATE },
  { path: '/solutions/logistics', priority: 0.9, changeFrequency: 'weekly', lastModified: REBRAND_DATE },
  { path: '/research', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-09-04' },
  { path: '/research/finir', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-09-04' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly', lastModified: REBRAND_DATE },
  { path: '/careers', priority: 0.8, changeFrequency: 'weekly', lastModified: CONTENT_DATE },
  { path: '/careers/internships', priority: 0.6, changeFrequency: 'weekly', lastModified: CONTENT_DATE },
  { path: '/enterprise', priority: 0.8, changeFrequency: 'monthly', lastModified: REBRAND_DATE },
  { path: '/enterprise/robotics', priority: 0.85, changeFrequency: 'monthly', lastModified: CONTENT_DATE },
  { path: '/pricing', priority: 0.9, changeFrequency: 'monthly', lastModified: REBRAND_DATE },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly', lastModified: CONTENT_DATE },
  { path: '/docs', priority: 0.8, changeFrequency: 'monthly', lastModified: REBRAND_DATE },
  { path: '/lab', priority: 0.7, changeFrequency: 'monthly', lastModified: CONTENT_DATE },
  { path: '/technology', priority: 0.7, changeFrequency: 'monthly', lastModified: CONTENT_DATE },
  { path: '/use-cases', priority: 0.7, changeFrequency: 'monthly', lastModified: CONTENT_DATE },
  { path: '/safety', priority: 0.7, changeFrequency: 'monthly', lastModified: CONTENT_DATE },
  { path: '/edgeai', priority: 0.7, changeFrequency: 'monthly', lastModified: CONTENT_DATE },
  { path: '/developers', priority: 0.7, changeFrequency: 'monthly', lastModified: CONTENT_DATE },
  { path: '/community', priority: 0.6, changeFrequency: 'monthly', lastModified: CONTENT_DATE },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly', lastModified: CONTENT_DATE },
  { path: '/brand', priority: 0.5, changeFrequency: 'yearly', lastModified: REBRAND_DATE },
  { path: '/support', priority: 0.5, changeFrequency: 'monthly', lastModified: CONTENT_DATE },
  { path: '/signup', priority: 0.6, changeFrequency: 'monthly', lastModified: CONTENT_DATE },
  { path: '/stories', priority: 0.7, changeFrequency: 'monthly', lastModified: CONTENT_DATE },
  { path: '/stories/accounting', priority: 0.7, changeFrequency: 'monthly', lastModified: CONTENT_DATE },
  { path: '/stories/automation', priority: 0.7, changeFrequency: 'monthly', lastModified: CONTENT_DATE },
  { path: '/stories/freightshift', priority: 0.7, changeFrequency: 'monthly', lastModified: REBRAND_DATE },
  { path: '/case-studies', priority: 0.7, changeFrequency: 'monthly', lastModified: CONTENT_DATE },
  { path: '/status', priority: 0.4, changeFrequency: 'daily', lastModified: CONTENT_DATE },
  { path: '/security', priority: 0.5, changeFrequency: 'yearly', lastModified: LEGAL_DATE },
  { path: '/compliance', priority: 0.5, changeFrequency: 'yearly', lastModified: LEGAL_DATE },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly', lastModified: LEGAL_DATE },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly', lastModified: LEGAL_DATE },
  { path: '/cookie-policy', priority: 0.3, changeFrequency: 'yearly', lastModified: LEGAL_DATE },
]

// Dynamic careers detail pages ( /careers/[slug] ) are generated from the same
// data source the [slug] route uses, so the sitemap stays in sync automatically.
const careerRolePages: Entry[] = paidRoles.map((role) => ({
  path: `/careers/${role.slug}`,
  priority: 0.6,
  changeFrequency: 'weekly',
  lastModified: CONTENT_DATE,
}))

export default function sitemap(): MetadataRoute.Sitemap {
  return [...pages, ...careerRolePages].map(
    ({ path, priority, changeFrequency, lastModified }) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(lastModified),
      changeFrequency,
      priority,
    })
  )
}
