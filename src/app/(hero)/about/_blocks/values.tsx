import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { SectionHeading } from '@/components/section-heading'
import { values } from '@/config'

/** Company values, driven by `values` in @/config. */
export default function Values() {
  return (
    <Section className="bg-body2 py-20 md:py-28">
      <SectionHeading
        eyebrow="How We Work"
        heading="The Standards We Hold Ourselves To"
        intro="Four commitments that shape how orders are reviewed, manufactured, and delivered."
        className="mb-12 max-w-3xl md:mb-16"
      />

      <Grid
        cols="grid-cols-1 sm:grid-cols-2"
        gap="gap-px"
        className="border border-accent3-dark bg-accent3-dark"
      >
        {values.map((value, index) => (
          <div
            key={value.title}
            className="flex flex-col bg-body-light p-6 md:p-8"
          >
            <Span
              fontFamily="font-heading2"
              fontSize="text-sm"
              fontWeight="font-semibold"
              color="text-accent-dark"
              margin="mb-3"
              className="tracking-[0.2em]"
            >
              {String(index + 1).padStart(2, '0')}
            </Span>

            <Heading
              as="h3"
              fontSize="text-xl"
              fontWeight="font-bold"
              letterSpacing="tracking-tight"
              color="text-contrast"
              margin="mb-3"
            >
              {value.title}
            </Heading>

            <Paragraph
              fontSize="text-base"
              color="text-contrast-light"
              margin="mb-0"
            >
              {value.body}
            </Paragraph>
          </div>
        ))}
      </Grid>
    </Section>
  )
}
