import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { GoDotFill } from 'react-icons/go';

export type AboutSpecProps = {
  className?: string;
  info: Info;
  mode: string[];
  status: boolean;
};

type Info = {
  city: string | null;
  state: string | null;
};

export const AboutSpec = ({
  className,
  info,
  status,
  mode,
}: AboutSpecProps): React.JSX.Element => {
  const isAvailable =
    status === true ? (
      <span className="flex gap-x-2 items-center">
        <GoDotFill
          aria-hidden={true}
          className="animate-pulse text-brand-success-400"
        />
        Available
      </span>
    ) : (
      <span className="flex gap-x-2 items-center">
        Not Available
        <GoDotFill
          aria-hidden={true}
          className="animate-pulse text-brand-error-700"
        />
      </span>
    );

  return (
    <Table
      className={twMerge(
        clsx('brand-box-shadow border-2 max-w-[80%]', className),
      )}
    >
      <TableHeader className="bg-primary font-semibold">
        <TableRow>
          <TableHead colSpan={2}>Engineering Spec</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell className="uppercase">Based</TableCell>
          <TableCell className="font-semibold">
            <span>{info.city}</span>
            <span>, {info.state}</span>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="uppercase">Mode</TableCell>
          <TableCell className="font-semibold">
            {mode.map((m, index) => {
              const dot =
                index > 0 ? <span aria-hidden={true}> ● </span> : undefined;

              return (
                <React.Fragment key={m}>
                  {dot}
                  <span>{m}</span>
                </React.Fragment>
              );
            })}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="uppercase">Status</TableCell>
          <TableCell className="font-semibold">{isAvailable}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
