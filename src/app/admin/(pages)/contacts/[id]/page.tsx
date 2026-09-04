'use client';

import { ContactReplyForm } from '@/components/admin/ContactReplyForm/ContactReplyForm';
import { MarkInProgressContactForm } from '@/components/admin/ContactReplyForm/MarkInProgressContactForm';
import { BackToPage } from '@/components/shared/BackToPage/BackToPage';
import { Bounded } from '@/components/shared/Bounded/Bounded';
import { AdminContactDataSkeleton } from '@/components/shared/Skeletons';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useGetContactById } from '@/hooks/useContacts';
import { formatDate } from '@/lib/formatter';
import {
  ContactReplyFormSchema,
  ContactReplyInputSchema,
} from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { notFound, useParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

const ContactDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isPending } = useGetContactById({ id });

  const replyForm = useForm<ContactReplyInputSchema>({
    resolver: zodResolver(ContactReplyFormSchema),
    defaultValues: {
      id,
      email: data?.email,
      message: '',
    },
  });

  const onReply: SubmitHandler<ContactReplyInputSchema> = async (data) => {};

  if (isPending) return <AdminContactDataSkeleton />;

  if (!data) return notFound();

  const { name, email, subject, message, createdAt, status } = data;

  return (
    <Bounded spacing="sm" size="full" centered={false}>
      <BackToPage href="/admin/contacts" label="Back to All Contacts" />

      <div className="flex flex-col gap-y-2">
        <h2 className="font-semibold text-fs-500">Contact Info</h2>

        <Table className="max-w-2xl">
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
              <TableCell className="text-primary font-semibold">
                {status.toUpperCase()}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-semibold">Date</TableCell>
              <TableCell>{formatDate(createdAt)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex gap-x-2 items-center">
          <MarkInProgressContactForm />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-semibold text-fs-500">Reply</h2>

        <ContactReplyForm form={replyForm} onSubmit={onReply} />
      </div>
    </Bounded>
  );
};

export default ContactDetailPage;
