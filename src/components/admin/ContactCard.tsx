'use client';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TableCell, TableRow } from '../ui/table';
import { useRouter } from 'next/navigation';

type ContactCardProps = {
  className?: string;
  id: string;
  name: string;
  email: string;
  subject: string;
};

export const ContactCard = ({
  className,
  id,
  name,
  email,
  subject,
}: ContactCardProps) => {
  const router = useRouter();

  return (
    <TableRow
      className={twMerge(clsx('hover:cursor-pointer', className))}
      role="link"
      onClick={() => router.push(`/admin/contacts/${id}`)}
    >
      <TableCell className="capitalize">{name}</TableCell>
      <TableCell className="font-semibold text-primary text-center">
        {subject}
      </TableCell>
      <TableCell className="text-right">{email}</TableCell>
    </TableRow>
  );
};
