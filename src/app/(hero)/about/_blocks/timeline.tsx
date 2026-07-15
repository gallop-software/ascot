import { Section } from '@/components/section'
import { List, Li } from '@/components/list'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { SectionHeading } from '@/components/section-heading'
import { timeline } from '@/config'

/**
 * Company milestones, driven by `timeline` in @/config.
 *
 * Rendered as a bordered technical ladder: a thin rule runs down the left of the
 * list and each milestone hangs a year plate off it, so the sequence reads as
 * one continuous run rather than a stack of separate cards.
 */
export default function Timeline() {
  return (
    <Section className="bg-body py-20 md:py-28">
      <SectionHeading
        eyebrow="Milestones"
        heading="How the Operation Grew"
        intro="Each step added capability that our customers were already asking for."
        className="mb-12 max-w-3xl md:mb-16"
      />

      <List
        variant="unstyled"
        margin="mb-0"
        gap="gap-0"
        className="border-l border-accent3-dark"
      >
        {timeline.map((milestone) => (
          <Li
            key={milestone.year}
            className="relative flex flex-col gap-x-8 gap-y-2 py-6 pl-6 sm:flex-row sm:items-baseline sm:pl-10"
          >
            <span
              aria-hidden="true"
              className="absolute top-8 left-0 h-px w-4 bg-accent sm:w-6"
            />

            <Span
              fontFamily="font-heading"
              fontSize="text-2xl"
              fontWeight="font-bold"
              color="text-accent-dark"
              className="w-24 flex-none tracking-tight tabular-nums"
            >
              {milestone.year}
            </Span>

            <Paragraph
              fontSize="text-base sm:text-lg"
              color="text-contrast"
              margin="mb-0"
              className="text-pretty"
            >
              {milestone.body}
            </Paragraph>
          </Li>
        ))}
      </List>
    </Section>
  )
}
