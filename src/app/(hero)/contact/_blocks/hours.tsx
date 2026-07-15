import { Section } from '@/components/section'
import { Columns, Column } from '@/components/columns'
import { List, Li } from '@/components/list'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { SectionHeading } from '@/components/section-heading'
import { hours, serviceArea } from '@/config'

/**
 * Business hours and service area. The `hours` id is linked directly from the
 * navigation utility bar (/contact#hours), so it must stay on this section.
 */
export default function Hours() {
  return (
    <Section
      id="hours"
      className="scroll-mt-32 bg-body2 py-20 md:py-28"
    >
      <Columns
        cols="grid-cols-1 lg:grid-cols-2"
        gap="gap-10 lg:gap-16"
        align="items-start"
      >
        <Column>
          <SectionHeading
            eyebrow="Business Hours"
            heading="When We Are Open"
            className="mb-8"
          />

          <List
            variant="unstyled"
            margin="mb-0"
            gap="gap-0"
            className="border border-accent3-dark bg-body-light"
          >
            {hours.map((entry) => (
              <Li
                key={entry.days}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-accent3-dark px-6 py-4 last:border-b-0"
              >
                <Span
                  fontSize="text-base"
                  fontWeight="font-semibold"
                  color="text-contrast"
                >
                  {entry.days}
                </Span>
                <Span
                  fontFamily="font-heading2"
                  fontSize="text-base"
                  color={
                    entry.schema ? 'text-contrast' : 'text-contrast-light'
                  }
                  className="tabular-nums"
                >
                  {entry.time}
                </Span>
              </Li>
            ))}
          </List>

          <Paragraph
            fontSize="text-sm"
            color="text-contrast-light"
            margin="mt-4 mb-0"
          >
            Holiday hours can differ. Call ahead if you are driving in for a
            pickup near a holiday.
          </Paragraph>
        </Column>

        <Column>
          <SectionHeading
            eyebrow="Service Area"
            heading="Where We Deliver"
            className="mb-8"
          />

          <Paragraph
            color="text-contrast-light"
            margin="mb-6"
            className="text-pretty"
          >
            {serviceArea.summary}
          </Paragraph>

          <div className="flex flex-col items-start border-l-2 border-accent bg-accent3-light/40 px-6 py-5">
            <Span
              fontFamily="font-heading2"
              fontSize="text-sm"
              fontWeight="font-semibold"
              color="text-accent-dark"
              margin="mb-2"
              className="uppercase tracking-[0.16em]"
            >
              Regional Delivery
            </Span>
            <Paragraph
              fontSize="text-base"
              color="text-contrast"
              margin="mb-0"
            >
              Jobsite delivery is available within roughly{' '}
              {serviceArea.deliveryRadiusMiles} miles of the plant. Outside that
              range, ask us — we can often work something out. Delivery dates are
              confirmed when the order is placed.
            </Paragraph>
          </div>
        </Column>
      </Columns>
    </Section>
  )
}
