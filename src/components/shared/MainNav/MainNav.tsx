import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import { MAIN_NAV_QUERY } from '@/sanity/lib/query';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { DesktopNav, MobileNav } from './Nav';

type MainNavProps = {
  className?: string;
};

export const MainNav = async ({
  className,
}: MainNavProps): Promise<React.JSX.Element> => {
  const { data: menu } = await sanityFetch({ query: MAIN_NAV_QUERY });

  if (!menu) notFound();

  const { imageUrl, imageAlt } = menu;

  return (
    <header
      className={twMerge(
        clsx(
          'flex items-center justify-between px-4 py-2 max-w-7xl mx-auto w-full shadow',
          className,
        ),
      )}
    >
      <div className="w-25">
        {imageUrl && imageAlt && (
          <Link href="/" className="overflow-hidden aspect-square max-w-25">
            <Image
              src={urlFor(imageUrl).width(100).height(100).format('webp').url()}
              alt={imageAlt}
              priority
              width={50}
              height={50}
              sizes="(max-width: 50px) 100vw, 33vw"
              className="max-w-full object-cover"
            />
          </Link>
        )}
      </div>

      <DesktopNav menu={menu.navigations} />

      <MobileNav menu={menu.navigations} />
    </header>
  );
};
