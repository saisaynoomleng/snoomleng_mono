import { HOME_PAGE_QUERY_RESULT } from '@/sanity/types';
import { Bounded } from '../Bounded';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import React from 'react';
import { Button } from '@/components/ui/button';
import { PortableText } from 'next-sanity';
import { SanityPortableText } from '../SanityPortableText';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import {
  AnimateImageFillIn,
  AnimateSlideIn,
  AnimateSlideInStagger,
} from '@/components/animations';

type HeroProps = {
  className?: string;
  hero: NonNullable<HOME_PAGE_QUERY_RESULT>['hero'];
};

export const Hero = async ({ className, hero }: HeroProps) => {
  if (!hero) return null;

  const { title, body, actions, imageUrl, imageAlt, position } = hero;

  return (
    <Bounded
      size="full"
      padding="none"
      className={twMerge(
        clsx(
          'grid md:grid-cols-2 md:gap-x-6 md:justify-between md:items-center min-h-screen',
          className,
        ),
      )}
    >
      <div className="flex flex-col gap-y-6 md:gap-y-8 md:justify-center">
        <AnimateSlideIn direction="top" className="flex gap-x-2 items-baseline">
          <span className="w-3 aspect-square bg-primary" />
          {position &&
            position.map((item, index) => (
              <React.Fragment key={item}>
                {index > 0 && (
                  <span aria-hidden="true" className="text-fs-300 text-primary">
                    •
                  </span>
                )}

                <p className="font-heading text-fs-300 font-bold uppercase tracking-wider">
                  {item}
                </p>
              </React.Fragment>
            ))}
        </AnimateSlideIn>

        <AnimateSlideIn direction="left">
          <h1 className="text-fs-600 md:text-fs-700 uppercase">{title}</h1>
        </AnimateSlideIn>

        <AnimateSlideIn
          direction="right"
          className="prose-sm md:prose-lg w-full"
        >
          {body && (
            <PortableText value={body} components={SanityPortableText} />
          )}
        </AnimateSlideIn>

        <AnimateSlideInStagger
          direction="bottom"
          className="flex gap-x-4 items-center"
        >
          {actions &&
            actions.map((action, i) => (
              <div key={action._key} data-animate-item>
                <Button
                  asChild
                  variant={(i + 1) % 2 === 0 ? 'outline' : 'default'}
                  className="brand-box-shadow"
                >
                  <Link href={action.href as string}>{action.label}</Link>
                </Button>
              </div>
            ))}
        </AnimateSlideInStagger>
      </div>

      <AnimateImageFillIn className="w-full aspect-square relative">
        {imageUrl && imageAlt && (
          <Image
            src={urlFor(imageUrl).width(800).height(800).format('webp').url()}
            alt={imageAlt}
            fill
            sizes="(max-width: 800px) 100vw, 66vw"
            className="min-w-full object-cover"
            priority
          />
        )}
      </AnimateImageFillIn>
    </Bounded>
  );
};
