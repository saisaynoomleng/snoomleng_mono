import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { urlFor } from '@/sanity/lib/image';
import { CERTIFICATE_BADGE_QUERY_RESULT } from '@/sanity/types';
import clsx from 'clsx';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type CertificateBadgeProps = {
  className?: string;
  badge: NonNullable<CERTIFICATE_BADGE_QUERY_RESULT>[number];
} & Omit<ComponentPropsWithoutRef<'div'>, 'className'>;

export const CertificateBadge = ({
  className,
  badge,
  ...props
}: CertificateBadgeProps): React.JSX.Element => {
  if (!badge) return notFound();

  const { name, imageAlt, imageUrl } = badge;

  return (
    <div className={twMerge(clsx('', className))} {...props}>
      {imageAlt && imageUrl && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-25 aspect-square relative">
              <Image
                src={urlFor(imageUrl)
                  .width(200)
                  .height(200)
                  .format('webp')
                  .url()}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 100px) 100vw, 33vw"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>{name}</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
