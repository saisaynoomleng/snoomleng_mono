import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SelectContactMessageTable } from '@/db';
import { formatDate } from '@/lib/formatter';

type ContactHistoryTableRows = Pick<
  SelectContactMessageTable,
  'createdAt' | 'direction' | 'message' | 'id'
>;

type ContactHistoryTableProps = {
  messages: ContactHistoryTableRows[];
};

export const ContactHistoryTable = ({ messages }: ContactHistoryTableProps) => {
  return (
    <Table className="w-full table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">Date</TableHead>
          <TableHead className="font-semibold">Direction</TableHead>
          <TableHead className="font-semibold">Message</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {messages.map((m) => (
          <TableRow key={m.id}>
            <TableCell>{formatDate(m.createdAt)}</TableCell>
            <TableCell>{m.direction}</TableCell>
            <TableCell className="whitespace-normal wrap-break-word">
              {m.message}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
