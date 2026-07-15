import mapMarkerIcon from '@iconify/icons-mdi/map-marker'
import phoneIcon from '@iconify/icons-mdi/phone'
import emailOutlineIcon from '@iconify/icons-mdi/email-outline'
import clockOutlineIcon from '@iconify/icons-mdi/clock-outline'
import { contact, hoursSummary, cta } from '@/config'
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
    label: 'Metal Panels',
    dropdown: true,
    children: [
      { href: '/panels/fs-r36', label: 'FS-R36 Structural Rib' },
      { href: '/panels/fs-a36', label: 'FS-A36 Agricultural' },
      { href: '/panels/fs-u36', label: 'FS-U36 Utility' },
      { href: '/panels/fs-s16', label: 'FS-S16 Standing Seam' },
      { href: '/panels/fs-i40', label: 'FS-I40 Insulated' },
      { href: '/panels/fs-l29', label: 'FS-L29 Interior Liner' },
      { href: '/colorchart', label: 'Panel Color Chart' },
    ],
  },
  {
    href: '/building-systems',
    label: 'Building Systems',
    dropdown: true,
    children: [
      { href: '/building-systems/commercial-buildings', label: 'Commercial Buildings' },
      { href: '/building-systems/agricultural-buildings', label: 'Agricultural Buildings' },
      { href: '/building-systems/industrial-buildings', label: 'Industrial Buildings' },
      { href: '/building-systems/shops-and-garages', label: 'Shops and Garages' },
      { href: '/building-systems/warehouses', label: 'Warehouses' },
      { href: '/building-systems/storage-buildings', label: 'Storage Buildings' },
      { href: '/products/structural-components', label: 'Building Components' },
    ],
  },
  {
    href: '/products',
    label: 'Products',
    dropdown: true,
    children: [
      { href: '/products/roofing-panels', label: 'Roofing Panels' },
      { href: '/products/wall-panels', label: 'Wall Panels' },
      { href: '/products/trim-and-flashing', label: 'Trim and Flashing' },
      { href: '/products/structural-components', label: 'Structural Components' },
      { href: '/products/fasteners-and-accessories', label: 'Fasteners and Accessories' },
    ],
  },
  {
    href: '/industries',
    label: 'Industries',
    dropdown: true,
    children: [
      { href: '/industries/agriculture', label: 'Agriculture' },
      { href: '/industries/commercial-construction', label: 'Commercial Construction' },
      { href: '/industries/industrial-facilities', label: 'Industrial Facilities' },
      { href: '/industries/residential-construction', label: 'Residential Construction' },
      { href: '/industries/municipal-and-utility', label: 'Municipal and Utility' },
      { href: '/industries/roofing-contractors', label: 'Roofing Contractors' },
    ],
  },
  { href: '/projects', label: 'Projects' },
  {
    href: '/resources',
    label: 'Resources',
    dropdown: true,
    children: [
      { href: '/colorchart', label: 'Color Chart' },
      { href: '/panels', label: 'Panel Specifications' },
      { href: '/resources/how-to-measure-for-metal-roofing', label: 'Installation Guides' },
      { href: '/resources#faq', label: 'Frequently Asked Questions' },
      { href: '/resources', label: 'Articles' },
      { href: '/resources#warranty', label: 'Warranty Information' },
    ],
  },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
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
  {
    title: 'Hours',
    value: hoursSummary,
    href: '/contact#hours',
    icon: clockOutlineIcon,
  },
]

/**
 * Social media links. Empty until real profiles exist for the customer —
 * a template should not imply relationships that do not exist.
 */
export const socialLinks: SocialLink[] = []
