import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { SectionHeading } from '@/components/section-heading'
import { IndustryCard } from '@/components/industry-card'
import { INDUSTRIES } from '@/catalog'

export default function Industries() {
  return (
    <Section
      id="industries"
      className="bg-body py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Industries We Serve"
        heading="Built to Support Demanding Work"
        className="mb-12 max-w-3xl md:mb-16"
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
