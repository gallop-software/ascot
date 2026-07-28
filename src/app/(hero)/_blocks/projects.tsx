import { Section } from '@/components/section'
import { Heading } from '@/components/heading'
import { Button } from '@/components/button'
import { Blog } from '@/components/blog'
import arrowRightIcon from '@iconify/icons-heroicons/arrow-right-20-solid'

export default function Projects() {
  return (
    <Section
      id="projects"
      className="bg-body2 py-20 md:py-28"
    >
      <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <Heading as="h2">Our Work</Heading>
          <Heading
            as="h3"
            margin="mb-0"
          >
            Recent Projects
          </Heading>
        </div>
        <Button
          href="/projects"
          variant="outline"
          icon={arrowRightIcon}
          iconPlacement="after"
          className="max-sm:w-full"
        >
          View All Projects
        </Button>
      </div>

      {/* Same Blog grid as the /projects archive: clicking a card opens the
          sidebar preview, while the project + category links stay in the DOM
          (crawlable/indexable) but non-navigating via preventDefault. */}
      <Blog
        perPage={9}
        loadMoreText="Load More Projects"
      />
    </Section>
  )
}
