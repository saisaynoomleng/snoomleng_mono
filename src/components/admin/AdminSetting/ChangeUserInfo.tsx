'use client';

import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import {
  ChangeUserInfoFormInput,
  ChangeUserInfoFormSchema,
} from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const ChangeUserInfo = (): React.JSX.Element => {
  const form = useForm<ChangeUserInfoFormInput>({
    resolver: zodResolver(ChangeUserInfoFormSchema),
    defaultValues: {
      name: '',
    },
  });
  const router = useRouter();

  const submitting = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<ChangeUserInfoFormInput> = async (data) => {
    await authClient.updateUser(
      {
        name: data.name,
      },
      {
        onSuccess: () => {
          toast.success('Name changed');
          router.push('/admin');
        },

        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-y-4"
    >
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              {...field}
              type="text"
              id="name"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Field orientation="horizontal">
        <Button disabled={submitting}>
          {submitting ? (
            <span>
              <LoadingSpinner />
            </span>
          ) : (
            <span>Change</span>
          )}
        </Button>
      </Field>
    </form>
  );
};
