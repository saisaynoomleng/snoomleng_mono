import { Bounded, Hero } from '@/components/shared';
import { AboutSection } from '@/components/shared/AboutSection/AboutSection';
import { sanityFetch } from '@/sanity/lib/live';
import { HOME_PAGE_QUERY } from '@/sanity/lib/query';
import { notFound } from 'next/navigation';

export default async function Home() {
  const { data: page } = await sanityFetch({ query: HOME_PAGE_QUERY });

  if (!page) notFound();

  const { hero, about } = page;

  return (
    <Bounded className="">
      <Hero hero={hero} />

      <AboutSection about={about} />
    </Bounded>
  );
}
