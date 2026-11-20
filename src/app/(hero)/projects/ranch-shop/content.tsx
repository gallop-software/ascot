import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Image } from '@/components/image'
import { ProjectCaseStudy } from '@/components/project-case-study'

export const TITLE = 'Ranch Shop'
const IMAGE = {
  src: 'https://ascot-cdn.gallop.software/images/image-4-lg.jpg',
  width: 1400,
  height: 788,
}
const IMAGE_ALT =
  'Ranch shop near Redstone, Texas finished with Frontier Metals roofing and wall panels'

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
        The owners of a working ranch west of Redstone wanted one building that
        could do three jobs: trailer storage, a welding bay, and a place to work
        on equipment through the winter. They came to us with a sketch and a
        budget rather than a plan set.
      </Paragraph>

      <Paragraph>
        Open ground here means constant wind and blowing grit, so we walked them
        up to a heavier gauge on the walls and a finish rated for the exposure,
        then held the line on cost by keeping the color palette to two runs. The
        wainscot, corners, and openings all came off the same production run, so
        the finish matches across the building rather than close-enough.
      </Paragraph>

      <Paragraph>
        Everything left our floor together — panels, trim, closures, fasteners —
        and the crew set it without a single back-order call.
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
