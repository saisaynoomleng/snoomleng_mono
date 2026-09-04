'use client';

import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import {
  AdminChangePasswordFormSchema,
  AdminChangePasswordInput,
} from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const ChangePasswordForm = () => {
  const form = useForm<AdminChangePasswordInput>({
    resolver: zodResolver(AdminChangePasswordFormSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
      revokeSessions: false,
    },
  });
  const router = useRouter();

  const submitting = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<AdminChangePasswordInput> = async (data) => {
    const password = form.getValues('password');
    const confirmPassword = form.getValues('confirmPassword');

    if (password !== confirmPassword) {
      return form.setError('confirmPassword', {
        message: `Password doesn't match`,
      });
    }

    await authClient.changePassword(
      {
        currentPassword: data.currentPassword,
        newPassword: data.password,
        revokeOtherSessions: data.revokeSessions,
      },
      {
        onSuccess: () => {
          toast.success('Password Changed!');
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
        name="currentPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>
            <Input
              {...field}
              type="password"
              id="currentPassword"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="password">New Password</FieldLabel>
            <Input
              {...field}
              type="password"
              id="password"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="confirmPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="confirmPassword">
              Confirm New Password
            </FieldLabel>
            <Input
              {...field}
              type="password"
              id="confirmPassword"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="revokeSessions"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field orientation="horizontal">
            <Checkbox
              id="revokeSessions"
              name="revokeSessions"
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-invalid={fieldState.invalid}
            />
            <FieldLabel htmlFor="revokeSessions">
              Sign out of other devices?
            </FieldLabel>
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
            <span>Change Password</span>
          )}
        </Button>
      </Field>
    </form>
  );
};
