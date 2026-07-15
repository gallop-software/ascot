/**
 * TypeScript type definitions for the navbar component system
 */

/**
 * Iconify icon data shape
 */
export interface IconData {
  body: string
  width?: number
  height?: number
}

/**
 * Navigation link structure
 */
export interface NavLink {
  /** Destination route. Optional for dropdown parents that only group children. */
  href?: string
  label: string
  /** Shows a dropdown caret on the label */
  dropdown?: boolean
  /** Child links revealed on hover (desktop) / tap-to-expand (mobile) */
  children?: NavLink[]
}

/**
 * Top contact strip item structure
 */
export interface ContactItem {
  title: string
  value: string
  href: string
  icon: IconData
  external?: boolean
}

/**
 * Social media link structure
 */
export interface SocialLink {
  name: string
  href: string
  icon: IconData
}

/**
 * Main navbar component props
 */
export interface NavbarProps {
  className?: string
  dark?: boolean
  hero?: boolean
}
