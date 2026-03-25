import Image from 'next/image';

import { PageSection } from '@components/ui/page-section';

import { WorkTimeline } from '@components/ui/work-timeline';
import { ProjectShowcase } from '@components/ui/project-showcase';

import { SectionHeading } from '@components/ui/section-heading';
import { SocialLink } from '@components/ui/social-link';
import { Badge } from '@components/ui/badge';
import { PROJECTS_ES, WORK_TIMELINE_ES } from '@data/portfolio';

export default function Portfolio() {
  return (
    <div className="px-4">
      <PageSection className="py-16 md:py-36" id="home">
        <div className="max-w-xl">
          <div className="flex gap-4 mb-4">
            <Image
              className="rounded-full shadow-lg size-16"
              src="/me.jpg"
              alt="Rafael Velazco"
              width={64}
              height={64}
            />
            <a
              href="https://linkedin.com/in/rafael-velazco"
              target="_blank"
              rel="noopener"
              className="flex items-center transition md:justify-center md:hover:scale-105"
            >
              <Badge>Disponible para trabajar</Badge>
            </a>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">Hola, soy Rafael Velazco</h1>
          <p className="mt-6 text-lg text-gray-800 leading-[1.7]">
            +5 años de experiencia.{' '}
            <strong className="text-primary-500">
              Ingeniero de software con pasión por construir aplicaciones web escalables y eficientes
            </strong>
            . Trabajo a tiempo completo con Angular, TypeScript, CSS, Docker, Git y GitHub.{' '}
          </p>
          <nav className="flex flex-wrap gap-4 mt-8">
            <SocialLink href="mailto:rjvelazco21@gmail.com">Contáctame</SocialLink>
            <SocialLink href="https://linkedin.com/in/rafael-velazco">LinkedIn</SocialLink>
          </nav>
        </div>
      </PageSection>

      <div className="space-y-24">
        <PageSection id="experience">
          <SectionHeading>Experiencia Laboral</SectionHeading>
          <WorkTimeline workTimeline={WORK_TIMELINE_ES} />
        </PageSection>

        <PageSection id="projects">
          <SectionHeading>Proyectos</SectionHeading>
          <ProjectShowcase projects={PROJECTS_ES} />
        </PageSection>

        <PageSection id="about-me">
          <SectionHeading>Sobre Mí</SectionHeading>
          <article className="flex flex-col items-center justify-center gap-8 md:flex-row">
            <div className="[&>p]:mb-4 [&>p>strong]:text-primary-500 [&>p>strong]:font-normal text-pretty order-2 md:order-1">
              <p>
                Soy Rafael Velazco, un ingeniero de software apasionado por la programación y siempre con ganas de
                aprender. Me considero una <strong>persona sociable y adaptable</strong>, constantemente en búsqueda de
                nuevos retos.
              </p>

              <p>
                Actualmente trabajo en{' '}
                <strong>
                  <a className="underline" href="https://dotcms.com" target="_blank" rel="noopener">
                    dotCMS
                  </a>
                </strong>{' '}
                como uno de los <strong>desarrolladores líderes</strong>. Uno de nuestros logros recientes ha sido el
                desarrollo del{' '}
                <strong>
                  <a
                    className="underline"
                    href="https://dev.dotcms.com/docs/universal-visual-editor"
                    target="_blank"
                    rel="noopener"
                  >
                    Universal Visual Editor
                  </a>
                </strong>{' '}
                y la transición de nuestro producto de un <strong>CMS híbrido</strong> a un{' '}
                <strong>CMS universal</strong>.
              </p>

              <p className="mb-0">
                En los últimos meses, me he enfocado en desarrollar mis habilidades en{' '}
                <strong>gestión de equipos, liderazgo y entendimiento de producto</strong>. Me he dado cuenta de que más
                allá de escribir código, un desarrollador debe <strong>generar valor estratégico</strong> y comprender a
                fondo el <strong>impacto empresarial de su trabajo</strong>.
              </p>
            </div>

            <Image
              width={256}
              height={256}
              src="/me.jpg"
              alt="Rafael Velazco"
              className="order-1 object-cover w-64 h-full md:order-2 lg:w-64 aspect-square rounded-2xl"
              style={{ objectPosition: '50% 50%' }}
            />
          </article>
        </PageSection>
      </div>
    </div>
  );
}
