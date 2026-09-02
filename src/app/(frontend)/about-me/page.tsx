import {
  AnimateSlideIn,
  AnimateSlideInStagger,
  AnimateTextLineFillIn,
  AnimateTypeWriter,
} from '@/components/animations';
import {
  Bounded,
  CertificateBadge,
  SanityPortableText,
  SectionTitle,
  TechnologyProps,
  TechnologySection,
} from '@/components/shared';
import { Separator } from '@/components/ui/separator';
import { sanityFetch } from '@/sanity/lib/live';
import { ABOUT_PAGE_QUERY } from '@/sanity/lib/query';
import { Dot } from 'lucide-react';
import type { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import { notFound } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Sai Say Noom Leng, a software engineer combining creativity and technology to build thoughtful digital experiences, scalable applications, and modern web solutions.',
};

const AboutMePage = async (): Promise<React.JSX.Element> => {
  const params = {
    slug: 'about',
  };

  const { data: page } = await sanityFetch({ query: ABOUT_PAGE_QUERY, params });

  if (!page) notFound();

  const { workflows, expertises, info, mode, intro, badges, tech } = page;

  console.log(badges);

  return (
    <Bounded padding="sm" spacing="lg">
      <div className="grid md:grid-cols-2 gap-y-4 gap-x-6 md:gap-x-12 md:justify-between min-h-dvh">
        <div className="flex flex-col gap-y-3 justify-center items-start gap-x-2">
          <AnimateSlideInStagger
            direction="left"
            staggerForm="start"
            className="flex gap-x-2 items-center font-bold text-primary"
          >
            <span
              data-animate-item
              className="w-2 md:w-3 lg:w-4 aspect-square bg-primary"
            />
            <p data-animate-item>Software Engineer</p>
            <Separator
              data-animate-item
              orientation="vertical"
              className="bg-primary"
            />
            <p data-animate-item>Builder</p>
          </AnimateSlideInStagger>

          <AnimateTypeWriter>
            <h2 className="text-fs-500 md:text-fs-700">
              From Creative Storytelling To Software Engineering
            </h2>
          </AnimateTypeWriter>

          {info && (
            <div className="prose-sm">
              <AnimateSlideIn direction="right">
                <PortableText value={intro} components={SanityPortableText} />
              </AnimateSlideIn>

              <AnimateSlideInStagger
                direction="left"
                className="flex gap-x-2 items-center"
                staggerForm="start"
              >
                <p data-animate-item className="font-semibold">
                  Availability:{' '}
                </p>

                {mode?.map((m, i) => {
                  if (i > 0) {
                    return (
                      <p
                        data-animate-item
                        key={m}
                        className="text-primary font-semibold flex items-center"
                      >
                        <Dot /> {m}
                      </p>
                    );
                  }
                  return (
                    <p
                      data-animate-item
                      key={m}
                      className="text-primary font-semibold"
                    >
                      {m}
                    </p>
                  );
                })}
              </AnimateSlideInStagger>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-y-3 md:gap-y-6 justify-center font-semibold text-muted-foreground text-fs-300">
          <AnimateTextLineFillIn>
            A software engineer and Computer Science student passionate about
            building modern, scalable web applications.
          </AnimateTextLineFillIn>
          <AnimateTextLineFillIn>
            With a background in editorial photography, I bring a creative
            perspective into engineering — combining design thinking with
            technical problem-solving. I specialize in full-stack development
            with React, Next.js, TypeScript, Node.js, PostgreSQL, and cloud
            technologies.
          </AnimateTextLineFillIn>
          <AnimateTextLineFillIn>
            I enjoy building products, designing reliable systems, and
            continuously learning how technology works from the interface to the
            infrastructure behind it.
          </AnimateTextLineFillIn>
        </div>

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

      <div className="flex flex-col gap-y-4 md:gap-y-6">
        <AnimateSlideIn direction="top">
          <SectionTitle label="How I Think" />
        </AnimateSlideIn>

        <AnimateSlideInStagger
          direction="left"
          staggerForm="start"
          className="grid md:grid-cols-3 md:gap-x-4 gap-y-3"
        >
          {workflows?.map((w) => (
            <div
              key={w._key}
              data-animate-item
              className="border-t-2 border-primary pt-3 space-y-2"
            >
              <p className="font-bold">{w.title}</p>

              <p>{w.body}</p>
            </div>
          ))}
        </AnimateSlideInStagger>
      </div>
      {/* tech */}
      <TechnologySection techs={tech as TechnologyProps[]} />

      <div className="flex flex-col gap-y-4 md:gap-y-6">
        <AnimateSlideIn direction="top">
          <SectionTitle label="how you can hire me" />
        </AnimateSlideIn>

        <AnimateSlideIn direction="left">
          <p className="font-semibold text-muted-foreground">
            I help teams transform ideas into reliable, scalable, and
            user-friendly digital products through thoughtful engineering and
            modern web technologies.
          </p>
        </AnimateSlideIn>

        <AnimateSlideInStagger
          direction="top"
          className="grid md:grid-cols-2 gap-6"
        >
          {expertises?.map((e) => (
            <div
              key={e._key}
              data-animate-item
              className="p-4 border-2 brand-box-shadow"
            >
              <p className="font-semibold">{e.title}</p>

              <div className="prose prose-sm w-full">
                {e.body && (
                  <PortableText
                    value={e.body}
                    components={SanityPortableText}
                  />
                )}
              </div>
            </div>
          ))}
        </AnimateSlideInStagger>
      </div>
    </Bounded>
  );
};

export default AboutMePage;
