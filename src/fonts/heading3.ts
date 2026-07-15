import { Archivo } from 'next/font/google'

// Tertiary display slot. Shares the primary heading face so the type system
// stays restrained — no decorative or script faces in this template.
export const heading3Font = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})
