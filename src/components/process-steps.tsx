import { clsx } from 'clsx'
import type { ProcessStep } from '@/catalog'
import { Heading } from '@/components/heading'
import { List, Li } from '@/components/list'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'

export interface ProcessStepsProps {
  steps: ProcessStep[]
  /** Render for placement on a dark (accent2 / navy) surface. */
  dark?: boolean
  /** Responsive grid-column classes for the step tiles. */
  cols?: string
  className?: string
}

/**
 * Numbered industrial process steps. Rendered as an ordered list so the
 * sequence is conveyed structurally, not only by the printed numerals.
 */
export function ProcessSteps({
  steps,
  dark = false,
  cols = 'md:grid-cols-2 lg:grid-cols-4',
  className,
}: ProcessStepsProps) {
  if (steps.length === 0) return null

  return (
    <List
      ordered
      variant="unstyled"
      spacing="normal"
      margin="mb-0"
      gap="gap-0"
      className={clsx(
        'grid-cols-1 border-t',
        cols,
        dark ? 'border-accent4-dark' : 'border-accent3-dark',
        className
      )}
    >
      {steps.map((step) => (
        <Li
          key={step.step}
          className={clsx(
            'flex flex-col border-b px-6 py-8',
            dark ? 'border-accent4-dark' : 'border-accent3-dark'
          )}
        >
          <Span
            aria-hidden="true"
            fontFamily="font-heading"
            fontSize="text-4xl"
            fontWeight="font-bold"
            color="text-accent"
            margin="mb-3"
            className="tracking-tight"
          >
            {String(step.step).padStart(2, '0')}
          </Span>

          <Heading
            as="h4"
            color={dark ? 'text-overlay-text' : undefined}
            margin="mb-2"
          >
            {step.title}
          </Heading>

          <Paragraph
            fontSize="text-base"
            color={dark ? 'text-accent3' : 'text-contrast-light'}
            margin="mb-0"
          >
            {step.body}
          </Paragraph>
        </Li>
      ))}
    </List>
  )
}
