import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { TestimonialCard } from '@/components/testimonial-card'
import { TESTIMONIALS } from '@/catalog'

export default function Testimonials() {
  return (
    <Section
      id="testimonials"
      className="bg-body py-20 md:py-28"
    >
      <div className="mb-12 max-w-3xl md:mb-16">
        <Heading as="h2">What Customers Say</Heading>
        <Heading as="h3">Trusted by the Crews Doing the Work</Heading>
        <Paragraph
          color="text-contrast-light"
          margin="mb-0"
        >
          Contractors, roofers, and builders who order from us week in and week
          out.
        </Paragraph>
      </div>

      <Grid
        cols="grid-cols-1 lg:grid-cols-3"
        gap="gap-6 lg:gap-8"
      >
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard
            key={testimonial.name}
            testimonial={testimonial}
          />
        ))}
      </Grid>
    </Section>
  )
}
