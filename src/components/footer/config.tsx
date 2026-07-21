import {
  company,
  contact as companyContact,
  hours as companyHours,
  serviceArea,
  socialLinks as companySocials,
} from '@/config'

export interface FooterLink {
  href: string
  label: string
}

export interface SocialLink {
  name: string
  href: string
  icon: { body: string; width?: number; height?: number }
}

/**
 * Social media links. Empty until real profiles exist for the customer.
 * Populate `socialLinks` in `src/config.ts` and supply an Iconify icon here.
 */
export const socialLinks: SocialLink[] = []

/** Present so the footer can note when socials are configured but iconless. */
export const hasSocials = companySocials.length > 0

/**
 * Primary navigation column that mirrors the first half of the main navbar.
 * Footer links intentionally match the navbar (whole-page links, no anchors).
 */
export const productLinks: FooterLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Panels', href: '/panels' },
  { label: 'Trims', href: '/trims' },
  { label: 'Products', href: '/products' },
  { label: 'Buildings', href: '/buildings' },
]

/**
 * Secondary navigation column that mirrors the rest of the main navbar.
 */
export const buildingLinks: FooterLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

/**
 * Full navbar link set, kept for layouts that use a single link list.
 */
export const quickLinks: FooterLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Panels', href: '/panels' },
  { label: 'Trims', href: '/trims' },
  { label: 'Buildings', href: '/buildings' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

/**
 * Legal / policy links
 */
export const legalLinks: FooterLink[] = []

/**
 * Business contact details, sourced from `src/config.ts`.
 */
export const contact = {
  address: companyContact.addressMultiline,
  addressHref: companyContact.mapHref,
  phone: companyContact.phone,
  phoneHref: companyContact.phoneHref,
  email: companyContact.email,
  emailHref: companyContact.emailHref,
}

/**
 * Business hours
 */
export const hours: { days: string; time: string }[] = companyHours.map(
  (h) => ({
    days: h.days,
    time: h.time,
  })
)

/**
 * Service area summary
 */
export const serviceAreaText = serviceArea.summary

/**
 * Footer description text
 */
export const description = company.footerDescription

/**
 * Copyright business name
 */
export const copyrightName = company.name
