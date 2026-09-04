'use server';

import { ContactReplyEmail } from '@/components/email/ContactReplyEmail/ContactReplyEmail';
import db, { ContactMessageTable, ContactTable } from '@/db';
import { env } from '@/lib/env/server';
import { ActionResponse } from '@/lib/types';
import {
  ContactReplyFormSchema,
  ContactReplyInput,
  ContactReplyOutput,
} from '@/lib/validations';
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { eq } from 'drizzle-orm';
import { render } from 'react-email';

export const handleReplyContactForm = async (
  data: ContactReplyInput,
): Promise<ActionResponse<ContactReplyOutput>> => {
  try {
    const result = ContactReplyFormSchema.safeParse(data);

    if (!result.success) {
      const e = result.error.issues[0];

      return {
        success: false,
        message: e.message,
        field: e.path.join('.') as keyof ContactReplyOutput,
      };
    }

    const { message, email, originalContactId } = result.data;

    const html = await render(ContactReplyEmail({ message }));

    const emailClient =
      process.env.NODE_ENV === 'production'
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

    await emailClient.send(
      new SendEmailCommand({
        Source: 'contact@snoomleng.com',

        Destination: {
          ToAddresses: [email],
        },

        ReplyToAddresses: ['saileng9723@gmail.com'],

        Message: {
          Subject: {
            Data: 'Replying to contact email',
          },

          Body: {
            Html: {
              Data: html,
            },
          },
        },
      }),
    );

    await db.transaction(async (tx) => {
      await tx.insert(ContactMessageTable).values({
        contactId: originalContactId,
        message,
        direction: 'outbound',
      });

      await tx
        .update(ContactTable)
        .set({
          status: 'replied',
          updatedAt: new Date(),
        })
        .where(eq(ContactTable.id, originalContactId));
    });

    return {
      success: true,
      message: 'Replied',
    };
  } catch (error) {
    console.error('Contact Reply Form Error', error);

    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};
