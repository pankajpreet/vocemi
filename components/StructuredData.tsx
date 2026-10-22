import { siteConfig } from '@/lib/config'
import { isStandardPlan, plans } from '@/lib/plans'
import { pricingIntro } from '@/lib/pricingFaq'

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
  { '@type': 'Country', name: 'Canada' },
  { '@type': 'Country', name: 'United States' },
]

export const organizationId = `${siteConfig.url}/#organization`

export default function StructuredData() {
  // Published prices are USD. This graph has no price, priceRange, or Offer.
  // Google Business Profile hours are by appointment only. Do not add
  // openingHoursSpecification.
  const organizationGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': organizationId,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          '@type': 'ImageObject',
          url: `${siteConfig.url}/logo.png`,
          width: 512,
          height: 512,
        },
        image: `${siteConfig.url}/og-image.png`,
        description: siteConfig.description,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phoneSchema,
        address: {
          '@type': 'PostalAddress',
          addressLocality: siteConfig.address.locality,
          addressRegion: siteConfig.address.region,
          addressCountry: siteConfig.address.country,
        },
        hasMap: siteConfig.social.googleBusiness,
        areaServed,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: siteConfig.contact.email,
          telephone: siteConfig.contact.phoneSchema,
          areaServed: ['CA', 'US'],
          availableLanguage: ['English'],
        },
        founder: {
          '@type': 'Person',
          '@id': `${siteConfig.url}/about#founder`,
          name: siteConfig.founder.name,
          jobTitle: siteConfig.founder.role,
          image: `${siteConfig.url}${siteConfig.founder.image}`,
          sameAs: [siteConfig.founder.linkedin],
        },
        sameAs: [
          siteConfig.social.linkedin,
          siteConfig.social.facebook,
          siteConfig.social.youtube,
          siteConfig.social.googleBusiness,
        ],
        knowsAbout: [
          'Voice AI',
          'AI receptionist',
          'Lead reactivation',
          'Appointment booking automation',
          'Call analytics',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { '@id': organizationId },
      },
    ],
  }

  return <JsonLd data={organizationGraph} />
}

export function PricingStructuredData() {
  const offers = plans.map((plan) => {
    if (isStandardPlan(plan)) {
      return {
        '@type': 'Offer',
        name: plan.name,
        price: plan.usd,
        priceCurrency: 'USD',
        url: `${siteConfig.url}/pricing`,
        description: `${plan.minutes} minutes a month (about ${plan.approxCalls} calls). ${plan.terms}`,
      }
    }
    return {
      '@type': 'Offer',
      name: plan.name,
      price: plan.fromUsd,
      priceCurrency: 'USD',
      url: `${siteConfig.url}/pricing`,
      description: plan.tagline,
    }
  })

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'AI receptionist',
        serviceType: 'AI receptionist',
        description: pricingIntro,
        url: `${siteConfig.url}/pricing`,
        provider: { '@id': organizationId },
        areaServed,
        offers,
      }}
    />
  )
}

export function ServiceStructuredData() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Voice AI Solutions',
    url: `${siteConfig.url}/services`,
    provider: { '@id': organizationId },
    areaServed,
  }

  return <JsonLd data={serviceSchema} />
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
    publisher: { '@id': organizationId },
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
    provider: { '@id': organizationId },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: name,
    },
    areaServed,
  }

  return <JsonLd data={serviceSchema} />
}

