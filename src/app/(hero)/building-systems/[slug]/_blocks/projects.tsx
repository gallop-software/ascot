import type { BuildingSystem } from '@/catalog'
import { Button } from '@/components/button'
import { Image } from '@/components/image'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'

/**
 * Pointer to the projects archive. Deliberately links out rather than
 * rendering project cards — project data is owned by `/projects`, and
 * inventing examples here would be fabricating work we did not do.
 */
export default function Projects({ system }: { system: BuildingSystem }) {
  return (
    <Section className="bg-body2 py-20 lg:py-28">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Project Examples"
            heading="See Packages Like This in the Field"
            intro={`Our project archive covers completed work across every system we supply, including ${system.name.toLowerCase()}. Browse it for scope, size, and finish references before you spec your own.`}
            className="mb-8"
          />

          <Button
            href="/projects"
            variant="outline"
            size="medium"
          >
            Browse Our Projects
          </Button>
        </div>

        <Image
          src="/images/projects/completed-steel-building.jpg"
          alt="Completed steel building with matching roof and wall panels on a finished site"
          size="large"
          rounded="rounded-none"
          aspect="aspect-[4/3]"
          className="w-full border border-accent3-dark object-cover"
        />
      </div>
    </Section>
  )
}
