import { clsx } from 'clsx'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Section } from '@/components/section'

export interface CTALink {
  label: string
  href: string
}

export interface CTASectionProps {
  heading: string
  body: string
  primaryCta: CTALink
  secondaryCta?: CTALink
  /** Background image. Falls back to a flat navy surface when omitted. */
  image?: { src: string; alt: string }
  id?: string
  className?: string
}

/**
 * The closing call-to-action band: dark industrial photograph behind a heavy
 * scrim.
 *
 * The overlay is intentionally opaque (navy at 88%, near-black at 75% over it)
 * rather than a light wash — with an unknown photograph behind the text, only a
 * strong scrim guarantees the white heading and body clear WCAG AA regardless
 * of what the image happens to contain.
 */
export function CTASection({
  heading,
  body,
  primaryCta,
  secondaryCta,
  image,
  id,
  className,
}: CTASectionProps) {
  return (
    <Section
      {...(id && { id })}
      {...(image && { imageSrc: image.src, imageAlt: '' })}
      overlayColor="bg-accent2/88"
      className={clsx(!image && 'bg-accent2', 'py-20 lg:py-28', className)}
    >
      <div className="flex flex-col items-start border-l-2 border-accent pl-6 sm:pl-8">
        <Heading
          as="h2"
          fontSize="text-3xl sm:text-4xl"
          fontWeight="font-bold"
          letterSpacing="tracking-tight"
          lineHeight="leading-tight"
          fontFamily="font-heading"
          color="text-overlay-text"
          margin="mb-4"
          className="max-w-3xl text-balance"
        >
          {heading}
        </Heading>

        <Paragraph
          variant="large"
          color="text-accent3"
          margin="mb-8"
          className="max-w-2xl text-pretty"
        >
          {body}
        </Paragraph>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            href={primaryCta.href}
            variant="primary"
            size="medium"
            dark
          >
            {primaryCta.label}
          </Button>

          {secondaryCta && (
            <Button
              href={secondaryCta.href}
              variant="outline"
              size="medium"
              dark
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </Section>
  )
}
