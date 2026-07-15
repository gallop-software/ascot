import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { SectionHeading } from '@/components/section-heading'
import { TestimonialCard } from '@/components/testimonial-card'
import { TESTIMONIALS } from '@/catalog'

export default function Testimonials() {
  return (
    <Section
      id="testimonials"
      className="bg-accent2 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="What Customers Say"
        heading="Trusted by the Crews Doing the Work"
        dark
        className="mb-12 max-w-3xl md:mb-16"
      />

      <Grid
        cols="grid-cols-1 lg:grid-cols-3"
        gap="gap-6 lg:gap-8"
      >
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard
            key={testimonial.name}
            testimonial={testimonial}
            dark
          />
        ))}
      </Grid>
    </Section>
  )
}
