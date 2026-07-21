import { clsx } from 'clsx'
import quoteIcon from '@iconify/icons-lucide/quote'
import { Icon } from '@/components/icon'
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
        'relative flex h-full flex-col rounded-none border p-6 pt-8 transition-shadow hover:shadow-lg',
        'before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-accent',
        dark
          ? 'border-accent4-dark bg-accent2-dark'
          : 'border-accent3-dark bg-body-light',
        className
      )}
    >
      <Icon
        icon={quoteIcon}
        className="mb-4 h-8 w-8 text-accent"
      />

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
