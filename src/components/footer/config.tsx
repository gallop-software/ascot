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
 * Products column
 */
export const productLinks: FooterLink[] = [
  { label: 'Roofing Panels', href: '/products/roofing-panels' },
  { label: 'Wall and Liner Panels', href: '/products/wall-panels' },
  { label: 'Structural Components', href: '/products/structural-components' },
  { label: 'Trim and Flashing', href: '/products/trim-and-flashing' },
  { label: 'Fasteners and Accessories', href: '/products/fasteners-and-accessories' },
  { label: 'Panel Color Chart', href: '/colorchart' },
]

/**
 * Building systems column
 */
export const buildingLinks: FooterLink[] = [
  { label: 'Agricultural Buildings', href: '/building-systems/agricultural-buildings' },
  { label: 'Commercial Buildings', href: '/building-systems/commercial-buildings' },
  { label: 'Industrial Buildings', href: '/building-systems/industrial-buildings' },
  { label: 'Shops and Garages', href: '/building-systems/shops-and-garages' },
  { label: 'Warehouses', href: '/building-systems/warehouses' },
  { label: 'Storage Buildings', href: '/building-systems/storage-buildings' },
]

/**
 * Resources column
 */
export const resourceLinks: FooterLink[] = [
  { label: 'Panel Specifications', href: '/panels' },
  { label: 'Color Chart', href: '/colorchart' },
  { label: 'Articles and Guides', href: '/resources' },
  { label: 'Projects', href: '/projects' },
  { label: 'Industries We Serve', href: '/industries' },
  { label: 'About Us', href: '/about' },
]

/**
 * Quick links column (retained for layouts that use a single link list)
 */
export const quickLinks: FooterLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Metal Panels', href: '/panels' },
  { label: 'Building Systems', href: '/building-systems' },
  { label: 'Products', href: '/products' },
  { label: 'Industries', href: '/industries' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

/**
 * Legal / policy links
 */
export const legalLinks: FooterLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
]

/**
 * Business contact details — sourced from `src/config.ts`.
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
export const hours: { days: string; time: string }[] = companyHours.map((h) => ({
  days: h.days,
  time: h.time,
}))

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
