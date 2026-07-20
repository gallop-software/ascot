import { Oswald } from 'next/font/google'

// Tertiary display slot. Shares the primary heading face so the type system
// stays restrained.
export const heading3Font = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})
