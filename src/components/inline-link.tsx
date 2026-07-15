import type { ReactNode } from 'react'
import NextLink from 'next/link'

/**
 * Inline contextual link for use inside body prose. Inherits the surrounding
 * text size/case (built on next/link, not the uppercase Link component) with
 * underlined accent styling so it reads as a link mid-sentence.
 */
export function InlineLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <NextLink
      href={href}
      className="font-medium text-accent underline decoration-accent/40 underline-offset-2 transition-colors duration-200 hover:text-accent-dark hover:decoration-accent"
    >
      {children}
    </NextLink>
  )
}
