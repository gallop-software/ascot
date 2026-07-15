import type { Industry } from '@/catalog'
import { CONTRACTOR_BENEFITS } from '@/catalog'
import { Grid } from '@/components/grid'
import { Paragraph } from '@/components/paragraph'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'
import { Span } from '@/components/span'
import { company, serviceArea } from '@/config'

/** How the company supports this industry day to day. */
export default function Support({ industry }: { industry: Industry }) {
  return (
    <Section className="bg-accent2 py-20 lg:py-28">
      <SectionHeading
        dark
        eyebrow="How We Support You"
        heading={`Working With ${company.shortName}`}
        intro={`${company.shortName} manufactures the panels, trim, and components in house, which is why an order for ${industry.name.toLowerCase()} can be adjusted, bundled, and scheduled around how the work actually runs.`}
        className="mb-12 lg:mb-16"
      />

      <Grid
        cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        gap="gap-px"
        className="border border-accent4-dark bg-accent4-dark"
      >
        {CONTRACTOR_BENEFITS.map((benefit) => (
          <div
            key={benefit}
            className="flex items-center bg-accent2 px-6 py-6"
          >
            <Span
              fontSize="text-base"
              fontWeight="font-medium"
              color="text-overlay-text"
            >
              {benefit}
            </Span>
          </div>
        ))}
      </Grid>

      <Paragraph
        fontSize="text-base"
        color="text-accent3"
        margin="mt-8 mb-0"
        className="max-w-3xl text-pretty"
      >
        {`We deliver across ${serviceArea.summary} Pickup and regional jobsite delivery within roughly ${serviceArea.deliveryRadiusMiles} miles are scheduled when the order is confirmed.`}
      </Paragraph>
    </Section>
  )
}
