import { Section } from '@/components/section'
import { List, Li } from '@/components/list'
import { Span } from '@/components/span'
import { Heading } from '@/components/heading'
import { hours } from '@/config'

/**
 * Business hours. The `hours` id is linked directly from the navigation utility
 * bar (/contact#hours), so it must stay on this section.
 */
export default function Hours() {
  return (
    <Section
      id="hours"
      className="scroll-mt-32 bg-body2 py-20 md:py-28"
    >
      <div className="mb-8">
        <Heading as="h2">Business Hours</Heading>
        <Heading
          as="h3"
          margin="mb-0"
        >
          When We Are Open
        </Heading>
      </div>

      <List
        variant="unstyled"
        margin="mb-0"
        gap="gap-0"
        className="max-w-xl divide-y divide-accent3-dark border-y border-accent3-dark"
      >
        {hours.map((entry) => (
          <Li
            key={entry.days}
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
          >
            <Span
              fontSize="text-base"
              fontWeight="font-semibold"
              color="text-contrast"
            >
              {entry.days}
            </Span>
            <Span
              fontSize="text-base"
              color={entry.schema ? 'text-contrast' : 'text-contrast-light'}
              className="tabular-nums"
            >
              {entry.time}
            </Span>
          </Li>
        ))}
      </List>
    </Section>
  )
}
