import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Image } from '@/components/image'
import { ProjectCaseStudy } from '@/components/project-case-study'

export const TITLE = 'Equipment Shop'
const IMAGE = {
  src: 'https://ascot-cdn.gallop.software/images/image-8-lg.jpg',
  width: 1400,
  height: 788,
}
const IMAGE_ALT =
  'Steel equipment shop in Redstone, Texas built with Frontier Metals panels and trim'

function Details() {
  return (
    <>
      <Image
        src={IMAGE.src}
        width={IMAGE.width}
        height={IMAGE.height}
        wrap={true}
        alt={IMAGE_ALT}
      />

      <Paragraph>
        A contractor came to us with a 60&nbsp;× 100 equipment shop and a tight
        window between concrete and first freeze. We roll-formed the roof and
        wall panels to length in Redstone and shipped them with the trim,
        closures, and fasteners on a single load.
      </Paragraph>

      <Paragraph>
        Cutting to exact length is what makes a building this size go up fast —
        no field seams across the roof, no cut-off pile behind the shop, and one
        set of run numbers the crew could work straight off of. The wainscot
        break was set in the panel order rather than trimmed in later.
      </Paragraph>

      <Paragraph>
        The shop went dry a week ahead of schedule. It gives the operation a
        column-free bay deep enough to pull equipment fully inside, with an
        exterior that asks for nothing beyond an occasional wash.
      </Paragraph>
    </>
  )
}

export function Content() {
  return (
    <ProjectCaseStudy title={TITLE}>
      <Details />
    </ProjectCaseStudy>
  )
}

export function BlogContent() {
  return (
    <>
      <Heading
        as="h2"
        styleAs="h3"
        color="text-contrast"
        className="normal-case!"
      >
        {TITLE}
      </Heading>
      <Details />
    </>
  )
}
