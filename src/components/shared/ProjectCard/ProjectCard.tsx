import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { RiHotelLine } from 'react-icons/ri';
import { MdHealthAndSafety } from 'react-icons/md';
import { PiShoppingBagFill } from 'react-icons/pi';
import { BsSuitcaseLgFill } from 'react-icons/bs';
import { replaceDashWithSpace } from '@/lib/formatter';
import { ALL_PROJECTS_QUERY_RESULT } from '@/sanity/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

export type ProjectDisplayCardProps = {
  className?: string;
  project: NonNullable<ALL_PROJECTS_QUERY_RESULT>[number];
};

const projectIconMap = {
  property: RiHotelLine,
  'health-care': MdHealthAndSafety,
  'e-commerce': PiShoppingBagFill,
  portfolio: BsSuitcaseLgFill,
} as const;

export const ProjectCard = ({
  className,
  project,
}: ProjectDisplayCardProps): React.JSX.Element => {
  if (!project) return notFound();

  const { name, imageUrl, imageAlt, type } = project;

  const Icon = projectIconMap[type as keyof typeof projectIconMap];

  return (
    <div
      className={twMerge(
        clsx(
          'border-4 group border-primary relative p-2 brand-box-shadow hover:scale-[1.01]',
          className,
        ),
      )}
    >
      {imageAlt && imageUrl && (
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={urlFor(imageUrl).width(300).height(300).format('webp').url()}
            alt={imageAlt}
            fill
            className="min-w-full object-cover"
            priority
            sizes="(max-width: 300px) 100vw, 44vw"
          />
        </div>
      )}

      <div className="hidden group-hover:absolute group-hover:flex flex-col gap-y-2 inset-0 bg-background/10 backdrop-blur-lg justify-center items-center">
        <Icon className="text-fs-900" aria-hidden={true} />
      </div>

      <div className="text-center">
        {name && <p className="font-bold">{name.toUpperCase()}</p>}
        {type && (
          <p className="font-bold font-heading">{replaceDashWithSpace(type)}</p>
        )}
      </div>
    </div>
  );
};
