'use client';

import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ContactFormInputSchema, ContactFormSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { handleContactForm } from '@/actions/handleContactForm';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '../LoadingSpinner';

type ContactFormProps = {
  className?: string;
};

export const ContactForm = ({
  className,
}: ContactFormProps): React.JSX.Element => {
  const form = useForm<ContactFormInputSchema>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      subject: '',
    },
  });

  const submitting = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<ContactFormInputSchema> = async (data) => {
    const result = await handleContactForm(data);

    if (!result.success) {
      toast.error(result.message);

      return form.setError(result.field as keyof ContactFormInputSchema, {
        message: result.message,
      });
    }

    toast.success(result.message);
    form.reset();
  };

  return (
    <form
      className={twMerge(
        clsx(
          'grid grid-cols-2 gap-4 p-4 md:p-6 border-2 brand-box-shadow h-full',
          className,
        ),
      )}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-y-2 col-span-full">
        <h3 className="font-semibold text-fs-500 font-heading capitalize">
          Put it in Writing
        </h3>
        <p className="text-fs-300 font-semibold text-muted-foreground">
          Have a project, opportunity, or idea in mind? I'd love to hear about
          it.
        </p>
      </div>

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

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
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

      <Controller
        name="subject"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="col-span-full">
            <FieldLabel htmlFor="subject">Subject</FieldLabel>
            <Input
              {...field}
              type="text"
              id="subject"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="message"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="col-span-full">
            <FieldLabel htmlFor="message">Message</FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                minLength={20}
                maxLength={3000}
                {...field}
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon align="block-end">
                <InputGroupText> {field.value.length} / 3000</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Field orientation="horizontal">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
          className="brand-box-shadow"
        >
          Reset
        </Button>

        <Button className="brand-box-shadow" disabled={submitting}>
          {submitting ? (
            <span>
              <LoadingSpinner />
            </span>
          ) : (
            <span>submit</span>
          )}
        </Button>
      </Field>
    </form>
  );
};
