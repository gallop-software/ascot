import { DateTime } from 'luxon'
import { Section } from '@/components/section'
import { Container } from '@/components/container'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Heading } from '@/components/heading'
import { List, Li } from '@/components/list'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { InlineLink } from '@/components/inline-link'
import { RESOURCES, type Resource } from '@/catalog'

interface ArticleSection {
  heading: string
  body: string[]
  list?: string[]
}

interface ArticleBody {
  sections: ArticleSection[]
  /** Closing note. Kept short — it is the hand-off to a real conversation. */
  closing: string
}

/**
 * Article bodies keyed by the `RESOURCES` slug in @/catalog, which owns the
 * title, category, excerpt, and date. Only the prose lives here, so a card and
 * its article can never disagree about what the piece is called or when it ran.
 *
 * Copy is deliberately limited to how the products work and how to plan an
 * order. No certification, code-compliance, warranty, or test claims — those are
 * project-specific and are not the template's to assert.
 */
const ARTICLES: Record<string, ArticleBody> = {
  'metal-panel-selection-guide': {
    sections: [
      {
        heading: 'Start with the building, not the panel',
        body: [
          'Panel selection is mostly a question about the building. What is it for, how is it framed, how long does it need to look good, and what is the budget? Answer those and the profile usually picks itself.',
          'A hay barn and a retail storefront can both be steel buildings, but they are not asking the same thing of the envelope. The barn wants durability and a low cost per square foot. The storefront wants a clean roof plane and a finish that still looks intentional in ten years.',
        ],
      },
      {
        heading: 'Exposed fastener or concealed fastener',
        body: [
          'This is the first real fork. Exposed-fastener panels screw through the panel face into the framing, with a bonded washer sealing each penetration. They are quicker to install, cost less, and are what most agricultural, shop, and utility buildings use. FS-R36, FS-A36, and FS-U36 are all exposed-fastener profiles.',
          'Concealed-fastener panels — FS-S16 standing seam — clip to the structure with no fasteners in the roof plane. There is nothing exposed to weather and nothing to re-torque later, and the roof reads as a clean run of seams. The trade-off is cost and installation time.',
        ],
      },
      {
        heading: 'Match the profile to the substrate',
        body: [
          'Rib height and spacing exist for a reason. A taller, more widely spaced rib such as FS-R36 carries load across open framing. A shorter, closer rib such as FS-U36 is built for walls, soffits, liner, and fencing, where the panel is supported more continuously and appearance matters more than span.',
          'Tell us how your framing is spaced before you settle on a profile. It is the single detail that most often sends a panel choice back to the drawing board.',
        ],
      },
      {
        heading: 'A shortlist to work from',
        body: [
          'For most projects, one of these is the starting point:',
        ],
        list: [
          'FS-R36 — structural rib for commercial, industrial, and pre-engineered buildings, available in 24, 26, and 29 gauge',
          'FS-A36 — agricultural profile for barns, sheds, workshops, and utility structures',
          'FS-U36 — closely spaced rib for walls, soffits, liner, and fencing',
          'FS-S16 — standing seam where a concealed-fastener roof plane is wanted',
          'FS-I40 — insulated wall panel for conditioned or temperature-sensitive buildings',
          'FS-L29 — interior liner for a clean, washable inside surface',
        ],
      },
    ],
    closing:
      'If two profiles both look workable, that is usually a real tie rather than a wrong answer — call us and we will talk through what the building is going to be asked to do.',
  },

  'understanding-panel-gauges': {
    sections: [
      {
        heading: 'The scale runs backwards',
        body: [
          'Gauge measures steel thickness on a scale where a lower number means a thicker panel. 24 gauge is thicker than 26, which is thicker than 29. It reads backwards the first time and then never again.',
          'The differences are small in absolute terms and large in practice. A step in gauge changes how a panel handles foot traffic during installation, how it spans between supports, and how it looks across a wide, flat elevation.',
        ],
      },
      {
        heading: 'What each gauge is usually for',
        body: [
          'Our standard gauges land roughly like this:',
        ],
        list: [
          '29 gauge — the economical option. Common on straightforward agricultural, storage, and utility buildings with closely spaced framing.',
          '26 gauge — the general-purpose middle ground, and the most-ordered gauge across our profiles.',
          '24 gauge — the heaviest we stock in FS-R36 and FS-S16. Chosen for commercial and industrial work, longer spans, and buildings that see hard use.',
        ],
      },
      {
        heading: 'Where gauge actually matters',
        body: [
          'Framing spacing is the big one. The further apart your purlins or girts, the more the panel has to do between them, and the more a heavier gauge earns its cost.',
          'Appearance is the quieter one. On a wide, low-slope roof or a long flat wall, a heavier gauge tends to hold a flatter plane. On a small shed nobody looks at twice, that is not worth paying for.',
          'Handling matters too. Crews walk on roof panels during installation. A 29-gauge panel over widely spaced purlins is less forgiving of that than 24 gauge.',
        ],
      },
      {
        heading: 'How to decide',
        body: [
          'Do not pick gauge in isolation. Tell us the framing spacing, the profile, the building use, and the roof slope, and the answer usually narrows to one gauge — occasionally two, in which case it is a genuine budget call rather than a technical one.',
        ],
      },
    ],
    closing:
      'When the difference between two gauges is small in cost and large in exposure — a big roof, a long service life, hard use — the heavier one is usually the cheaper decision over the life of the building.',
  },

  'how-to-measure-for-metal-roofing': {
    sections: [
      {
        heading: 'Measure each roof plane separately',
        body: [
          'Treat every plane as its own problem. For each one you need the slope length from eave to ridge and the width along the eave.',
          'The slope length is the measurement people get wrong. It is the distance up the roof surface, not the horizontal span across the building. On anything steeper than a shallow pitch, the difference is significant and it is always short, never long.',
        ],
      },
      {
        heading: 'Work out the panel count',
        body: [
          'Divide the eave width by the panel coverage — 36 inches for most of our profiles — and round up. Coverage is the width the panel covers once installed, after the sidelap, which is not the same as the width of the sheet.',
          'Add the panel length: slope length plus any overhang at the eave. Tell us the overhang you want rather than building it into the number you send, so we both know what the figure means.',
        ],
      },
      {
        heading: 'Do not stop at the panels',
        body: [
          'Trim is where orders come up short. Walk the roof and list every condition:',
        ],
        list: [
          'Ridge length, and whether you want ridge ventilation there',
          'Eave length on each plane',
          'Rake length on each gable edge',
          'Valley length wherever two planes meet at an inside angle',
          'Every penetration — pipes, vents, flues — with rough sizes',
          'Where the roof meets a wall, a chimney, or an existing structure',
        ],
      },
      {
        heading: 'Sanity-check before you send it',
        body: [
          'Measure twice on anything you can only reach with a ladder. Confirm the pitch. Note the framing spacing while you are up there, because it feeds the gauge decision.',
          'Then send it to us. We review submitted measurements and flag missing trim conditions before an order goes into production — that review has caught plenty of orders that were about to be short a valley or a rake.',
        ],
      },
    ],
    closing:
      'A sketch with dimensions on it beats a tidy list without one. If you can photograph the roof and mark it up, send that.',
  },

  'exposed-fastener-vs-standing-seam': {
    sections: [
      {
        heading: 'The mechanical difference',
        body: [
          'An exposed-fastener roof is screwed through the panel face into the framing, with a bonded sealing washer under each screw head. A standing-seam roof clips to the structure underneath, and the seams lock the panels to each other — nothing passes through the roof plane.',
          'Everything else about the comparison comes out of that one difference.',
        ],
      },
      {
        heading: 'Cost and installation',
        body: [
          'Exposed-fastener wins on both. Fewer parts, less labour, faster on the roof. For a shop, a barn, or a storage building, it is usually the sensible answer and there is nothing second-rate about it.',
          'Standing seam costs more in material and in time. The clips, the seaming, and the detailing all add up.',
        ],
      },
      {
        heading: 'Appearance',
        body: [
          'Standing seam reads as a clean, continuous plane broken only by seams. Exposed-fastener reads as a panel with a visible fastener pattern — orderly when installed well, but visible.',
          'On a working building, nobody minds. On a storefront, an office, or a house, this is often the whole argument.',
        ],
      },
      {
        heading: 'Maintenance over time',
        body: [
          'Exposed fasteners have washers, and washers are a wear item. Over a long service life they may need inspection and occasional attention, particularly on roofs that see extremes of temperature swing.',
          'Standing seam has no exposed fasteners to service. It also handles thermal movement differently, because the clips are designed to let the panel move rather than pinning it in place.',
        ],
      },
      {
        heading: 'Where each one fits',
        body: [
          'A rough sorting, which real projects routinely ignore for good reasons:',
        ],
        list: [
          'Exposed fastener — agricultural buildings, shops, storage, utility structures, most walls and liner, budget-led projects',
          'Standing seam — commercial and architectural roofs, low-slope roofs, residential roofing, anywhere the roof plane is part of how the building presents',
        ],
      },
    ],
    closing:
      'Neither is the upgrade path for the other. They are different answers to different questions, and the building tells you which question you are asking.',
  },

  'metal-building-planning-checklist': {
    sections: [
      {
        heading: 'Settle the footprint',
        body: [
          'Width, length, and eave height drive nearly everything downstream. If you are building on an existing slab, measure it rather than trusting the plan it was poured from.',
          'Roof pitch matters too — it changes panel lengths, trim, and how the building looks from the road.',
        ],
      },
      {
        heading: 'List the openings',
        body: [
          'Every door, window, and louver needs a size and a location. Overhead doors especially: the rough opening drives the framing, and moving one after the frames are made is expensive.',
        ],
        list: [
          'Overhead door sizes and which elevation they sit on',
          'Walk door sizes and swing direction',
          'Window sizes and locations',
          'Louvers, vents, and any other wall or roof penetrations',
        ],
      },
      {
        heading: 'Decide how the building is finished',
        body: [
          'Panel profile, gauge, and color for roof and walls. Whether you want a wainscot band in a second color. Whether the interior gets liner panels. Whether the walls need to be insulated.',
          'Ventilation is worth settling early rather than adding later, particularly for agricultural buildings and anything storing crops or housing livestock.',
        ],
      },
      {
        heading: 'Think about the site',
        body: [
          'How does a truck get in, and can it turn around? Where will material be staged? Is there room to lay panels out flat near where they are going up?',
          'These sound like details until the delivery arrives and there is nowhere to put it.',
        ],
      },
      {
        heading: 'Know what is not in the package',
        body: [
          'A building package is material. Foundations, erection, doors, insulation, electrical, and permitting are commonly separate, and expectations here are where projects go sideways.',
          'Ask us to confirm the scope in writing on your order. We would rather spend that conversation up front than have it later.',
        ],
      },
      {
        heading: 'Plan future expansion now',
        body: [
          'If a lean-to or a bay extension is even a possibility, say so during planning. Detailing for it up front costs very little. Retrofitting it costs a great deal more.',
        ],
      },
    ],
    closing:
      'You do not need every answer before calling. Bring what you have — a sketch and a footprint is enough to start pricing.',
  },

  'roofing-color-and-finish-guide': {
    sections: [
      {
        heading: 'Factory-applied finish, not field paint',
        body: [
          'Our color panels carry a factory-applied finish, applied to the coil before the panel is formed. That is a different thing from painting steel after the fact — the finish is applied under controlled conditions and formed with the panel rather than sprayed onto it later.',
          'Galvalume is the other standard option: a metallic coating with no color finish over it, which suits agricultural and utility buildings where appearance is not the point.',
        ],
      },
      {
        heading: 'Color changes over time',
        body: [
          'Every exterior finish weathers. Sun, heat, and dust all work on it, and after enough years a color will not be quite what it was on delivery day.',
          'This matters most when matching. A new panel in the original color will not exactly match a wall that has been up for a decade — the new panel is right and the old wall has moved. If the match matters, plan for it rather than being surprised by it.',
        ],
      },
      {
        heading: 'Screens lie',
        body: [
          'The color chart on this site is a representation. Screens differ, ambient light differs, and a flat swatch cannot show you how a ribbed panel behaves as the sun moves across it.',
          'Ask for physical samples. Hold them outside, at the building, at the time of day you actually look at it. Darker colors in particular read very differently in full sun than they do on a monitor.',
        ],
      },
      {
        heading: 'Practical color decisions',
        body: [
          'A few things worth weighing:',
        ],
        list: [
          'Darker colors show heat and fading more than lighter ones, and read heavier on a large elevation',
          'Lighter colors show dust and runoff streaking more readily',
          'A wainscot band in a second color is a cheap way to break up a tall wall',
          'Trim color can match or deliberately contrast — decide before ordering, since trim is formed with the order',
          'If the building sits next to existing structures, take samples out to them',
        ],
      },
      {
        heading: 'Order touch-up paint with the job',
        body: [
          'Field cuts and handling scratches happen on every job. Color-matched touch-up paint ordered alongside the panels costs very little and saves chasing the right color later.',
        ],
      },
    ],
    closing:
      'We stock 30 standard colors. If you narrow it to two or three, we will get samples into your hands before you commit.',
  },
}

