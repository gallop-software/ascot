import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Image } from '@/components/image'
import { ProjectCaseStudy } from '@/components/project-case-study'

export const TITLE = 'Metal Roof Installation'
const IMAGE = {
  src: 'https://ascot-cdn.gallop.software/images/image-10-lg.jpg',
  width: 1400,
  height: 788,
}
const IMAGE_ALT =
  'Metal roof installation in Redstone, Texas using Frontier Metals roofing panels'

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
        A hailstorm ended the life of an old roof, and the installer needed
        replacement panels fast. We measured the existing runs, put the order on
        the roll former, and had panels cut to length and on the truck inside a
        week.
      </Paragraph>

      <Paragraph>
        Re-roofs rarely match the catalog. The existing rake and eave conditions
        didn&apos;t line up with a stock profile, so we formed trim to fit what
        was actually on the building and sent the closures and sealant that go
        with those details — the parts that decide whether wind-driven rain
        stays outside.
      </Paragraph>

      <Paragraph>
        Full-length panels meant no lap seams across the slope and very little
        scrap coming off the roof. The installer finished in two days.
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
