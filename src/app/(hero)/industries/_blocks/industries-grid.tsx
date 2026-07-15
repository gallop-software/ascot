import { INDUSTRIES } from '@/catalog'
import { Grid } from '@/components/grid'
import { IndustryCard } from '@/components/industry-card'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'

/** Grid of every industry in the catalog. */
export default function IndustriesGrid() {
  return (
    <Section className="py-20 lg:py-28">
      <SectionHeading
        eyebrow="Who We Supply"
        heading="Where Our Material Ends Up"
        intro="The panels, trim, and structural components are the same. How they get specified, bundled, and delivered is what changes from one operation to the next."
        className="mb-12 lg:mb-16"
      />

      <Grid
        cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        gap="gap-6 lg:gap-8"
      >
        {INDUSTRIES.map((industry) => (
          <IndustryCard
            key={industry.slug}
            industry={industry}
          />
        ))}
      </Grid>
    </Section>
  )
}