export function getArticleBody(slug: string): ArticleBody | undefined {
  return ARTICLES[slug]
}

export function getResource(slug: string): Resource | undefined {
  return RESOURCES.find((resource) => resource.slug === slug)
}

/** Renders one resource article: hero, body, and closing note. */
export default function Article({
  resource,
  body,
}: {
  resource: Resource
  body: ArticleBody
}) {
  const published = DateTime.fromISO(resource.date)
  const publishedLabel = published.isValid
    ? published.toFormat('LLLL d, yyyy')
    : ''

  return (
    <>
      <section className="relative overflow-hidden bg-accent2 pt-40 pb-16 md:pt-40 md:pb-20 lg:pt-56 lg:pb-24">
        <Container>
          <Breadcrumbs
            dark
            className="mb-8"
            items={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: '/resources' },
              { label: resource.title },
            ]}
          />

          <div className="max-w-3xl border-l-2 border-accent pl-6 sm:pl-8">
            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
              <Span
                fontFamily="font-heading2"
                fontSize="text-sm"
                fontWeight="font-semibold"
                color="text-accent-light"
                className="uppercase tracking-[0.2em]"
              >
                {resource.category}
              </Span>
              {publishedLabel && (
                <>
                  <span
                    aria-hidden="true"
                    className="h-3 w-px bg-accent4"
                  />
                  <time dateTime={resource.date}>
                    <Span
                      fontSize="text-sm"
                      color="text-accent3"
                    >
                      {publishedLabel}
                    </Span>
                  </time>
                </>
              )}
            </div>

            <Heading
              as="h1"
              color="text-overlay-text"
              margin="mb-6"
              className="text-balance"
            >
              {resource.title}
            </Heading>

            <Paragraph
              variant="large"
              color="text-accent3"
              margin="mb-0"
              className="text-pretty"
            >
              {resource.excerpt}
            </Paragraph>
          </div>
        </Container>
      </section>

      <Section className="bg-body py-16 md:py-24">
        <div className="max-w-3xl">
          {body.sections.map((section) => (
            <div
              key={section.heading}
              className="mb-10 last:mb-0"
            >
              <Heading
                as="h2"
                fontSize="text-2xl"
                fontWeight="font-bold"
                letterSpacing="tracking-tight"
                lineHeight="leading-tight"
                fontFamily="font-heading"
                color="text-contrast"
                margin="mb-4"
                className="text-balance"
              >
                {section.heading}
              </Heading>

              {section.body.map((paragraph) => (
                <Paragraph
                  key={paragraph}
                  color="text-contrast-light"
                  margin="mb-4"
                  className="text-pretty"
                >
                  {paragraph}
                </Paragraph>
              ))}

              {section.list && (
                <List
                  variant="bulleted"
                  margin="mt-4 mb-0"
                  gap="gap-y-2"
                >
                  {section.list.map((item) => (
                    <Li key={item}>
                      <Span color="text-contrast-light">{item}</Span>
                    </Li>
                  ))}
                </List>
              )}
            </div>
          ))}

          <div className="mt-12 flex flex-col items-start border-l-2 border-accent bg-accent3-light/40 px-6 py-5">
            <Span
              fontFamily="font-heading2"
              fontSize="text-sm"
              fontWeight="font-semibold"
              color="text-accent-dark"
              margin="mb-2"
              className="uppercase tracking-[0.16em]"
            >
              The Short Version
            </Span>
            <Paragraph
              fontSize="text-base"
              color="text-contrast"
              margin="mb-0"
              className="text-pretty"
            >
              {body.closing}
            </Paragraph>
          </div>

          <Paragraph
            fontSize="text-sm"
            color="text-contrast-light"
            margin="mt-8 mb-0"
          >
            More guides on the{' '}
            <InlineLink href="/resources">resources index</InlineLink>, or see
            the <InlineLink href="/resources#faq">frequently asked questions</InlineLink>.
          </Paragraph>
        </div>
      </Section>
    </>
  )
}
