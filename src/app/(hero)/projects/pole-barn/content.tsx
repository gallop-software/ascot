import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Image } from '@/components/image'
import { ProjectCaseStudy } from '@/components/project-case-study'

export const TITLE = 'Pole Barn'
const IMAGE = {
  src: 'https://ascot-cdn.gallop.software/images/building-1-lg.jpg',
  width: 1400,
  height: 1050,
}
const IMAGE_ALT =
  'Pole barn near Redstone, Texas covered with Frontier Metals roofing and wall panels'

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
        A family operation near Redstone needed hay and trailer cover on a
        budget that wouldn&apos;t stretch to an enclosed shop. Post-frame gave
        them the square footage; the panel package decides how long that cover
        actually lasts.
      </Paragraph>

      <Paragraph>
        We built the order in two phases on purpose. Phase one covered the roof
        and three walls so they could get hay under cover before cutting. Phase
        two, the fourth wall and a set of enclosed bays, is already priced and
        specified — same profile, same color run, so it will match when
        they&apos;re ready.
      </Paragraph>

      <Paragraph>
        Phasing let them spend against the season instead of all at once, and it
        keeps the finished building looking like one project rather than two.
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
