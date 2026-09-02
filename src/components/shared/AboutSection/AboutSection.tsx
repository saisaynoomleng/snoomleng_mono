import { Bounded, SanityPortableText, SectionTitle } from '../../shared';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { HOME_PAGE_QUERY_RESULT } from '@/sanity/types';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import { AboutSpec } from './AboutSpec';
import { AnimateSlideIn } from '@/components/animations';

type AboutSectionProps = {
  className?: string;
  about: NonNullable<HOME_PAGE_QUERY_RESULT>['about'];
};

export const AboutSection = ({
  className,
  about,
}: AboutSectionProps): React.JSX.Element => {
  if (!about) notFound();

  const { mode, info, body } = about;

  return (
    <Bounded
      className={twMerge(clsx('', className))}
      size="full"
      padding="none"
      spacing="md"
    >
      <AnimateSlideIn direction="top">
        <SectionTitle label="About me" />
      </AnimateSlideIn>

      <div className="grid gap-y-6 md:grid-cols-2 md:gap-x-6 md:justify-center md:items-center">
        <AnimateSlideIn direction="left">
          <AboutSpec
            className="place-self-center"
            info={info ?? { city: '', state: '' }}
            mode={mode ?? []}
            status={true}
          />
        </AnimateSlideIn>

        <AnimateSlideIn direction="right" className="prose prose-md w-full">
          {body && (
            <PortableText value={body} components={SanityPortableText} />
          )}
        </AnimateSlideIn>
      </div>
    </Bounded>
  );
};
