'use client';

import { Button } from '@/components/ui/button';
import { MAIN_NAV_QUERY_RESULT } from '@/sanity/types';
import clsx from 'clsx';
import Link from 'next/link';
import { notFound, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';

type NavProps = {
  className?: string;
  menu: NonNullable<MAIN_NAV_QUERY_RESULT>['navigations'];
};

export const DesktopNav = ({ className, menu }: NavProps) => {
  const pathname = usePathname();

  if (!menu) notFound();

  return (
    <nav
      role="navigation"
      aria-label="main menu"
      className={twMerge(
        clsx(
          'font-heading flex gap-x-4 md:gap-x-6 items-center max-md:hidden',
          className,
        ),
      )}
    >
      {menu.map((m) => (
        <React.Fragment key={m._key}>
          {m.isButton ? (
            <Button type="button" asChild className="brand-box-shadow">
              <Link href={m.href as string} className="font-bold">
                {m.label}
              </Link>
            </Button>
          ) : (
            <Link
              href={m.href as string}
              className={twMerge(
                clsx(
                  'hover:underline underline-offset-4 decoration-wavy decoration-primary font-semibold',
                  pathname === m.href && 'underline',
                ),
              )}
              rel={
                m.href?.startsWith('http') ? 'noreferrer noindex' : undefined
              }
              target={m.href?.startsWith('http') ? '_blank' : ''}
            >
              {m.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export const MobileNav = ({
  className,
  menu,
}: NavProps): React.JSX.Element | null => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflowY = open ? 'hidden' : '';

    return () => {
      document.body.style.overflowY = '';
    };
  }, [open]);

  if (!menu) return null;

  return (
    <>
      <Button
        variant="outline"
        className="relative z-50 md:hidden"
        onClick={() => setOpen((prevOpen) => !prevOpen)}
      >
        {open ? (
          <span>
            <IoClose />
          </span>
        ) : (
          <span>
            <RxHamburgerMenu />
          </span>
        )}
      </Button>

      <nav
        role="navigation"
        aria-label="main menu"
        className={twMerge(
          clsx(
            'md:hidden flex flex-col fixed bg-primary/10 inset-0 backdrop-blur-2xl transition-transform duration-200 ease-in-out justify-center items-center gap-y-4 z-40',
            open ? 'translate-y-0' : '-translate-y-full',
            className,
          ),
        )}
      >
        {menu.map((n) => (
          <React.Fragment key={n._key}>
            {n.isButton ? (
              <Button type="button" asChild className="brand-box-shadow">
                <Link
                  href={n.href as string}
                  className="font-bold!"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              </Button>
            ) : (
              <Link
                href={n.href as string}
                className={twMerge(
                  clsx(
                    'hover:underline underline-offset-4 decoration-wavy decoration-primary font-semibold',
                    pathname === n.href && 'underline',
                  ),
                )}
                rel={
                  n.href?.startsWith('http') ? 'noreferrer noindex' : undefined
                }
                target={n.href?.startsWith('http') ? '_blank' : ''}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
};
