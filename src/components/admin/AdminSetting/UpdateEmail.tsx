'use client';

import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import {
  AdminUpdateEmailFormSchema,
  AdminUpdateEmailInput,
} from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const UpdateEmail = (): React.JSX.Element => {
  const form = useForm<AdminUpdateEmailInput>({
    resolver: zodResolver(AdminUpdateEmailFormSchema),
    defaultValues: {
      email: '',
    },
  });
  const router = useRouter();

  const submitting = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<AdminUpdateEmailInput> = async (data) => {
    await authClient.changeEmail(
      {
        newEmail: data.email,
      },
      {
        onSuccess: () => {
          toast.success('Email Changed!');
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
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="email">New Email</FieldLabel>
            <Input
              {...field}
              type="email"
              id="email"
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
            <span>Change Email</span>
          )}
        </Button>
      </Field>
    </form>
  );
};
