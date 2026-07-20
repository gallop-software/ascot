import { clsx } from 'clsx'
import type { Testimonial } from '@/catalog'
import { Quote } from '@/components/quote'
import { Span } from '@/components/span'

export interface TestimonialCardProps {
  testimonial: Testimonial
  /** Render for placement on a dark (accent2 / navy) surface. */
  dark?: boolean
  className?: string
}

/**
 * Customer testimonial in an industrial bordered card, with a Safety Orange
 * rule at the top edge as the accent. Uses the shared Quote component so quote
 * typography stays consistent with the rest of the site.
 */
export function TestimonialCard({
  testimonial,
  dark = false,
  className,
}: TestimonialCardProps) {
  return (
    <figure
      className={clsx(
        'flex h-full flex-col rounded-none border p-6',
        dark ? 'border-accent4-dark bg-accent2-dark' : 'border-accent3-dark bg-body-light',
        className
      )}
    >
      <Quote
        variant="small"
        fontStyle="not-italic"
        color={dark ? 'text-accent3' : 'text-contrast-light'}
        margin="mb-6"
        className="flex-1"
      >
        {testimonial.quote}
      </Quote>

      <figcaption
        className={clsx(
          'flex flex-col gap-y-1 border-t pt-4',
          dark ? 'border-accent4-dark' : 'border-accent3-dark'
        )}
      >
        <Span
          fontSize="text-base"
          fontWeight="font-semibold"
          color={dark ? 'text-overlay-text' : 'text-contrast'}
        >
          {testimonial.name}
        </Span>
        <Span
          fontSize="text-sm"
          color={dark ? 'text-accent3' : 'text-contrast-light'}
        >
          {testimonial.company}
        </Span>
      </figcaption>
    </figure>
  )
}
