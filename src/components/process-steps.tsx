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
  className?: string
}

/**
 * Numbered industrial process steps. Rendered as an ordered list so the
 * sequence is conveyed structurally, not only by the printed numerals.
 */
export function ProcessSteps({
  steps,
  dark = false,
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
        'grid-cols-1 border-t md:grid-cols-2 lg:grid-cols-4 lg:border-t-0 lg:border-l',
        dark ? 'border-accent4-dark' : 'border-accent3-dark',
        className
      )}
    >
      {steps.map((step) => (
        <Li
          key={step.step}
          className={clsx(
            'flex flex-col border-b px-6 py-8 lg:border-r lg:border-b-0',
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
            as="h3"
            fontSize="text-lg"
            fontWeight="font-bold"
            letterSpacing="tracking-tight"
            lineHeight="leading-tight"
            color={dark ? 'text-overlay-text' : 'text-contrast'}
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
