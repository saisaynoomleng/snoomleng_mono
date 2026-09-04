import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { SelectContactTable } from '@/db';
import { formatDate } from '@/lib/formatter';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type ContactInfoTableProps = Omit<SelectContactTable, 'id' | 'updatedAt'> & {
  className?: string;
};

export const ContactInfoTable = ({
  name,
  email,
  subject,
  message,
  status,
  createdAt,
  className,
}: ContactInfoTableProps) => {
  return (
    <Table className={twMerge(clsx('', className))}>
      <TableBody>
        <TableRow>
          <TableCell className="font-semibold">Name</TableCell>
          <TableCell>{name}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-semibold">Email</TableCell>
          <TableCell>{email}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-semibold">Subject</TableCell>
          <TableCell>{subject}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-semibold">Message</TableCell>
          <TableCell>{message}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-semibold">Status</TableCell>
          <TableCell
            className={twMerge(
              clsx(
                'font-semibold',
                status === 'spam' ? 'text-brand-error-500' : 'text-primary',
              ),
            )}
          >
            {status.toUpperCase()}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-semibold">Date</TableCell>
          <TableCell>{formatDate(createdAt)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
