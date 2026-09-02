import {
  Bounded,
  Hero,
  AboutSection,
  TechnologySection,
  TechnologyProps,
  EmploymentSection,
  ContactSection,
  ProjectSection,
} from '@/components/shared';
import { sanityFetch } from '@/sanity/lib/live';
import { HOME_PAGE_QUERY } from '@/sanity/lib/query';
import { HOME_PAGE_QUERY_RESULT } from '@/sanity/types';
import { notFound } from 'next/navigation';

export default async function Home() {
  const { data: page } = await sanityFetch({ query: HOME_PAGE_QUERY });

  if (!page) notFound();

  const { hero, about, tech, employment, projects } = page;

  return (
    <Bounded className="" spacing="lg">
      <Hero hero={hero} />

      <AboutSection about={about} />

      <TechnologySection techs={tech as TechnologyProps[]} />

      <ProjectSection
        projects={projects as NonNullable<HOME_PAGE_QUERY_RESULT>['projects']}
      />

      <EmploymentSection employments={employment} />

      <ContactSection />
    </Bounded>
  );
}
