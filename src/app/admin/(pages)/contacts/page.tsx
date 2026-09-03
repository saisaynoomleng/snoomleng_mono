'use client';

import { AdminContactDataSkeleton } from '@/components/shared/Skeletons';
import { Bounded } from '@/components/shared/Bounded/Bounded';
import { useGetAllContacts } from '@/hooks/useContacts';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ContactFilter } from '@/components/admin/ContactFilter';
import { ContactCard } from '@/components/admin/ContactCard';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useSearchParams } from 'next/navigation';
import { SectionTitle } from '@/components/shared/SectionTitle/SectionTitle';

const ContactDetailPage = (): React.JSX.Element => {
  const { data: contacts, isPending, isError } = useGetAllContacts();
  const searchParams = useSearchParams();

  const filter = searchParams.get('filter');

  if (isPending) return <AdminContactDataSkeleton />;

  if (isError) return <div>Contact error</div>;

  const allContacts =
    filter && filter !== 'None'
      ? contacts.filter((f) => f.status.toLowerCase() === filter.toLowerCase())
      : contacts;

  return (
    <Bounded spacing="sm" size="full" centered={false}>
      <SectionTitle label="All Contacts List" />

      <div className="flex justify-between items-end">
        <Card>
          <CardContent>
            <p>
              <span>Total: </span>
              <span>{allContacts.length}</span>
            </p>
          </CardContent>
        </Card>

        <ContactFilter />
      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-center">Subject</TableHead>
            <TableHead className="text-right">Email</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allContacts.map((contact) => (
            <ContactCard {...contact} key={contact.id} />
          ))}
        </TableBody>
      </Table>
    </Bounded>
  );
};

export default ContactDetailPage;
