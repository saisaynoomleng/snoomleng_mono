import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { HOME_PAGE_QUERY_RESULT } from '@/sanity/types';
import { formatYear } from '@/lib/formatter';
import { PortableText } from 'next-sanity';
import { AnimateSlideIn, AnimateSlideInStagger } from '@/components/animations';
import { Bounded } from '../Bounded/Bounded';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { SanityPortableText } from '../SanityPortableText/SanityPortableText';

export type EmployementSectionProps = {
  className?: string;
  employments: NonNullable<HOME_PAGE_QUERY_RESULT>['employment'];
};

export const EmploymentSection = ({
  className,
  employments,
}: EmployementSectionProps): React.JSX.Element => {
  return (
    <Bounded
      className={twMerge(clsx('', className))}
      size="full"
      padding="none"
      spacing="sm"
    >
      <AnimateSlideIn direction="top">
        <SectionTitle label="Employment Histories" />
      </AnimateSlideIn>

      <AnimateSlideInStagger
        direction="top"
        staggerForm="start"
        className="flex flex-col gap-y-4"
      >
        {employments.map((e) => (
          <div
            key={e._id}
            className="border-b border-border/20 px-4 md:px-6"
            data-animate-item
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">
                <span>{e.name}</span>{' '}
                <span className="text-primary text-fs-300">
                  {e.companyName}
                </span>
              </p>
              <p className="text-fs-300 font-semibold text-primary-foreground">
                {e.startedAt && <span>{formatYear(e.startedAt)}</span>}
                <span> — </span>
                <span>
                  {e.endedAt ? `${formatYear(e.endedAt)}` : 'Present'}
                </span>
              </p>
            </div>

            {e.body && (
              <div className="prose prose-md min-w-full">
                <PortableText value={e.body} components={SanityPortableText} />
              </div>
            )}
          </div>
        ))}
      </AnimateSlideInStagger>
    </Bounded>
  );
};
