import React from 'react';
import { Bounded, SectionTitle } from '../../shared';

import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { HOME_PAGE_QUERY_RESULT } from '@/sanity/types';
import { formatDate } from '@/lib/formatter';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SiGithub } from 'react-icons/si';
import { CiLink } from 'react-icons/ci';

type ProjectSectionProps = {
  className?: string;
  projects: NonNullable<HOME_PAGE_QUERY_RESULT>['projects'];
};

export const ProjectSection = ({
  className,
  projects,
}: ProjectSectionProps): React.JSX.Element => {
  return (
    <Bounded
      as="div"
      padding="none"
      size="full"
      className={twMerge(clsx('space-y-8', className))}
    >
      <SectionTitle label="Things i shipped" />

      <div>
        {projects.map((p, index) => {
          const number = `${index + 1}`.padStart(2, '0');

          return (
            <div
              key={p._id}
              className="border-l-2 border-primary pl-8 ml-4 relative pb-4 md:pb-6"
            >
              <p className="tabular-nums p-px bg-brand-primary-600 font-semibold text-fs-300 text-background absolute -left-2.5">
                {number}
              </p>

              <div className="flex flex-col gap-y-3">
                <p className="font-bold  text-brand-primary-800 flex gap-x-2">
                  <span>{p.name}</span>
                  <span className="text-brand-secondary-600">[ {p.type} ]</span>
                </p>
                <p className="text-fs-300 flex gap-x-3 font-semibold text-muted-foreground">
                  {p.startedAt && <span>{formatDate(p.startedAt)}</span>}
                  <span>-</span>
                  <span>
                    {p.endedAt ? formatDate(p.endedAt) : 'Currently Working'}
                  </span>
                </p>

                <p>{p.excerpt}</p>

                <div className="flex flex-wrap gap-1">
                  {p.stacks &&
                    p.stacks.slice(0, 15).map((stack) => (
                      <p
                        key={stack}
                        className="text-fs-300 border-2 border-muted-foreground p-1"
                      >
                        {stack}
                      </p>
                    ))}
                </div>

                <div className="flex gap-x-2">
                  <Link href={`/projects/${p.slug}`}>Project Detail</Link>

                  {p.links &&
                    p.links.map((link) => (
                      <Tooltip key={link._key}>
                        <TooltipTrigger asChild>
                          <Link
                            rel="noreferrer noindex"
                            href={link.url ?? ''}
                            className="text-fs-500 font-semibold hover:text-primary"
                          >
                            <span>
                              {link.label === 'Repo' ? (
                                <SiGithub aria-hidden={true} />
                              ) : (
                                <CiLink aria-hidden={true} />
                              )}
                            </span>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>{link.label}</TooltipContent>
                      </Tooltip>
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Bounded>
  );
};
