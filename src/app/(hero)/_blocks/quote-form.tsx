import { Section } from '@/components/section'
import { Columns, Column } from '@/components/columns'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Label } from '@/components/label'
import {
  Form,
  FormInput,
  FormSelect,
  FormTextArea,
  FormUpload,
  FormRadioGroup,
  FormButton,
} from '@/components/form'
import { Image } from '@/components/image'
import { Icon } from '@/components/icon'
import { PANEL_PROFILES, PANEL_COLORS } from '@/catalog'
import { contact } from '@/config'
import lockIcon from '@iconify/icons-lucide/lock'

/**
 * Quote form option lists. Edit these to match the customer's own segments —
 * the panel and color options derive from `src/catalog.ts` automatically.
 */
const CUSTOMER_TYPES = [
  'Contractor',
  'Builder',
  'Roofing company',
  'Farm or ranch',
  'Commercial property owner',
  'Homeowner',
  'Architect or engineer',
  'Government or municipality',
  'Other',
]

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

const PANEL_OPTIONS = [
  { value: 'undecided', label: 'Not sure yet — help me choose' },
  ...PANEL_PROFILES.map((panel) => ({ value: panel.slug, label: panel.name })),
]

const COLOR_OPTIONS = [
  { value: 'undecided', label: 'Not sure yet — send samples' },
  ...PANEL_COLORS.map((color) => ({ value: color.name, label: color.name })),
]

function FieldGroup({
  legend,
  children,
}: {
  legend: string
  children: React.ReactNode
}) {
  return (
    <fieldset className="flex flex-col gap-8 border-t border-body-dark pt-8 first:border-t-0 first:pt-0">
      <legend className="sr-only">{legend}</legend>
      <Label
        color="text-contrast"
        fontSize="text-sm"
        fontWeight="font-semibold"
        margin="mb-0"
        className="font-heading2 tracking-[0.16em] uppercase"
      >
        {legend}
      </Label>
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
            Send us your material list, measurements, plans, or project details.
            Our team will review what you need, flag anything missing, and
            prepare a clear quote.
          </Paragraph>

          <Form
            honeypot
            turnstile
          >
            <FormInput
              name="emailSubject"
              defaultValue="Quote Request"
              label="Email Subject"
              hidden
            />

            <FieldGroup legend="Your details">
              <FormInput
                name="firstName"
                type="text"
                placeholder="First name"
                label="First name"
                autoComplete="given-name"
                required
              />
              <FormInput
                name="lastName"
                type="text"
                placeholder="Last name"
                label="Last name"
                autoComplete="family-name"
                required
              />
              <FormInput
                name="company"
                type="text"
                placeholder="Company (optional)"
                label="Company"
                autoComplete="organization"
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
              <FormSelect
                name="customerType"
                label="Customer type"
                placeholder="Select customer type"
                options={CUSTOMER_TYPES}
                required
              />
              <FormRadioGroup
                name="contactMethod"
                heading="Preferred contact method"
                label="Preferred contact method"
                options={['Email', 'Phone', 'Text message']}
                defaultValue="Email"
                required
              />
            </FieldGroup>

            <FieldGroup legend="Project details">
              <FormInput
                name="projectLocation"
                type="text"
                placeholder="City and state, or jobsite address"
                label="Project location"
                required
              />
              <FormSelect
                name="projectType"
                label="Project type"
                placeholder="Select project type"
                options={PROJECT_TYPES}
                required
              />
              <FormTextArea
                name="productsNeeded"
                placeholder="Roofing panels, trim, fasteners, structural components…"
                rows={2}
                label="Products needed"
                required
              />
              <FormInput
                name="dimensions"
                type="text"
                placeholder="e.g. 40 x 60 x 14, or roof length and width"
                label="Approximate project dimensions"
              />
              <FormSelect
                name="panelProfile"
                label="Preferred panel profile"
                placeholder="Select a panel profile"
                options={PANEL_OPTIONS}
              />
              <FormSelect
                name="panelColor"
                label="Preferred color"
                placeholder="Select a color"
                options={COLOR_OPTIONS}
              />
              <FormInput
                name="completionDate"
                type="date"
                label="Desired completion date"
                disablePastMonths
              />
              <FormRadioGroup
                name="fulfillment"
                heading="Delivery or pickup"
                label="Delivery or pickup"
                options={[
                  'Regional delivery',
                  'Pickup at our facility',
                  'Not sure yet',
                ]}
                defaultValue="Not sure yet"
                required
              />
              <FormTextArea
                name="message"
                placeholder="Tell us about the project — building use, site conditions, openings, timeline, anything unusual."
                rows={4}
                label="Project description"
                required
              />
              <FormUpload
                name="attachments"
                label="Plans, measurements, photos, or material lists"
                multiple
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.csv,.dwg"
              />
            </FieldGroup>

            <FormButton
              name="submit"
              label="Request Quote"
              className="ft-tracking"
            />
          </Form>

          <div className="mt-8 flex items-start gap-3">
            <Icon
              icon={lockIcon}
              className="mt-1 h-4 w-4 flex-none text-accent"
            />
            <Paragraph
              fontSize="text-sm"
              color="text-contrast-light"
              margin="mb-0"
            >
              Your details are used only to prepare and discuss your quote. We do
              not sell or share your information. Submitting this form starts a
              conversation — it does not lock in pricing or a production date.
              Prefer to talk it through? Call{' '}
              <a
                href={contact.phoneHref}
                className="text-accent-dark hover:underline"
              >
                {contact.phone}
              </a>
              .
            </Paragraph>
          </div>
        </Column>

        <Column className="relative aspect-[8/9]">
          <Image
            src="/images/facility/roll-forming-line.jpg"
            alt="Steel roofing panels running through a roll-forming line at the ForgeSpan Metals facility"
            className="absolute inset-0 h-full w-full object-cover"
            rounded="rounded-none"
            size="large"
            lazy={false}
          />
        </Column>
      </Columns>
    </Section>
  )
}
