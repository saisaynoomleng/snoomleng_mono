'use client';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { ContactTableStatusInput } from '@/db';
import { useUpdateContactFormStatus } from '@/hooks/useContacts';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

type ModifyFormStatusProps = {
  className?: string;
  id: string;
};

export const MutateFormStatus = ({ className, id }: ModifyFormStatusProps) => {
  const { mutateAsync: updateAction } = useUpdateContactFormStatus(id);

  const handleUpdateFormStatus = async (status: ContactTableStatusInput) => {
    const result = await updateAction(status);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
  };

  return (
    <Field orientation="horizontal" className={twMerge(className)}>
      <Button
        className="bg-brand-success-400 hover:bg-brand-success-600 hover:text-brand-success-50"
        onClick={() => handleUpdateFormStatus('in_progress')}
      >
        Mark As In Progress
      </Button>

      <Button
        className="bg-brand-secondary-400 hover:bg-brand-secondary-600 hover:text-brand-success-50"
        onClick={() => handleUpdateFormStatus('resolved')}
      >
        Mark As Resolved
      </Button>

      <Button
        className="bg-brand-error-600 hover:bg-brand-error-500 hover:text-brand-success-50"
        onClick={() => handleUpdateFormStatus('spam')}
      >
        Mark As Spam
      </Button>
    </Field>
  );
};
