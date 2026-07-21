import { Barlow_Condensed } from 'next/font/google'

// Accent slot. Condensed industrial rather than script, since the Accent component
// is used for restrained uppercase eyebrows, not decorative flourishes.
export const accentFont = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})
