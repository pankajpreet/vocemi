import { execFileSync } from 'child_process'
import { existsSync } from 'fs'
import path from 'path'
import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import { serviceGuides } from '@/lib/serviceContent'
import { industryGuides } from '@/lib/industryContent'
import { getAllPosts } from '@/lib/blog'

/** Last commit that touched any of these paths. Not the build clock. */
function lastCommitDate(files: string[]): Date | undefined {
  const existing = files.filter((file) =>
    existsSync(path.join(process.cwd(), file))
  )
  if (existing.length === 0) return undefined

  try {
    const output = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', ...existing],
      { cwd: process.cwd(), encoding: 'utf8' }
    ).trim()
    if (!output) return undefined
    const date = new Date(output)
    return Number.isNaN(date.getTime()) ? undefined : date
  } catch {
    return undefined
  }
}

// Rendered with every marketing page: a change here changes that page's HTML.
const siteShell = [
  'app/layout.tsx',
  'app/(site)/layout.tsx',
  'components/Footer.tsx',
  'components/Navbar.tsx',
  'components/StructuredData.tsx',
  'components/NapLine.tsx',
  'lib/config.ts',
]

const startSources = [
  'app/layout.tsx',
  'app/start/layout.tsx',
  'app/start/page.tsx',
  'lib/startContent.ts',
  'lib/config.ts',
  'components/StructuredData.tsx',
  'components/NapLine.tsx',
  'components/start/StartHeader.tsx',
  'components/start/StartHero.tsx',
  'components/start/ClientStrip.tsx',
  'components/start/Capabilities.tsx',
  'components/start/VoiceDemo.tsx',
  'components/start/HowItWorksCompact.tsx',
  'components/start/Industries.tsx',
  'components/start/StartCta.tsx',
  'components/start/StartFooter.tsx',
  'components/start/StickyCta.tsx',
]

function pageEntry(
  url: string,
  files: string[],
  changeFrequency: 'weekly' | 'monthly' | 'yearly',
  priority: number
): MetadataRoute.Sitemap[number] {
  const lastModified = lastCommitDate(files)
  return {
    url,
    ...(lastModified ? { lastModified } : {}),
    changeFrequency,
    priority,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  const corePages: MetadataRoute.Sitemap = [
    pageEntry(
      baseUrl,
      [...siteShell, 'app/(site)/page.tsx', 'lib/homeContent.ts'],
      'monthly',
      1
    ),
    pageEntry(`${baseUrl}/start`, startSources, 'monthly', 0.9),
    pageEntry(
      `${baseUrl}/services`,
      [...siteShell, 'app/(site)/services/page.tsx', 'app/(site)/services/layout.tsx'],
      'monthly',
      0.8
    ),
    pageEntry(
      `${baseUrl}/industries`,
      [...siteShell, 'app/(site)/industries/page.tsx', 'lib/industryContent.ts'],
      'monthly',
      0.8
    ),
    pageEntry(
      `${baseUrl}/blog`,
      [...siteShell, 'app/(site)/blog/page.tsx'],
      'weekly',
      0.7
    ),
    pageEntry(
      `${baseUrl}/about`,
      [...siteShell, 'app/(site)/about/page.tsx'],
      'yearly',
      0.7
    ),
    pageEntry(
      `${baseUrl}/faq`,
      [
        ...siteShell,
        'app/(site)/faq/page.tsx',
        'app/(site)/faq/layout.tsx',
        'lib/faqContent.ts',
      ],
      'monthly',
      0.7
    ),
    pageEntry(
      `${baseUrl}/contact`,
      [
        ...siteShell,
        'app/(site)/contact/page.tsx',
        'app/(site)/contact/layout.tsx',
      ],
      'monthly',
      0.8
    ),
    pageEntry(
      `${baseUrl}/privacy`,
      [...siteShell, 'app/(site)/privacy/page.tsx'],
      'yearly',
      0.3
    ),
    pageEntry(
      `${baseUrl}/security`,
      [...siteShell, 'app/(site)/security/page.tsx'],
      'yearly',
      0.6
    ),
  ]

  const servicePages: MetadataRoute.Sitemap = serviceGuides.map((service) =>
    pageEntry(
      `${baseUrl}/services/${service.slug}`,
      [...siteShell, 'app/(site)/services/[slug]/page.tsx', 'lib/serviceContent.ts'],
      'monthly',
      0.8
    )
  )

  const industryPages: MetadataRoute.Sitemap = industryGuides.map((industry) =>
    pageEntry(
      `${baseUrl}/industries/${industry.slug}`,
      [
        ...siteShell,
        'app/(site)/industries/[slug]/page.tsx',
        'lib/industryContent.ts',
      ],
      'monthly',
      0.8
    )
  )

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(`${post.updated ?? post.date}T00:00:00.000Z`),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...corePages, ...servicePages, ...industryPages, ...blogPages]
}
