'use client';

import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { ContactReplyInput } from '@/lib/validations';
import React from 'react';
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form';

type ContactReplyFormProps = {
  form: UseFormReturn<ContactReplyInput>;
  onSubmit: SubmitHandler<ContactReplyInput>;
  pending: boolean;
};

export const ContactReplyForm = ({
  form,
  onSubmit,
  pending,
}: ContactReplyFormProps): React.JSX.Element => {
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-y-6"
    >
      <Controller
        name="message"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="message">Message</FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                {...field}
                id="message"
                aria-invalid={fieldState.invalid}
                maxLength={3000}
              />
              <InputGroupAddon align="block-end">
                <InputGroupText>{field.value.length} / 3000</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Field orientation="horizontal">
        <Button type="submit">
          {pending ? (
            <span>
              <LoadingSpinner />
            </span>
          ) : (
            <span>Reply</span>
          )}
        </Button>
      </Field>
    </form>
  );
};
