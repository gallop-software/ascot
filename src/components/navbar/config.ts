import mapMarkerIcon from '@iconify/icons-mdi/map-marker'
import phoneIcon from '@iconify/icons-mdi/phone'
import emailOutlineIcon from '@iconify/icons-mdi/email-outline'
import { contact, cta } from '@/config'
import type { NavLink, SocialLink, ContactItem } from './types'

/**
 * Home link for logo navigation
 */
export const homeLink = '/'

/**
 * Primary "Request a Quote" call to action
 */
export const quoteLink = cta.quote.href

export const quoteLabel = cta.quote.label

/**
 * Main navigation links.
 *
 * Dropdown groups render as a mega menu on desktop and collapsible sections on
 * mobile. Keep children one level deep — the mobile navigation only expands a
 * single level.
 */
export const links: NavLink[] = [
  { href: '/', label: 'Home' },
  {
    href: '/panels',
    label: 'Panels',
    dropdown: true,
    children: [
      { href: '/panels/pro-rib', label: 'Pro-Rib Panel' },
      { href: '/panels/standing-seam', label: 'Standing Seam Panel' },
      { href: '/panels/insulated-wall', label: 'Insulated Wall Panel' },
      { href: '/panels', label: 'Compare All Profiles' },
    ],
  },
  { href: '/trims', label: 'Trims' },
  { href: '/products', label: 'Products' },
  { href: '/buildings', label: 'Buildings' },
  {
    href: '/about',
    label: 'Company',
    dropdown: true,
    children: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
]

/**
 * Top utility bar items. Values come from `src/config.ts` so business details
 * live in exactly one place.
 */
export const contactItems: ContactItem[] = [
  {
    title: 'Location',
    value: contact.addressLine,
    href: contact.mapHref,
    icon: mapMarkerIcon,
    external: true,
  },
  {
    title: 'Phone',
    value: contact.phone,
    href: contact.phoneHref,
    icon: phoneIcon,
  },
  {
    title: 'Email Us',
    value: contact.email,
    href: contact.emailHref,
    icon: emailOutlineIcon,
  },
]

/**
 * Social media links. Empty until real profiles exist for the customer —
 * a template should not imply relationships that do not exist.
 */
export const socialLinks: SocialLink[] = []
