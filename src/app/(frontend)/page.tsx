import { AnimateSlideInStagger } from '@/components/animations';
import {
  Bounded,
  Hero,
  AboutSection,
  TechnologySection,
  TechnologyProps,
  EmploymentSection,
  ContactSection,
  ProjectSection,
  CertificateBadge,
} from '@/components/shared';
import { sanityFetch } from '@/sanity/lib/live';
import { HOME_PAGE_QUERY } from '@/sanity/lib/query';
import { HOME_PAGE_QUERY_RESULT } from '@/sanity/types';
import { notFound } from 'next/navigation';

export default async function Home() {
  const { data: page } = await sanityFetch({ query: HOME_PAGE_QUERY });

  if (!page) notFound();

  const { hero, about, tech, employment, projects, badges } = page;

  return (
    <Bounded className="" spacing="lg">
      <div className="flex flex-col min-h-screen gap-y-4 md:gap-y-12">
        <Hero hero={hero} />

        <AnimateSlideInStagger
          direction="left"
          staggerForm="start"
          className="flex justify-center items-center gap-x-3 col-span-full"
        >
          {badges?.map((b) => (
            <CertificateBadge data-animate-item badge={b} key={b._id} />
          ))}
        </AnimateSlideInStagger>
      </div>

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
