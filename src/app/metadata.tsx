import {
  company,
  address,
  contact,
  hours,
  serviceArea,
  seo,
  socialLinks,
} from '@/config'

export const baseURL =
  process.env.NEXT_PUBLIC_PRODUCTION_URL || 'http://localhost:3000'

export const defaultOGImage = {
  url: 'https://ascot-cdn.gallop.software/images/logo-lg.png',
  width: 1400,
  height: 708,
}

const businessImageUrl =
  'https://ascot-cdn.gallop.software/images/image-15-lg.jpg'

// Canonical @id references for the site's core entities. Page-level schema
// (Service, Product, Breadcrumb) points back to these instead of redefining
// the business, so search engines see one authoritative entity.
export const organizationId = `${baseURL}/#organization`
export const websiteId = `${baseURL}/#website`
export const businessId = `${baseURL}/#business`

export const defaultSEOConfig = {
  creator: company.name,
  publisher: company.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': 30,
      'max-image-preview': 'large' as const,
      'max-snippet': 160,
    },
  },
}

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: address.street,
  addressLocality: address.city,
  addressRegion: address.region,
  postalCode: address.postalCode,
  addressCountry: address.country,
}

const areaServed = [
  ...serviceArea.regions.map((r) => ({ '@type': r.type, name: r.name })),
  ...serviceArea.cities.map((name) => ({ '@type': 'City', name })),
]

const openingHoursSpecification = hours
  .filter((h) => h.schema)
  .map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.schema!.dayOfWeek,
    opens: h.schema!.opens,
    closes: h.schema!.closes,
  }))

// Site-wide structured data, emitted on every page as the base of the JSON-LD
// @graph. No reviews or ratings are included. Add those only from verified,
// on-site review data.
//
// `sameAs` consolidates the entity across authoritative external profiles.
// It stays empty until the customer has real profiles to point at.
const sameAs = socialLinks.map((s) => s.href)

export const defaultStructuredData = [
  {
    '@type': 'Organization',
    '@id': organizationId,
    name: company.name,
    url: baseURL,
    logo: defaultOGImage.url,
    email: contact.email,
    telephone: contact.phoneSchema,
    address: postalAddress,
    foundingDate: String(company.founded),
    ...(sameAs.length > 0 && { sameAs }),
    areaServed,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contact.phoneSchema,
      email: contact.email,
      contactType: 'sales',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  },
  {
    '@type': 'WebSite',
    '@id': websiteId,
    name: company.name,
    url: baseURL,
    description: seo.defaultDescription,
    publisher: { '@id': organizationId },
  },
  {
    '@type': 'HardwareStore',
    '@id': businessId,
    name: company.name,
    description: company.description,
    slogan: company.tagline,
    url: baseURL,
    logo: defaultOGImage.url,
    image: businessImageUrl,
    telephone: contact.phoneSchema,
    email: contact.email,
    priceRange: '$$',
    currenciesAccepted: 'USD',
    address: postalAddress,
    hasMap: contact.mapHref,
    ...(sameAs.length > 0 && { sameAs }),
    areaServed,
    openingHoursSpecification,
    parentOrganization: { '@id': organizationId },
  },
]
