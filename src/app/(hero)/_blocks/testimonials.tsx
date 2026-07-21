import { Section } from '@/components/section'
import { Swiper } from '@/components/swiper'
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

      <Swiper
        layout="carousel"
        columns={3}
        nextButtonText="More Reviews"
      >
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard
            key={testimonial.name}
            testimonial={testimonial}
            className="h-full"
          />
        ))}
      </Swiper>
    </Section>
  )
}
