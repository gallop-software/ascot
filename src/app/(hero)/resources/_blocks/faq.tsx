import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'
import { FaqAccordion } from '@/components/faq-accordion'

/**
 * Frequently asked questions.
 *
 * Exported so `page.tsx` can build FAQPage structured data from the same source
 * the section renders — the schema and the visible answers must never drift.
 * Answers deliberately avoid certification, code-compliance, and warranty
 * claims; those are project-specific and are not the template's to assert.
 */
export const FAQS: { q: string; a: string }[] = [
  {
    q: 'How do I choose between an exposed-fastener and a standing-seam panel?',
    a: 'Exposed-fastener panels such as FS-R36 and FS-A36 attach through the panel face with screws and sealing washers. They cost less, install faster, and suit agricultural, shop, and utility buildings. Standing-seam panels such as FS-S16 attach with concealed clips, leaving no fasteners in the roof plane, which suits low-slope commercial roofs and projects where appearance matters. The trade-off is generally cost and installation time against a cleaner roof plane and no exposed fasteners to service later.',
  },
  {
    q: 'What does panel gauge actually mean, and which should I order?',
    a: 'Gauge is a steel thickness scale that runs backwards — a lower number is a thicker panel. 29 gauge is our thinnest standard option and is common on straightforward agricultural and storage buildings. 26 gauge is the general-purpose middle ground. 24 gauge is the thickest we stock in FS-R36 and is chosen where the building sees heavy use, longer purlin spacing, or more weather exposure. If you are unsure, tell us the framing spacing and what the building is for and we will talk it through.',
  },
  {
    q: 'Do you cut panels to my exact length?',
    a: 'Yes. Panels are cut to the lengths on your approved order rather than to fixed stock lengths. That removes most field cutting and eliminates horizontal laps on runs we can make in one piece, which is usually where leaks start. Send us the rafter or slab dimensions and we will work the lengths from those.',
  },
  {
    q: 'How do I measure a roof for metal roofing?',
    a: 'Measure each roof plane separately: the eave-to-ridge slope length (not the horizontal span) and the width along the eave. Divide the width by the panel coverage — 36 inches for most of our profiles — to get the panel count, and round up. Then list every trim condition: ridge, eave, rake, valleys, and any penetrations. Our measuring guide walks through it in detail, and we review submitted measurements before anything goes into production.',
  },
  {
    q: 'What do I need to have ready before requesting a quote?',
    a: 'Building or roof dimensions, the panel profile and gauge if you already know them, your color preference, opening sizes for doors and windows, and whether you want delivery or will pick up. If you have drawings, send those instead — they answer most of it. If you only have a rough sketch, send that; we would rather start a conversation than wait for a perfect drawing.',
  },
  {
    q: 'Can you match the color of panels on my existing building?',
    a: 'We can match to our standard color line, and we will tell you which of our 30 colors is closest. Be aware that a finish that has been on a building for years has weathered, so a new panel in the original color will not be an exact visual match. Where the match matters, ask for a physical sample and hold it against the existing wall before ordering.',
  },
  {
    q: 'What is included in a complete building package?',
    a: 'Typically the structural framing, roof and wall panels, trim, closures, fasteners, and sealants, coordinated so the pieces fit each other. The exact scope depends on your project — foundations, doors, insulation, and erection are commonly handled separately. We confirm exactly what is and is not in the package on your order.',
  },
  {
    q: 'How long does an order take?',
    a: 'Standard panel and trim items typically run a 48-hour production turnaround. Building packages depend on scope and the current schedule. We confirm dates on your specific order rather than promising a fixed lead time up front — a date we cannot hold is worse than no date.',
  },
  {
    q: 'Do you sell to property owners, or only to contractors?',
    a: 'Both. Contractors and repeat buyers have access to volume pricing, but we sell single trim pieces to property owners doing their own work just as readily as we sell full packages. The technical questions get the same answer either way.',
  },
]

export default function Faq() {
  return (
    <Section
      id="faq"
      className="scroll-mt-32 bg-body2 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="FAQ"
        heading="Questions We Answer Every Week"
        intro="If your question is not here, call the plant — someone on the sales desk can talk it through."
        className="mb-10 max-w-3xl"
      />

      <div className="max-w-3xl">
        <FaqAccordion items={FAQS} />
      </div>
    </Section>
  )
}
