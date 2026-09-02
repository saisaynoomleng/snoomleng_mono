import { formatDate } from '@/lib/formatter';
import { urlFor } from '@/sanity/lib/image';
import { ALL_BLOGS_QUERY_RESULT } from '@/sanity/types';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export type BlogCardProps = {
  className?: string;
  blog: NonNullable<ALL_BLOGS_QUERY_RESULT>[number];
};

export const BlogCard = ({
  className,
  blog,
}: BlogCardProps): React.JSX.Element => {
  if (!blog) return notFound();

  const {
    name,
    publishedAt,
    imageAlt,
    imageUrl,
    excerpt,
    focus,
    category,
    slug,
  } = blog;

  return (
    <Link
      href={`/blogs/${slug}`}
      className={twMerge(
        clsx(
          'flex flex-col gap-y-1 border-2 w-75 p-2 md:p-3 border-border brand-box-shadow hover:scale-[1.01] duration-200 transition-transform',
          className,
        ),
      )}
    >
      <div className="overflow-hidden relative w-full aspect-square">
        {imageAlt && imageUrl && (
          <Image
            src={urlFor(imageUrl).width(400).height(400).format('webp').url()}
            alt={imageAlt}
            fill
            className="min-w-full object-cover"
            sizes="(max-width: 400px) 100vw, 66vw"
          />
        )}
      </div>

      <div className="flex flex-col gap-y-2 text-fs-300">
        <div className="flex justify-between items-center  font-semibold text-brand-black/60">
          <p className="border border-primary/50 px-2 py-1">{focus}</p>
          {publishedAt && <p>{formatDate(publishedAt)}</p>}
        </div>

        <p className="font-semibold text-fs-400 text-brand-primary-600 truncate">
          {name}
        </p>
        <p className="font-medium truncate">{excerpt}</p>
        <p>
          <span className="font-semibold">Category: </span>
          <span>{category}</span>
        </p>
      </div>
    </Link>
  );
};
