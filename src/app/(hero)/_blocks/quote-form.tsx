import { Section } from '@/components/section'
import { Columns, Column } from '@/components/columns'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import {
  Form,
  FormInput,
  FormSelect,
  FormTextArea,
  FormButton,
} from '@/components/form'
import { Image } from '@/components/image'

/**
 * Quote form option list. Edit to match the customer's own segments.
 */
const PROJECT_TYPES = [
  'Metal roof',
  'Metal siding',
  'Agricultural building',
  'Commercial building',
  'Industrial building',
  'Shop or garage',
  'Warehouse',
  'Material-only order',
  'Replacement or repair',
  'Other',
]

function FieldGroup({
  legend,
  children,
}: {
  legend: string
  children: React.ReactNode
}) {
  return (
    <fieldset className="flex flex-col gap-8 pt-8 first:pt-0">
      <legend className="sr-only">{legend}</legend>
      <Heading
        as="h4"
        margin="mb-0"
      >
        {legend}
      </Heading>
      {children}
    </fieldset>
  )
}

export default function QuoteForm() {
  return (
    <Section
      id="quote"
      className="relative bg-body py-20 md:py-30"
    >
      <Columns
        reverseColumns={false}
        align="items-start"
      >
        <Column className="mb-10">
          <Heading
            as="h2"
            styleAs="h3"
            margin="mb-4"
          >
            Request a Quote
          </Heading>
          <Paragraph margin="mb-8">
            Tell us about your project and our team will prepare a clear quote.
          </Paragraph>

          <Form honeypot>
            <FormInput
              name="emailSubject"
              defaultValue="Quote Request"
              label="Email Subject"
              hidden
            />

            <FieldGroup legend="Your details">
              <FormInput
                name="name"
                type="text"
                placeholder="Full name"
                label="Full name"
                autoComplete="name"
                required
              />
              <FormInput
                name="email"
                type="email"
                placeholder="Email"
                label="Email"
                autoComplete="email"
                required
              />
              <FormInput
                name="phone"
                type="tel"
                placeholder="Phone"
                label="Phone"
                autoComplete="tel"
                required
              />
            </FieldGroup>

            <FieldGroup legend="Project details">
              <FormSelect
                name="projectType"
                label="Project type"
                placeholder="Select project type"
                options={PROJECT_TYPES}
                required
              />
              <FormInput
                name="projectLocation"
                type="text"
                placeholder="City and state"
                label="Project location"
                required
              />
              <FormTextArea
                name="message"
                placeholder="Tell us what you need — products, measurements, timeline, anything else."
                rows={4}
                label="Project description"
                required
              />
            </FieldGroup>

            <FormButton
              name="submit"
              label="Request Quote"
              className="ft-tracking"
            />
          </Form>
        </Column>

        <Column>
          <Image
            src="/placeholder.png"
            alt="Steel roofing panels running through a roll-forming line at the ForgeSpan Metals facility"
            className="h-auto w-full"
            rounded="rounded-none"
            size="large"
            lazy={false}
          />
        </Column>
      </Columns>
    </Section>
  )
}
