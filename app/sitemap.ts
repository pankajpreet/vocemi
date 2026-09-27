import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import { serviceGuides } from '@/lib/serviceContent'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/start`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/security`,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]

  const servicePages: MetadataRoute.Sitemap = serviceGuides.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...corePages, ...servicePages]
}

