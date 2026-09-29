import { siteConfig } from '@/lib/config'

type Faq = {
  question: string
  answer: string
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

const areaServed = [
  { '@type': 'City', name: 'Calgary' },
  { '@type': 'AdministrativeArea', name: 'Alberta' },
  { '@type': 'Country', name: 'Canada' },
]

export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    areaServed,
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.contact.email,
      contactType: 'Customer Service',
    },
    founder: {
      '@type': 'Person',
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.role,
      image: `${siteConfig.url}${siteConfig.founder.image}`,
      sameAs: [siteConfig.founder.linkedin],
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  }

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
    </>
  )
}

export function ServiceStructuredData() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Voice AI Solutions',
    url: `${siteConfig.url}/services`,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Voice AI Services',
      itemListElement: siteConfig.services.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
        },
        position: index + 1,
      })),
    },
  }

  return <JsonLd data={serviceSchema} />
}

export function ServiceDetailStructuredData({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}) {
  const url = `${siteConfig.url}${path}`
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed,
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${siteConfig.url}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name,
        item: url,
      },
    ],
  }

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
    </>
  )
}

export function FaqStructuredData({ faqs }: { faqs: Faq[] }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return <JsonLd data={faqSchema} />
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: { name: string; path: string }[]
}) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path === '/' ? '' : item.path}`,
    })),
  }

  return <JsonLd data={breadcrumbSchema} />
}

export function ArticleStructuredData({
  title,
  description,
  path,
  datePublished,
  dateModified,
}: {
  title: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
}) {
  const url = `${siteConfig.url}${path}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    image: `${siteConfig.url}/og-image.png`,
    inLanguage: 'en-CA',
    author: {
      '@type': 'Person',
      name: siteConfig.founder.name,
      url: `${siteConfig.url}/about`,
      sameAs: [siteConfig.founder.linkedin],
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.svg`,
      },
    },
  }

  return <JsonLd data={articleSchema} />
}

export function IndustryStructuredData({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'AI receptionist',
    name: `AI receptionist for ${name}`,
    description,
    url: `${siteConfig.url}${path}`,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: name,
    },
    areaServed,
  }

  return <JsonLd data={serviceSchema} />
}

