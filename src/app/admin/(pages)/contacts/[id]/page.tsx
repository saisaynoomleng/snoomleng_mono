'use client';

import { ContactInfoTable } from '@/components/admin/ContactReplyForm/ContactInfoTable';
import { ContactReplyForm } from '@/components/admin/ContactReplyForm/ContactReplyForm';
import { MutateFormStatus } from '@/components/admin/ContactReplyForm/MutateFormStatus';
import { BackToPage } from '@/components/shared/BackToPage/BackToPage';
import { Bounded } from '@/components/shared/Bounded/Bounded';
import { AdminContactDataSkeleton } from '@/components/shared/Skeletons';
import { useGetContactById, useReplyContactForm } from '@/hooks/useContacts';
import { ContactReplyFormSchema, ContactReplyInput } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const ContactDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isPending } = useGetContactById({ id });
  const { mutateAsync: replyAction, isPending: replyPending } =
    useReplyContactForm();

  const replyForm = useForm<ContactReplyInput>({
    resolver: zodResolver(ContactReplyFormSchema),
    defaultValues: {
      originalContactId: id,
      email: '',
      message: '',
    },
  });

  useEffect(() => {
    if (!data) return;

    replyForm.reset({
      originalContactId: id,
      email: data.email,
      message: '',
    });
  }, [data, id, replyForm]);

  const onReply: SubmitHandler<ContactReplyInput> = async (data) => {
    const result = await replyAction(data);

    if (!result.success) {
      toast.error(result.message);

      return replyForm.setError(result.field as keyof ContactReplyInput, {
        message: result.message,
      });
    }

    toast.success(result.message);
    replyForm.reset();
  };

  if (isPending) return <AdminContactDataSkeleton />;

  if (!data) return notFound();

  const { name, email, subject, message, createdAt, status, messages } = data;

  return (
    <Bounded spacing="sm" size="full" centered={false}>
      <BackToPage href="/admin/contacts" label="Back to All Contacts" />

      <div className="grid grid-cols-2 gap-x-12">
        <div className="flex flex-col gap-y-2 border p-4 border-border/20">
          <h2 className="font-semibold text-fs-500">Contact Info</h2>

          <ContactInfoTable
            name={name}
            email={email}
            subject={subject}
            message={message}
            createdAt={createdAt}
            status={status}
          />

          <MutateFormStatus id={id} className="justify-end" />
        </div>

        <div className="flex flex-col gap-y-2 border p-4 border-border/20 justify-between">
          <h2 className="font-semibold text-fs-500">Reply</h2>

          <ContactReplyForm
            form={replyForm}
            onSubmit={onReply}
            pending={replyPending}
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <h3 className="font-semibold text-fs-500">History</h3>
        {/* todo contact history */}
      </div>
    </Bounded>
  );
};

export default ContactDetailPage;
