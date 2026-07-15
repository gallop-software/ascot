import { Container } from '@/components/container'
import { Image } from '@/components/image'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { Breadcrumbs } from '@/components/breadcrumbs'

/** Page hero for the /resources index. */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-accent2">
      <Image
        src="/images/resources/panel-specification-sheets.jpg"
        alt="Panel drawings and specification sheets spread across a workbench beside sample trim pieces"
        size="full"
        rounded="rounded-none"
        lazy={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-accent2-dark/95 via-accent2-dark/85 to-accent2-dark/45" />

      <Container className="relative pt-40 pb-20 md:pt-40 md:pb-28 lg:pt-64 lg:pb-36">
        <Breadcrumbs
          dark
          className="mb-8"
          items={[{ label: 'Home', href: '/' }, { label: 'Resources' }]}
        />

        <div className="max-w-3xl border-l-2 border-accent pl-6 sm:pl-8">
          <Span
            fontFamily="font-heading2"
            fontSize="text-sm"
            fontWeight="font-semibold"
            color="text-accent-light"
            margin="mb-4"
            className="uppercase tracking-[0.2em]"
          >
            Resources
          </Span>

          <Heading
            as="h1"
            color="text-overlay-text"
            margin="mb-6"
            className="text-balance"
          >
            Guides, Specifications, and Straight Answers
          </Heading>

          <Paragraph
            variant="large"
            color="text-accent3"
            margin="mb-0"
            className="text-pretty"
          >
            The questions we field most often, written down. Panel selection,
            gauge, measuring, finishes, and what to settle before you order.
          </Paragraph>
        </div>
      </Container>
    </section>
  )
}
