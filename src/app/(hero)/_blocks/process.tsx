import { Section } from '@/components/section'
import { Columns, Column } from '@/components/columns'
import { Image } from '@/components/image'
import { Heading } from '@/components/heading'
import { ProcessSteps } from '@/components/process-steps'
import { PROCESS_STEPS } from '@/catalog'

export default function Process() {
  return (
    <Section
      id="how-it-works"
      className="bg-body2 py-20 md:py-28"
    >
      <div className="mb-12 max-w-3xl md:mb-16">
        <Heading as="h2">How It Works</Heading>
        <Heading
          as="h3"
          margin="mb-0"
        >
          From Measurements to Finished Materials
        </Heading>
      </div>

      <Columns
        cols="grid-cols-1 lg:grid-cols-5"
        gap="gap-12 lg:gap-16"
        align="items-start"
      >
        <Column className="lg:col-span-2">
          <Image
            src="/placeholder.png"
            alt="Roll-forming line shaping a steel coil into ribbed roofing panels at the ForgeSpan plant"
            size="large"
            rounded="rounded-none"
            className="h-auto w-full"
          />
        </Column>
        <Column className="lg:col-span-3">
          <ProcessSteps
            steps={PROCESS_STEPS}
            cols="md:grid-cols-2"
          />
        </Column>
      </Columns>
    </Section>
  )
}
