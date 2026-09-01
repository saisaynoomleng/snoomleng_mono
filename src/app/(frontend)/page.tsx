import {
  Bounded,
  Hero,
  AboutSection,
  TechnologySection,
  TechnologyProps,
} from '@/components/shared';
import { sanityFetch } from '@/sanity/lib/live';
import { HOME_PAGE_QUERY } from '@/sanity/lib/query';
import { notFound } from 'next/navigation';

export default async function Home() {
  const { data: page } = await sanityFetch({ query: HOME_PAGE_QUERY });

  if (!page) notFound();

  const { hero, about, tech } = page;

  return (
    <Bounded className="" spacing="lg">
      <Hero hero={hero} />

      <AboutSection about={about} />

      <TechnologySection techs={tech as TechnologyProps[]} />
    </Bounded>
  );
}
