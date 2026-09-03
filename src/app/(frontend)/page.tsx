import { AnimateSlideInStagger } from '@/components/animations';
import { AboutSection } from '@/components/shared/AboutSection/AboutSection';
import { Bounded } from '@/components/shared/Bounded/Bounded';
import { CertificateBadge } from '@/components/shared/CertificateBadge/CertificateBadge';
import { ContactSection } from '@/components/shared/ContactSection/ContactSection';
import { EmploymentSection } from '@/components/shared/EmploymentSection/EmploymentSection';
import { Hero } from '@/components/shared/Hero/Hero';
import { ProjectSection } from '@/components/shared/ProjectSection/ProjectSection';
import {
  TechnologyProps,
  TechnologySection,
} from '@/components/shared/TechSection/TechSection';

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
