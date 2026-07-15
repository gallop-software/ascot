import { Section } from '@/components/section'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { List, Li } from '@/components/list'
import { Span } from '@/components/span'
import { SectionHeading } from '@/components/section-heading'
import { cta, contact } from '@/config'
import checkIcon from '@iconify/icons-heroicons/check-circle-20-solid'
import arrowRightIcon from '@iconify/icons-heroicons/arrow-right-20-solid'
import phoneIcon from '@iconify/icons-lucide/phone'

/**
 * Signpost to the quote form on the homepage. The form itself lives at /#quote
 * and is owned by that route — this block only points at it so there is exactly
 * one quote form on the site.
 */
const HELPFUL_DETAILS = [
  'Building dimensions, or the slab you are working from',
  'Panel profile, gauge, and color if you already know them',
  'Door, window, and other opening sizes',
  'Delivery address or whether you plan to pick up',
]

export default function Quote() {
  return (
    <Section className="bg-body py-20 md:py-28">
      <div className="border border-accent3-dark bg-body-light p-8 md:p-12">
        <SectionHeading
          eyebrow="Request a Quote"
          heading="Send Us the Project Details"
          intro="Our quote form is the quickest route to a priced material list. The more detail you send, the fewer rounds it takes to get it right."
          className="mb-8 max-w-3xl"
        />

        <List
          variant="unstyled"
          margin="mb-8"
          gap="gap-y-3"
        >
          {HELPFUL_DETAILS.map((detail) => (
            <Li
              key={detail}
              icon={checkIcon}
              iconSize="w-5 h-5"
              className="text-accent-dark"
            >
              <Span
                color="text-contrast-light"
                margin="mb-0"
              >
                {detail}
              </Span>
            </Li>
          ))}
        </List>

        <Buttons margin="mt-0 mb-0">
          <Button
            href={cta.quote.href}
            size="medium"
            icon={arrowRightIcon}
            iconPlacement="after"
            className="max-sm:w-full"
          >
            {cta.quote.label}
          </Button>
          <Button
            href={contact.phoneHref}
            variant="outline"
            size="medium"
            native
            icon={phoneIcon}
            iconPlacement="before"
            className="max-sm:w-full"
          >
            {cta.call.label}
          </Button>
        </Buttons>
      </div>
    </Section>
  )
}
