import checkIcon from '@iconify/icons-lucide/check'
import type { Industry } from '@/catalog'
import { Heading } from '@/components/heading'
import { List, Li } from '@/components/list'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'
import { Span } from '@/components/span'

/** What this industry needs from a supplier — the catalog `needs` list. */
export default function Needs({ industry }: { industry: Industry }) {
  if (industry.needs.length === 0) return null

  return (
    <Section className="py-20 lg:py-28">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="What They Need"
            heading={`What ${industry.name} Ask For`}
            intro="These are the requirements that come up first on nearly every order in this category."
          />
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-none border border-accent3-dark bg-accent3 p-6 lg:p-8">
            <Heading
              as="h3"
              fontFamily="font-heading2"
              fontSize="text-sm"
              fontWeight="font-semibold"
              color="text-contrast-light"
              margin="mb-5"
              className="border-b border-accent4/40 pb-4 uppercase tracking-[0.16em]"
            >
              Requirements We Plan Around
            </Heading>

            <List
              variant="unstyled"
              spacing="loose"
              margin="mb-0"
            >
              {industry.needs.map((need) => (
                <Li
                  key={need}
                  icon={checkIcon}
                  iconSize="w-5 h-5"
                  className="text-accent-dark"
                >
                  <Span
                    fontSize="text-lg"
                    color="text-contrast"
                  >
                    {need}
                  </Span>
                </Li>
              ))}
            </List>
          </div>
        </div>
      </div>
    </Section>
  )
}
