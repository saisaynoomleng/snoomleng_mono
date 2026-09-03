'use client';

import { Bounded } from '@/components/shared/Bounded';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { env } from '@/lib/env/client';
import { SignUpFormInputSchema, SignUpFormSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const SignUpPage = (): React.JSX.Element => {
  const form = useForm<SignUpFormInputSchema>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<SignUpFormInputSchema> = async (data) => {
    const password = form.getValues('password');
    const confirmPassword = form.getValues('confirmPassword');

    if (password !== confirmPassword) {
      return form.setError('confirmPassword', {
        message: `Password doesn't match`,
      });
    }

    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: `${env.NEXT_PUBLIC_APP_URL}/admin`,
      },
      {
        onSuccess: () => {},
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <Bounded className="flex flex-col justify-center items-center min-h-dvh">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-fs-500 font-semibold text-center">
            Sign Up
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                    id="email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Field orientation="horizontal">
              <Button>Sign Up</Button>
            </Field>
          </form>
        </CardContent>

        <CardFooter>
          <p className="ml-auto">
            Already a member?{' '}
            <Link href="/sign-in" className="link-url">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </Bounded>
  );
};

export default SignUpPage;
