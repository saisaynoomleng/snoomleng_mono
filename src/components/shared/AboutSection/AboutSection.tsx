import { Bounded, SanityPortableText, SectionTitle } from '../../shared';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { HOME_PAGE_QUERY_RESULT } from '@/sanity/types';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import { AboutSpec } from './AboutSpec';

type AboutSectionProps = {
  className?: string;
  about: NonNullable<HOME_PAGE_QUERY_RESULT>['about'];
};

export const AboutSection = ({
  className,
  about,
}: AboutSectionProps): React.JSX.Element => {
  if (!about) notFound();

  const { mode, info, workflows, body } = about;

  return (
    <Bounded
      className={twMerge(clsx('', className))}
      size="full"
      padding="none"
      spacing="md"
    >
      <div>
        <SectionTitle label="About me" />
      </div>

      <div className="grid gap-y-6 md:grid-cols-2 md:gap-x-6 md:justify-center md:items-center">
        <div>
          <AboutSpec
            className="place-self-center"
            info={info ?? { city: '', state: '' }}
            mode={mode ?? []}
            status={true}
          />
        </div>

        <div className="prose prose-md w-full">
          {body && (
            <PortableText value={body} components={SanityPortableText} />
          )}
        </div>
      </div>
    </Bounded>
  );
};
