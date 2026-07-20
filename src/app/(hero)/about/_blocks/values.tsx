import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { values } from '@/config'

/** Company values, driven by `values` in @/config. */
export default function Values() {
  return (
    <Section className="bg-body2 py-20 md:py-28">
      <div className="mb-12 max-w-3xl md:mb-16">
        <Heading as="h2">How We Work</Heading>
        <Heading as="h3">The Standards We Hold Ourselves To</Heading>
        <Paragraph
          color="text-contrast-light"
          margin="mb-0"
        >
          Four commitments that shape how orders are reviewed, manufactured, and
          delivered.
        </Paragraph>
      </div>

      <Grid
        cols="grid-cols-1 sm:grid-cols-2"
        gap="gap-4"
      >
        {values.map((value, index) => (
          <div
            key={value.title}
            className="flex flex-col border border-accent3-dark bg-body-light/50 p-6 md:p-8"
          >
            <Span
              fontFamily="font-heading"
              fontSize="text-3xl"
              fontWeight="font-bold"
              color="text-accent"
              margin="mb-3"
              className="tracking-tight"
            >
              {String(index + 1).padStart(2, '0')}
            </Span>

            <Heading
              as="h4"
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
