import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

type BackToPageProps = {
  className?: string;
  href: string;
  label: string;
};

export const BackToPage = ({
  className,
  href,
  label,
}: BackToPageProps): React.JSX.Element => {
  return (
    <Link
      href={href}
      className={twMerge(clsx('flex gap-x-2 items-center group', className))}
    >
      <FaArrowLeft className="group-hover:-translate-x-2 duration-100 transition-transform ease-in" />
      <span className="group-hover:link-url">{label}</span>
    </Link>
  );
};
