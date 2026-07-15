import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { SectionHeading } from '@/components/section-heading'
import { ProjectCard } from '@/components/project-card'
import { PROJECTS } from '@/catalog'
import arrowRightIcon from '@iconify/icons-heroicons/arrow-right-20-solid'

export default function Projects() {
  return (
    <Section
      id="projects"
      className="bg-body2 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Recent Work"
        heading="Materials Behind Stronger Buildings"
        className="mb-12 max-w-3xl md:mb-16"
      />

      <Grid
        cols="grid-cols-1 sm:grid-cols-2"
        gap="gap-6 lg:gap-8"
      >
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            category={project.category}
            location={project.location}
            size={project.size}
            summary={project.summary}
            image={project.image}
            href={`/projects/${project.slug}`}
            linkLabel={`View ${project.title}`}
          />
        ))}
      </Grid>

      <Buttons margin="mt-12 mb-0">
        <Button
          href="/projects"
          variant="outline"
          size="medium"
          icon={arrowRightIcon}
          iconPlacement="after"
          className="max-sm:w-full"
        >
          View All Projects
        </Button>
      </Buttons>
    </Section>
  )
}
