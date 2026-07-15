import { clsx } from 'clsx'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface SectionHeadingProps {
  /** Short uppercase kicker rendered above the heading with an orange rule. */
  eyebrow?: string
  heading: string
  /** Supporting paragraph rendered below the heading. */
  intro?: string
  /** HTML heading level. Defaults to h2 — sections sit under the page h1. */
  as?: HeadingLevel
  align?: 'left' | 'center'
  /** Render for placement on a dark (accent2 / navy) surface. */
  dark?: boolean
  className?: string
}

/**
 * The standard section header: eyebrow + heading + intro.
 *
 * Used by nearly every section, so the industrial eyebrow treatment (Barlow
 * Condensed, uppercase, small Safety Orange rule) stays consistent site-wide.
 * The Heading component's h2 defaults are deliberately overridden here — this
 * is a display heading, not the compact h2 default.
 */
export function SectionHeading({
  eyebrow,
  heading,
  intro,
  as = 'h2',
  align = 'left',
  dark = false,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div
      className={clsx(
        'flex flex-col',
        centered && 'items-center text-center',
        className
      )}
    >
      {eyebrow && (
        <div
          className={clsx(
            'flex items-center gap-x-3 mb-4',
            centered && 'justify-center'
          )}
        >
          <span
            aria-hidden="true"
            className="h-px w-8 flex-none bg-accent"
          />
          <Span
            fontFamily="font-heading2"
            fontSize="text-sm"
            fontWeight="font-semibold"
            color={dark ? 'text-accent-light' : 'text-accent-dark'}
            className="uppercase tracking-[0.2em]"
          >
            {eyebrow}
          </Span>
        </div>
      )}

      <Heading
        as={as}
        fontSize="text-3xl sm:text-4xl"
        fontWeight="font-bold"
        letterSpacing="tracking-tight"
        lineHeight="leading-tight"
        fontFamily="font-heading"
        color={dark ? 'text-overlay-text' : 'text-contrast'}
        margin={intro ? 'mb-5' : 'mb-0'}
        textAlign={centered ? 'text-center' : ''}
        className="text-balance"
      >
        {heading}
      </Heading>

      {intro && (
        <Paragraph
          variant="large"
          color={dark ? 'text-accent3' : 'text-contrast-light'}
          margin="mb-0"
          textAlign={centered ? 'text-center' : ''}
          className={clsx('max-w-2xl text-pretty', centered && 'mx-auto')}
        >
          {intro}
        </Paragraph>
      )}
    </div>
  )
}
