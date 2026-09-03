'use server';

import ContactEmail from '@/components/email/ContactEmail/ContactEmail';
import db, { ContactTable } from '@/db';
import { env } from '@/lib/env/server';
import { ActionResponse } from '@/lib/types';
import { ContactFormInputSchema, ContactFormSchema } from '@/lib/validations';

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { render } from 'react-email';

export const handleContactForm = async (
  data: ContactFormInputSchema,
): Promise<ActionResponse<ContactFormInputSchema>> => {
  try {
    const result = ContactFormSchema.safeParse(data);
    const isProd = process.env.NODE_ENV === 'production';

    if (!result.success) {
      const e = result.error.issues[0];
      return {
        success: false,
        message: e.message,
        field: e.path.join('.') as keyof ContactFormInputSchema,
      };
    }

    const { name, email, message, subject } = result.data;

    const html = await render(ContactEmail());

    const emailClient = isProd
      ? new SESClient({
          region: env.AWS_REGION,
        })
      : new SESClient({
          region: env.AWS_REGION,
          credentials: {
            accessKeyId: env.AWS_ACCESS_KEY,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
          },
        });

    await db.transaction(async (tx) => {
      await tx.insert(ContactTable).values({
        name,
        email,
        message,
        subject,
        status: 'new',
      });

      await emailClient.send(
        new SendEmailCommand({
          Source: 'noreply@snoomleng.com',

          Destination: {
            ToAddresses: [email],
          },

          Message: {
            Subject: {
              Data: 'Thank you for contacting me!',
            },
            Body: {
              Html: {
                Data: html,
              },
            },
          },
        }),
      );
    });

    return {
      success: true,
      message: 'Thank you for contacting me!',
    };
  } catch (error) {
    console.error('Contact Form Error', error);
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
};
