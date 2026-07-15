import { Archivo } from 'next/font/google'

// Compact, architectural grotesque for headings, eyebrows, and spec labels.
export const headingFont = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})
